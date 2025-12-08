import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import { BackgroundGeolocation } from "@capgo/background-geolocation";
import { apiRequest } from "../utils/api-Utils";
import { useSessionStore } from "../store/sessionStore";

export interface LocationLog {
  userId: string;
  sessionId: number;
  coords: {
    lat: number;
    lng: number;
    accuracy?: number;
    speed?: number | null;
    heading?: number | null;
  };
  device?: {
    platform?: string | null;
  };
}

const isNative = Capacitor.isNativePlatform();

// Geolocation tracking state
let watchId: string | null = null; // Foreground watch ID
let periodicSendTimer: ReturnType<typeof setInterval> | null = null; // Periodic timer
let isBackgroundTrackingActive = false; // Background tracking flag
let isUserClockedIn = false; // User clock-in flag
let currentUserId: string | null = null; // Current user ID
let currentSessionId: number | null = null; // Current session ID
let lastLocationSentAt: number | null = null; // Last upload timestamp
let locationSendInProgress = false; // Prevent concurrent uploads
let lastKnownCoordinates: { lat: number; lng: number } | null = null; // Last known coords

// LocalStorage key for permission request
const LOCATION_PERMISSION_REQUESTED_KEY = "location_permission_requested";

// Minimum interval between location uploads (ms)
const WRITE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// Initialize globals from sessionStore (persisted session)
try {
  const sessionState = useSessionStore.getState();
  const currentSession = sessionState.getCurrentSession();
  if (currentSession) {
    currentUserId = currentSession.userId;
    currentSessionId = currentSession.id;
    isUserClockedIn = !currentSession.endTime;
    lastLocationSentAt = currentSession.lastLocationSentAt || null;
  }
} catch (err) {
  // Defensive: avoid crash if store is not available
  console.warn(
    "[locationTracking] Could not initialize globals from sessionStore",
    err
  );
}

// Keep globals in sync with sessionStore
try {
  useSessionStore.subscribe((state) => {
    const session = state.getCurrentSession();
    if (session) {
      currentUserId = session.userId;
      currentSessionId = session.id;
      isUserClockedIn = !session.endTime;
      lastLocationSentAt = session.lastLocationSentAt || null;
    } else {
      currentUserId = null;
      currentSessionId = null;
      isUserClockedIn = false;
      lastLocationSentAt = null;
    }
  });
} catch (err) {
  // Defensive: avoid crash if store is not available
  console.warn("[locationTracking] Could not subscribe to sessionStore", err);
}

//=============================================================================
// SEND LOCATION - Only call the function directly, no queue or retry logic
//=============================================================================

async function sendLocation(
  url: string,
  payload: {
    userId: string;
    sessionId: number;
    coords: {
      lat: number;
      lng: number;
      accuracy?: number;
      speed?: number | null;
      heading?: number | null;
    } | null;
  }
): Promise<{ success: boolean }> {
  try {
    await apiRequest(url, "POST", payload);
    //we can check for a response body here if needed
    return { success: true };
  } catch (err) {
    // Only log on failure
    console.warn("sendLocation: error sending location", err);
    return { success: false };
  }
}

//=============================================================================
// PERMISSION MANAGEMENT - Request once at registration/onboarding
//=============================================================================

/**
 * Request location permission ONCE at app registration/onboarding.
 * This should only be called during the registration process, not every time the app opens.
 * Stores a flag in localStorage so it's only requested once.
 */
export async function requestLocationPermissionOnce() {
  try {
    // Check if we've already requested permission
    const alreadyRequested = localStorage.getItem(
      LOCATION_PERMISSION_REQUESTED_KEY
    );
    if (alreadyRequested) {
      console.log("Location permission already requested previously");
      return { success: true, alreadyRequested: true };
    }

    // Request permissions using Capacitor Geolocation
    const permissions = await Geolocation.requestPermissions();

    if (
      permissions.location === "granted" ||
      permissions.location === "prompt"
    ) {
      // Mark that we've requested permission
      localStorage.setItem(LOCATION_PERMISSION_REQUESTED_KEY, "true");
      console.log("Location permission granted or prompted");
      return { success: true, alreadyRequested: false };
    } else if (permissions.location === "denied") {
      console.error("Location permission denied by user");
      return { success: false, reason: "denied" };
    }
  } catch (err) {
    console.error("Failed to request location permission:", err);
    return { success: false, reason: "error", error: err };
  }
}

/**
 * Check if location permissions have already been requested
 */
export function hasLocationPermissionBeenRequested(): boolean {
  return !!localStorage.getItem(LOCATION_PERMISSION_REQUESTED_KEY);
}

//=============================================================================
// FOREGROUND TRACKING - Uses Capacitor Geolocation API (watchPosition)
//=============================================================================

/**
 * Start FOREGROUND location tracking (when app is open)
 * Uses Capacitor Geolocation's watchPosition for continuous updates
 * NOTE: watchPosition fires frequently; throttling is enforced by WRITE_INTERVAL_MS
 */
async function startForegroundLocationWatch() {
  if (!isUserClockedIn) return;
  if (watchId) return;
  try {
    let lastCallbackTime = 0;
    const MIN_CALLBACK_INTERVAL_MS = 2000;
    watchId = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
      async (pos, err) => {
        const now = Date.now();
        if (now - lastCallbackTime < MIN_CALLBACK_INTERVAL_MS) return;
        lastCallbackTime = now;
        if (err || !pos) return;
        if (!isUserClockedIn) return;
        if (currentSessionId === 0) {
          lastKnownCoordinates = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          return;
        }
        if (locationSendInProgress) return;
        if (!currentUserId || !currentSessionId) return;
        lastKnownCoordinates = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        // Throttle: Only send if 5 minutes have passed since lastLocationSentAt
        if (lastLocationSentAt && now - lastLocationSentAt < WRITE_INTERVAL_MS)
          return;
        locationSendInProgress = true;
        const payload: LocationLog = {
          userId: currentUserId,
          sessionId: currentSessionId,
          coords: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            speed: pos.coords.speed ?? null,
            heading: pos.coords.heading ?? null,
          },
          device: {
            platform:
              typeof navigator !== "undefined" ? navigator.userAgent : null,
          },
        };
        const result = await sendLocation(
          `/api/location?clockType=clockIn`,
          payload
        );
        if (result.success) {
          lastLocationSentAt = now;
          try {
            useSessionStore
              .getState()
              .setLastLocationSentAt(currentSessionId, now);
          } catch {}
        }
        locationSendInProgress = false;
      }
    );
  } catch (err) {
    // Only log critical errors
    console.error("Failed to start foreground geolocation watch:", err);
  }
}

// Background tracking: uses @capgo/background-geolocation

export async function startBackgroundLocationWatch() {
  if (!isUserClockedIn || isBackgroundTrackingActive || !BackgroundGeolocation)
    return;
  try {
    await BackgroundGeolocation.start(
      {
        backgroundMessage: "Location tracking in progress",
        backgroundTitle: "Shift Scan",
        requestPermissions: false,
        stale: false,
        distanceFilter: 50,
      },
      async (location, error) => {
        if (error || !location) return;
        if (!isUserClockedIn) return;
        if (currentSessionId === 0) {
          lastKnownCoordinates = {
            lat: location.latitude,
            lng: location.longitude,
          };
          return;
        }
        if (locationSendInProgress) return;
        if (!currentUserId || !currentSessionId) return;
        lastKnownCoordinates = {
          lat: location.latitude,
          lng: location.longitude,
        };
        // Throttle: Only send if 5 minutes have passed since lastLocationSentAt
        const now = Date.now();
        if (lastLocationSentAt && now - lastLocationSentAt < WRITE_INTERVAL_MS)
          return;
        locationSendInProgress = true;
        const payload: LocationLog = {
          userId: currentUserId,
          sessionId: currentSessionId,
          coords: {
            lat: location.latitude,
            lng: location.longitude,
            accuracy: location.accuracy,
            speed: location.speed ?? null,
            heading: (location as any).bearing ?? null,
          },
          device: {
            platform:
              typeof navigator !== "undefined" ? navigator.userAgent : null,
          },
        };
        const result = await sendLocation(
          `/api/location?clockType=clockIn`,
          payload
        );
        if (result.success) {
          lastLocationSentAt = now;
          try {
            useSessionStore
              .getState()
              .setLastLocationSentAt(currentSessionId, now);
          } catch {}
        }
        locationSendInProgress = false;
      }
    );
    isBackgroundTrackingActive = true;
  } catch (err) {
    // Only log critical errors
    console.error("Failed to start background geolocation:", err);
  }
}

// Periodic location sending

async function sendPeriodicLocation() {
  if (!isUserClockedIn || !currentUserId || !currentSessionId) return;
  if (!lastKnownCoordinates) return;
  if (locationSendInProgress) return;
  const now = Date.now();
  if (lastLocationSentAt && now - lastLocationSentAt < WRITE_INTERVAL_MS)
    return;
  locationSendInProgress = true;
  try {
    const payload: LocationLog = {
      userId: currentUserId,
      sessionId: currentSessionId,
      coords: {
        lat: lastKnownCoordinates.lat,
        lng: lastKnownCoordinates.lng,
      },
      device: {
        platform: typeof navigator !== "undefined" ? navigator.userAgent : null,
      },
    };
    const result = await sendLocation(
      `/api/location?clockType=clockIn`,
      payload
    );
    if (result.success) {
      lastLocationSentAt = now;
      try {
        useSessionStore.getState().setLastLocationSentAt(currentSessionId, now);
      } catch {}
    }
  } catch (err) {
    // Only log critical errors
    console.error("[Periodic] Failed to send location:", err);
  } finally {
    locationSendInProgress = false;
  }
}

/**
 * Start all tracking when user clocks in (foreground + background)
 * @param userId - Authenticated user ID
 * @param sessionId - Current session ID
 */
export async function startClockInTracking(userId: string, sessionId: number) {
  try {
    if (!userId || !sessionId) {
      throw new Error("User ID and Session ID are required to start tracking");
    }

    // Prevent duplicate tracking initialization
    if (isUserClockedIn && watchId && isBackgroundTrackingActive) {
      console.warn(
        "Tracking already started - ignoring duplicate startClockInTracking call"
      );
      return { success: true };
    }

    // Store user and session IDs for callbacks
    currentUserId = userId;
    currentSessionId = sessionId;

    // Mark user as clocked in immediately
    isUserClockedIn = true;
    console.log("User clocked in - starting location tracking");

    // Start foreground and background tracking (fire-and-forget)
    startForegroundLocationWatch();
    startBackgroundLocationWatch();

    // Start periodic timer for location upload
    if (!periodicSendTimer) {
      periodicSendTimer = setInterval(() => {
        sendPeriodicLocation();
      }, WRITE_INTERVAL_MS);
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to start tracking on clock in:", err);
    isUserClockedIn = false;
    currentUserId = null;
    currentSessionId = null;
    return { success: false, error: err };
  }
}

/**
 * Stop all tracking when user clocks out (foreground + background)
 * Posts final location
 */
export async function stopClockOutTracking() {
  try {
    // Post final clock-out location (do not block cleanup on failure)
    if (currentUserId && currentSessionId) {
      try {
        await sendLocation(`/api/location?clockType=clockOut`, {
          userId: currentUserId,
          sessionId: currentSessionId,
          coords: null,
        });
      } catch (err) {
        // Only warn if posting fails
        console.warn("Failed to post clock out session:", err);
      }
    }

    // Reset lastLocationSentAt in both global and session store
    lastLocationSentAt = null;
    try {
      // Defensive: sessionId may be null, but set anyway; use 0 to reset
      if (currentSessionId) {
        useSessionStore.getState().setLastLocationSentAt(currentSessionId, 0);
      }
    } catch {}

    // Always clean up all state
    isUserClockedIn = false;
    currentUserId = null;
    currentSessionId = null;
    locationSendInProgress = false;

    // Stop foreground tracking
    if (watchId) {
      try {
        await Geolocation.clearWatch({ id: watchId });
      } catch (err) {
        // Only warn if clearWatch fails
        console.warn("clearWatch threw:", err);
      }
      watchId = null;
    }

    // Stop background tracking
    if (isBackgroundTrackingActive && BackgroundGeolocation) {
      try {
        await BackgroundGeolocation.stop();
      } catch (err) {
        // Only warn if stop fails
        console.warn("BackgroundGeolocation.stop threw:", err);
      }
      isBackgroundTrackingActive = false;
    }

    // Stop periodic timer
    if (periodicSendTimer) {
      clearInterval(periodicSendTimer);
      periodicSendTimer = null;
    }

    return { success: true };
  } catch (err) {
    // Only log critical errors
    console.error("Failed to stop tracking on clock out:", err);
    return { success: false, error: err };
  }
}

/**
 * Returns true if user is currently being tracked (clocked in)
 */
export function isTrackingActive(): boolean {
  return isUserClockedIn;
}

const GEOLOCATION_TIMEOUT = 2000; // ms, quick snapshot for clock ops

/**
 * Get a fresh, current coordinate snapshot (fast timeout)
 * @returns Coordinates or null if unavailable
 */
export async function getStoredCoordinates(): Promise<{
  lat: number;
  lng: number;
} | null> {
  try {
    if (isNative) {
      // Native Capacitor Geolocation - single attempt
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT,
        maximumAge: 0, // No caching
      });

      if (!pos) {
        console.warn("[Geolocation] Position is null");
        return null;
      }
      return {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
    }

    // Not on native platform
    console.warn("[Geolocation] Not on native platform");
    return null;
  } catch (err) {
    console.warn(
      "[Geolocation] Failed to get coordinates:",
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}

//=============================================================================
// Admin helper - fetch latest user location from your backend
//=============================================================================

export async function fetchLatestUserLocation(userId: string) {
  try {
    const data = await apiRequest(`/api/location/${userId}`, "GET");
    return data;
  } catch (err) {
    console.warn("Failed to fetch latest user location:", err);
    return null;
  }
}

/**
 * Pre-start location tracking to warm up GPS before clock-in
 * Fires foreground tracking in the background without sending to backend yet
 */
export async function preStartLocationTracking(userId: string) {
  // Store userId temporarily
  currentUserId = userId;

  // Fake sessionId 0 for pre-warm
  currentSessionId = 0;

  isUserClockedIn = true; // allow watch callbacks to run

  // Start foreground watch only; skip background to reduce unnecessary writes
  startForegroundLocationWatch();
}

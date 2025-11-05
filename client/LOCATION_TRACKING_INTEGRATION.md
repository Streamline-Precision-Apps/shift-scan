# Location Tracking Integration Guide

## Overview

The location tracking system now has separate permission and tracking lifecycle management:

- **Permission Request**: Happens ONCE at registration/onboarding
- **Tracking Start**: Happens when user clocks in
- **Tracking Stop**: Happens when user clocks out
- **Both APIs**: Foreground (Geolocation) and Background (BackgroundGeolocation) run simultaneously

## New Functions Available

### 1. Permission Management (Call at Registration/Onboarding)

#### `requestLocationPermissionOnce()`

Request location permission once at registration/onboarding. Will only request once, never again.

```typescript
import { requestLocationPermissionOnce } from "@/app/lib/client/locationTracking";

// In your registration/onboarding component
const result = await requestLocationPermissionOnce();
if (result.success) {
  console.log("Permission granted!");
} else {
  console.log("Permission denied or already requested");
}
```

#### `hasLocationPermissionBeenRequested()`

Check if location permission has already been requested.

```typescript
import { hasLocationPermissionBeenRequested } from "@/app/lib/client/locationTracking";

if (hasLocationPermissionBeenRequested()) {
  console.log("Permission was already requested");
}
```

---

### 2. Clock-In/Clock-Out Tracking (Call in your verification steps)

#### `startClockInTracking()`

Starts BOTH foreground and background location tracking. Call this when user successfully clocks in.

```typescript
import { startClockInTracking } from "@/app/lib/client/locationTracking";

// In your verification-step.tsx or similar clock-in component
// After successful clock in API call:
const result = await startClockInTracking();
if (result.success) {
  console.log("Location tracking started!");
}
```

#### `stopClockOutTracking()`

Stops BOTH foreground and background location tracking. Call this when user clocks out.

```typescript
import { stopClockOutTracking } from "@/app/lib/client/locationTracking";

// In your clock-out component
// After successful clock out API call:
const result = await stopClockOutTracking();
if (result.success) {
  console.log("Location tracking stopped!");
}
```

#### `isTrackingActive()`

Check if location tracking is currently active (user is clocked in).

```typescript
import { isTrackingActive } from "@/app/lib/client/locationTracking";

if (isTrackingActive()) {
  console.log("User is being tracked (clocked in)");
}
```

---

## Integration Steps

### Step 1: Permission Request at Registration/Onboarding

Add this to your registration or first-time setup flow:

```typescript
// In your registration component (e.g., signUp/page.tsx or onboarding)
import { requestLocationPermissionOnce } from "@/app/lib/client/locationTracking";

useEffect(() => {
  const setupPermissions = async () => {
    const result = await requestLocationPermissionOnce();
    if (result.success) {
      console.log("Location permission setup complete");
    }
  };

  setupPermissions();
}, []);
```

**Note**: This only requests once. Users won't be bothered again.

---

### Step 2: Start Tracking on Clock-In

Modify your verification steps (e.g., `verification-step.tsx`, `Verification-step-truck.tsx`, etc.):

```typescript
import { startClockInTracking } from "@/app/lib/client/locationTracking";

// In your handleClockIn or similar function, AFTER successful API response:
const responseAction = await handleGeneralTimeSheet(payload);
if (responseAction && responseAction.createdTimeSheet) {
  // Start tracking after successful clock in
  await startClockInTracking();

  // Then redirect or show success
  router.push("/v1");
}
```

---

### Step 3: Stop Tracking on Clock-Out

Modify your clock-out flow (e.g., `/dashboard/clock-out/_components/comment.tsx`):

```typescript
import { stopClockOutTracking } from "@/app/lib/client/locationTracking";

// In your handleClockOut or similar function, AFTER successful API response:
const response = await updateTimesheet({
  endTime: new Date().toISOString(),
  // ... other fields
});

if (response.success) {
  // Stop tracking after successful clock out
  await stopClockOutTracking();

  // Then redirect or show success
  router.push("/v1");
}
```

---

## How It Works

### Permission Flow

```
User Registration
  ↓
requestLocationPermissionOnce()
  ├─ First time: Shows permission prompt
  └─ After that: Skipped (stored in localStorage)
  ↓
Permission granted/stored
```

### Tracking Flow

```
User Clocks In
  ↓
startClockInTracking()
  ├─ Starts Foreground (Geolocation) tracking
  ├─ Starts Background (BackgroundGeolocation) tracking
  └─ Both run simultaneously
  ↓
App Open: Foreground tracking active
App Closed: Background tracking continues
Device Off: Background tracking continues
  ↓
User Clocks Out
  ↓
stopClockOutTracking()
  ├─ Stops Foreground (Geolocation) tracking
  ├─ Stops Background (BackgroundGeolocation) tracking
  └─ All tracking stopped
```

---

## Key Differences from Previous Implementation

| Feature             | Before              | After                                          |
| ------------------- | ------------------- | ---------------------------------------------- |
| Permission requests | Every time          | Once at registration                           |
| Tracking start/stop | Manual, either/or   | Automatic on clock in/out, both simultaneous   |
| Tracking state      | Not tracked         | `isUserClockedIn` flag prevents stale tracking |
| Integration         | Manual calls        | Integrated with clock in/out workflow          |
| Background handling | Needed manual setup | Automatic based on `isUserClockedIn`           |

---

## Files to Modify

1. **Registration/Onboarding Component**

   - Add `requestLocationPermissionOnce()` call

2. **Clock-In Verification Components**

   - Files: `verification-step.tsx`, `Verification-step-truck.tsx`, `Verification-step-mechanic.tsx`, `Verification-step-tasco.tsx`
   - Add `startClockInTracking()` after successful clock in

3. **Clock-Out Components**
   - Files: `/dashboard/clock-out/_components/comment.tsx` or similar
   - Add `stopClockOutTracking()` after successful clock out

---

## Testing Checklist

- [ ] Permission requested once during registration
- [ ] Permission NOT requested again on subsequent app opens
- [ ] Foreground tracking starts when app is open and user clocks in
- [ ] Background tracking continues when app is closed
- [ ] Both tracking methods stop when user clocks out
- [ ] Device turned off while clocked in: tracking continues in background
- [ ] App killed and reopened: tracking continues if user still clocked in
- [ ] Locations are being sent to `/api/location/user` endpoint
- [ ] Admin can fetch latest user location via `/api/location/{userId}`

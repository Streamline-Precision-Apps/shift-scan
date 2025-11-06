import prisma from "../lib/prisma.js";
import type { Location } from "../types/Location.js";

export async function fetchLatestLocation(
  userId: string
): Promise<Location | null> {
  const marker = await prisma.locationMarker.findFirst({
    where: {
      Session: {
        userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!marker) {
    console.warn(`[Location] No location found for user ${userId}`);
    return null;
  }

  console.log(`[Location] Fetching latest for user ${userId}: location found`);

  return {
    uid: userId,
    ts: marker.createdAt,
    coords: {
      lat: marker.lat,
      lng: marker.long,
      accuracy: marker.accuracy,
      speed: marker.speed,
      heading: marker.heading,
    },
    device: {},
  };
}

export async function fetchLocationHistory(
  userId: string
): Promise<Location[]> {
  const markers = await prisma.locationMarker.findMany({
    where: {
      Session: {
        userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return markers.map((marker) => ({
    uid: userId,
    ts: marker.createdAt,
    coords: {
      lat: marker.lat,
      lng: marker.long,
      accuracy: marker.accuracy,
      speed: marker.speed,
      heading: marker.heading,
    },
    device: {},
  }));
}

export async function fetchAllUsersLatestLocations(): Promise<
  Array<{
    userId: string;
    location: Location;
    userName?: string;
  }>
> {
  try {
    // Get all unique users who have location markers
    const sessions = await prisma.session.findMany({
      distinct: ["userId"],
      orderBy: {
        startTime: "desc",
      },
      include: {
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        locationMarkers: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const allLocations: Array<{
      userId: string;
      location: Location;
      userName?: string;
    }> = [];

    for (const session of sessions) {
      if (session.locationMarkers.length > 0) {
        const marker = session.locationMarkers[0]!;
        const userName = session.User
          ? `${session.User.firstName} ${session.User.lastName || ""}`.trim()
          : session.userId;

        allLocations.push({
          userId: session.userId,
          location: {
            uid: session.userId,
            ts: marker.createdAt,
            coords: {
              lat: marker.lat,
              lng: marker.long,
              accuracy: marker.accuracy,
              speed: marker.speed,
              heading: marker.heading,
            },
            device: {},
          },
          userName,
        });
      }
    }

    return allLocations;
  } catch (err) {
    console.error("Error fetching all users locations:", err);
    return [];
  }
}

export function validateLocationPayload(
  payload: Partial<Location>
): string | null {
  if (
    !payload.coords ||
    typeof payload.coords.lat !== "number" ||
    typeof payload.coords.lng !== "number"
  ) {
    return "Missing or invalid coordinates";
  }
  return null;
}

export async function saveUserLocation(
  userId: string,
  sessionId: number,
  coords: Location["coords"],
  device?: Location["device"]
): Promise<boolean> {
  try {
    await prisma.locationMarker.create({
      data: {
        sessionId,
        lat: coords.lat,
        long: coords.lng,
        accuracy: coords.accuracy ?? null,
        speed: coords.speed ?? null,
        heading: coords.heading ?? null,
      },
    });
    return true;
  } catch (err) {
    console.error("Error saving location marker:", err);
    throw err;
  }
}

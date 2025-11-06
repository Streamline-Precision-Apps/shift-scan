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
    profilePicture?: string | undefined;
    phoneNumber?: string | undefined;
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
            image: true,
            Contact: {
              select: { phoneNumber: true },
            },
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
      profilePicture?: string | undefined;
      phoneNumber?: string | undefined;
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
          profilePicture: session.User?.image || undefined,
          phoneNumber: session.User?.Contact?.phoneNumber || undefined,
        });
      }
    }

    // Append fake test users for development
    const fakeUsers = [
      {
        userId: "test-user-1",
        location: {
          uid: "test-user-1",
          ts: new Date(),
          coords: {
            lat: 42.5392,
            lng: -113.7822,
            accuracy: 5,
            speed: 0,
            heading: 0,
          },
          device: {},
        },
        userName: "John Smith",
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        phoneNumber: "(208) 555-0101",
      },
      {
        userId: "test-user-2",
        location: {
          uid: "test-user-2",
          ts: new Date(),
          coords: {
            lat: 42.53925,
            lng: -113.78225,
            accuracy: 8,
            speed: 2,
            heading: 90,
          },
          device: {},
        },
        userName: "Sarah Johnson",
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        phoneNumber: "(208) 555-0102",
      },
      {
        userId: "test-user-3",
        location: {
          uid: "test-user-3",
          ts: new Date(),
          coords: {
            lat: 42.53915,
            lng: -113.78215,
            accuracy: 6,
            speed: 1.5,
            heading: 180,
          },
          device: {},
        },
        userName: "Mike Davis",
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        phoneNumber: "(208) 555-0103",
      },
      {
        userId: "test-user-4",
        location: {
          uid: "test-user-4",
          ts: new Date(),
          coords: {
            lat: 42.53935,
            lng: -113.78235,
            accuracy: 7,
            speed: 3,
            heading: 45,
          },
          device: {},
        },
        userName: "Emily Wilson",
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        phoneNumber: "(208) 555-0104",
      },
      {
        userId: "test-user-5",
        location: {
          uid: "test-user-5",
          ts: new Date(),
          coords: {
            lat: 42.539,
            lng: -113.782,
            accuracy: 9,
            speed: 0.5,
            heading: 270,
          },
          device: {},
        },
        userName: "Robert Brown",
        profilePicture:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
        phoneNumber: "(208) 555-0105",
      },
    ];

    allLocations.push(...fakeUsers);

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

"use server";
import { apiRequest } from "@/app/lib/utils/api-Utils";

/**
 * Save FCM token via API endpoint (POST /api/v1/tokens/fcm)
 * - Deletes any existing tokens for the user
 * - Creates a new FCM token record
 * - Platform: web, lastUsedAt: now, isValid: true
 * - Requires authentication (token is sent in Authorization header)
 */
export async function setFCMToken({ token }: { token: string }) {
  if (!token) {
    console.error("Cannot save FCM token: No token provided");
    return false;
  }

  try {
    const response = await apiRequest("/api/v1/tokens/fcm", "POST", { token });

    if (response.success) {
      return true;
    } else {
      console.error("Failed to save FCM token:", response.error);
      return false;
    }
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return false;
  }
}

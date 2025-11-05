# Firebase Cloud Messaging Setup Guide

This guide covers the complete setup for Firebase Cloud Messaging (FCM) push notifications on Android for the Shift Scan App.

## Prerequisites

- Firebase project created in [Firebase Console](https://console.firebase.google.com)
- Android app registered in the Firebase project
- `google-services.json` file from Firebase Console

## Android Configuration Changes

### ✅ Already Completed

1. **variables.gradle** - Added `firebaseMessagingVersion = '24.1.0'`
2. **strings.xml** - Added `default_notification_channel_id` resource
3. **AndroidManifest.xml** - Added:
   - Firebase messaging metadata tags for default notification icon and channel
   - `POST_NOTIFICATIONS` permission for Android 13+

### Step 1: Add google-services.json

1. Download your `google-services.json` from Firebase Console:

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to Project Settings → Service Accounts → Google Services JSON
   - Click "Download google-services.json"

2. Place the file in your app module directory:

   ```
   client/android/app/google-services.json
   ```

3. Verify the build.gradle has the Google Services plugin:
   ```gradle
   plugins {
       id 'com.google.gms.google-services'
   }
   ```

### Step 2: Create Push Notification Icon

The push notification icon should be white pixels on a transparent backdrop (unlike your app icon).

**Using Android Studio Icon Generator:**

1. Right-click `android/app/src/main/res` → New → Image Asset
2. Select "Notification Icons"
3. Name: `push_icon_name`
4. Upload or create a white icon on transparent background
5. Accept default settings and finish

This will create the icon in all required mipmap densities:

- `mipmap-hdpi/push_icon_name.png`
- `mipmap-mdpi/push_icon_name.png`
- `mipmap-xhdpi/push_icon_name.png`
- `mipmap-xxhdpi/push_icon_name.png`
- `mipmap-xxxhdpi/push_icon_name.png`

### Step 3: Initialize Firebase Messaging (Already Done)

Your app is already set up to:

- Initialize Firebase with `initializeApp(firebaseConfig)`
- Request FCM token from the client
- Call `setFCMToken()` to save the token to your backend

## Notification Channel Setup

Notification channels are required for Android 8.0+ (API level 26+). The channel is automatically created when the first push notification is received using the fallback channel. For custom behavior, you can create channels in code.

### Custom Channel Creation (Optional)

If you want to create your own notification channel with custom settings, add this to your MainActivity or Application class:

```java
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        String channelId = "shift_scan_notifications";
        CharSequence name = "Shift Scan Notifications";
        String description = "Notifications for shift and work-related updates";
        int importance = NotificationManager.IMPORTANCE_DEFAULT;

        NotificationChannel channel = new NotificationChannel(channelId, name, importance);
        channel.setDescription(description);

        NotificationManager notificationManager = getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
    }
}
```

Call `createNotificationChannel()` in your MainActivity's `onCreate()` method.

## Permission Handling (Android 13+)

For Android 13+, you must request the `POST_NOTIFICATIONS` permission at runtime.

The Capacitor Push Notifications plugin will handle this automatically when you call:

- `checkPermissions()` - Check current permission status
- `requestPermissions()` - Request the permission from the user

Example from the Capacitor docs:

```typescript
import { PushNotifications } from "@capacitor/push-notifications";

async function initializePushNotifications() {
  const result = await PushNotifications.checkPermissions();

  if (result.receive === "prompt") {
    const permResult = await PushNotifications.requestPermissions();
    if (permResult.receive === "denied") {
      throw new Error("User denied push notification permissions");
    }
  }
}
```

## Private Space Considerations (Android 15+)

From Android 15 onwards, users can install apps in Private Space, which can be locked at any time. During locked private space, push notifications won't be shown until unlocked.

**Recommendation:** Inform users to avoid installing Shift Scan in Private Space if they need to receive critical shift notifications. Add this to your app's release notes or onboarding screen.

## Server-Side Configuration

Your server already has:

- Firebase Admin SDK initialized (`src/lib/firebase.ts`)
- Notification Service (`src/services/notificationService.ts`)
- Notification Model with database integration
- Topic subscription support for bulk messaging

### Sending Notifications from Server

Use Firebase Admin SDK to send notifications:

```typescript
import admin from "firebase-admin";

// Send to specific device
await admin.messaging().send({
  token: deviceToken,
  notification: {
    title: "Shift Update",
    body: "Your shift has been updated",
  },
  data: {
    notificationId: "your-notification-id",
    url: "/shifts/123",
  },
});

// Send to topic
await admin.messaging().send({
  topic: "all-users",
  notification: {
    title: "System Announcement",
    body: "Important update for all users",
  },
});
```

## Testing Push Notifications

1. **Firebase Console:**

   - Go to Engage → Messaging
   - Create a campaign
   - Select your app and send a test notification

2. **Via FCM API:**
   ```bash
   curl -X POST \
     'https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send' \
     -H 'Authorization: Bearer ACCESS_TOKEN' \
     -H 'Content-Type: application/json' \
     -d '{
       "message": {
         "token": "DEVICE_TOKEN",
         "notification": {
           "title": "Test",
           "body": "Test notification"
         }
       }
     }'
   ```

## Troubleshooting

### Icon Issues

- Ensure `push_icon_name` exists in all mipmap folders
- Icon must be white on transparent (will appear as white square if not)
- Android 12+ may show colored icons differently

### Permissions Not Requested

- Verify `POST_NOTIFICATIONS` is in AndroidManifest.xml
- Call `checkPermissions()` and `requestPermissions()` from Capacitor
- Test on Android 13+ device/emulator

### Notifications Not Appearing

- Check notification channel exists and is configured
- Verify device token is saved to backend
- Check app is not in Doze mode
- For Android 15+: Verify app is not in locked Private Space

### Build Errors

- Ensure `google-services.json` is in `android/app/`
- Verify Google Play Services plugin is in build.gradle
- Check Gradle sync completes without errors

## Documentation

- [Firebase Cloud Messaging Android Docs](https://firebase.google.com/docs/cloud-messaging/android/client)
- [Capacitor Push Notifications Plugin](https://capacitorjs.com/docs/apis/push-notifications)
- [Android Notification Channels](https://developer.android.com/develop/ui/views/notifications/channels)
- [Android Private Space](https://developer.android.com/about/versions/15/features/private-space)

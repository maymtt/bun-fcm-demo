import { Elysia } from "elysia";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

console.log("Firebase Admin SDK initialized successfully!");

const app = new Elysia();

// Define your GET route
app.get("/", () => "🦊 Hello from Elysia!");

// Define your POST route
app.post("/create-notification", async (ctx) => {
  const { text }: { text: string } = await ctx.request.json();

  const fcmToken = "FCM_TOKEN";

  // Send Push Notification via FCM
  try {
    const response = await admin.messaging().send({
      notification: {
        title: "Scheduled Notification",
        body: text,
      },
      token: fcmToken,
    });

    console.log("Successfully sent scheduled message:", response);
    return { message: "Notification scheduled successfully!" };
  } catch (error) {
    console.log("error :>> ", error);

    return {
      message: "Error scheduling notification",
      error: (error as Error).message,
    };
  }
});

// Start the server
app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

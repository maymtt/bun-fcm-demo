import admin from "firebase-admin";
import { CronJob } from "cron";

import serviceAccount from "./serviceAccountKey.json";
import token from "./token.json";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Replace with your actual FCM token
const fcmToken = token.fcmToken;

const animalEmojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐺",
  "🦄",
  "🐴",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐢",
  "🐍",
  "🦎",
  "🐙",
  "🐠",
  "🐡",
  "🐬",
  "🦓",
  "🦍",
  "🦧",
  "🦥",
  "🦦",
  "🐆",
  "🐅",
  "🦩",
  "🦢",
  "🐇",
  "🦔",
];

// Function to get a random emoji
const getRandomAnimalEmoji = () => {
  const randomIndex = Math.floor(Math.random() * animalEmojis.length);
  return animalEmojis[randomIndex];
};

const sendTestNotification = async () => {
  try {
    const message = {
      notification: {
        title: "Test Notification",
        body: `${getRandomAnimalEmoji()} Sent from bun + elysia ${new Date()}`,
      },
      token: fcmToken, // FCM device token
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Trigger notification
// sendTestNotification();

// Schedule notification to run every minute using cron
const job = new CronJob("*/5 * * * * *", () => {
  console.log("Sending test notification...");
  sendTestNotification();
});

job.start();

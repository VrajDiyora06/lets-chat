import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";

dotenv.config();

let serviceAccountKey;

try {
  // Use dynamically loaded JSON from environment variables in production
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // fallback for local testing
    // Requires ignoring top level await if not supported, but using dynamic import to fix synchronous ERR_MODULE_NOT_FOUND error
    const data = await import("./lets-chat-cd4b8-firebase-adminsdk-fbsvc-1281796290.json", {
      with: { type: "json" }
    });
    serviceAccountKey = data.default;
  }
} catch (error) {
  console.error("Failed to load Firebase credentials:", error.message);
}

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);
export default auth;

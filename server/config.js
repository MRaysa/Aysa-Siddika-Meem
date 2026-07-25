// Centralised environment/config access for the backend.
// Reads from process.env (loaded by Vercel, or by dotenv locally).

import "dotenv/config";

function required(name) {
  const value = process.env[name];
  if (!value) {
    // Don't throw at import time on Vercel cold start for optional flows;
    // throw only where the value is actually needed (db/auth).
    console.warn(`[config] Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  mongodbUri: required("MONGODB_URI"),
  jwtSecret: required("JWT_SECRET"),
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  // Token lifetime for admin sessions
  jwtExpiresIn: "7d",
  isProduction: process.env.NODE_ENV === "production",
};

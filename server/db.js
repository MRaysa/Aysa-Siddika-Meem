// Mongoose connection with caching for serverless environments.
//
// On Vercel each serverless invocation may reuse a "warm" container.
// We cache the connection promise on globalThis so we don't open a new
// MongoDB connection on every request (which would exhaust Atlas limits).

import mongoose from "mongoose";
import { config } from "./config.js";

let cached = globalThis._mongoose;
if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!config.mongodbUri) {
    throw new Error("MONGODB_URI is not set — cannot connect to the database.");
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(config.mongodbUri, {
        // Keep the pool small; serverless containers are short-lived.
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Creates (or updates) the single admin account from env vars.
// Run locally with:  npm run seed:admin
//
// Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env

import mongoose from "mongoose";
import { connectDB } from "../db.js";
import { config } from "../config.js";
import { Admin } from "../models/Admin.js";

async function run() {
  const { email, password } = config.admin;
  if (!email || !password) {
    console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await Admin.hashPassword(password);
  const existing = await Admin.findOne({ email: email.toLowerCase() });

  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`✅ Updated admin password for ${email}`);
  } else {
    await Admin.create({ email: email.toLowerCase(), passwordHash });
    console.log(`✅ Created admin account for ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed admin failed:", err);
  process.exit(1);
});

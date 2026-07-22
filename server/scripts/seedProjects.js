// One-time migration: import the existing public/data/projects.json
// into MongoDB. Run with:  npm run seed:projects
//
// Safe to re-run: it skips projects whose title already exists.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import { Project } from "../models/Project.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.resolve(__dirname, "../../public/data/projects.json");

async function run() {
  await connectDB();

  const raw = fs.readFileSync(jsonPath, "utf-8");
  const projects = JSON.parse(raw);

  let created = 0;
  let skipped = 0;

  for (const p of projects) {
    const exists = await Project.findOne({ title: p.title });
    if (exists) {
      skipped++;
      continue;
    }

    // Drop the old numeric `id`; use it only to preserve display order.
    const { id, ...rest } = p;
    await Project.create({ ...rest, order: id ?? 0 });
    created++;
  }

  console.log(`✅ Seed complete — created: ${created}, skipped (already existed): ${skipped}`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed projects failed:", err);
  process.exit(1);
});

// Builds and returns the Fastify application instance.
// Used by both the local dev server (server/index.js) and the
// Vercel serverless handler (api/index.js).

import Fastify from "fastify";
import cors from "@fastify/cors";

import { connectDB } from "./db.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./routes/auth.js";
import { crudRoutes } from "./routes/crudFactory.js";

import { Project } from "./models/Project.js";
import { Experience } from "./models/Experience.js";
import { Skill } from "./models/Skill.js";
import { Education } from "./models/Education.js";

export function buildApp() {
  const app = Fastify({
    logger: process.env.NODE_ENV !== "production",
  });

  // CORS — same-origin on Vercel, but allow all for flexibility/local dev.
  app.register(cors, { origin: true, credentials: true });

  // Ensure the DB is connected before handling any request.
  app.addHook("onRequest", async () => {
    await connectDB();
  });

  // JWT auth (adds app.authenticate)
  app.register(authPlugin);

  // Health check
  app.get("/api/health", async () => ({ status: "ok" }));

  // Routes
  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(crudRoutes(Project), { prefix: "/api/projects" });
  app.register(crudRoutes(Experience), { prefix: "/api/experience" });
  app.register(crudRoutes(Skill), { prefix: "/api/skills" });
  app.register(crudRoutes(Education), { prefix: "/api/education" });

  return app;
}

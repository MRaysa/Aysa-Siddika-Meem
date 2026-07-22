// Auth routes: admin login + "who am I".

import { Admin } from "../models/Admin.js";

export default async function authRoutes(fastify) {
  // POST /api/auth/login  { email, password } -> { token, admin }
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body || {};

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: String(email).toLowerCase() });
    if (!admin) {
      return reply.code(401).send({ error: "Invalid email or password." });
    }

    const ok = await admin.verifyPassword(password);
    if (!ok) {
      return reply.code(401).send({ error: "Invalid email or password." });
    }

    const token = fastify.jwt.sign({ id: admin._id.toString(), email: admin.email });
    return {
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    };
  });

  // GET /api/auth/me  (protected) -> current admin info
  fastify.get(
    "/me",
    { onRequest: [fastify.authenticate] },
    async (request) => {
      return { admin: request.user };
    }
  );
}

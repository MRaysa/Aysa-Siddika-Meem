// Registers JWT support and an `authenticate` decorator that protected
// routes can use as an onRequest hook.

import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { config } from "../config.js";

async function authPlugin(fastify) {
  fastify.register(jwt, {
    secret: config.jwtSecret || "insecure-dev-secret",
    sign: { expiresIn: config.jwtExpiresIn },
  });

  // Use as: { onRequest: [fastify.authenticate] }
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized. Please log in again." });
    }
  });
}

export default fp(authPlugin);

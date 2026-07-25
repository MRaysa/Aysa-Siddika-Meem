// Vercel serverless entry point.
//
// Vercel routes every request matching /api/* (see vercel.json) to this
// function. We build the Fastify app once per warm container and let it
// handle the raw Node request/response.

import { buildApp } from "../server/app.js";

let appPromise;

async function getApp() {
  if (!appPromise) {
    const app = buildApp();
    appPromise = app.ready().then(() => app);
  }
  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();
  app.server.emit("request", req, res);
}

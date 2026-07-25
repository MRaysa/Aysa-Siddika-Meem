// Local development server. Run with:  npm run dev:server
// On Vercel this file is NOT used — api/index.js is the entry instead.

import { buildApp } from "./app.js";

const app = buildApp();
const port = process.env.PORT || 4000;

app
  .listen({ port, host: "0.0.0.0" })
  .then(() => console.log(`🚀 API running on http://localhost:${port}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

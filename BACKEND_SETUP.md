# Backend + Admin Panel — Setup Guide

Your portfolio now has a **Fastify + MongoDB** backend and an **admin panel** to
manage Projects, Experience, Skills and Education without touching code.

- Frontend: React (Vite) — same as before
- Backend: Fastify running as a **Vercel serverless function** (`api/index.js`)
- Database: **MongoDB Atlas**
- Images: **Cloudinary** (uploaded directly from the browser)
- Admin panel: `/admin` (login at `/admin/login`)

---

## 1. Create a MongoDB Atlas database (free)

1. Go to https://www.mongodb.com/cloud/atlas and sign up.
2. Create a **free (M0)** cluster.
3. **Database Access** → add a user (username + password). Remember these.
4. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — needed for Vercel).
5. **Connect → Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   Replace `<user>` / `<password>`, and keep `/portfolio` as the database name.

---

## 2. Create a Cloudinary account (free) for image uploads

1. Sign up at https://cloudinary.com.
2. On the dashboard, note your **Cloud name**.
3. Go to **Settings → Upload → Upload presets → Add upload preset**.
   - Set **Signing Mode = Unsigned**.
   - Save, and copy the **preset name**.

> Only the cloud name + unsigned preset are used (safe to expose in the browser).
> No Cloudinary API secret is ever put in the frontend.

---

## 3. Local environment variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

```env
MONGODB_URI=mongodb+srv://...        # from step 1
JWT_SECRET=some-long-random-string   # make one up, keep it secret
ADMIN_EMAIL=you@example.com          # your admin login email
ADMIN_PASSWORD=a-strong-password     # your admin login password

VITE_API_URL=/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name    # from step 2
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset     # from step 2
```

---

## 4. Create the admin account + import existing projects

Run these once (they use the values in `.env`):

```bash
npm run seed:admin      # creates your admin login
npm run seed:projects   # imports the 10 existing projects into MongoDB
```

---

## 5. Run locally

Two terminals:

```bash
# Terminal 1 — backend API on http://localhost:4000
npm run dev:server

# Terminal 2 — frontend on http://localhost:5173
npm run dev
```

> For local dev, set `VITE_API_URL=http://localhost:4000/api` in `.env`
> so the frontend talks to the local API. On Vercel keep it as `/api`.

Then:
- Portfolio: http://localhost:5173
- Admin: http://localhost:5173/admin/login

---

## 6. Deploy to Vercel

Your frontend already deploys on Vercel. The backend goes with it automatically
(the `api/` folder becomes a serverless function).

1. Push your code to GitHub (frontend auto-deploys as before).
2. In Vercel → **Project → Settings → Environment Variables**, add ALL of these
   (same as your `.env`, but set `VITE_API_URL=/api`):

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | your Atlas connection string |
   | `JWT_SECRET` | your long random string |
   | `ADMIN_EMAIL` | your admin email |
   | `ADMIN_PASSWORD` | your admin password |
   | `VITE_API_URL` | `/api` |
   | `VITE_CLOUDINARY_CLOUD_NAME` | your cloud name |
   | `VITE_CLOUDINARY_UPLOAD_PRESET` | your preset |

3. Redeploy. Done.

### About your original question — updating & auto-deploy
- **Code changes** → `git push` → Vercel auto-deploys (frontend **and** API together). ✅
- **Adding/editing a project, skill, etc.** → just use the **admin panel**. It saves
  to MongoDB and shows up **instantly** — no git push, no redeploy needed. 🎉
- **API keys** → update them in the Vercel **Environment Variables** dashboard,
  never in the code.

---

## How it works

```
Browser ──► React app (Vercel static)
   │
   ├─ GET  /api/projects        → public, reads MongoDB
   └─ POST /api/projects        → admin only (JWT), writes MongoDB
                                   images upload straight to Cloudinary

server/            the Fastify app (models, routes, auth)
api/index.js       Vercel serverless entry that runs the Fastify app
src/lib/api.js     frontend API client
src/pages/admin/   login + dashboard
```

If the database is empty or unreachable, the public sections **fall back** to the
built-in default content, so the site never looks broken.

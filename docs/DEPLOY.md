# Deploy (free fullstack — one URL)

The API and dashboard can run as **one app**: Express serves `/api/*` and the built Vite UI on the same origin. The browser uses relative `/api` paths (no `VITE_API_BASE_URL` needed).

## Build and run locally (same as production)

```bash
pnpm install
pnpm run build:deploy
cross-env PORT=8080 SERVE_STATIC=1 pnpm --filter @workspace/api-server run start
```

Open `http://localhost:8080` — UI and API on one port.

---

## Option 1 — Fly.io (recommended)

Free allowance on shared VMs; one Docker deploy. Card may be required for account verification.

1. Install CLI (Windows PowerShell):

   ```powershell
   iwr https://fly.io/install.ps1 -useb | iex
   ```

   Then **close and reopen** the terminal (or add `C:\Users\<you>\.fly\bin` to your user PATH). The command is `flyctl` (Windows also provides `fly` in that folder).

2. `flyctl auth login`
3. Edit `fly.toml` → set `app = "your-unique-name"`
4. From repo root:

```bash
flyctl launch --no-deploy
flyctl deploy
```

5. Open the URL Fly prints (e.g. `https://your-app.fly.dev`).

Health: `https://<app>.fly.dev/api/healthz`

---

## Option 2 — Koyeb (Docker, free nano)

1. https://www.koyeb.com — connect GitHub repo
2. **Create App** → **Git** → this repository
3. **Builder**: Dockerfile
4. **Port**: `8080`
5. Env: `SERVE_STATIC=1`, `NODE_ENV=production`, `LOG_LEVEL=info`
6. Deploy

No split frontend env vars needed.

---

## Option 3 — Railway

1. https://railway.app — New Project → Deploy from GitHub
2. Uses root `Dockerfile` automatically
3. Set **PORT** to `8080` if the platform does not inject it (Railway usually sets `PORT` automatically — remove hardcoded `ENV PORT=8080` override in service settings if health checks fail)
4. Hobby plan includes monthly credit (not unlimited free)

---

## Option 4 — Replit (already in repo)

If the project lives on Replit: **Publish** / deployment uses `artifact.toml` for API + static web. For a **single** public URL on Replit, prefer importing the repo and adding a deployment that runs `pnpm run build:deploy` then `pnpm run start:deploy` with `PORT=8080`, or use the unified Docker flow on Replit container deploy if available.

---

## Vercel / Render (split or serverless)

Still supported but need two services or serverless config:

- **Vercel**: root `vercel.json` + `VITE_API_BASE_URL` for two projects
- **Render**: two services (API web + static site) — see earlier notes

For the least friction, use **Fly or Koyeb + Dockerfile** above.

---

## Environment variables

| Variable | When |
|----------|------|
| `PORT` | Required (set by host, e.g. 8080) |
| `SERVE_STATIC=1` | Serve UI from `artifacts/crypto-dashboard/dist/public` |
| `NODE_ENV=production` | Production logging |
| `LOG_LEVEL` | Optional (`info`) |
| `VITE_API_BASE_URL` | Only if UI and API are on **different** hosts |
| `DATABASE_URL` | Only when using Drizzle/Postgres |

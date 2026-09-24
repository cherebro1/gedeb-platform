# Gedeb Woreda — Digital Transformation Platform

A simple website for the **Gedeb Woreda Innovation & Technology Office**:
- Request to digitize a government service
- Browse e-government services already online
- Register a tech startup with the office, with guidance
- AI chat assistant (FAQ-based by default, or real AI if you add an API key)

Coffee-and-green themed, built plain — no monorepo tooling, no pnpm workspaces.
Just two independent folders you install with `npm`.

```
gedeb-platform/
├── frontend/   React + Vite website
└── backend/    Node.js + Express API, connects to Supabase
```

---

## 1. Set up Supabase (the database)

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Once it's ready, open **SQL Editor** in the left sidebar.
3. Copy everything from `backend/sql/schema.sql` in this project, paste it in, and click **Run**.
   This creates the two tables the forms save into: `service_registrations` and `startup_registrations`.
4. Go to **Settings → API**. You'll need two values in a moment:
   - **Project URL**
   - **service_role key** (not the `anon` key — the service role key, kept secret, server-side only)

---

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

`ANTHROPIC_API_KEY` is optional — leave it blank and the chatbot still works
using a small built-in FAQ. Add a key from [console.anthropic.com](https://console.anthropic.com)
later for real AI-generated answers.

Start it:
```bash
npm run dev
```
It runs at `http://localhost:4000`. Visit `http://localhost:4000/api/health` — you should see `{"ok":true}`.

---

## 3. Run the frontend

Open a **second terminal**:
```bash
cd frontend
npm install
npm run dev
```
It runs at `http://localhost:5173` and automatically talks to the backend on port 4000
(no extra config needed for local development).

Open `http://localhost:5173` in your browser — the site should load fully styled,
with working forms and the chat button in the bottom-right corner.

---

## 4. Deploy it

### Backend → Render (free tier works)
1. Push this project to a GitHub repo.
2. On [render.com](https://render.com) → **New → Web Service** → connect the repo.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install` · Start command: `npm start`
5. Add the same environment variables from your `backend/.env` (Supabase URL, service key, optional Anthropic key).
6. Deploy. Copy the resulting URL, e.g. `https://gedeb-api.onrender.com`.

*(Railway or Fly.io work the same way if you prefer them.)*

### Frontend → Vercel or Netlify
1. On [vercel.com](https://vercel.com) → **New Project** → import the same repo.
2. Set **Root Directory** to `frontend`.
3. Add one environment variable:
   ```
   VITE_API_BASE_URL=https://gedeb-api.onrender.com
   ```
   (your backend's deployed URL from the step above)
4. Deploy. Vercel auto-detects Vite (`npm run build`, output `dist/`).

Your site is now live and fully connected to Supabase.

---

## Notes

- **Forms not saving?** Check the backend logs — most often it's a missing/incorrect `SUPABASE_SERVICE_KEY`, or the SQL schema wasn't run yet.
- **Want registrations manageable by staff?** Supabase's own **Table Editor** lets office staff view and update `service_registrations` / `startup_registrations` directly (mark status as in-progress, etc.) without any extra tooling.
- **Chatbot going generic?** That means `ANTHROPIC_API_KEY` isn't set — it's using the built-in FAQ fallback in `backend/routes/chat.js`, which you can edit directly.
- **Colors & type:** defined once in `frontend/src/index.css` (`:root` variables) — change the coffee/green palette there and it updates everywhere.

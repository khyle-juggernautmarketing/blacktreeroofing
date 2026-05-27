# Black Tree Roofing — Landing Page

Next.js 15 + React 19 + Tailwind CSS landing page for Black Tree Roofing (Treasure Valley). **Scroll reveals and the hero use CSS transitions/keyframes** so SSR and hydration stay aligned; Framer Motion is only used for the **gallery lightbox** and **mobile nav sheet** (client-only UI).

## Setup

```bash
npm install
cp .env.local.example .env.local   # webhook URL already in .env.local
npm run dev
```

Open **http://127.0.0.1:3000** after `npm run dev` shows `✓ Ready`. Production: `npm run build && npm start` (same URL/port).

**Blank page or `_next/static/...` 404s in the console?** The browser is often holding **old HTML** that points at expired dev chunks (`layout.css`, `main-app.js`, etc.). Run a clean restart, then hard-refresh:

```bash
npm run dev:clean
```

Then open **http://127.0.0.1:3000** and use `Cmd+Shift+R` (or open in Chrome/Safari instead of Cursor’s embedded preview).

**`[CursorBrowser] Native dialog overrides`** is from Cursor’s built-in browser, not this app — safe to ignore.

**Connection refused?** Run `npm run dev` and open **http://127.0.0.1:3000**. If you need access from another device or a tunnel, use `npm run dev:all` (listens on `0.0.0.0:3000`).

**`GET /` returns 500?** Port 3000 is often occupied by a **stuck or outdated `next start`** (not this repo’s current build). The app itself builds fine — free the port and restart:

```bash
npm run dev:clean
```

Or manually: `lsof -nP -iTCP:3000 -sTCP:LISTEN`, stop that PID, then `npm run dev`.

**Minified React error #418 (hydration)?** The HTML from the server did not match the browser’s first render. Common causes: Framer Motion animating before hydration finishes, or **Cursor’s embedded browser / preview** altering the DOM (you may see `[CursorBrowser] Native dialog overrides` in the console). Open **http://127.0.0.1:3000** in Chrome, Safari, or Firefox to verify the site outside the embedded browser.

## Lead form

4-step funnel posts to n8n via `POST /api/lead`. Set `N8N_WEBHOOK_URL` in `.env.local`.

## Push to GitHub (first time)

Your code is committed locally on `main` but **is not on GitHub until you push**. This environment cannot use your GitHub password for you.

1. **Create the repo** (if it does not exist): [github.com/new](https://github.com/new) → name **`blacktreeroofing`** → owner **`khyle-juggernautmarketing`** → do **not** add a README (empty repo).
2. From this folder, run:

```bash
npm run push:github
```

3. When prompted for HTTPS credentials, use your GitHub **username** and a **Personal Access Token** ([create one](https://github.com/settings/tokens) with `repo` scope), not your account password.

Correct remote URL (not `https://github.com` alone):

`https://github.com/khyle-juggernautmarketing/blacktreeroofing.git`

## Build

```bash
npm run build
npm start
```
# blacktreeroofing

# Deploy to Hostinger (Node.js Hosting)

## 1. First-time setup on server

SSH into the server and clone the repo:

```bash
git clone https://github.com/harmony-cro/<repo-name>.git
cd <repo-name>
cp .env.example .env.local
# Edit .env.local with correct values
```

Install dependencies and build:

```bash
npm ci
npm run build
```

## 2. Set hPanel Node.js app

In Hostinger hPanel → Node.js:
- **Node.js version:** 22.x or 24.x
- **Application root:** repository root (where root `package.json` lives)
- **Install command:** `npm ci`
- **Build command:** `npm run build`
- **Start command:** `npm start`
- Optional startup file (only if panel requires a file path): `.next/standalone/web/server.js`

Save and start the app.

## 3. Environment variables

Set in hPanel → Node.js → Environment Variables:
- `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- `PORT` = `3000` (or whatever port Hostinger assigns)
- `NODE_ENV` = `production`

## 4. Updating the site

SSH into the server and run:

```bash
git pull
npm ci
npm run build
# Restart app from hPanel
```

## 5. Quick smoke test after deploy

- Open `/` — page loads, images visible
- Open `/en/` — English version loads (if bilingual)
- Check browser console for errors
- If blank/403 and no Node logs: verify the domain is attached to a Node.js app (you should see a `nodejs/` folder on Hostinger, not only `public_html/`)

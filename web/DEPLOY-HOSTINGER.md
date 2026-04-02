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

## 2. Set hPanel entry point

In Hostinger hPanel → Node.js:
- **Node.js version:** 20.x or later
- **Application startup file:** `.next/standalone/server.js`
- **Application root:** project directory

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
# Restart app from hPanel or: pm2 restart <app-name>
```

## 5. Quick smoke test after deploy

- Open `/` — page loads, images visible
- Open `/en/` — English version loads (if bilingual)
- Check browser console for errors

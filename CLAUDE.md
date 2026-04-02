# Taxi Joker — taxijoker.hr

## Site info
- **Client:** Taxi Joker
- **Domain:** taxijoker.hr
- **Category:** 1 (brochure — static, no CMS)
- **Language:** HR + EN
- **Status:** `content-migrated`

## Sources (local, gitignored)
- `sources/u244938166_yttssh.sql` — MySQL dump (11MB, table prefix: `wph1_`)
- `sources/public_html/wp-content/uploads/` — media files (17MB, mostly 2022)
- `sources/public_html/wp-content/themes/oceanwp/` — original WP theme (OceanWP)

## Original WP stack
- Theme: OceanWP
- Plugins: Elementor Pro, Happy Elementor Addons Pro, Ocean Extra, Yoast SEO, W3 Total Cache, UpdraftPlus, MainWP Child
- **Important:** Pages were built with Elementor — actual layout/content is in serialized `_elementor_data` post meta, NOT in `post_content`

## WP content inventory
- 1 published page: "jokertaxi" (ID=17) — this is the homepage
- 1 default WP post: "Hello world!" (ID=1) — ignore
- ~20 attachments (images): team photos, taxi photos, favicon, logo
- No posts, no categories, no menus of significance

## Key image files (in uploads/2022/04/)
- `taxi-joker.png` — logo
- `cropped-favicon.png` — favicon
- `image_2022-04-05_182244330.*` — main car/taxi photo
- `118468978_*.jpg`, `247280046_*.jpg`, `254967139_*.jpg` — Facebook-sourced photos
- `black-2561619_1920-scaled-1.jpg` — background/hero image
- `t-1.jpg`, `t-3-1.jpg`, `t-4.jpg` — team or service photos
- `team-s1-1.jpg`, `team-s3-1.jpg`, `team-s4.jpg`, `team-s8-1.jpg` — team photos
- `headphone.jpg` — likely contact/support icon

## Migration workflow (Cat 1 — no Payload seeding needed)
1. ✅ Sources in place
2. Copy harmony-template-base into this repo (web/ structure)
3. Run parse-wp-dump.mjs on SQL dump → work/parsed-taxijoker.json
4. Inspect Elementor data from parsed JSON to understand page sections
5. Run sync-media.mjs → copies uploads into public/media/ (skips WP thumbnails)
6. Build static Next.js site using extracted content and media
7. Deploy to staging on Hostinger
8. Client review → DNS cutover

## Commands (run from harmony-migration-tools/)
```bash
# Step 2 — parse dump
node scripts/parse-wp-dump.mjs \
  --dump=../taxijoker/sources/u244938166_yttssh.sql \
  --out=./work/parsed-taxijoker.json

# Step 3 — sync media
node scripts/sync-media.mjs \
  --uploads=../taxijoker/sources/public_html/wp-content/uploads \
  --media=../taxijoker/web/public/media
```

## Template source
- Base: `/home/colden/projects/business/harmony-template-base/`
- Stack: Next.js 15, TypeScript, Tailwind v4, next-intl (HR+EN enabled), ESLint 9
- Deploy: Hostinger shared hosting, hPanel Node.js entry point = `standalone/web/server.js`
- Build: `npm run build` → `scripts/prepare-standalone.mjs` → `standalone/web/`

## Paths
- Project root: `/home/colden/projects/business/taxijoker/`
- Migration tools: `/home/colden/projects/business/harmony-migration-tools/`
- Template: `/home/colden/projects/business/harmony-template-base/`
- Plan: `/home/colden/.claude/plans/curious-launching-sundae.md`
- Sites tracker: `/home/colden/projects/business/harmony-migration-tools/sites.md`

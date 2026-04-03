# harmony-template-base

Category 1 template — static brochure site. Next.js 16 App Router + next-intl + Tailwind v4. Deployed on Hostinger Node.js hosting via standalone output.

## Stack

- **Framework:** Next.js 16 (App Router, standalone output)
- **i18n:** next-intl — configure locales in `i18n/routing.ts`
- **Styling:** Tailwind CSS v4 — customize CSS variables in `app/globals.css`
- **Fonts:** Inter (Google Fonts) — swap in `app/[locale]/layout.tsx`
- **Deploy:** Hostinger Node.js hosting; root `npm start` launches standalone server

## Customizing for a client

1. **Site config** → `lib/site.ts` — name, URL, phone, email, social links
2. **Locales** → `i18n/routing.ts` — set `locales` and `localePrefix`
3. **Translations** → `messages/hr.json` and `messages/en.json`
4. **Colors** → CSS variables in `app/globals.css`
5. **Nav links** → `components/Header.tsx`
6. **Pages** → add under `app/[locale]/`

## Single-language site (HR only)

In `i18n/routing.ts`:
```ts
locales: ['hr'],
defaultLocale: 'hr',
localePrefix: 'never',
```

Delete `messages/en.json`.

## Commands

```bash
npm run dev      # local dev server
npm run build    # build + prepare standalone bundle
npm start        # starts standalone server via root launcher
npm run lint     # ESLint
```

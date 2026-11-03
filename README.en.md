# Bruno Costa | Portfolio

> **Português:** [README.md](./README.md) (full documentation)

Personal site of **Bruno Vinicius Isaac Costa**, front-end developer (Angular & React). A fast,
accessible single page with an about section, skills and a filterable showcase of my open source
projects, each one linking to its source code and its live demo. This repository is also the
**deployment aggregator**: it publishes the portfolio and all 11 apps in a single Cloudflare Worker.

**Live demo:** https://portfolio.brunoisaac.dev/

![Portfolio home page with hero, language switcher and theme toggle](./docs/screenshot.png)

## Highlights

- Sections: hero, about, skills, projects (filter: All / Angular / React) and contact.
- **Bilingual (pt-BR / EN)**: initial language = saved choice > browser language (`pt*` → pt-BR,
  otherwise en) > pt-BR; flag switcher (Brazil / USA, inline SVG) in the header; `<html lang>`, page title and meta description
  follow the active language. Project cards show a "PT-BR / EN" badge with small flags.
- Light/dark theme (OS preference on first visit, then remembered), applied before first paint.
- Project cards with tech badges, "Code"/"Demo" links and a screenshot loaded from each repo's
  `docs/screenshot.png`, with a skeleton while loading and a branded fallback when it is missing.
- Accessibility: skip link, semantic landmarks, visible focus, `aria-pressed` toggles, `role="status"`
  announcements, AA contrast in both themes, `prefers-reduced-motion` support.
- SEO: meta description, canonical, Open Graph/Twitter card image, JSON-LD, sitemap and robots.txt.

## Stack

React 19.3 · TypeScript 6.0 (strict) · Vite 8.3 · CSS Modules + design tokens · Motion 14 (LazyMotion) ·
Vitest 5 + Testing Library · ESLint 10 + typescript-eslint 8 · Prettier 3 · GitHub Actions · Cloudflare Workers (static assets).

## Internationalization in short

Typed dictionaries in `src/core/i18n/translations.ts`: pt-BR defines the `Dictionary` type and English
must match it exactly, so a missing key is a compile error. Data content uses `Localized<string>`.
No i18n library is needed for ~80 strings, which keeps the bundle small. To add a language, extend
`LANGUAGES`/`LANGUAGE_LABELS`, add a dictionary and fill the `Localized` fields, the compiler lists
everything that is missing.

## Deploy

Published on **Cloudflare (Workers static assets)** at https://portfolio.brunoisaac.dev/ as a single
deployment: the portfolio at `/` and every app from `apps.json` at `/<repo>/`.

- `scripts/assemble.mjs` builds `site/`: the portfolio at the root, each app's `out` in
  `site/<repo>/`, plus a `_headers` file with security headers and immutable caching for hashed assets.
- Existing files are served straight from the asset layer; misses reach `worker/index.ts`, whose pure,
  unit-tested rules (`worker/routing.ts`) answer: `/<app>` gets a 301 to `/<app>/`; a missing file gets
  a plain 404; a deep route gets the app's `index.html` (200), or the Next.js store's own `404.html`
  (404); anything else gets the portfolio's `404.html` (404).
- `.github/workflows/deploy.yml` runs on push to `main`, manually, on `repository_dispatch`
  (`app-updated`) and daily: a matrix builds every app from its public repo, the portfolio is tested
  and built, and the deploy job (only if everything built) assembles `site/` and runs
  `npx wrangler@4 deploy`.
- Secrets: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` (an account token from the
  **Edit Cloudflare Workers** template, scoped to the account and the `brunoisaac.dev` zone; minimum:
  Account > Workers Scripts > Edit, Zone > Workers Routes > Edit, Account > Account Settings > Read).
- Adding an app: give it a `build:cf` script with base `/<repo>/`, add it to `apps.json` and to
  `assets.run_worker_first` in `wrangler.jsonc` (a test keeps both in sync), then add its card.
- An app can trigger a redeploy with
  `gh api repos/BrunoICosta/portfolio/dispatches -f event_type=app-updated` (fine-grained PAT with
  Contents: Read and write on `portfolio`).
- Local check: `node scripts/assemble.mjs --only <app>,<app>` then `npx wrangler@4 dev`.

## Running locally

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # Vitest
npm run lint
npm run build   # type-check + production build
```

## Author

**Bruno Vinicius Isaac Costa** · https://github.com/BrunoICosta · [LinkedIn](https://www.linkedin.com/in/bruno-vin%C3%ADcius-isaac-costa-a90758156/) · brunoisaacosta@hotmail.com

License: [MIT](./LICENSE)

# Getting Started

Fan-made donation tracker for CDawgVA Cyclethon, built with Next.js 15 and React 19.

---

## Prerequisites

- **Node.js** — version is pinned in `.tool-versions` at the project root. Install via [nodejs.org](https://nodejs.org) or a version manager like `nvm`.
- **npm** — bundled with Node.js.

Check your versions:

```bash
node --version
npm --version
```

---

## Running the project

```bash
# Install dependencies (only needed once, or after package.json changes)
npm install

# Start the local development server
npm run dev
```

Open `http://localhost:3000`. Next.js hot-reloads on file save.

### All commands

```bash
npm run dev             # local development server
npm run build           # production build
npm run start           # serve the production build locally
npm run typecheck       # check TypeScript types without building
npm run typecheck:cy    # check Cypress TypeScript types
npm run lint            # report ESLint issues
npm run lint:fix        # auto-fix ESLint issues
npm run format          # auto-format all files with Prettier
npm run format:check    # check formatting without writing
npm run check           # format + lint:fix + typecheck + typecheck:cy (run before committing)
npm run cy:open         # open Cypress Test Runner
npm run cy:run          # run Cypress tests
npm run cy:run:headless # run Cypress tests headless
npm run snapshot        # full-page screenshots of every route, archived to snapshots/<timestamp>/
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the required values before running locally.

---

## Tech stack

### Next.js 15 (App Router)

Next.js is the React framework. The App Router uses React Server Components by default — pages render on the server and ship zero JavaScript unless you opt in with `'use client'`.

### React 19

Standard hooks (`useState`, `useEffect`, `useRef`) plus the new concurrent features. Server-Sent Events are consumed via custom hooks in `src/hooks/`.

### TypeScript

Configured with `strict: true`, `noUnusedLocals`, and `noUnusedParameters` for maximum signal-to-noise.

### Chakra UI v3

Component and colour-mode system. Theme is defined in `src/lib/theme.ts`. Colour mode is powered by `next-themes` via the custom snippet in `src/components/ui/color-mode.tsx` (not imported from `@chakra-ui/react` directly).

### Recharts

Used for donation charts (`DailyDonationsChart`, `DonationActivityChart`, `DonationBarChart`, `EditionsByRaiseChart`).

### Vercel

Deployed to Vercel. Push to `main` triggers a production deploy automatically.

### Cypress

End-to-end tests live in `cypress/`. Visual regression uses `cypress-image-diff-js`.

### Playwright

Used only for `npm run snapshot`. Not wired into the test suite — just a Node script (`scripts/snapshot.js`) that launches Chromium, visits every route, and saves full-page PNGs to `snapshots/<timestamp>/`.

---

## Project structure

```
src/
  app/                          # Next.js App Router
    2026/                       # This edition's real implementation of every route
      layout.tsx                # This year's own Header/Footer (nav links point at /2026/...)
      about/
      about-cyclethon/
      donations/
        live/
        search/
        top/
      en/                       # Locale entry point
      ja/                       # Locale entry point
      finish-line/
      journey/
        [day]/
      stats/
        donation-war/
      page.tsx                  # Homepage
    about/                      # Redirects to /${year}/about
    about-cyclethon/            # Redirects to /${year}/about-cyclethon
    api/
      donations/stream/         # SSE route for live donations
      webhooks/tiltify/         # Tiltify webhook receiver
    donations/                  # Redirects to /${year}/donations/search
      live/                     # Redirects to /${year}/donations/live
      search/                   # Redirects to /${year}/donations/search
      top/                      # Redirects to /${year}/donations/top
    en/                         # Redirects to /${year}/en
    finish-line/                # Redirects to /${year}/finish-line
    ja/                         # Redirects to /${year}/ja
    journey/                    # Redirects to /${year}/journey
      [day]/                    # Redirects to /${year}/journey/[day]
    stats/
      donation-war/             # Redirects to /${year}/stats/donation-war (query preserved)
    globals.css
    layout.tsx                  # Root layout: fonts, metadata, providers (no Header/Footer — each year's own layout supplies those)
    page.tsx                    # Redirects to /${year}
  components/
    journey/                    # Journey-specific components
    ui/
      color-mode.tsx            # Chakra colour-mode snippet (uses next-themes)
    ...                         # Shared UI components
  contexts/
    DonationsContext.tsx        # Donations state shared across the app
  hooks/                        # Custom React hooks
  lib/                          # Pure utilities, data, and type definitions
    types.ts
    constants.ts
    editions.ts                 # Registry of Cyclethon years, live flag, template tier
    theme.ts
    journey-data.ts             # Static per-day journey data
    donations-emitter.ts        # In-memory SSE event emitter
    ...
  messages/
    en.json                     # English UI strings
    ja.json                     # Japanese UI strings
  providers/
    AppearanceProvider.tsx
    ChakraProvider.tsx
    EditionProvider.tsx        # Which year a component renders under (scoped per year, not root)
    LocaleProvider.tsx
    TimezoneProvider.tsx
cypress/                        # E2E tests
docs/                           # Documentation
public/
  images/
    2026/                        # This edition's photos/avatars — future years get their own subfolder
scripts/
  snapshot.js                   # Playwright snapshot script (npm run snapshot)
```

---

## Code quality

Three tools enforce consistent code style:

- **Prettier** — formatting (indentation, quotes, line length). Config in `.prettierrc`.
- **ESLint** — bugs and style rules (import ordering, unused vars, type import style). Config in `eslint.config.mjs`.
- **TypeScript** — type checking. Config in `tsconfig.json`.

`npm run check` runs all three (plus Cypress typecheck). A clean `check` is the bar to clear before committing.

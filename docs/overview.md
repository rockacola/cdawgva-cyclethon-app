# Architecture Overview

## Purpose

Fan-made donation tracker for CDawgVA Cyclethon — a charity cycling event that raises money via Tiltify. The app shows live donation feeds, per-day journey logs, leaderboards, and campaign stats. It is bilingual (English and Japanese).

---

## Routes

| Route                   | Component                               | Notes                                        |
| ----------------------- | --------------------------------------- | -------------------------------------------- |
| `/`                     | `src/app/page.tsx`                      | Homepage — hero, cause, body sections        |
| `/en`                   | `src/app/en/page.tsx`                   | English locale entry point                   |
| `/ja`                   | `src/app/ja/page.tsx`                   | Japanese locale entry point                  |
| `/jp`                   | `src/app/jp/page.tsx`                   | Japanese locale alias                        |
| `/about`                | `src/app/about/page.tsx`                | About the tracker                            |
| `/about-cyclethon`      | `src/app/about-cyclethon/page.tsx`      | About the Cyclethon event                    |
| `/donations`            | `src/app/donations/page.tsx`            | Donation feed with layout wrapper            |
| `/donations/live`       | `src/app/donations/live/page.tsx`       | Real-time live donation feed                 |
| `/donations/search`     | `src/app/donations/search/page.tsx`     | Donation search                              |
| `/donations/top`        | `src/app/donations/top/page.tsx`        | Top donors leaderboard                       |
| `/journey`              | `src/app/journey/page.tsx`              | Journey overview with layout wrapper         |
| `/journey/[day]`        | `src/app/journey/[day]/page.tsx`        | Per-day log: map, stats, donations, guests   |
| `/finish-line`          | `src/app/finish-line/page.tsx`          | Post-event finish line page                  |
| `/stats/donation-war`   | `src/app/stats/donation-war/page.tsx`   | Donation war stats with layout wrapper       |
| `/api/donations/stream` | `src/app/api/donations/stream/route.ts` | Server-Sent Events stream for live donations |
| `/api/webhooks/tiltify` | `src/app/api/webhooks/tiltify/route.ts` | Tiltify webhook receiver                     |

---

## Data flow

1. **Tiltify webhook** (`/api/webhooks/tiltify`) receives donation events and pushes them to an in-memory emitter (`src/lib/donations-emitter.ts`).
2. **SSE stream** (`/api/donations/stream`) fans out those events to connected clients.
3. **Client hooks** (`useDonationsPolling`, `useDailyTotals`, `useCampaignFactPoll`) subscribe to the stream or poll Cloudflare R2 for aggregated stats.
4. **R2 stats file** (`donations-stats.json`) is a pre-aggregated JSON blob; see `docs/donations-stats-schema.md` for its schema.

---

## Provider tree

The root layout wraps the app in four providers (innermost first):

- `TimezoneProvider` — selected timezone preference
- `LocaleProvider` — selected display language (en/ja)
- `AppearanceProvider` — colour mode and display settings
- `ChakraProvider` — Chakra UI theming (wraps everything)

---

## Styling

Chakra UI v3 (with `next-themes`) provides the component and colour-mode system. Design tokens are defined in `src/lib/theme.ts`. Fonts (`Playfair Display`, `JetBrains Mono`) are loaded via `next/font/google` in the root layout.

---

## i18n

Two JSON message files live in `src/messages/` (`en.json`, `ja.json`). The `useTranslations` hook (`src/hooks/useTranslations.ts`) reads the active locale from `LocaleProvider` and returns the matching strings. No external i18n library is used.

---

## Deployment

Deployed to Vercel. `APP_VERSION` is injected at build time from `package.json` via `next.config.ts`. YouTube thumbnails are proxied through `img.youtube.com`.

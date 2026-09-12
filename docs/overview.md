# Architecture Overview

## Purpose

Fan-made donation tracker for CDawgVA Cyclethon — a charity cycling event that raises money via Tiltify. The app shows live donation feeds, per-day journey logs, leaderboards, and campaign stats. It is bilingual (English and Japanese).

---

## Routes

Every route's real implementation lives under `/${year}/...`. The unprefixed paths below are thin redirects to whichever year `editions.ts` marks `isLive` — they exist so `/journey`, `/donations/live`, etc. keep working as stable, year-independent links, but they hold no content of their own.

| Route                      | Component                                  | Notes                                                               |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| `/`                        | `src/app/page.tsx`                         | Redirects to `/${year}`                                             |
| `/en`                      | `src/app/en/page.tsx`                      | Redirects to `/${year}/en`                                          |
| `/ja`                      | `src/app/ja/page.tsx`                      | Redirects to `/${year}/ja`                                          |
| `/about`                   | `src/app/about/page.tsx`                   | Redirects to `/${year}/about`                                       |
| `/about-cyclethon`         | `src/app/about-cyclethon/page.tsx`         | Redirects to `/${year}/about-cyclethon`                             |
| `/donations`               | `src/app/donations/page.tsx`               | Redirects to `/${year}/donations/search`                            |
| `/donations/live`          | `src/app/donations/live/page.tsx`          | Redirects to `/${year}/donations/live`                              |
| `/donations/search`        | `src/app/donations/search/page.tsx`        | Redirects to `/${year}/donations/search`                            |
| `/donations/top`           | `src/app/donations/top/page.tsx`           | Redirects to `/${year}/donations/top`                               |
| `/journey`                 | `src/app/journey/page.tsx`                 | Redirects to `/${year}/journey`                                     |
| `/journey/[day]`           | `src/app/journey/[day]/page.tsx`           | Redirects to `/${year}/journey/[day]`                               |
| `/finish-line`             | `src/app/finish-line/page.tsx`             | Redirects to `/${year}/finish-line`                                 |
| `/stats/donation-war`      | `src/app/stats/donation-war/page.tsx`      | Redirects to `/${year}/stats/donation-war`, preserving query params |
| `/2026`                    | `src/app/2026/page.tsx`                    | Homepage — hero, cause, body sections                               |
| `/2026/ja`, `/2026/en`     | `src/app/2026/{ja,en}/page.tsx`            | Locale entry points                                                 |
| `/2026/about`              | `src/app/2026/about/page.tsx`              | About the tracker                                                   |
| `/2026/about-cyclethon`    | `src/app/2026/about-cyclethon/page.tsx`    | About the Cyclethon event                                           |
| `/2026/finish-line`        | `src/app/2026/finish-line/page.tsx`        | Post-event finish line page                                         |
| `/2026/donations`          | `src/app/2026/donations/page.tsx`          | Redirects to `/2026/donations/search`                               |
| `/2026/donations/live`     | `src/app/2026/donations/live/page.tsx`     | Real-time live donation feed                                        |
| `/2026/donations/search`   | `src/app/2026/donations/search/page.tsx`   | Donation search                                                     |
| `/2026/donations/top`      | `src/app/2026/donations/top/page.tsx`      | Top donors leaderboard                                              |
| `/2026/journey`            | `src/app/2026/journey/page.tsx`            | Journey overview with layout wrapper                                |
| `/2026/journey/[day]`      | `src/app/2026/journey/[day]/page.tsx`      | Per-day log: map, stats, donations, guests                          |
| `/2026/stats/donation-war` | `src/app/2026/stats/donation-war/page.tsx` | Donation war stats with layout wrapper                              |
| `/api/donations/stream`    | `src/app/api/donations/stream/route.ts`    | Server-Sent Events stream for live donations                        |
| `/api/webhooks/tiltify`    | `src/app/api/webhooks/tiltify/route.ts`    | Tiltify webhook receiver                                            |

Right now `/2026/...` fetches the same live R2/Tiltify data as any current year's pages would — nothing is frozen yet. When 2026's campaign ends (see `docs/adr/0001-year-scoped-editions.md`, Phase 3), its data-fetching switches to a frozen snapshot and `isLive` flips to `false`; only then does `/2026/...` become a true archive, and a future year (e.g. 2027) takes over the unprefixed redirects.

---

## Data flow

1. **Tiltify webhook** (`/api/webhooks/tiltify`) receives donation events and pushes them to an in-memory emitter (`src/lib/donations-emitter.ts`).
2. **SSE stream** (`/api/donations/stream`) fans out those events to connected clients.
3. **Client hooks** (`useDonationsPolling`, `useDailyTotals`, `useCampaignFactPoll`) subscribe to the stream or poll Cloudflare R2 for aggregated stats.
4. **R2 stats file** (`donations-stats.json`) is a pre-aggregated JSON blob; see `docs/donations-stats-schema.md` for its schema.

---

## Editions

`src/lib/editions.ts` is the registry of which Cyclethon years exist, which one is currently live, and each one's day count and template tier. Every route's real implementation lives at `/${year}/...` (see the Routes table above); the unprefixed paths are redirects to whichever year is live, read from this registry rather than hardcoded, so promoting a new year to live is a one-line change here. `DonationsProvider` (`src/contexts/DonationsContext.tsx`) takes an optional `sourceUrl` (default: the live R2 URL) so a year's layout can later be pointed at that year's frozen snapshot once it's archived — see `docs/adr/0001-year-scoped-editions.md`.

`Header` and `Footer` belong to a year, not to the whole app: `src/app/2026/layout.tsx` wraps its children in `<EditionProvider year={2026}>` (`src/providers/EditionProvider.tsx`) and renders `<Header />` / `<Footer />` inside it. Any component under that provider — `Header`, `Footer`, `DayNav`, and content components like `LatestDonations` and `JourneyPageContent` that link to other routes — reads the year via `useEditionContext()` instead of hardcoding a path or threading a prop, so every internal link inside `/2026/...` points straight at `/2026/...` routes rather than through the unprefixed redirects, and the Donate CTA reflects that year's own `isLive` state. The root layout (`src/app/layout.tsx`) no longer renders `Header`/`Footer` at all — there is currently no page that renders directly under it without either living under a year (which supplies its own chrome and edition context) or being a redirect (which renders no body). `Header`/`Footer` stay one shared, parameterized component for now rather than a literal fork per year; refork them only once a year's nav actually needs to diverge in shape, not just in target year.

---

## Provider tree

The root layout wraps the app in four providers (innermost first):

- `TimezoneProvider` — selected timezone preference
- `LocaleProvider` — selected display language (en/ja)
- `AppearanceProvider` — colour mode and display settings
- `ChakraProvider` — Chakra UI theming (wraps everything)

`EditionProvider` is not one of these — it's scoped inside each year's own layout (`src/app/2026/layout.tsx`), not the root, since which year a component belongs to is a property of where it's rendered, not a global app setting. See Editions, above.

---

## Styling

Chakra UI v3 (with `next-themes`) provides the component and colour-mode system. Design tokens are defined in `src/lib/theme.ts`. Fonts (`Playfair Display`, `JetBrains Mono`) are loaded via `next/font/google` in the root layout.

---

## i18n

Two JSON message files live in `src/messages/` (`en.json`, `ja.json`). The `useTranslations` hook (`src/hooks/useTranslations.ts`) reads the active locale from `LocaleProvider` and returns the matching strings. No external i18n library is used.

---

## Deployment

Deployed to Vercel. `APP_VERSION` is injected at build time from `package.json` via `next.config.ts`. YouTube thumbnails are proxied through `img.youtube.com`.

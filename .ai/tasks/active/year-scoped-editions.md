---
status: active
created: '2026-09-12'
updated: '2026-09-12'
---

# Task: Year-scoped editions (wrap up 2026, prep 2027)

## Goal

Wrap up Cyclethon 5 (2026) as an archived edition and generalize the app so a
new edition (Cyclethon 6, 2027) can go live without a rewrite, and future
years can be added the same way.

## Context

Today only the current live edition has full detail pages (live feed,
journey days, top donors, donation wars). The year and edition number are
hardcoded in roughly ten files. Cyclethon 1-4 exist only as static totals
arrays feeding the comparison chart on `/about-cyclethon` — there is no
existing pattern in this repo for a full archived edition, so this is new
architecture and needs an ADR under `docs/adr/`.

Editions are not visually interchangeable. 2022-2025 will most likely share
one lighter, stats-only template (heavier on Tiltify API numbers, light on
narrative content). 2026 has today's full template (live feed, journey days,
top donors, donation wars). 2027 is expected to cover more than 2026, shape
not yet known. The architecture must not assume one universal template
parameterized by year — it needs to support distinct template tiers per
edition, and must not let future template changes retroactively reskin a
year that's already archived.

## Decisions made

- Scope: build the full archive experience for 2026 only, this task.
  2022-2025 stay aggregate-only in the comparison chart for now — the
  architecture should not block adding a shared lightweight template for
  them later, but building it is a separate, later task.
- **Full encapsulation: every route's real implementation lives under
  `/${year}/...`, with exactly one copy per route per year.** There is no
  separate "live" tree and "archived" tree for the same year existing at
  once. Unprefixed routes (`/`, `/journey`, `/donations/*`, `/about`,
  `/about-cyclethon`, `/finish-line`, `/stats/donation-war`, locale entries)
  are thin redirects to whichever year the registry marks `isLive`, reading
  the target from `editions.ts` rather than a hardcoded year. This
  superseded an earlier, narrower version of this task that only forked
  home/journey/donations-search/donations-top/stats and left `/about`,
  `/about-cyclethon`, `/finish-line`, and `/donations/live` living only at
  the unprefixed path — the operator caught that inconsistency and asked
  for it to be generalized.
- **A year's data source follows its own `isLive` state, not a fixed
  live/frozen split baked in at build time.** While a year is live, its
  `/${year}/...` pages fetch the exact same live R2/Tiltify data any current
  year would — no frozen fetchers, no "concluded" framing. Only at that
  year's freeze time does its data-fetching get updated in place to read a
  frozen snapshot. This corrects an earlier version of Phase 2 that had
  `/2026/...` unconditionally pointed at a frozen R2 path that didn't exist
  yet, which the operator flagged (they wanted `/2026/donations/live`
  working with real data, since 2026 isn't actually concluded).
- Frozen data storage (for when a year's freeze actually happens): per-year
  path in the same Cloudflare R2 bucket (e.g. `2026/donations-full.json`),
  populated by a one-time copy at freeze time, not an ongoing change to
  whatever writes the live bucket root.
- Presentation: each year's route/component tree is its own fork, built
  fresh (or copied and adjusted) when that year goes live — not a shared
  parameterization across years — so a future redesign for 2027 can't
  retroactively change how 2026 looks once it's archived. A shared
  parameterized template is the right call specifically for 2022-2025,
  since those four are confirmed to share one lighter design; that's a
  property of those four years, not a default every year inherits.
- Year comes before locale in the path (`/2026/ja`, not `/ja/2026`) because
  locale here is a client-side preference with only a couple of entry
  pages, not a routed dimension every page needs to mirror.
- The "Donate Now" CTA (Header/Footer) is hidden only once a path's edition
  is both year-prefixed _and_ actually `isLive: false` — not for every
  year-prefixed path unconditionally. While 2026 is live, `/2026/...` shows
  the CTA exactly like the unprefixed routes used to.

## Phases

### Phase 1 — Foundation (no visible behavior change) — done 2026-09-12

- [x] Add `src/lib/editions.ts`: registry of `{ year, editionNumber, isLive, templateTier, tiltifyUrl, dayCount }`, one entry per Cyclethon. `templateTier` exists so future years can share a tier (like the planned 2022-2025 legacy tier) without forcing every year into it. `tiltifyUrl` left unset for 2022-2025 since the `cyclethon-{n}` slug pattern isn't confirmed for those campaigns — only 2026's (already used in `MAIN_DONATION_URL`) is populated.
- [x] Add year-prefixed R2 URL builders in `constants.ts` (`getArchivedDonationsUrl`, `getArchivedDonationsFullUrl`, `getArchivedDonationsStatsUrl`) as new, additive functions — existing unprefixed constants untouched. (Not consumed by any page yet — see Phase 3; these are for the actual freeze, not for a year that's still live.)
- [x] Write `docs/adr/0001-year-scoped-editions.md`.

### Phase 2 — Full encapsulation under `/2026/*`, unprefixed routes redirect — done 2026-09-12

First pass (superseded within this phase, see Decisions made): forked only home/journey/donations-search/donations-top/stats-donation-war into `/2026/...` pointed at a frozen R2 path that doesn't exist yet, with `/about`, `/about-cyclethon`, `/finish-line`, `/donations/live` left unmigrated. Corrected after operator review to the following:

- [x] Every route now has its real implementation under `src/app/2026/...`: `page.tsx` (home), `about/`, `about-cyclethon/`, `finish-line/`, `donations/{live,search,top}/` (+ layout), `journey/` (+ `[day]/`, + layout), `stats/donation-war/` (+ layout), `ja/`, `en/`. All of them use the same live data-fetching functions (`getDonations`, `getDonationsFull`, `getStats`, `getCampaignFact`) as the old unprefixed pages did — no frozen/archived fetchers involved while 2026 is live. Deleted the `src/app/2026/_lib/` frozen-fetcher module from the first pass since it's not needed yet.
- [x] Every formerly-real unprefixed route is now a thin redirect to `/${CURRENT_EDITION.year}/...`: `/`, `/en`, `/ja`, `/about`, `/about-cyclethon`, `/finish-line`, `/donations`, `/donations/live`, `/donations/search`, `/donations/top`, `/journey`, `/journey/[day]` (forwards the `day` param), `/stats/donation-war` (forwards query params via `searchParams`, since it's read by the donation-war content for filtering). Deleted `journey/layout.tsx`, `donations/layout.tsx`, `stats/layout.tsx` at the unprefixed level — no longer needed since those routes never render content directly anymore.
- [x] `Header`/`Footer` CTA-hiding logic keys off `pathEdition !== undefined && !pathEdition.isLive` (an edition, and it's actually archived) — not "any year-prefixed path," which had been the initial (wrong) implementation.
- [x] Removed the "View the 2026 archive" link from `AboutCyclethonContent` and the `siteLinkArchive2026` footer link, and their translation keys — both were built for the abandoned "separate archive tree" model and are now redundant (every unprefixed link already lands on `/2026/...` via redirect). Revisit once 2026 is a true past edition and a "previous edition" link is meaningful again.
- [x] `ArchivedEditionBanner` component and its `archive.*` translation keys are still built and unused, per the operator's earlier "not yet" call — not wired into any page. Re-add once a year is actually archived.
- [x] Removed `/jp` (`src/app/jp/page.tsx`) entirely (standalone cleanup before this phase, commit `19d2923`).

**Verification:** `npm run check` (format, lint, typecheck, Cypress typecheck) and `npm run build` all pass. Curl-verified against the dev server: every unprefixed route 307s to its `/2026/...` equivalent (including day-param and query-string forwarding), `/2026/donations/live` renders real live data (~5 MB response, matching the old `/donations/live`), the homepage shows real content (not an empty archive state), and the Donate CTA is present on `/2026/...` (correct, since 2026 is still live) and would only disappear once `isLive` is flipped.

**Follow-up within this phase, 2026-09-13 — Header/Footer belong to a year:**

- [x] Operator flagged that Header/Footer nav still linked through the unprefixed redirects (`/journey` instead of `/2026/journey`) while browsing `/2026/...`, and that Header/Footer are conceptually "2026 specific, not shared app-wide chrome."
- [x] Added `src/app/2026/layout.tsx`, wrapping its children in `<EditionProvider year={2026}>` (new: `src/providers/EditionProvider.tsx`) and rendering `<Header />` / `<Footer />` inside it. Removed `Header`/`Footer` from the root layout entirely — there's no page that renders body content directly under the root anymore.
- [x] `Header`/`Footer` read their year via `useEditionContext()` instead of a prop or sniffing `usePathname()` via the now-removed `getEditionFromPath`. Nav hrefs and the Donate-CTA/`isLive` check come from that. One shared, parameterized component for now, not a literal fork per year — see the ADR's "Chrome ownership" decision for why.
- [x] Went further than Header/Footer once the pattern was clear it'd recur: `DayNav` (the journey day sidebar — operator's actual original report, "the sidebar links don't have /2026 prefix"), `LatestDonations`'s "view all donations" link, and `JourneyPageContent`'s finish-line link all switched to `useEditionContext()` too, replacing hardcoded unprefixed paths. Swept the rest of `src/components` for the same pattern (`grep` for hardcoded `href="/about|journey|donations|finish-line|stats..."`) — nothing else found, but this wasn't exhaustive; fix opportunistically if more turn up.
- [x] `/about-cyclethon`'s and `/about`'s nav hrefs still point at `/2026/about-cyclethon` / `/2026/about` (their current real location) rather than an imagined future unprefixed location, per the operator's heads-up below — change these when the pages actually move, not before.
- Operator gave two pieces of forward context, not acted on this turn: (1) a year selector is wanted "later on" to switch between editions — `EditionProvider`/`useEditionContext()` is a step toward that, the selector control itself is not built; (2) `/about` and `/about-cyclethon` are expected to become year-agnostic pages eventually, unlike journey/donations/finish-line which are genuinely per-edition — noted in the ADR as a known gap, not resolved.

### Phase 3 — Freeze 2026

- [ ] Decide and record the freeze trigger (e.g. N days after the Tiltify campaign closes, to allow for late refunds/chargebacks to settle).
- [ ] One-time copy: snapshot the final `donations-full.json`, `donations-stats.json`, and latest-100 file from the bucket root into a `2026/` prefix in the same R2 bucket. Manual/admin action, not a pipeline code change.
- [ ] Update `/2026/...`'s data-fetching in place to read the frozen R2 paths (`getArchivedDonationsUrl`/`Full`/`Stats` from `constants.ts`) instead of the live ones — likely means passing `sourceUrl={getArchivedDonationsFullUrl(2026)}` to each `DonationsProvider` and swapping `getDonations`/`getDonationsFull`/`getStats`/`getCampaignFact` calls in `/2026/page.tsx`, `/2026/donations/live/page.tsx`, and the three layouts. Consider whether `/2026/donations/live` should be removed or replaced with a static replay once there's no live data left to show.
- [ ] Flip `isLive: false` for 2026 in the registry once the copy is confirmed. At that point the Donate CTA and (once re-added) `ArchivedEditionBanner` start reflecting "archived" correctly, and whichever year is next in the registry with `isLive: true` takes over the unprefixed redirects.
- [ ] Convert `cyclethonHistory.ts`'s Cyclethon 5 entry from the dynamic `buildCyclethon5Totals()` to a frozen static array, matching editions 1-4.
- [ ] Re-add the "view previous edition" link (`AboutCyclethonContent`, footer) now that it's meaningful again.
- [ ] Re-add `ArchivedEditionBanner` to `/2026/...`'s pages.

### Phase 4 — Ready for 2027

- [ ] Document the "new edition" checklist in `getting-started.md`: add a registry entry with `isLive: true` (and flip 2026's off if Phase 3 hasn't already), build `src/app/2027/...` as its own fork (copied from 2026 and adjusted, per the Presentation decision above), add `journey-data/2027.ts` (or equivalent, once 2027's scope is known), update `MAIN_DONATION_URL`, add a `cyclethonHistory.ts` series, rotate `TILTIFY_WEBHOOK_SIGNING_ID` for the new campaign.
- [ ] Replace remaining hardcoded "2026"/"Cyclethon 5" strings (layout metadata, hero, progress components, translations) with reads from the registry, for whatever stays shared across years.
- [ ] Do not pre-build 2027's "more than 2026" features now — scope unknown. This phase only ensures next year's build doesn't have to fight 2026-specific assumptions baked into shared code.

### Phase 5 — Docs, tests & journal

- [x] Update `docs/overview.md` routes table for the new `/2026/...` routes and the redirect-based unprefixed routes.
- [x] Update `docs/getting-started.md` structure tree.
- [ ] Add the new `/2026/...` routes to `scripts/snapshot.js`'s route list and to the Cypress visual-regression specs.
- [x] Journal entries per AGENTS.md.

## Open questions / risks

- Freeze trigger timing not yet decided (see Phase 3).
- A frozen archive can still go stale if Tiltify processes a refund/chargeback after the freeze copy is taken — no plan yet for handling that; likely just accepted as a known limitation unless it comes up.
- 2022-2025 shared legacy template is out of scope for this task; the editions registry's `templateTier` field is meant to leave room for it without rework, but that's not proven until it's actually built.
- 2027's "more than 2026" scope is unknown, so Phase 4 is deliberately light — revisit once that scope exists.
- Header/Footer/DayNav nav and the in-page links found so far now read their year from `EditionProvider` (fixed 2026-09-13). The audit for this wasn't exhaustive — other content components may still hardcode an unprefixed path; fix opportunistically when found.
- `/2026/donations/live`'s fate at freeze time (Phase 3) isn't decided yet — keep as a static replay, or remove entirely once there's nothing "live" left to show.
- `/about` and `/about-cyclethon` are expected to become year-agnostic pages later (operator's heads-up, 2026-09-13) — not acted on yet. Whenever that happens, it also needs an answer for what chrome they get, since chrome now lives inside each year's own `EditionProvider`+layout and there's no year-agnostic layout today.
- A year selector UI (switch editions from the nav) is wanted later — not built. `EditionProvider`/`useEditionContext()` is preparatory, not the selector itself.

## Next step

Start Phase 3 once the Tiltify campaign has actually concluded: decide the freeze trigger and run the one-time R2 copy for 2026.

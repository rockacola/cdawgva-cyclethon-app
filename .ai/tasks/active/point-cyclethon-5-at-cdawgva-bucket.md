---
status: active
created: '2026-10-10'
updated: '2026-10-10'
---

# Task: Point Cyclethon 5 at the new `cdawgva` R2 bucket

## Goal

Repoint this app's 2026 ("Cyclethon 5") data fetching, and the frozen-data step described in
`.ai/tasks/active/year-scoped-editions.md` Phase 3, at the new multi-event `cdawgva` R2 bucket that
the sibling pipeline repo (`cdawgva-cyclethon`) now writes to, instead of the single-bucket,
year-prefixed model that Phase 3 originally assumed. Flip `isLive: false` for 2026, since the
campaign has already concluded on the pipeline side.

## Context

This task exists because of a pipeline-side change made in the `cdawgva-cyclethon` repo on
2026-10-10, documented there in `.ai/tasks/completed/multi-event-r2-bucket-live-archive-split.md`
and `.ai/journal/2026/2026-10-10.md`. Summary of what changed, from that repo's perspective:

- There is now one shared Cloudflare R2 bucket, named `cdawgva`, meant to hold every CDawgVA
  donation event (past and future, Cyclethon or not), replacing the old single-event bucket this
  app currently reads via `NEXT_PUBLIC_R2_BASE_URL`.
- Every dataset in that bucket is prefixed by a canonical per-event key, not a year:
  `cyclethon-5/donations-full.json`, `cyclethon-5/donations-latest-100.json`,
  `cyclethon-5/donations-latest-500.json`, `cyclethon-5/donations-stats.json`, and
  `cyclethon-5/donations-YYYY-MM-DD.json` per completed day. The canonical keys for all five
  editions are `cyclethon-1` through `cyclethon-5`, defined in that repo's
  `scripts/lib/campaign.ts`. This is a different shape than `src/lib/constants.ts`'s existing
  `getArchivedDonationsUrl`/`getArchivedDonationsFullUrl`/`getArchivedDonationsStatsUrl` already
  assume (`${R2_BASE_URL}/${year}/...`), built for year-scoped-editions.md's "frozen data storage"
  decision.
- The "one-time copy" manual step year-scoped-editions.md Phase 3 describes (snapshot the final
  `donations-full.json`/`donations-stats.json`/latest-100 into a `2026/` prefix) is, in substance,
  already done, just not in the place or shape that plan assumed. The pipeline repo's
  `archive-event.ts` has run against the real Tiltify API for all five Cyclethons and uploaded full
  history, latest-100/500, stats, and daily snapshots into the `cdawgva` bucket under each event's
  own `cyclethon-N/` prefix. Verified by direct download: cyclethon-5 alone has 20,998 donations
  archived there.
- On the pipeline side, `CURRENT_LIVE_EVENT_KEY` is now `null` (no event currently live) and every
  event, cyclethon-5 included, is marked `status: 'archived'` in that repo's registry. The actual
  Tiltify event window was 2026-04-05 to 2026-04-19 JST. This app's own `src/lib/editions.ts` still
  has `editionNumber: 5, isLive: true` for year 2026, which is now stale relative to the pipeline's
  view. Correcting that is part of this task, and also satisfies year-scoped-editions.md Phase 3's
  own checklist item to flip `isLive: false` once the frozen copy is confirmed; it now is.
- This app reads R2 data as a plain public HTTP fetch, not via signed requests. There is no R2 SDK
  or credential anywhere in this app, only `NEXT_PUBLIC_R2_BASE_URL` pointing at a
  `pub-*.r2.dev` public-bucket URL (see `src/lib/constants.ts`, `getDonations.ts`,
  `getDonationsFull.ts`, `getStats.ts`, `getCampaignFact.ts`). Whether `cdawgva` has (or will get)
  the same kind of public read access is not known from the pipeline side, it's a Cloudflare
  dashboard setting, and is this task's main open question (see below) before any of the code
  changes below can actually work.
- FYI, not actionable here: cyclethon-1 through cyclethon-4 now also have full per-event donation
  history in the new bucket, not just the aggregate totals this app currently shows in the
  `/about-cyclethon` comparison chart. Relevant only if the legacy-stats tier work (explicitly out
  of scope per year-scoped-editions.md) is ever picked up.

## Decisions made

- `cdawgva` has public R2.dev access confirmed by the operator and verified by direct fetch
  (`cyclethon-5/donations-full.json` returns 20,998 donations; `donations-stats.json` returns the
  expected shape). `NEXT_PUBLIC_R2_BASE_URL` in `.env.local` was repointed to the new bucket's
  `pub-*.r2.dev` URL.
- One env var, not two: the operator confirmed every future edition will also live in `cdawgva`,
  so `NEXT_PUBLIC_R2_BASE_URL` was repointed in place rather than adding a second
  `NEXT_PUBLIC_R2_ARCHIVE_BASE_URL`. `getArchivedDonations*Url` helpers now take an `eventKey`
  rather than a `year`.
- `/2026/donations/live` stays, as a static replay: still fetches from the archived `eventKey` URLs
  (via a new `sourceUrl` prop threaded through `DonationLiveFeed`'s internal poll), the SSE
  connection to `/api/donations/stream` is left as-is (harmless no-op against the app's own API,
  not the pipeline).
- Added explicit `eventKey` field to `Edition` (not derived from `editionNumber`), matching the
  existing style of explicit per-edition facts (`tiltifyUrl`).

## Phases

### Phase 1: Repoint 2026 at the new bucket

- [x] Confirm whether the `cdawgva` bucket has public read access enabled (a `pub-*.r2.dev` URL or
      custom domain), the same way the current bucket is read today. Operator action in the
      Cloudflare dashboard, not a code change. Blocks everything else in this phase.
      Confirmed: `pub-498aa38069b3430fbd088f4e0b66376b.r2.dev`, verified by direct fetch.
- [x] ~~Add a second base URL env var~~ Repointed `NEXT_PUBLIC_R2_BASE_URL` in place instead, per
      operator decision (every future edition will also live in `cdawgva`). See Decisions made.
- [x] Add an `eventKey` field to each `Edition` in `src/lib/editions.ts` (`'cyclethon-5'` for 2026,
      `'cyclethon-1'` through `'cyclethon-4'` for 2022-2025), matching the canonical keys in the
      `cdawgva-cyclethon` repo's `scripts/lib/campaign.ts`.
- [x] Rewrite `getArchivedDonationsUrl`/`getArchivedDonationsFullUrl`/`getArchivedDonationsStatsUrl`
      in `src/lib/constants.ts` to build against `eventKey` (`${R2_BASE_URL}/${eventKey}/...`)
      instead of `${R2_BASE_URL}/${year}/...`.
- [x] Wire `/2026/...`'s data-fetching to the archived URLs: `getDonations`/`getDonationsFull`/
      `getStats`/`getCampaignFact` now take an optional `url` override, and `/2026/page.tsx`,
      `/2026/donations/live/page.tsx`, and the three layouts (`donations`, `stats`, `journey`) all
      pass the archived `eventKey` URL, including as `sourceUrl` into `DonationsProvider` and
      (newly) into `DonationLiveFeed`'s internal poll.
- [x] Flip `isLive: false` for the 2026 entry in `src/lib/editions.ts`.
- [x] `/2026/donations/live`'s fate: kept as a static replay per operator decision. See Decisions
      made.
- [x] Verify against the real `cdawgva` bucket: `/2026/donations/top` renders 20,998 donations,
      `npm run check` and `npm run build` both pass. Cypress visual-regression specs not run this
      session, see Next step.

## Open questions / risks

- Public access on `cdawgva` isn't confirmed. This is the core blocker: this app fetches R2 data as
  plain public HTTP, not via signed requests, and R2 credentials were never configured here and
  shouldn't need to be.
- Whether a future live edition (Cyclethon 6+) will also live under `cdawgva`'s per-event-prefix
  convention, or whether this app keeps reading live data from a separate bucket, isn't decided by
  this task. year-scoped-editions.md Phase 4 ("Ready for 2027") will need to account for whichever
  bucket the pipeline repo is actually writing the next live event to, at that time.
- This task only prepares 2026/cyclethon-5. It doesn't touch the unprefixed-route redirect logic,
  Header/Footer, or anything else from year-scoped-editions.md Phase 2, those are already done.
- If `cdawgva` turns out not to support public access the way the current bucket does, this app
  would need a server-side proxy (API route with R2 credentials) instead of a direct public fetch,
  a bigger change than this task currently scopes for.

## Next step

Phase 1 is implemented and verified against the live `cdawgva` bucket. Run the Cypress
visual-regression suite (not run this session) to confirm specs still pass or get updated for the
new data, then move this task to `.ai/tasks/completed/`.

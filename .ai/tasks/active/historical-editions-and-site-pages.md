---
status: active
created: '2026-10-11'
updated: '2026-10-11'
---

# Task: Historical edition pages, 2026 archive conversion, site pages, and the 2027 launch

## Goal

Build the 1-pager + daily journal pages for Cyclethon 1-4 (2022-2025), convert
2026 to that same archived format now that it's concluded, and add the pages
that don't belong to any single edition ("About Cyclethon", "About this
site", IDF / the cause). A final section below (Phases G-J) covers Cyclethon
6 (2027): an anticipation page and the full edition launch, blocked and
dormant until there's real 2027 content to build against, folded into this
file rather than kept as a second active-looking entry point.

## Context

Continues the architecture from `.ai/tasks/completed/year-scoped-editions.md`
(the `/${year}/...` route fork, the `editions.ts` registry, `templateTier`).
That task closed with three items still genuinely unfinished, all specifically
about presenting 2026 as an archived edition, carried into this task's
Phase C: converting `cyclethonHistory.ts`'s Cyclethon 5 entry to a static
array, re-adding the "view previous edition" link, and re-adding
`ArchivedEditionBanner`. A fourth leftover, replacing remaining hardcoded
"2026"/"Cyclethon 5" strings with registry reads, also carries into Phase C
since converting 2026's template forces that cleanup anyway.

This file used to be split into two tasks, this one and a separate
`2027-edition-launch.md`. Folded back together 2026-10-11 since having both
sit in `active/` made it unclear which one to actually start on; the 2027
work (Phases G-J, below) stays blocked and clearly separated rather than
interleaved with the active phases. It still depends on this task's
theme/structure axis split (Decisions made, below) landing in `editions.ts`
before its own theming work starts.

**Data verification, done 2026-10-11, see Phase A for the resulting
checklist.** Three places to check what's actually available:

- The R2 bucket itself (`$NEXT_PUBLIC_R2_BASE_URL/{eventKey}/...`), curl-
  verified: all five editions return `donations-full.json` and
  `donations-stats.json`. `cyclethon-1` also has per-day snapshot files on
  R2 (e.g. `donations-2022-08-28.json`).
- The pipeline repo's `docs/cdawgva-campaigns.md`: official Tiltify name,
  amount raised, goal, cause, published date, and URL per campaign. Confirms
  the cause behind every Cyclethon is the **Immune Deficiency Foundation**
  (that's what IDF stands for).
- The pipeline repo's `scripts/lib/campaign.ts`: canonical event
  keys/names/slugs, but its `liveWindow` (start/end date) field is only
  populated for the currently-live event, never for archived ones.

Net result: donation numbers (full ledger + aggregate stats) are confirmed
present for all five editions. Everything else a 1-pager or daily journal
needs, event date ranges, recap videos, route maps, news coverage, per-day
narrative, photos, is confirmed **not** present in either repo and has to be
sourced separately. See Phase A's checklist.

## Decisions made

- 2022-2025 each get one 1-pager edition page (event recap: timeline, amount
  raised, recap videos, map, news, etc.) plus one daily journal page per day
  of that edition, matching `dayCount` in `editions.ts`.
- 2026 moves to the same page _shape_ as 2022-2025 (1-pager + daily journal
  pages) now that the event has concluded, rather than keeping today's live
  interactive tree (`/2026/donations/live`, `/search`, `/top`,
  `/stats/donation-war`) indefinitely. `/2026/donations/live` specifically is
  dropped, not kept as a static replay.
- Non-edition-scoped pages: "About Cyclethon", "About this site", and
  something covering IDF / the cause itself. Whether the cause gets its own
  page or a section inside "About Cyclethon" is still open, see below.
- **`editions.ts`'s tier field splits into two independent axes**: structure
  (`legacy-stats` 1-pager/journal shape vs. `full-2026` live-interactive
  shape) and theme (per-edition, or shared). This resolves the tension
  flagged when this task was created: 2026 adopts 2022-2025's _structure_
  but keeps its own, already-built _theme_ rather than merging into
  theirs.
- Non-edition pages ("About Cyclethon", "About this site", IDF/cause) use
  the same shared legacy/site theme as 2022-2025, not a theme of their own.
- JA translation and any missing image assets are backfilled once content for
  a given page is actually finalized, not built bilingually/fully-asseted
  from the start.

## Phases

### Phase A — 2022-2025 edition 1-pagers

- [x] Verify what donation data exists per edition — done 2026-10-11 (see
      Context): full ledger + aggregate stats confirmed present for all four
      editions on R2.
- [ ] **Content inventory, per edition (2022-2025) — none of this is
      confirmed to exist anywhere yet, gather before designing the page:**
  - [ ] Event start/end date range (not recorded in either repo, see
        Context — needed before per-day journal pages can even be
        scaffolded, since it's the only way to map "day N" to a calendar
        date for the per-day snapshot files that do exist on R2).
  - [ ] Recap video link(s).
  - [ ] Route map.
  - [ ] News coverage links.
  - [ ] Per-day highlights/narrative (the `journey-data.ts` shape 2026 has:
        destination, distance, guests, etc. — decide how much of that
        legacy editions warrant, given the "don't spend too much time on
        these" steer).
  - [ ] Photos (`public/images/` currently only has a `2026/` folder).
- [ ] Design/build the `legacy-stats` template tier's edition overview page
      (already named in `editions.ts`'s `TemplateTier`, not yet built).
- [ ] Wire `/${year}/page.tsx` for 2022-2025 to it.

### Phase B — Daily journal pages for 2022-2025

- [ ] Per-day content and date range come from Phase A's content inventory,
      not gathered separately here.
- [ ] Build the per-day journal page template, routed under
      `/${year}/journey/[day]` matching the 2026 pattern, sized to each
      edition's `dayCount`.

### Phase C — Convert 2026 to the archived format

- [ ] Replace `/2026`'s current `full-2026`-tier tree with the `legacy-stats`
      1-pager + daily journal pages built in Phases A/B.
- [ ] Decide fate of `/2026/donations/search`, `/donations/top`,
      `/stats/donation-war`: dropped entirely, or folded into the 1-pager as
      static sections. `/2026/donations/live` is dropped per the decision
      above.
- [ ] Split `editions.ts`'s tier field into a structure axis (2026 moves to
      `legacy-stats`-shaped structure) and a theme axis (2026 keeps its own
      theme), per the Decisions made above.
- [ ] Convert `cyclethonHistory.ts`'s Cyclethon 5 entry from the dynamic
      `buildCyclethon5Totals()` to a static array, matching editions 1-4
      (carried from `year-scoped-editions.md` Phase 3).
- [ ] Re-add the "view previous edition" link (`AboutCyclethonContent`,
      footer) now that it's meaningful again (carried from Phase 3).
- [ ] Re-add `ArchivedEditionBanner` to 2026's pages, adapted to whatever
      template this phase ends up building (carried from Phase 3).
- [ ] Replace remaining hardcoded "2026"/"Cyclethon 5" strings (layout
      metadata, hero, progress components, translations) with reads from the
      registry, for whatever stays shared across years (carried from
      Phase 4).

### Phase D — Non-edition pages

- [ ] "About Cyclethon" (series-level, not per-edition).
- [ ] "About this site" (the tracker itself, data sources, how it's built).
- [ ] IDF / the cause: decide standalone page vs. section of "About
      Cyclethon" (open question below).

### Phase E — Theming (legacy tier)

- [ ] Design/build the simple/light theme shared by 2022-2025 (and 2026,
      per Phase C's conversion).

### Phase F — i18n and asset backfill

- [ ] JA translation pass once a given page's content is finalized, not
      before.
- [ ] Same for any image assets still missing per edition.

---

## Later — Cyclethon 6 (2027), blocked

Everything below is dormant: nothing here can start until there's actual
2027 content (dates, route, cast, etc.) to build against. Kept in this file
rather than a separate task doc so there's one clear entry point; this
section just isn't it yet.

### 2027 decisions made

- 2027 gets a pre-event anticipation page before the full edition build.
- 2027's full edition reuses 2026's pre-conversion live-edition shape (live
  donations, search, top donors, donation wars).
- 2027 gets its own new visual theme (Phase I), distinct from both the
  2022-2026 legacy theme and 2026's old live-era look.
- JA translation and any missing image assets are backfilled once content is
  finalized, not built bilingually/fully-asseted from the start.

### Phase G — 2027 anticipation page

- [ ] Scope what's knowable pre-event (dates, route teaser, how to watch/
      donate when it starts) versus what has to wait for Phase H.
- [ ] Build as its own lightweight page, not a stub of the full edition.

### Phase H — Bootstrap full 2027 edition

- [ ] Add `editions.ts` entry for 2027 (`isLive: true`; 2026 is already
      `false`).
- [ ] Fork `/2026`'s pre-conversion `full-2026` tree (or this file's Phase
      C output, if easier to adapt forward) into `/2027/...`.
- [ ] New `journey-data` for 2027, new `public/images/2027/`, new
      `MAIN_DONATION_URL`, new `cyclethonHistory.ts` series entry, rotate
      `TILTIFY_WEBHOOK_SIGNING_ID` (carried from
      `.ai/tasks/completed/year-scoped-editions.md` Phase 4).

### Phase I — 2027 theming

- [ ] Design/build 2027's new theme, once this file's theme/structure axis
      split (Decisions made, above) has landed in `editions.ts`.

### Phase J — i18n and asset backfill (2027)

- [ ] JA translation pass once a given 2027 page's content is finalized.
- [ ] Same for any image assets still missing.

### 2027 open questions / risks

- 2027's "more than 2026" scope is unknown (carried from
  `year-scoped-editions.md`) — Phase H stays deliberately light until that
  scope exists.
- Depends on this file's theme/structure axis split landing first; Phase I
  shouldn't start before that.

---

## Open questions / risks

- Whether IDF/the cause gets its own page or lives inside "About Cyclethon"
  is explicitly still open per the request.
- Phase A's content inventory checklist is currently all unchecked, this
  task can't start building 1-pagers or journals until that's gathered, and
  the event-date-range item specifically blocks Phase B entirely.
- Scope here is large enough that each phase will likely want to become its
  own task doc once work on it actually starts, this file is the planning
  index, not meant to stay a single monolithic in-flight task.

## Next step

Work Phase A's content inventory checklist per edition (2022-2025), start
with the event date ranges since Phase B can't be scoped without them.

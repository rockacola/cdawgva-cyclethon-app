# 0001: Year-scoped editions

## Status

Accepted

## Context

The app has only ever represented one Cyclethon at a time. The current
edition (Cyclethon 5, 2026) has a full experience: live donation feed,
day-by-day journey, top donors, donation wars. Cyclethon 1-4 (2022-2025)
exist only as static totals arrays feeding the comparison chart on
`/about-cyclethon` — there is no precedent in this repo for a full archived
edition.

Wrapping up 2026 and preparing for Cyclethon 6 (2027) requires deciding how
past editions are addressed, where their data lives once the live campaign
ends, and whether future editions can assume the same presentation as past
ones.

A constraint shaped every decision below: 2027 is expected to cover more
than 2026 (scope not yet known), and 2022-2025 are expected to eventually
share one lighter, stats-only template. Editions are not visually
interchangeable, so nothing here can assume a single template parameterized
by year.

## Decision

**Routing.** Every route's real implementation lives under a year-prefixed
path (`/2026/journey`, `/2026/donations/live`, etc.) — there is exactly one
copy per route per year, never a separate "live" and "archived" copy of the
same year existing at once. The unprefixed paths (`/`, `/journey`,
`/donations/*`, `/about`, `/finish-line`, `/stats/donation-war`, locale
entries, etc.) are thin redirects to whichever year the editions registry
marks `isLive`, so they keep working as stable, year-independent links.
Year comes before locale in the path (`/2026/ja`, not `/ja/2026`) because
locale is a client-side preference with only a couple of entry pages here,
not a routed dimension every page needs to mirror. When a new year goes
live (e.g. 2027), only the registry's `isLive` flag and the new year's own
route tree need to exist — the redirect targets update automatically since
they read the live year rather than a hardcoded one.

**Presentation.** A year's route and component tree is a **fork** of
whatever the previous year's tree looked like, built fresh (or copied and
modified) when that year goes live — not a shared parameterization across
years. 2027's template is expected to diverge from 2026's, so keeping them
wired to the same components would let a future redesign retroactively
change how 2026 looks once it's archived. A shared parameterized template
is the right call specifically for 2022-2025, since those four are
confirmed to share one lighter design — but that is a property of those
four years, not a default every year inherits. The editions registry
records a `templateTier` per year so this can vary without rework.

**Live-to-archive transition.** A year's own route tree does not change
shape when it stops being current — only its data source does. While a
year is live, its pages fetch the same live R2/Tiltify data any current
year would. At that year's freeze time (an operator-triggered step, not
automatic), its data-fetching is updated in place to read a frozen R2
snapshot instead (see Data, below), `isLive` flips to `false` in the
registry, and the next year's tree takes over the unprefixed redirects.
Until that freeze happens, the year-prefixed path for the current year is
simply another way to reach today's live experience, not a preview of a
finished archive.

**Data.** Frozen data for an archived year lands via a one-time copy into a
year-prefixed path in the same Cloudflare R2 bucket (e.g.
`2026/donations-full.json`), taken at freeze time. The live edition
continues reading the existing unprefixed bucket-root paths unchanged. This
was chosen over having the live pipeline write per-year paths on an ongoing
basis, since that would make every future year's launch depend on a
production pipeline change; a one-time admin copy at archive time does not.

**Registry.** `src/lib/editions.ts` is the single source of truth for which
years exist, which one is live, and which template tier and day count each
uses. It intentionally does not drive rendering directly — it is bookkeeping
that the fork/shared-template split above still requires the app to
consult.

**Chrome ownership.** `Header` and `Footer` belong to a year, not to the
whole app — each year's own layout wraps its children in `EditionProvider`
(`src/providers/EditionProvider.tsx`, `<EditionProvider year={2026}>` in
`src/app/2026/layout.tsx`) and renders `Header`/`Footer` inside it. Any
component under that provider reads its year via `useEditionContext()`
rather than hardcoding a path, being passed a prop, or sniffing the current
URL — this covers `Header`, `Footer`, `DayNav`, and any content component
that links to another route (`LatestDonations`, `JourneyPageContent`, and
whatever else turns up; these links aren't centrally tracked, so audit
opportunistically rather than assuming this list is complete). CTA
visibility and nav hrefs both come from that same year. The root layout
renders no chrome of its own. For now `Header`/`Footer` stay one shared,
parameterized component rather than a literal fork per year, since there
is nothing yet for a year's nav to diverge in shape from — refork them into
separate implementations only once a year's nav structure actually needs
to differ, following the same "don't fork until forced to" reasoning as
Presentation, above.

**Not every page is year-specific.** `/about` and `/about-cyclethon`
currently live under `/2026/...` like everything else, but their content
isn't really tied to a single edition (site-wide "about the tracker" copy,
and a cross-edition history/comparison page). They are expected to move to
a year-agnostic location later; this ADR doesn't resolve where that is or
how they'd get chrome once they're no longer under a year's own layout —
flagged as a known gap, not decided.

**Year selector (future).** A UI control to switch between editions is
planned but not built. `Header`/`Footer` taking a `year` prop is a step
toward that, but the control itself, and how it discovers which years have
a real route tree to link to, is undecided.

## Consequences

- Building a new year's presentation is an explicit fork, which costs more
  up front per year than a shared template would, but means future template
  work never has to preserve backward compatibility with every past year's
  markup.
- A shared "legacy" template for 2022-2025 is not built by this decision;
  the `templateTier` field only reserves room for it.
- Header/Footer/DayNav nav, and the in-page links found so far
  (`LatestDonations`, `JourneyPageContent`) no longer cost a redirect hop —
  they read their year from `EditionProvider`. This was not an exhaustive
  audit; other content components may still hardcode an unprefixed path and
  rely on the redirect. Fix opportunistically when found, not as a sweep.
- Freezing a year's data requires a manual step at freeze time; it is not
  automatic. A frozen archive can go stale if Tiltify processes a refund or
  chargeback after the copy is taken — accepted as a known limitation.
- `/about` and `/about-cyclethon` are provisionally year-scoped but
  expected to move; anything that assumes they stay under `/${year}/...`
  should stay easy to change.
- The full phased plan lives in `.ai/tasks/active/year-scoped-editions.md`.

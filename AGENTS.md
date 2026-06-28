# Agent Instructions

This file is the mandatory entry point for all AI systems operating in this repository.
Load this file first before any other context.

## Critical Rules

These rules are non-negotiable and apply to every task, every session, without exception.

- **Never commit without explicit instruction from the operator.** Stage changes, show a `git diff --stat` summary, and wait for confirmation. An interrupted or redirected request cancels the prior commit instruction.
- **Never add `Co-Authored-By` to commit messages.**
- **Never use em dashes.** Use a comma, full stop, or rewrite the sentence.
- Commit message format: single-line conventional commits, no body. Types: `feat`, `fix`, `refactor`, `chore`, `test`, `docs`. No body, no bullet points, no multi-line messages.

---

## Load Order

1. Standards — `.ai/standards/` (contains both foundation-inherited and project-specific standards)
2. Context — `.ai/context/` (follow sequence in `.ai/manifests/context.yaml`)
3. Memory — `.ai/memory/`
4. Tasks — `.ai/tasks/active/` (active and blocked tasks; completed tasks are archived in `.ai/tasks/completed/`)

## Rules

- Follow spec strictly. No structural invention.
- Do not create files outside the permitted types: manifests, context, agents, standards, skills, memory, journal, and tasks.
- Do not activate agents not listed in `.ai/manifests/agents.yaml`.
- Use `.ai/manifests/context.yaml` to determine which context files to load and in what order.
- Record all decisions in `.ai/journal/{YYYY}/{today}.md`.
- All architectural decisions require an ADR in `docs/adr/`.
- Do not modify `.ai/manifests/foundation.yaml` after initial setup.

## Active Agents

See `.ai/manifests/agents.yaml`.

## Ownership

See `.ai/manifests/ownership.yaml`.

## Foundation Version

See `.ai/manifests/foundation.yaml`. Rules in this file follow the spec version recorded there. On upgrade, replace this file with the version from the new foundation release.

## Git

- When changing code, update relevant documentation in the same commit. Do not leave docs out of sync with the implementation.

---

## Project: Journal

Add a journal entry for each working session. Create `.ai/journal/{YYYY}/{date}.md` using today's date, or append to it if it already exists.

Each entry has five sections — fill in what is relevant, skip what is not:

- **What I worked on** — what you did
- **Decisions made** — choices and the reasoning behind them
- **What I learned** — anything clarified or discovered
- **Problems / friction** — what slowed you down or broke
- **Next step** — the single most important thing to do next

Keep entries brief. One or two sentences per section is enough. The goal is a searchable decision log, not a diary.

---

## Project: Docs

Update all files under `docs/` in the same commit as any code change. Specifically:

- **Files added/removed/renamed** → update structure trees in `docs/getting-started.md`
- **New architectural pattern introduced** → add a named section in `docs/overview.md`
- **Route added/removed** → update the routes table in `docs/overview.md`

---

## Project: Code Style

### General

- Always use braces for `if`, `for`, `while`, etc. — no bracketless single-liners (enforced via ESLint `curly: all`)
- Sort object literal keys alphabetically when order has no semantic meaning (e.g. config objects, type definitions, plain data). Skip when order matters (e.g. migration steps, priority queues).
- JSX props are always sorted alphabetically (enforced via ESLint `react/jsx-sort-props`)
- `import type` must be a separate statement from value imports, even from the same module (enforced via ESLint `@typescript-eslint/consistent-type-imports`)

### React

- Always name `useEffect` callbacks: `useEffect(function myName() { ... }, [])`
- Hooks and utility functions must not be defined inline inside component files — extract them to their own file (e.g. `src/hooks/useAnimatedValue.ts`) or a shared utils file

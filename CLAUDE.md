# Docs

Update all files under `docs/` in the same commit as any code change. Specifically:

- **Files added/removed/renamed** → update structure trees in `docs/getting-started.md`
- **New architectural pattern introduced** → add a named section in `docs/overview.md`
- **Route added/removed** → update the routes table in `docs/overview.md`

---

# Git

When suggesting a commit message, use a single-line conventional commit format:

```
<type>: <short description>
```

Types: `feat`, `fix`, `refactor`, `chore`, `test`, `docs`. No body, no bullet points, no multi-line messages.

---

# Code Style

## General

- Always use braces for `if`, `for`, `while`, etc. — no bracketless single-liners (enforced via ESLint `curly: all`)
- Sort object literal keys alphabetically when order has no semantic meaning (e.g. config objects, type definitions, plain data). Skip when order matters (e.g. migration steps, priority queues).
- JSX props are always sorted alphabetically (enforced via ESLint `react/jsx-sort-props`)
- `import type` must be a separate statement from value imports, even from the same module (enforced via ESLint `@typescript-eslint/consistent-type-imports`)

## React

- Always name `useEffect` callbacks: `useEffect(function myName() { ... }, [])`
- Hooks and utility functions must not be defined inline inside component files — extract them to their own file (e.g. `src/hooks/useAnimatedValue.ts`) or a shared utils file

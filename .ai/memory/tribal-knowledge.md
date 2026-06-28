---
last_updated: '2026-06-28'
---

## Summary

Tribal knowledge and non-obvious project conventions for the cdawgva-cyclethon-app.

## Key Facts

- `useColorMode` must come from the snippet file (`src/components/ui/color-mode.tsx`), not from `@chakra-ui/react` directly — the project uses next-themes for color mode.

## References

- `src/components/ui/color-mode.tsx` — project color mode provider

# Joy UI Implementation Summary (2025 Refresh)

## Why This Exists

Our original Joy UI exploration split components across multiple files (`*.styles.ts`, `*.utils.ts`, etc.). After adopting React Native Web as the single source of truth and building an in-house theme engine, we consolidated around a **single-file universal component** pattern. This document captures the updated approach so future contributors understand what "Joy-inspired" means in the current BGUI codebase.

## Current Architecture Snapshot

### Universal Component Layout
```
src/components/{primitives|compositions}/ComponentName/
├── ComponentName.tsx        # Universal implementation using RN primitives + useTheme
├── ComponentName.types.ts   # Props & JSDoc (self-documenting source of truth)
├── ComponentName.test.tsx   # React Native Testing Library (light/dark coverage)
├── ComponentName.stories.tsx# Storybook (MDX-free, token-driven)
└── index.ts                 # Public exports
```

### Generating New Components
```
pnpm --filter @braingame/bgui generate:component primitives/MyComponent
```
The generator scaffolds all four files with tone-aware styling, tests that compare light vs dark tokens, and Storybook stories wired to the theme engine. Always start here—build on the scaffold instead of hand-authoring boilerplate.

### Theme Consumption Rules
- Import `useTheme()` from `@braingame/bgui/theme` and resolve tokens inside the component.
- No direct `theme` imports from modules—tests rely on light/dark rendering.
- Prefer semantic colors (`theme.colors.primary`) and spacing/radii tokens; tonal palettes are reserved for advanced cases documented in `docs/COLORS.md`.

## Mapping Joy UI Concepts to BGUI
| Joy UI Concept | BGUI Implementation |
| --- | --- |
| Variant system (`solid`, `soft`, `outlined`, `plain`) | `generateComponentVariants()` in `theme/variants.ts` feeds component styles |
| Design tokens | Material 3-derived tokens in `theme/theme.ts`, accessible via `useTheme()` |
| Storybook kitchensink | Files in the component folder; Storybook auto-loads them via Turborepo task graph |
| Theming & overrides | `BGUIThemeProvider` wraps the in-house engine with optional overrides/forceTheme |

## Migration Status
- ✅ Theme engine migrated off Restyle; tests ensure parity across light/dark tokens.
- ✅ Component generator aligned with the new pattern.
- 🔄 Remaining components should converge on the generator output as they are touched.

## Contributor Checklist (Joy Alignment)
1. **Scaffold first** – use the generator to ensure files/exports are correct.
2. **Document via props** – keep JSDoc in `*.types.ts`. Inline docs replace separate markdown guides.
3. **Cover light/dark** – add assertions similar to `theme-coverage.test.tsx` when styling changes.
4. **Sync Storybook** – stories should mirror the test cases and highlight tone/variant differences.
5. **Update docs** – when patterns evolve, reflect them here and in `README.md`.

Keeping this summary current prevents drift between legacy Joy UI notes and the live code. When the architecture shifts again, update this file as part of the change.

# Unused Components & Utils (17-06-2025)

This note lists code under `packages/` that is currently unused by any app. These files can likely be removed to reduce bundle size and maintenance cost.

## BGUI Components
- `ErrorBoundary` – not imported anywhere outside the component itself.
- `TextInput` – the apps use React Native's built-in `TextInput`.

## Utils Package
- `env.ts` – environment variable helper unused across apps.

Deleting these files should have no impact on existing app code.

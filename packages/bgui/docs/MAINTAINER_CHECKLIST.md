# BGUI Maintainer Checklist

Run this checklist **before publishing** or approving a pull request that modifies the UI kit.

## 1. Quality Gates
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm --filter @braingame/bgui test` *(ensure light/dark coverage stays green)*
- [ ] `pnpm --filter @braingame/bgui build` *(verifies TS emit for npm consumers)*

## 2. Theme Verification
- [ ] Components using color tokens prove parity via `theme-coverage.test.tsx` or equivalent assertions.
- [ ] No direct `theme` module imports—components rely on `useTheme()`.
- [ ] Stories showcase both light and dark states where visual differences matter.

## 3. Storybook & Docs
- [ ] `pnpm storybook` boots locally without warnings.
- [ ] New props/variants reflected in Storybook controls.
- [ ] Relevant docs in `packages/bgui/docs/` updated (README, GOLD_STANDARD, etc.).

## 4. API Surface
- [ ] New components exported from `packages/bgui/src/index.ts`.
- [ ] Props documented via JSDoc in `*.types.ts`.
- [ ] Breaking changes annotated in commit/PR description.

## 5. Dependency Hygiene
- [ ] No external UI libraries (Restyle, MUI, etc.) reintroduced.
- [ ] Generator (`scripts/generate-component.js`) still reflects best practices if patterns change.

Tick every box before releasing—this keeps BGUI consistent, theme-safe, and predictable for every app in the monorepo.

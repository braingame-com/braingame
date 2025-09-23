# Repository Guidelines

## Project Structure & Module Organization
The monorepo uses pnpm workspaces with Turborepo. Application code lives in `apps/`: `product` (Expo), `main-site` and `docs-site` (Next.js), plus `api`. Shared packages reside in `packages/` (`bgui` UI kit, `utils` hooks and tokens, `config`, `i18n`). Supporting content stays in `docs/`, `scripts/`, and `assets/`. Tests are colocated with their source (`Component.test.tsx`), so follow the feature folder when extending coverage.

## Build, Test, and Development Commands
Run `pnpm install` or `pnpm preflight` before anything else. Use `pnpm dev` for the full workspace or add `--filter` for targeted apps. `pnpm build`, `pnpm build:apps`, and `pnpm build:packages` drive production bundles. `pnpm lint`, `pnpm lint:fix`, `pnpm format:write`, and `pnpm typecheck` enforce style and types. Release gates mirror `pnpm quality` (lint + typecheck + test) and conclude with `pnpm build`. Reach for `pnpm workspace:graph` if you need the dependency map.

## Coding Style & Naming Conventions
Biome (`biome.json`) is canon: tab indentation, 100 character lines, double quotes, and auto-fixes for common issues. Write TypeScript everywhere, prefer functional React components, and import workspace packages via absolute aliases (`@braingame/utils`). Stick to `camelCase` variables, `PascalCase` components and types, `kebab-case` files, and `CONSTANT_CASE` shared constants. Avoid `any`, chained casts, and stray `console.log`; if you must leave debt, annotate with `TODO(name): context`.

## Testing Guidelines
Jest with Testing Library powers unit and integration tests; run `pnpm test` or filter by workspace when iterating. Use `pnpm test:coverage` to confirm thresholds before submitting. End-to-end flows live in Playwright (`pnpm test:e2e`, `pnpm test:e2e:ui` for the runner). Keep specs beside the code they exercise, name them `*.test.ts[x]`, and update mocks or fixtures when behavior shifts.

## Commit & Pull Request Guidelines
Commits must follow Conventional Commits (`feat(bgui): …`, `fix(product): …`) to keep releases healthy. Before pushing, run `pnpm quality`, `pnpm secrets:check`, and include any relevant `pnpm typecheck --strict` output. PRs should link the issue, outline risk, and attach screenshots or videos for UI work. Rebase onto `main` when conflicts arise and avoid force pushes once review starts.

## Security & Configuration Tips
Validate environment files with `pnpm validate:env` before local builds. Audit dependencies via `pnpm security:audit` and sweep for secrets with `pnpm secrets:scan`. After switching worktrees, run `scripts/check-workspace.sh` to confirm the sandbox is clean and safe to modify.

# Repository Guidelines

## Project Structure & Module Organization
The monorepo is managed with pnpm workspaces and Turborepo. Application code sits in `apps/` (`main-site`, `docs-site`, `product`, `api`), shared UI and tooling is under `packages/` (`bgui`, `utils`, `config`, `i18n`), and long-form references stay in `docs/`, `scripts/`, and `assets/`. Tests live beside their subjects (`Component.test.tsx`), so keep coverage updates co-located.

## Build, Test, and Development Commands
Run `pnpm install` (or `pnpm preflight`) before hacking. Use `pnpm dev` or `pnpm dev --filter <app>` for local work, `pnpm build` for production bundles, and `pnpm build:<scope>` when you need only apps or packages. Quality gates rely on `pnpm lint`, `pnpm typecheck`, `pnpm format:write`, and `pnpm test` (or `pnpm test:e2e` for Playwright flows).

## Coding Style & Naming Conventions
Biome (`biome.json`) is the single source of truth: tabs, 100-column lines, double quotes, and TypeScript everywhere. Stick to `camelCase` variables, `PascalCase` components/types, `kebab-case` files, and reserve `CONSTANT_CASE` for shared constants. Avoid `any`, layered casts, and stray `console.log`; annotate debt with `TODO(name): context` when unavoidable.

## Testing Guidelines
Jest + Testing Library power unit/integration suites, Playwright covers web E2E. Name specs `*.test.ts[x]`, colocate them with the feature, and refresh fixtures when behavior shifts. Use `pnpm test` with workspace filters for tight loops and `pnpm test:coverage` before sign-off.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits (`feat(bgui): …`, `fix(docs-site): …`). Before pushing, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`; avoid `--no-verify`. PRs should link issues, explain risk, and include screenshots or recordings for UI changes. Rebase onto `main` rather than force-pushing mid-review.

## Agent Workflow & Guardrails
- Mandatory reading before coding: `docs/handbook/architecture/ARCHITECTURE.md`, `docs/handbook/development/DEVELOPMENT.md`, `docs/handbook/development/LESSONS.md`, and `docs/todo/TODO.md`.
- Zero tolerance quality bar: lint, typecheck, test, and build must be clean (no errors, no warnings, no skipped hooks).
- Verify the workspace every session (`git worktree list`, `pwd`, `git branch --show-current`) to avoid cross-worktree contamination.
- Human review is required for every agent-generated change, and agents must not close PRs without explicit maintainer approval.
- Log meaningful actions and keep secrets out of the repo; use the CI secret manager instead.

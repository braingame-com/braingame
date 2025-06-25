# Consultant Findings

## Summary

Brain Game is a Turborepo/PNPM monorepo with React Native, Next.js and an Express API. The project uses strict linting via Biome, TypeScript in strict mode and a shared config package. Overall structure is consistent but there are some rough edges around testing configuration and documentation. Below are detailed observations.

## Architecture & Project Structure

- Applications live under `apps/` (`product`, `main-site`, `docs-site`, `api`). Libraries live under `packages/` (`bgui`, `utils`, `i18n`, `config`). The workspace definition is minimal but clear.
- The root `tsconfig.json` extends the shared configuration and wires workspace aliases for packages.
- Each package/app has its own `package.json` with local scripts and dependencies, e.g. the API server is TypeScript/Express with its own dev commands.
- Shared TypeScript options (strict, path mapping) are centralized in `packages/config/tsconfig.base.json`.

## Code Quality & Maintainability

- Biome is enforced via `biome.json` with strict lint rules like `noParameterAssign` and `useDefaultParameterLast`.
- The docs emphasize a zero‑tolerance policy for lint and type errors. `pnpm lint` and `pnpm typecheck` must both produce zero errors before merge.
- Component code generally follows React best practices and includes usage docs. Example: `Button` validates props in development and memoizes padding calculations for performance.
- Utilities expose typed APIs, e.g. the logger service uses `LogLevel` enums and structured methods.

## Package Boundaries & Dependencies

- Packages reference each other via workspace protocol. For instance `@braingame/bgui` depends on `@braingame/utils`.
- Root TypeScript references ensure incremental builds across apps and packages.
- Some boundaries are fuzzy: the UI kit includes both Jest and Vitest configs, while other packages use only one framework. This dual setup increases maintenance overhead.

## Build Tooling & Configuration

- Turborepo orchestrates tasks for all packages with caching and dependency graphs. Build, lint, test and typecheck steps depend on upstream tasks.
- Scripts exist for dev utilities and workspace checks, e.g. `scripts/check-workspace.sh` prints worktree info to prevent mistakes.
- Build outputs are clearly specified (e.g. `.next`, `dist`) which helps caching but remote caching is disabled by default in `turbo.json`.

## Linting, Formatting & CI

- Biome handles formatting with `indentStyle` = `tab` and `lineWidth` = 100, ensuring consistent style across the repo.
- Husky with `lint-staged` runs Biome on staged files, preventing unformatted commits (see root `lint-staged` config in `package.json`).
- CI script `ci` installs dependencies, scans for secrets, runs quality checks and builds.

## Scalability & Developer Experience

- Environment validation utilities centralize schema-based checks for each app and warn about unsafe values. Example function `validateEnv` generates warnings for placeholder secrets and dev settings in production.
- Each app has minimal environment config; `apps/main-site/next.config.ts` shows simple static export settings.
- Documentation is extensive (Architecture, Coding Style, Lessons). However some docs still show TODOs and duplicate information.

## Red Flags & Quick Wins

- Lint and typecheck currently fail due to missing network access when pnpm tries to fetch metadata. CI should use offline cache or pinned versions to avoid network failures.
- Testing setup is inconsistent. The `packages/bgui` library ships with both Jest and Vitest; TODO.md calls out removing Jest to unify the stack. Consolidating to a single framework would simplify configuration and coverage reporting.
- Some large logs (`expo-output.log`, `npm-expo.log`) are committed within `apps/product` which clutters the repository and may slow down clones. Consider cleaning them and adding ignore rules.
- No global environment example files are provided yet. Adding `.env.example` per package and validating them via the existing `validateEnv` utilities would improve onboarding.

## Overall Assessment

Brain Game demonstrates a thoughtful monorepo design with clear separation of apps and packages. Strict linting and type safety are prioritized, and the documentation is thorough. The primary areas for improvement are consolidating the test tooling, ensuring consistent environment management, and cleaning unneeded artifacts. Addressing these will further improve maintainability and developer experience.

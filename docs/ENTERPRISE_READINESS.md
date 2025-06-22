# Enterprise Readiness Guide

This document summarizes the practices that help keep the Brain Game monorepo ready for enterprise use.

## Monorepo Management
- **Turborepo** organizes apps and packages with a unified task graph.
- Atomic commits and shared caching keep builds reproducible.

## Quality Gates
- **Zero tolerance** policy for lint and type errors.
- Mandatory pre‑commit hooks run `pnpm lint` and `pnpm typecheck`.
- Tests run with `pnpm test` in CI before any merge.

## CI / CD Pipeline
1. **lint** → Biome and dependency graph checks
2. **test** → unit and e2e suites
3. **build** → Turbo cache and artifact upload
4. **deploy** → preview on Vercel and Expo
5. **release** → publish packages with Changesets

## Security
- Secrets are stored only in the CI provider’s secret manager.
- TruffleHog scans commits for accidental secrets.

## Workspace Isolation
- Multiple git worktrees separate production code from experiments.
- Always verify the current worktree with `git worktree list`.

## Caching
- Optional remote caching (e.g. Vercel) speeds up CI across pull requests.

_End of file_

# Brain Game Development Plan

This plan summarizes the current state of the repository and the next high‑level steps required to reach fully enterprise‑ready status. It is based on the architecture and task tracking documentation located in the `/docs` directory.

## Repository Overview
- **Monorepo** managed by **Turborepo** and **pnpm workspaces**
- Deployable apps live in `apps/`
  - `product`: Expo universal client
  - `website`: Next.js marketing & docs site
- Shared packages live in `packages/`
  - `bgui`: reusable UI components
  - `utils`: helpers, hooks and constants
  - `config`: TypeScript/Biome presets
- Documentation and process docs in `docs/`

## Tooling
- **TypeScript** with strict settings
- **Biome** for linting and formatting
- **Jest** for unit testing (with jest-expo for mobile)
- **Changesets** for versioning and publishing
- **GitHub Actions** for CI/CD (lint ➜ test ➜ build ➜ preview deploy ➜ release)

## Current Status (June 2025)
- CI/CD workflows and pre‑commit hooks are configured
- Basic Jest tests exist for `utils`
- Folder‑per‑component structure implemented for part of `bgui`
- Turborepo pipelines set up with caching
- Documentation covers architecture, coding style and brand guidelines

## Outstanding Work
Derived from `docs/TODO.md`:
1. **Branch protection rules** – enforce PR reviews and status checks
2. **Testing improvements**
   - Unit tests for remaining `bgui` components
   - Integration tests for both apps
   - Coverage reporting with target of **80%+**
3. **Storybook setup** for the `bgui` package
4. **Environment management** using `.env.example` files and runtime validation
5. **Monitoring** – integrate Sentry and analytics
6. **Complete component migration** as noted in `ENTERPRISE_TRANSFORMATION.md`

## Near‑Term Plan
1. Finalize branch protection settings in the GitHub repo
2. Expand Jest configuration to support React Native component testing
3. Build out Storybook with a reusable template for all shared components
4. Create `.env.example` files for both apps and document required variables
5. Integrate Sentry into the Expo and Next.js apps with environment‑specific DSNs
6. Continue migrating remaining components in `bgui` to the folder‑per‑component pattern with corresponding unit tests
7. Enable coverage reports in CI and fail builds when coverage drops below 80%
8. Document monitoring and deployment runbooks under `docs/`

## Long‑Term Vision
- Maintain a strict dependency graph: `apps/*` may depend on `packages/*` but never the reverse
- Keep Turborepo tasks fast with remote caching and incremental builds
- Use Changesets for automated releases to npm and Firebase
- Ensure every package and app consistently follows the enterprise coding standards from `CODING_STYLE.md`

---
This document will evolve as tasks are completed. All contributors and AI agents should reference this plan alongside `docs/TODO.md` before starting work.

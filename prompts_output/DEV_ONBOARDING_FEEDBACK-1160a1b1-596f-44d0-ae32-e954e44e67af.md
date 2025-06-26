# DEV_ONBOARDING_FEEDBACK-1160a1b1-596f-44d0-ae32-e954e44e67af

**Onboarding Time Observations**
- `pnpm install` (with Node 18) took ~1m05s. Many warnings about peer deps.
- `pnpm lint` finished in ~3s after switching to Node 18. Initially failed with Node 20 due to Corepack network fetch.
- `pnpm typecheck` took ~27s. Also failed under Node 20.
- `pnpm dev --filter ./apps/main-site` started Next.js in ~2s.
- `pnpm test --filter @braingame/utils` failed with ESM/React Native module errors.
- `pnpm validate:env` failed because utils were not built; script attempted to build them but errored (`spawnSync /bin/sh ENOENT`).

**Friction Points**
1. Node version mismatch – running default Node 20 caused lint/typecheck to fetch pnpm via corepack and fail. `nvm use` is required but easy to miss.
2. README examples use `pnpm dev --filter website` which does not match actual workspace names. Need to use `--filter ./apps/main-site` or `@braingame/main-site`.
3. Environment validation scripts depend on built `@braingame/utils`; fresh clones fail without running a manual build.
4. Unit tests in `packages/utils` fail (`SyntaxError: Cannot use import statement outside a module`) due to Vitest + React Native interop.
5. `pnpm install` reports numerous peer dependency warnings, slowing confidence in setup.

**Proposals to Reduce Ramp‑Up Time**
- Add a `scripts/setup.sh` that runs `nvm use`, `pnpm install`, builds utilities, and validates envs automatically.
- Update README to reference actual package names for `pnpm --filter` commands.
- Commit prebuilt `dist/` for `@braingame/utils` or run its build step during install so env validation works out of the box.
- Provide a troubleshooting section for common Node version issues and test failures.
- Stabilize Vitest config or switch to Jest for RN utils to avoid ESM module errors.

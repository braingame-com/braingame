# Work Session: Update CI pnpm Version

## Session Metadata
- **Date**: 20-06-2025
- **Agent**: ChatGPT (Codex)
- **Objectives**: Update workflows to install pnpm v9 and run lint/test

## Work Completed
- Updated `.github/workflows/ci.yml` to use `pnpm/action-setup` version 9
- Updated `.github/workflows/release.yml` to use `pnpm/action-setup` version 9
- Attempted `pnpm lint` and `pnpm test`; both failed due to network restrictions

## Key Learnings
- pnpm lockfile already uses `lockfileVersion: '9.0'`, so workflows should match
- CI scripts rely on `pnpm/action-setup` for installing the correct version

## Recommendations for Future Work
- Investigate caching or offline installs so lint/test commands can run without network access during CI

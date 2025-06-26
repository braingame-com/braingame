# OSS Contribution Review

Friction Score: 4/10

## Findings
- `CONTRIBUTING.md` mandates running `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before opening a PR and enforces Conventional Commits.
- PR template references `npm` commands rather than `pnpm`, which may confuse contributors.
- README offers a pnpm-based quick start with quality gate explanation.
- Bug and feature issue templates exist but omit trailing newlines and provide minimal guidance.
- Weekly Dependabot configuration keeps dependencies updated automatically.

## First PR in 30 Minutes Plan
1. Fork and clone the repo, then run `pnpm install`.
2. Create a branch and update `.github/PULL_REQUEST_TEMPLATE.md` to use `pnpm` commands.
3. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` (may fail without full environment).
4. Commit with a Conventional Commit message like `docs(contributing): use pnpm commands in PR template`.
5. Open a PR describing the change and reference this review file.

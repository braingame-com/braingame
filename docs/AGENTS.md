# AGENTS.md

## Purpose
This document defines the roles, usage, and guard‑rails for **all AI agents, bots, or automations** that interact with the Brain Game monorepo.

> **Key rules:** 
> 1. *Before generating code, tests, or docs, agents **MUST** read **`docs/ARCHITECTURE.md`** to follow the agreed folder structure and naming conventions.*
> 2. *Before starting work, agents **MUST** read **`TODO.md`** to understand current priorities and **`AI_CONTEXT.md`** for project state.*

---

## Agent Roles

| Role | Scope | Typical Tech |
|------|-------|--------------|
| **Development Assistant** | Code generation, refactoring, dependency upgrades | GitHub App / CLI |
| **Testing Agent** | Generate & run unit/e2e tests, report coverage | Vitest/Jest, Playwright, Maestro |
| **CI/CD Bot** | Build, lint, test, deploy, publish packages | GitHub Actions, Turborepo |
| **In‑App Agents** | End‑user features (e.g. adaptive coaching) | OpenAI, Firebase Functions |

---

## Integration Points

1. **Source Code** – linting, formatting, code‑mod PRs.  
2. **Testing** – auto‑generated tests, flaky‑test retries.  
3. **Documentation** – MD edits, Storybook stories.  
4. **Release** – version bumps, npm publish, EAS submit.  
5. **App Features** – Any AI logic shipped to end users.

---

## Best Practices

- Every agent runs in **read‑only** mode by default; write access is gated behind CI checks.
- Agent‑generated code **must be human‑reviewed** before merge.
- Store credentials in GitHub/CI **secrets**, never in git.
- Pin agent dependencies; upgrade via PRs with changelogs.
- Log all agent actions; surface anomalies in CI summary.
- Respect repository **CODEOWNERS** and branch protection rules.
- Update **TODO.md** task status when working on tasks.
- Add session summaries to **AI_CONTEXT.md** after completing work.

---

## Adding a New Agent

1. **Document** its purpose & config here.  
2. Create a secrets entry (if needed) in the CI provider ‑ *never* commit credentials.  
3. Ensure it follows project ESLint/Biome rules.  
4. Open a PR; tag `@maintainers` for approval.

---

## Contact
For questions about agents or automation, ping **@Brain Game/maintainers** or email hello@braingame.dev.

---

## Tooling reference

- **Biome** – default linter/formatter (`pnpm biome`)  
- **Turborepo** – task graph & caching (`turbo run …`)  
- **Changesets** – automated semver & npm publish  
- **Playwright** – web E2E; **Maestro/Detox** – native E2E


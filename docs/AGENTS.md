# AGENTS.md

This document defines the roles, usage, and guard‑rails for **all AI agents, bots, or automations** that interact with the Brain Game monorepo.

> **Primary Directive:** Before generating code, tests, or docs, all agents **MUST** first read and understand:
> 1. `docs/ARCHITECTURE.md`
> 2. `docs/AI_CONTEXT.md`
> 3. `docs/CLAUDE.md`

---

## Agent Roles

| Role | Scope | Example Tooling |
|------|-------|--------------|
| **Development Assistant** | Code generation, refactoring, dependency upgrades | GitHub Copilot, Cursor, bespoke scripts |
| **Testing Agent** | Generate & run unit/e2e tests, report coverage | Jest, Playwright, Maestro |
| **CI/CD Bot** | Build, lint, test, deploy, publish packages | GitHub Actions, Changesets |
| **In‑App Agents** | End‑user features (e.g. adaptive coaching) | OpenAI SDKs, Firebase Functions |

---

## Core Principles & Guardrails

- **Human Review is Mandatory:** All agent-generated code must be reviewed and approved by a human maintainer before merging.
- **Read-Only by Default:** Agents should operate with the minimum necessary permissions. Write access is a privilege, gated by CI checks.
- **Secure by Design:** Credentials and secrets must be stored in the CI provider's secret manager, never in the repository.
- **Log Everything:** All significant agent actions must be logged and auditable, with anomalies surfaced in CI summaries.
- **Respect Ownership:** Agents must adhere to `CODEOWNERS` and branch protection rules.
- **Pinned Dependencies:** All agent-related tooling and dependencies should be pinned to specific versions to ensure stability. Upgrades must go through a PR.
- **Use Correct Dates:** All dates in documentation **MUST** follow the `DD-MM-YYYY` format and reflect the correct current date. Chronological accuracy is non-negotiable.

---

## Adding a New Agent

1. **Document:** Add the agent's purpose, scope, and configuration to this file.
2. **Secure:** Create a secrets entry in the CI provider if needed.
3. **Comply:** Ensure the agent's output conforms to the project's Biome and style conventions.
4. **Propose:** Open a PR and tag `@maintainers` for review and approval.

---

## Contact
For questions about agents or automation, ping **@Brain-Game/maintainers** or email `hello@braingame.dev`.

---

## Tooling Reference

- **Biome** – Default linter/formatter (`pnpm biome`)
- **Turborepo** – Task graph & caching (`turbo run …`)
- **Changesets** – Automated semver & npm publish
- **Playwright** – Web E2E tests
- **Maestro/Detox** – Native E2E tests


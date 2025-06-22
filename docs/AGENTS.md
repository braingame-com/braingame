# AGENTS.md - AI Agent Guidelines & Standards

This document defines the roles, usage, and guard‑rails for **all AI agents, bots, or automations** that interact with the Brain Game monorepo.

## 📚 **MANDATORY READING** (Before any development work)

> **Primary Directive:** All agents **MUST** read these docs before generating code, tests, or documentation:

### **Essential Workflow Docs:**
1. **[📋 CLAUDE.md](./CLAUDE.md)** - Tactical guide with golden path workflow and commands
2. **[🏗️ ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, worktree isolation, and technical blueprint
3. **[📖 LESSONS.md](./LESSONS.md)** - Critical technical learnings and incident prevention 
4. **[🧠 AI_CONTEXT.md](./AI_CONTEXT.md)** - Project context, session summaries, and working agreements
5. **[📋 CONTRIBUTING.md](../.github/CONTRIBUTING.md)** - Zero-tolerance quality standards and workflow

### **Critical Process Docs:**
- **[🔄 PR_REVIEW_PROCESS.md](./PR_REVIEW_PROCESS.md)** - PR merge procedures with quality validation
- **[⚙️ WORKTREES.md](./WORKTREES.md)** - Workspace isolation guide (prevents contamination)
- **[📝 TODO.md](./TODO.md)** - Current task tracker and priority management

### **Quality Standards:**
- **[📊 QUALITY.md](./QUALITY.md)** - Comprehensive code quality playbook with examples
- **[💅 CODING_STYLE.md](./CODING_STYLE.md)** - Code standards and anti-patterns
- **[🧪 TESTING.md](./TESTING.md)** - Testing strategy and hybrid approach

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

### Quality Standards (ZERO TOLERANCE)
**⚠️ CRITICAL:** All agents must adhere to our zero-tolerance quality policy.

**For complete quality standards, see: [📋 CONTRIBUTING.md](../.github/CONTRIBUTING.md)**

**Mandatory Quality Checks:**
- ❌ No lint errors or warnings (`pnpm lint` must be 0/0)
- ❌ No TypeScript errors (`pnpm typecheck` must be 0 errors)
- ❌ No `--no-verify` (bypassing pre-commit hooks is banned)
- ❌ No `any` types in public APIs
- ❌ No `@ts-expect-error` or `biome-ignore` without proper justification
- ❌ No technical debt introduction

**Before every commit:**
```bash
pnpm lint      # Must pass with 0 errors, 0 warnings
pnpm typecheck # Must pass with 0 errors
```

**Before every PR merge:**
```bash
# Checkout the PR branch first
gh pr checkout <number>

# Run quality validation
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# Only merge if all checks pass
gh pr merge <number> --squash --delete-branch
```

**⚠️ CRITICAL:** Follow [PR_REVIEW_PROCESS.md](./PR_REVIEW_PROCESS.md) exactly. Skipping quality validation on branches is the primary cause of technical debt on main.

### Operational Guardrails
- **Workspace Isolation:** Always verify which git worktree you're working in. Production work happens in the main `braingame/` directory, experimental/AI work happens in `braingame-claude-sandbox/`. When in doubt, ask.
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


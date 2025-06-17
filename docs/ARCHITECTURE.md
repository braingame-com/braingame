# ARCHITECTURE.md

![Architecture](https://img.shields.io/badge/architecture-enterprise%20monorepo-blue?style=flat-square&logo=react)
![Turborepo](https://img.shields.io/badge/build-turborepo-ef4444?style=flat-square&logo=turborepo)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?style=flat-square&logo=typescript)
![React Native](https://img.shields.io/badge/platform-cross--platform-61dafb?style=flat-square&logo=react)

> **Single‑source of truth** for Brain Game's technical blueprint.  
> All agents and humans **must** follow the conventions laid out here.

---

## 1. System overview

Brain Game ships **three enterprise-grade artefacts** from one professionally-managed Turborepo monorepo:

| Layer | Tech | Output / Domain |
|-------|------|-----------------|
| **Universal client** | Expo + React Native (+ `react‑native‑web`) | `app.braingame.dev` (Web), App/Play Store (Native) |
| **Marketing & Docs** | Next.js (in `apps/website`) | `www.braingame.dev` |
| **UI Kit** | `packages/bgui` – sharable RN components | npm: `@brain-game/bgui` |

Common infra: pnpm workspaces, Biome lint/format, Jest tests, Turbo task graph.

---

## 2. Key decisions snapshot

| Area | Decision | Rationale |
|------|----------|-----------|
| **Repo style** | Single **Turborepo** monorepo | Atomic commits & shared cache |
| **Workspaces** | `apps/*`, `packages/*` | Clear separation deployable vs library |
| **Docs rendering** | Docs live **inside Next.js** using BGUI components | Brand cohesion, no MDX styling drift |
| **Component Dev** | **Storybook** is first‑class | Critical for developing, testing & documenting BGUI |
| **Hosting** | **Firebase Hosting multi‑site** (`www` & `app` targets) | Simple CDN, same auth/config |
| **Caching** | Local + optional **Vercel remote cache** | Fast CI across PRs |
| **Secrets** | `.env` (local), CI secret manager (prod) | Never commit credentials |

---

## 3. Folder layout (authoritative)

```text
braingame/
├── apps/
│   ├── website/           # Next.js site
│   └── product/           # Expo universal client
│
├── packages/
│   ├── bgui/              # UI kit (RN + web)
│   ├── utils/             # Shared helpers, Firebase wrappers
│   └── config/            # ESLint / Biome / TS presets
│
├── docs/                  # ← You are here
│   ├── adr/               # Architecture Decision Records
│   └── runbooks/          # Ops playbooks, etc.
│
├── .github/workflows/     # CI / CD
├── firebase.json
├── .firebaserc
├── turborepo.json
├── pnpm-workspace.yaml
└── package.json
```

> **Rule:** Deployable `apps/*` may depend on `packages/*`,  
> `packages/*` **must never** depend on `apps/*` — keep the DAG acyclic.

---

## 4. Build & dev workflow

| Task | Command |
|------|---------|
| Dev all | `pnpm dev` |
| Dev Expo only | `pnpm dev --filter product` |
| Dev Next only | `pnpm dev --filter website` |
| Lint / format | `pnpm lint` (Biome) |
| Unit tests | `pnpm test` (Jest) |
| Storybook | `pnpm storybook` (placeholder) |
| Prod build | `pnpm build` (Turbo graph) |

Turbo pipelines (defined in `turborepo.json`):

```
dev   -> transpile            (no cache)
build -> transpile -> test -> typecheck -> package
```

`packages/bgui` publishes via **Changesets** on merge to `main`.

---

## 5. CI / CD pipeline (GitHub Actions)

1. **lint** → Biome, dep‑graph check  
2. **test** → unit & e2e (Playwright, Maestro)  
3. **build** → Turbo cache; upload artifacts  
4. **preview deploy** → Vercel (web) & Expo EAS (app)  
5. **release** (main) → Changesets publish, Firebase deploy

---

## 6. Environments

| Env | URL | Notes |
|-----|-----|-------|
| **Local** | `http://localhost:{expo|next}` | `.env.local` |
| **Preview** | Vercel/Expo preview URLs | Added as PR comment |
| **Prod** | see domains above | Firebase Hosting |

---

## 7. Task Management & AI Coordination

Key files for task tracking and AI agent coordination:

| File | Purpose | Update Frequency |
|------|---------|------------------|
| **TODO.md** | Central task tracker with priorities | Daily/per session |
| **AI_CONTEXT.md** | AI agent context & session summaries | After each session |
| **CLAUDE.md** | Project-specific AI instructions | As needed |
| **AGENTS.md** | AI agent roles and guidelines | When adding agents |

All AI agents **MUST**:
1. Read `TODO.md` before starting work
2. Update task status when beginning/completing tasks
3. Add session summary to `AI_CONTEXT.md` after work
4. Follow conventions in `CLAUDE.md` and this document

---

## 8. Security & compliance

- Secrets only in CI secret manager; scanned via TruffleHog pre‑commit.  
- Dependabot weekly updates for npm + GH Actions.  
- Disclosure policy in `SECURITY.md`.

---

## 9. Extension points

- **Add platform**: create `apps/desktop` (Electron/Tauri) – same folder contract.  
- **Extract UI kit**: move `packages/bgui` to its own repo; replace workspace dep with npm.  
- **Feature flags**: insert LaunchDarkly wrapper in `packages/utils`.

---

_End of file_

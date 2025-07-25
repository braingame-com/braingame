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
| **Marketing Site** | Next.js (in `apps/main-site`) | `www.braingame.dev` |
| **Documentation** | Next.js (in `apps/docs-site`) | `docs.braingame.dev` |
| **UI Kit** | `packages/bgui` – sharable RN components | npm: `@brain-game/bgui` |

Common infra: pnpm workspaces, Biome lint/format, Jest tests, Turbo task graph.

### Development Worktrees
This repository uses git worktrees for workspace isolation:
- **Main worktree** (`braingame/`): Production code, final commits, releases
- **Claude sandbox** (`braingame-claude-sandbox/`): AI agent development work, experiments, prototyping
- **Rule**: All agents must verify their workspace location with `git worktree list` before starting work

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
| **Icons** | **Material Icons Rounded** | Consistent, comprehensive, accessible icon set |
| **Typography** | **Lexend** (primary), **Roboto Mono** (code), **Noto** (i18n) | Optimized for readability and global support |

For detailed design rationale, see [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md).

---

## 3. State & Data Management

To ensure a scalable, maintainable, and predictable application, we enforce a strict separation between client-side UI state and server-side cache state.

| Area           | Decision                | Rationale                                                                                                                                                                                                                                   |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client State** | **Redux Toolkit (RTK)** | For managing global UI state. RTK provides a centralized store, predictable state transitions, and robust debugging tools. Its structured nature is essential for the anticipated complexity of the application, ensuring long-term maintainability. |
| **Server State** | **TanStack Query**      | For all interactions with our Firebase backend. It is not a general data-fetching library; it is a *server state management* tool. It handles caching, refetching, and synchronization automatically, keeping our Redux store clean and free of stale server data.   |

**Key Principle:** The Redux store **must never** contain raw server-side data. It should only hold client-side state, such as UI settings, session information, or identifiers that `TanStack Query` can use to fetch the actual data. All data fetched from Firebase must be managed by TanStack Query.

**Offline expectations:** TanStack Query persistence keeps recent API data available when the device is offline. Queries and mutations are retried automatically when connectivity is restored. Components should render cached data first and gracefully degrade if no cache is available.

### Offline Implementation Details

1. **Query Persistence**: The `QueryClientProviderWithPersist` component in `apps/product/src/contexts/QueryClientProvider.tsx` configures AsyncStorage-based persistence with a 24-hour cache time.

2. **Network-Aware Queries**: Use the `usePersistedQuery` hook from `apps/product/src/hooks/usePersistedQuery.ts` for network-aware data fetching. This hook:
   - Disables queries when offline
   - Automatically retries when connection is restored
   - Provides exponential backoff for failed requests

3. **Offline UI**: The `NetworkErrorBoundary` component provides:
   - Automatic network status detection
   - User-friendly offline UI with retry capabilities
   - Hooks into TanStack Query for automatic refetching
   - Accessibility announcements for connection state changes

4. **Best Practices**:
   - Always use `usePersistedQuery` instead of raw `useQuery` for Firebase data
   - Wrap screens that need network data with `NetworkErrorBoundary`
   - Design UI to gracefully handle stale data scenarios
   - Test offline behavior using device airplane mode

---

## 4. Folder layout (authoritative)

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
│   └── snippets/          # Code snippets for BGUI components
│
├── .github/workflows/     # CI / CD
├── firebase.json
├── .firebaserc
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

> **Rule:** Deployable `apps/*` may depend on `packages/*`,  
> `packages/*` **must never** depend on `apps/*` — keep the DAG acyclic.

---

## 5. Build & dev workflow

### Monorepo Management
- **Turborepo** organizes apps and packages with a unified task graph
- Atomic commits ensure related changes across packages stay together
- Shared caching keeps builds fast and reproducible
- Optional remote caching (e.g., Vercel) speeds up CI across pull requests

### Development Commands

| Task | Command |
|------|---------|
| Dev all | `pnpm dev` |
| Dev Expo only | `pnpm dev --filter product` |
| Dev Next only | `pnpm dev --filter website` |
| Lint / format | `pnpm lint` (Biome) |
| Unit tests | `pnpm test` (Jest) |
| Storybook | `pnpm storybook` |
| Prod build | `pnpm build` (Turbo graph) |

Turbo pipelines (defined in `turbo.json`):

```
dev   -> transpile            (no cache)
build -> transpile -> test -> typecheck -> package
```

`packages/bgui` publishes via **Changesets** on merge to `main`.

---

## 6. CI / CD pipeline (GitHub Actions)

### Quality Gates
- **Zero tolerance** policy for lint and type errors
- Mandatory pre-commit hooks run `pnpm lint` and `pnpm typecheck`
- Tests run with `pnpm test` in CI before any merge

### Pipeline Stages

1. **lint** → Biome and dependency graph checks
2. **test** → unit and e2e suites (Jest, Playwright, Maestro)
3. **build** → Turbo cache and artifact upload
4. **deploy** → preview on Vercel (web) and Expo EAS (app)
5. **release** → publish packages with Changesets, Firebase deploy

---

## 7. Environments

| Env | URL | Notes |
|-----|-----|-------|
| **Local** | `http://localhost:{expo|next}` | `.env.local` |
| **Preview** | Vercel/Expo preview URLs | Added as PR comment |
| **Prod** | see domains above | Firebase Hosting |

---

## 8. Task Management & AI Coordination

Key files for task tracking and AI agent coordination:

| File | Purpose | Update Frequency |
|------|---------|------------------|
| **TODO.md** | Central task tracker with priorities | Daily/per session |
| **LESSONS.md** | Technical learnings & patterns | As discovered |
| **CLAUDE.md** | Project-specific AI instructions | As needed |
| **AGENTS.md** | AI agent roles and guidelines | When adding agents |

All AI agents **MUST**:
1. Read `TODO.md` before starting work
2. Update task status when beginning/completing tasks
3. Significant learnings should be added to `LESSONS.md`
4. Follow conventions in `CLAUDE.md` and this document

---

## 9. Security & compliance

- Secrets only in CI secret manager; scanned via Secretlint (`pnpm secrets:scan`).  
- Dependabot weekly updates for npm + GH Actions.  
- Disclosure policy in [SECURITY.md](../.github/SECURITY.md).

---

## 10. Monitoring & Observability

Brain Game uses **Sentry** for crash reporting and performance tracing across
both applications. DSNs are supplied via environment variables (`SENTRY_DSN`
for the Expo app and `NEXT_PUBLIC_SENTRY_DSN` for the Next.js website). The
Sentry SDKs are configured with `tracesSampleRate: 1.0` to capture basic
performance metrics such as app launch times and route transitions.

---
## 11. Extension points

- **Add platform**: create `apps/desktop` (Electron/Tauri).
  - Mirror `apps/product` structure (`src/`, `public/`, config files).
  - Package with Tauri CLI to produce signed `.dmg`/`.exe` installers.
  - Publish installers via GitHub Releases with auto‑update enabled.
- **Extract UI kit**: move `packages/bgui` to its own repo; replace workspace dep with npm.
- **Feature flags**: insert LaunchDarkly wrapper in `packages/utils`.

---

_End of file_

# Brain Game • Universal App + Website + UI Kit (monorepo)

<!-- Enterprise-grade project badges -->
![CI](https://img.shields.io/badge/CI-passing-brightgreen?style=flat-square&logo=github)
![Lint](https://img.shields.io/badge/Lint-biome-60a5fa?style=flat-square&logo=eslint)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square&logo=jest)
![Security](https://img.shields.io/badge/security-secretlint-critical?style=flat-square&logo=shield)
![Monorepo](https://img.shields.io/badge/monorepo-turborepo-ef4444?style=flat-square&logo=turborepo)
![Package Manager](https://img.shields.io/badge/package%20manager-pnpm-f69220?style=flat-square&logo=pnpm)
![Built by](https://img.shields.io/badge/Built%20by-Brain%20Game-8a2be2?style=flat-square&logo=react)

Brain Game is a personal‑development tech company.

| Surface | Tech | Domain |
|---------|------|--------|
| Universal client | Expo / React Native (+ react‑native‑web) | `app.braingame.dev` |
| Marketing & docs site | Next.js (in `apps/website`) | `www.braingame.dev` |
| UI kit | `packages/bgui` – open‑source React Native components | npm: `@brain-game/bgui` |

A single **Turborepo** + **pnpm workspaces** keeps all code, tests and tooling in one place.

---

## Quick start

> **Prereqs** – Node ≥18, pnpm ≥9, Git, Firebase CLI

```bash
git clone https://github.com/braingame-com/braingame.git
cd braingame

# install all deps
pnpm install

# run both apps (Expo & Next) in watch mode
pnpm dev
```

### Individual dev servers

```bash
# Expo universal app
pnpm dev --filter product

# Next.js marketing / docs
pnpm dev --filter website
```

### Common scripts

| Command | Description |
|---------|-------------|
| `pnpm lint` | Lint & format with **Biome** |
| `pnpm test` | Unit tests (Jest) |
| `pnpm secrets:check` | **Secret scanning** with Secretlint |
| `pnpm build` | Turbo graph build (web & app) |
| `pnpm storybook` | Run BGUI Storybook (not yet implemented) |
| `pnpm clean` | Purge caches, dist, .next |

---

## Monorepo layout (abridged)

```
apps/           # deployables
  website/      # Next.js site
  product/      # Expo universal client

packages/       # shared libraries
  bgui/         # UI kit (RN + web)
  utils/        # helpers, Firebase wrappers
  config/       # lint / TS / Biome presets

docs/           # architecture, ADRs, runbooks
```

Full details live in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## Contributing

1. Fork → branch → code.  
2. `pnpm lint && pnpm test` must pass.  
3. Follow commit‑message conventions (Changesets bumps versions).  
4. Open a PR — CI runs build, tests and preview deploys.

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full checklist.

---

## Security

Vulnerability reports → hello@braingame.dev.  
Policy & supported versions in **[SECURITY.md](SECURITY.md)**.

---

## License

MIT © Brain Game 2025

# BrainGame • Universal App + Website + UI Kit (monorepo)

BrainGame is a personal‑development tech company.

| Surface | Tech | Domain |
|---------|------|--------|
| Universal client | Expo / React Native (+ react‑native‑web) | `app.mywebsite.com` |
| Marketing & docs site | Next.js (in `apps/web`) | `www.mywebsite.com` |
| UI kit | `packages/bgui` – open‑source React Native components | npm: `@brain-game/bgui` |

A single **Turborepo** + **pnpm workspaces** keeps all code, tests and tooling in one place.

---

## Quick start

> **Prereqs** – Node ≥18, pnpm ≥9, Git, Firebase CLI

```bash
git clone https://github.com/brain-game/brain-game.git
cd brain-game

# install all deps
pnpm install

# run both apps (Expo & Next) in watch mode
pnpm dev
```

### Individual dev servers

```bash
# Expo universal app
pnpm dev --filter app

# Next.js marketing / docs
pnpm dev --filter web
```

### Common scripts

| Command | Description |
|---------|-------------|
| `pnpm lint` | Lint & format with **Biome** |
| `pnpm test` | Unit tests (Vitest / Jest) |
| `pnpm build` | Turbo graph build (web & app) |
| `pnpm storybook` | Run BGUI Storybook |
| `pnpm clean` | Purge caches, dist, .next |

---

## Monorepo layout (abridged)

```
apps/           # deployables
  web/          # Next.js site
  app/          # Expo universal client

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

Vulnerability reports → security@mywebsite.com.  
Policy & supported versions in **[SECURITY.md](SECURITY.md)**.

---

## License

MIT © BrainGame 2025

# Workspace Map

Brain Game uses a Turborepo + pnpm workspace. This map highlights the primary workspaces, what they ship, and who owns the outcomes.

## Applications
| Path | Purpose | Owner |
| --- | --- | --- |
| `apps/product` | Expo client for iOS/Android/Web delivering the core habit training experience | Product Engineering |
| `apps/main-site` | Next.js marketing site responsible for acquisition funnels and experiments | Marketing & Web Ops |
| `apps/docs-site` | Next.js docs portal that showcases BGUI components and usage examples | Developer Experience |
| `apps/api` | Backend services and scheduled jobs exposed over Firebase / Cloud Functions | Platform Engineering |

## Packages
| Path | Purpose | Owner |
| --- | --- | --- |
| `packages/bgui` | Universal component library (React Native + web adapters) | Design Systems |
| `packages/utils` | Shared hooks, tokens, analytics helpers, and cross-app utilities | Platform Engineering |
| `packages/config` | Centralized TypeScript, Biome, Jest, and tooling configs | Platform Engineering |
| `packages/i18n` | Localization bundles and translation helpers | Localization Guild |

## Shared Resources
| Path | Purpose | Owner |
| --- | --- | --- |
| `docs/` | Canonical product/developer handbook grouped by domain | Developer Experience |
| `scripts/` | Operational tooling invoked through pnpm/turbo tasks | Platform Engineering |
| `assets/` | Brand assets, logos, and shared imagery | Brand Studio |

**Tip:** Use `pnpm workspace:graph` to visualize task dependency edges across these workspaces before editing multiple areas at once.

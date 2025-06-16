# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task Management

Before starting any work:
1. **Read `docs/BRAND.md`** for brand guidelines and contact information
2. **Always read `TODO.md`** to understand current priorities and task status
2. **Update task status** in TODO.md when beginning work (mark as `in_progress`)
3. **Complete one task at a time** - mark completed before starting next
4. **Update `AI_CONTEXT.md`** with a session summary when finishing work

## Project Overview

Brain Game is a personal-development tech company with a monorepo structure containing:

1. Universal client app (Expo/React Native + react-native-web) at `apps/product`
2. Marketing & docs site (Next.js) at `apps/website` 
3. UI kit (React Native components that work on web) at `packages/bgui`

The repository uses Turborepo + pnpm workspaces to manage all code, tests, and tooling.

## Common Commands

### Development

```bash
# Install all dependencies
pnpm install

# Run all apps in watch mode (Expo & Next)
pnpm dev

# Run only the Expo universal app
pnpm dev --filter product

# Run only the Next.js website
pnpm dev --filter website

# Run Storybook for UI components
pnpm storybook
```

### Build & Test

```bash
# Lint & format with Biome
pnpm lint

# Run unit tests (Jest/Vitest)
pnpm test

# Build all projects
pnpm build

# Clean caches, dist folders, .next
pnpm clean
```

### Platform-Specific Commands

```bash
# Start the Expo app (iOS)
pnpm --filter product ios

# Start the Expo app (Android)
pnpm --filter product android

# Start the Expo app (Web)
pnpm --filter product web
```

## Architecture

### Monorepo Structure

```
apps/           # Deployable applications
  product/      # Expo universal client
  website/      # Next.js marketing site

packages/       # Shared libraries
  bgui/         # UI kit (React Native + web)
  utils/        # Shared helpers, Firebase wrappers, hooks
  config/       # Linting, TypeScript, Biome configuration
```

### Key Dependencies

- **Universal App**: Expo, React Native, react-native-web
- **Website**: Next.js
- **Shared**: Biome (linting/formatting), TypeScript, pnpm, Turborepo

### Development Principles

1. Deployable `apps/*` may depend on `packages/*`
2. `packages/*` must never depend on `apps/*` (keep the DAG acyclic)
3. Shared UI components should go in the `bgui` package
4. Shared utilities should go in the `utils` package
5. Use Biome for formatting and linting

## Testing

- Unit tests are run with Jest (with jest-expo preset for the Expo app)
- Run tests with `pnpm test`
- Tests should be located alongside the files they test

## CI/CD Pipeline

The CI/CD pipeline (GitHub Actions) follows these steps:

1. **lint**: Biome, dependency graph check
2. **test**: Unit & E2E tests (Playwright, Maestro) 
3. **build**: Turborepo cache, artifact upload
4. **preview deploy**: Vercel (web) & Expo EAS (app)
5. **release** (main branch only): Changesets publish, Firebase deploy

## Security & Compliance

- Secrets only in CI secret manager
- Pre-commit hooks scan for secrets
- Dependabot weekly updates for npm + GitHub Actions
- Disclosure policy in SECURITY.md
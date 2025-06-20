# Component Organization Guide

This guide explains how we structure folders in the Brain Game monorepo and the conventions we follow when naming files.

## Monorepo Layout

The high level directory layout is defined in [ARCHITECTURE.md](./ARCHITECTURE.md). At a glance:

```text
braingame/
├─ apps/        # Deployable Expo/Next applications
├─ packages/    # Reusable libraries (UI kit, utilities, config)
└─ docs/        # Documentation and design notes
```

Applications may depend on any package, but packages should never import from apps.

## BGUI Component Structure

All reusable UI components live in `packages/bgui/src/components`. Each component has its own folder named with **PascalCase**:

```
packages/bgui/src/components/ExampleComponent/
├─ ExampleComponent.tsx
├─ styles.ts
├─ types.ts
├─ utils.ts
├─ ExampleComponent.test.tsx
└─ index.ts        # `export * from './ExampleComponent'`
```

Simple components can be a single file, but once additional styles, utilities or tests are required the folder-per-component pattern above should be used. This keeps logic, tests and types colocated.

## Naming Conventions

Naming rules mirror those in [CODING_STYLE.md](./CODING_STYLE.md):

| Item | Convention |
|------|------------|
| Components & Types | `PascalCase` |
| Files & Directories | `kebab-case` for general folders, but BGUI component folders use `PascalCase` |
| Variables & Functions | `camelCase` |
| Constants | `CONSTANT_CASE` |
| Custom Hooks | `useCamelCase` |

Custom hooks shared across packages belong in `packages/utils/src/hooks` and should be prefixed with `use`.

---

Following these standards helps every contributor understand where code lives and keeps imports predictable.

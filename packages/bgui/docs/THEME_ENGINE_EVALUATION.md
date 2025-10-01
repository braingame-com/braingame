# BGUI Theme Engine Evaluation

## Current State
- **Restyle footprint**: We currently rely on `@shopify/restyle` for `createTheme`, `ThemeProvider`, and the `Box` primitive produced by `createBox`. Unit tests wrap components in Restyle's `ThemeProvider` to provide tokens.
- **Static theme consumption**: Most primitives/compositions import the exported `theme` object directly (e.g., `Button`, `Typography`, `Card`). This bypasses Restyle's context, so `BGUIThemeProvider` cannot swap tokens at runtime (dark mode/custom themes).
- **Token surface**: `packages/bgui/src/theme/theme.ts` defines extensive MD3 + Joy UI tokens (colors, spacing, radii, typography, component variant maps) inside `createTheme`. The same file exports a cloned `darkTheme` and forwards the full type.
- **DX gaps**: Restyle's prop-based ergonomics (`padding="md"`) are only used in `Box`; other components hand-roll styles. At the same time, the dynamic `theme` object is treated as a static module, so we pay dependency cost without runtime benefit.

## Requirements for an In-House Theme Engine
### Functional
- Runtime theme switching (light/dark and future brand themes) that updates all components without reload.
- Typed access to design tokens: colors, spacing, radii, typography, elevation, motion, component variants.
- Shared renderer for both React Native and React Native Web.
- Backwards compatibility adapters so existing imports (`theme`, `BGUIThemeProvider`) keep working during migration.
- Support for state-aware tokens (hover, focus, disabled) and component variants defined in `variants.ts`.

### Developer Experience
- Strong TypeScript types for tokens to prevent typos (intellisense for `spacing.md`, `colors.primary`).
- Hooks/utility helpers (`useTheme`, `useToken`, `resolveVariant`) with minimal boilerplate.
- Simple primitives replacing `createBox`/`createText` that work in RN & web without locking us to Restyle.
- Tree-shakable exports to keep bundle size low.

### Non-Functional
- Zero third-party runtime dependency for theming.
- Unit- and snapshot-test friendly API.
- Clear separation between design tokens (JSON) and computed style helpers to ease tooling (e.g., design ops).

## Proposed Architecture
1. **Core theme package (`@braingame/theme`)**
   - Expose the canonical `Theme` TypeScript type generated from token JSON (`bgui-theme.json`).
   - Provide `createTheme()` that merges MD3 palettes, semantic aliases, typography, spacing, etc.
   - Include helpers for dark theme derivation and future brand overrides.

2. **Runtime context**
   - Implement `ThemeProvider` using `React.createContext` + `useMemo` to supply tokens.
   - Export `useTheme`, `useToken(path)`, `withTheme` HOC for class components (if needed).
   - Include optional `ThemeRegistry` for observing theme switches (useful for storybook/tests).

3. **Primitives layer**
   - Recreate `Box`/`Text` primitives as thin wrappers around `View`/`Text`, optionally supporting shorthand props via TypeScript generics.
   - Build a utility (`styled` or `sx`) to compose styles with tokens without adopting full CSS-in-JS.

4. **Variant + state utilities**
   - Extract logic from `variants.ts` into reusable functions (e.g., `resolveVariant(component, variant, color, theme)`).
   - Provide state-style helpers (`getInteractiveStyles({ hover, focus, pressed })`).

5. **Tooling**
   - Generate ambient TypeScript declarations from token JSON so IDEs know valid token keys.
   - Optional Babel/TS transformer (later) to strip unused token branches.

## Migration Plan
1. **Bootstrap core**
   - Create `packages/theme` with the context, hooks, and token factories.
   - Mirror current `theme` exports so `import { theme } from "@braingame/bgui"` remains valid.

2. **Adopt provider**
   - Update `BGUIThemeProvider` to wrap children with the new context (keeping the public name stable).
   - Provide compatibility shim that still exposes Restyle's `ThemeProvider` for consumers until they migrate.

3. **Replace primitives**
   - Introduce new `Box`/`Text` primitives backed by our context; refactor internal components to consume them.
   - Add codemods and ESLint rule to prevent new imports from Restyle.

4. **Component rollout**
   - Incrementally refactor primitives and compositions to read tokens via `useTheme` instead of importing the static `theme` object.
   - As each component migrates, delete Restyle-specific code paths/tests.

5. **Dependency removal**
   - Update tests to use the new provider + helper render wrappers.
   - Remove Restyle once no imports remain, then bump major version (since public API surface changes).

## Effort Estimate (team of 1-2 engineers)
- Core theme package + provider + typings: **2-3 days**
- Primitives layer & compatibility shims: **2 days**
- Component migration (approx. 30 components, 1-2 hrs each including tests): **1.5-2 weeks**
- Cleanup, documentation, release process: **1-2 days**
- Total: **~3 weeks of focused work** (could compress with parallel effort).

## Risks & Mitigations
- **Regression risk**: Theme-driven styling touches every component. Mitigate with snapshot/visual regression tests (see next TODO item).
- **Timeline creep**: Component-by-component migration can drag. Mitigate by scripting token access replacement and tracking progress in TODO.
- **Maintainability**: Owning a theme engine means ongoing upkeep. Document internals and add lint rules to avoid regressions.

## Recommendation
Proceed with building the in-house engine. We currently pay Restyle's dependency cost without leveraging its dynamic capabilities, and the custom solution lets us align theme consumption, remove external risk, and tailor the API to BGUI's MD3/Joy blend. Prioritize establishing the core package and migration scaffolding before touching individual components.

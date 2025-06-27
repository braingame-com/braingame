# Design System Audit

## Token Usage
- Provided tokens in `packages/utils/constants/Tokens.ts` define a base spacing scale from 2px to 72px.
- Semantic token mappings defined in `packages/utils/constants/SemanticTokens.ts`.
- BGUI components like Alert and Card use tokens for padding and border radius.
- Marketing site components (`apps/main-site/src/app/page.tsx` and `page.module.css`) hardcode colors, spacing and fonts rather than referencing tokens.

## Component Variance & Duplication
- 33 stories exist under `packages/bgui/src/**/*.stories.tsx` documenting most components.
- Remaining components listed in `packages/bgui/docs/BGUI_COMPONENT_PLAN.md` include Alert, Breadcrumb and TextInput enhancements.
- Some custom CSS modules duplicate styling already available via BGUI components.

## Storybook Coverage vs Figma Parity
- Storybook is configured via `packages/bgui/.storybook`. Coverage exists for 25 of 28 components.
- Figma parity is unclear; README lacks direct links and components show inconsistent token usage.

## Responsive Consistency
- CSS modules use static `@media` breakpoints (e.g., `min-width: 768px` in `page.module.css`).
- No tokenized breakpoint system leading to inconsistent responsive behavior.

## CSS Debt & Strategy
- CSS modules contain raw color values, animations and layout rules outside of the token system.
- Mixed approach between CSS modules and React Native StyleSheet patterns results in overrides and difficult maintenance.

## Merge Plan
1. **Token Standardization** – Replace hardcoded values in `apps/main-site` with token references.
2. **Complete Component Library** – Finish remaining components and ensure Storybook stories reflect Figma designs.
3. **Responsive Tokens** – Introduce breakpoint tokens and refactor media queries.
4. **CSS Consolidation** – Migrate custom CSS modules into BGUI components or token‑based styles to reduce duplication.
5. **Documentation** – Update README and docs to reference the token system and Storybook location.

*Annotated screenshots could not be captured within the Codex environment.*

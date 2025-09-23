# BGUI WIP Migration Prompts

## Global Instructions
- Copy this block plus your agent-specific prompt into your working session.
- Create a feature branch named `feat/bgui-migrate-<component-slug>` that reflects your assigned set.
- Touch only the listed component folders, their colocated stories/tests, and any new universal files you add. Do not edit `packages/bgui/src/index.ts`, theme tokens, icons, or other components; leave follow-up notes in your PR description when shared exports need updating.
- Universal primitives live under `packages/bgui/src/components/primitives/<Component>`; universal compositions belong in `packages/bgui/src/components/compositions/<Component>`. Keep file names in PascalCase and drop the `.web/.native` split.
- Migration flow: review the existing `.web` and `.native` implementations, build a single cross-platform file, update imports/exports inside the component folder, port or rewrite tests and stories, then delete the legacy platform-specific files once everything passes.
- Depend on existing primitives (`Box`, `Button`, `Stack`, `Typography`, etc.) and the theme tokens under `packages/bgui/src/theme`. Reuse utility hooks from `packages/bgui/src/hooks` instead of reimplementing them.
- Accessibility parity matters: preserve focus handling, keyboard support, press states, and aria-like semantics using React Native equivalents.
- Use comments sparingly and annotate any intentional gaps with `TODO(<name>): context`.
- Run `pnpm lint --filter bgui`, `pnpm test --filter bgui`, and `pnpm typecheck --filter bgui` before opening a PR. Document any failing checks you cannot resolve.
- Keep commits scoped to your assignment and include a checklist in the PR noting removed legacy files, updated stories/tests, and verification commands that were run.

## Primitive vs Composition Criteria
- **Primitive**: A cross-platform building block that maps directly to a single interactive or structural element (button, toggle, text field, simple layout wrapper). Primitives expose straightforward props, avoid internal routing/business logic, and can be safely reused within other primitives or compositions.
- **Composition**: A higher-order component that orchestrates multiple primitives, manages shared state or context, or represents a full UI pattern (tabs, modal, select menu, tooltips, list containers). Compositions can bundle subcomponents but should still rely on primitives for leaf nodes.

## Agent Prompts

### Agent 1 – Tab Navigation Suite
You are Agent 1 migrating `Tab`, `TabList`, `TabPanel`, and `Tabs`.
- Branch: `feat/bgui-migrate-tabs-suite`.
- Build a single composition in `packages/bgui/src/components/compositions/Tabs` that exposes `Tabs`, `TabList`, `Tab`, and `TabPanel` from one universal module with shared context for active tab state, keyboard navigation, and focus management.
- Replace direct DOM APIs with React Native primitives (`Pressable`, `Animated`, `useFocusEffect` as needed) while maintaining arrow-key navigation, aria roles, and orientation support.
- Update stories/tests to import from the new composition location and remove the `.web/.native` files once parity is verified.
- Note any follow-up required for library-level exports in your PR description instead of editing `packages/bgui/src/index.ts`.

### Agent 2 – Selection Toggles
You are Agent 2 migrating `Checkbox`, `Radio`, and `RadioGroup`.
- Branch: `feat/bgui-migrate-checkbox-radio`.
- Implement `Checkbox` and `Radio` as primitives under `packages/bgui/src/components/primitives/<Component>` sharing theme tokens for sizing, color, and states.
- Rebuild `RadioGroup` as a composition that wraps the primitive radios, providing context-driven state, form callbacks, and proper accessibility semantics across platforms.
- Ensure controlled/uncontrolled usage, focus rings, and press feedback work equivalently on web and native.
- Update stories/tests, delete platform-specific files, and leave export cleanup notes in the PR.

### Agent 3 – Select Controls
You are Agent 3 migrating `Select`, `Switch`, and `Textarea`.
- Branch: `feat/bgui-migrate-select-switch-textarea`.
- Deliver `Switch` and `Textarea` as primitives with shared sizing and color tokens, handling native accessibility props for value/toggle state.
- Rebuild `Select` as a composition that encapsulates trigger, listbox, and option behavior using primitives plus a lightweight overlay (reuse `Modal` or create an inline popover) with keyboard/touch parity.
- Support form integration (`value`, `defaultValue`, `onValueChange/onChange`) and expose subcomponents or render props as needed.
- Refresh stories/tests, remove legacy files, and document any export follow-up without touching `packages/bgui/src/index.ts`.

### Agent 4 – Overlays & Feedback
You are Agent 4 migrating `Modal`, `Tooltip`, and `Skeleton`.
- Branch: `feat/bgui-migrate-modal-tooltip-skeleton`.
- Implement `Skeleton` as a primitive that renders shimmer/loading placeholders using `Animated` plus theming tokens.
- Rebuild `Modal` and `Tooltip` as compositions that share overlay infrastructure (focus trap, dismissal, portal strategy) while remaining cross-platform.
- Preserve positioning logic, escape/back handling, and timing delays so existing stories/tests remain valid.
- Update stories/tests, replace imports with the new modules, remove `.web/.native` variants, and flag any export adjustments as a follow-up note.

### Agent 5 – Visual Effects
You are Agent 5 migrating `AnimatedGradientBackground`, `GlowingLogo`, and `LinearProgress`.
- Branch: `feat/bgui-migrate-visual-effects`.
- Convert `AnimatedGradientBackground` and `GlowingLogo` into compositions that wrap platform-appropriate animation primitives while exposing a consistent prop API for colors, speeds, and layout.
- Implement `LinearProgress` as a primitive covering determinate and indeterminate states using `Animated` and theming metrics.
- Ensure animations degrade gracefully on web (requestAnimationFrame) and native (native driver where possible).
- Align stories/tests with the new modules, eliminate platform-specific files, and leave export follow-up notes in the PR description.

### Agent 6 – Data Presentation
You are Agent 6 migrating `Card`, `List`, and `ListItem`.
- Branch: `feat/bgui-migrate-card-list`.
- Treat all three as compositions: compose existing primitives (`Box`, `Typography`, `Stack`) to deliver layout slots, elevation, and spacing hooks via theme tokens.
- Provide flexible structure (header/content/actions) for `Card` and context-driven selection/focus handling for `List`/`ListItem` to keep keyboard parity.
- Update stories/tests to cover interactive states, delete legacy platform files, and document export follow-up separately.

### Agent 7 – Status & Chips
You are Agent 7 migrating `Chip`, `Badge`, and `Alert`.
- Branch: `feat/bgui-migrate-status-primitives`.
- Implement `Chip` and `Badge` as primitives supporting variants, colors, icons, and dismiss actions using existing primitives like `Pressable` and `Typography`.
- Rebuild `Alert` as a composition that assembles primitives for icon, title, description, and actions with theming variants (success/error/info/warning).
- Maintain accessibility semantics (role announcements, focus on dismissible alerts) and remove the `.web/.native` files when parity is achieved.
- Refresh stories/tests and leave export adjustments as notes.

### Agent 8 – Media & Buttons
You are Agent 8 migrating `Avatar`, `IconButton`, and `CircularProgress`.
- Branch: `feat/bgui-migrate-avatar-iconbutton`.
- Implement `Avatar` as a primitive handling image fallback, initials, and size tokens; reuse `Box`/`Typography` where possible.
- Rebuild `IconButton` as a composition layering the `Button` primitive with `Icon`, ensuring size/variant alignment and accessible labels.
- Convert `CircularProgress` into a primitive supporting determinate/indeterminate states via `Animated`/`Svg` primitives.
- Update stories/tests, remove platform-specific files, and note export follow-up without editing shared indices.

### Agent 9 – Layout Essentials
You are Agent 9 migrating `Grid`, `Divider`, and `Stack`.
- Branch: `feat/bgui-clean-grid-divider-stack`.
- Implement `Divider` as a primitive exposing orientation, inset, and variant props using theme spacing and color tokens.
- Rebuild `Grid` as a composition providing responsive columns/gaps powered by primitives and theme breakpoints.
- Confirm the existing universal `Stack` implementation covers all features, migrate usages away from the WIP version, and remove the stale platform files after updating stories/tests.
- Record any export cleanups as notes in the PR.

### Agent 10 – Core Primitive Cleanup
You are Agent 10 finalizing `Box`, `Button`, and `Typography`.
- Branch: `feat/bgui-clean-box-button-typography`.
- Audit the new primitives already under `packages/bgui/src/components/primitives` to ensure they cover the WIP API surface, backfill missing props, and port any remaining tests/stories that still target the old platform files.
- Remove the legacy `.web/.native` implementations once coverage matches and update local indices within each component folder to point at the universal file.
- Do not redesign these primitives—focus on API parity, cleanup, and documentation updates in stories/tests.
- Leave any required root export changes as PR notes.

### Agent 11 – Form Foundation Cleanup
You are Agent 11 finalizing `Container`, `Input`, and `Link`.
- Branch: `feat/bgui-clean-container-input-link`.
- Verify the new primitives under `packages/bgui/src/components/primitives` fully match the WIP behavior (layout constraints, accessibility props, variants) and migrate remaining stories/tests to the universal implementation.
- Remove the obsolete `.web/.native` files, ensuring local `index.ts` re-exports the universal component only.
- Capture any API discrepancies or follow-up work as `TODO(<name>)` comments or PR notes, and keep shared exports untouched.

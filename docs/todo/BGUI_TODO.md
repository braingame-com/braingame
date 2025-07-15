# BGUI Migration - TODO Tracker

![Status](https://img.shields.io/badge/status-in%20progress-blue?style=for-the-badge&logo=github)
![Architecture](https://img.shields.io/badge/architecture-Platform%20Adapter-indigo?style=for-the-badge&logo=react)
![Styling](https://img.shields.io/badge/styling-Restyle-green?style=for-the-badge&logo=shopify)

This document provides a detailed, step-by-step checklist for executing the `bgui` migration, as defined in the `BGUI_MASTER_ROADMAP.md`. Each item represents an actionable task.

> **Project North Star:** The `web-bgui` implementation is the definitive source of truth for the visual style. All native components must strive to replicate the look, feel, and motion of their web counterparts as closely as possible.

---

## 🚀 Phase 0: Setup and Restructuring

*The goal of this phase is to prepare the `packages/bgui` directory for the migration, setting up the foundational structure required for the Platform Adapter Pattern.*

- [x] **Clean and Gut the Copied Package** *(Completed 15-07-2025)*
    - [x] Delete the `packages/bgui/scripts` directory. (These are MUI-specific scripts. Inspect for useful logic before deleting, but do not keep the files).
    - [x] Delete `packages/bgui/package.json.rn`.
    - [x] Delete `packages/bgui/tsconfig.build.json`.
    - [x] Delete `packages/bgui/tsconfig.json`.
    - [x] Delete `packages/bgui/README.md` and create a new, placeholder `README.md` for `bgui`.

- [x] **Adapt Web Component Tests** *(Completed 15-07-2025)*
    - [x] ~~Keep the valuable `*.test.tsx` files from the original `packages/bgui/test` directory.~~ (Deleted - all were MUI-specific)
    - [x] Create a new `packages/bgui/jest.config.js` that aligns with your monorepo's root testing configuration.
    - [x] ~~Review the test files and update imports and test utilities to work within the `braingame` monorepo.~~ (Will create new tests with Platform Adapter Pattern)

- [x] **Integrate `bgui` into the Monorepo** *(Completed 15-07-2025)*
    - [x] Overhaul `packages/bgui/package.json` to match the structure of other packages in the monorepo (e.g., `packages/utils`).
        - [x] Ensure `name` is `@braingame/bgui`.
        - [x] Add explicit versioning for dependencies (`^1.2.3`).
        - [x] Define `peerDependencies` for `react` and `react-native`.
        - [x] Remove all MUI-specific scripts.
        - [x] Add a `build` script that aligns with the Turborepo setup.
        - [x] Set `"main": "src/index.ts"` for now.
    - [x] Create a new `packages/bgui/tsconfig.json` that simply extends the root `tsconfig.json`.
    - [x] ~~**Critical:** Update the root CI pipeline (`.github/workflows/...`) to include `packages/bgui` in its build and test runs.~~ (Already included via packages/* pattern)

- [x] **Setup `bgui` Package Structure** *(Completed 15-07-2025)*
    - [x] Create the component directory: `packages/bgui/src/components`.
    - [x] Create the web source directory: `packages/bgui/src/web-bgui`. *(Decision: Renamed from `web-joy` for brand alignment)*
    - [x] Move the entire unmodified Joy UI source code into `packages/bgui/src/web-bgui`.
    - [x] Create web-bgui/index.ts to export all Joy UI components.
    - [x] Fix import paths (@mui/joy → relative imports).
    - [x] Update bgui_legacy package name to avoid conflicts.
    - [x] Verify package builds successfully.

- [x] **Archive Legacy Code** *(Completed)*
    - [x] Rename the existing `packages/bgui` to `packages/bgui_legacy`.
    - [x] Update `pnpm-workspace.yaml` to reflect this change if necessary.

- [x] **Install Core Dependencies** *(Completed 15-07-2025)*
    - [x] Add `@shopify/restyle` as a dependency to `packages/bgui/package.json`.
    - [x] Verify that `react` and `react-native` are listed as peer dependencies.

- [x] **Create Component Generator Script (Phase 0.5)** *(Completed 15-07-2025)*
    - [x] Create a new file: `scripts/create-bgui-component.js`.
    - [x] Implement the script logic to accept a component name (e.g., `Button`) as an argument.
    - [x] The script should automatically generate the following directory structure and file stubs:
        ```
        packages/bgui/src/components/Button/
        ├── Button.native.tsx     // Stub with basic native implementation
        ├── Button.web.tsx        // Stub with re-export from web-bgui
        ├── Button.props.ts       // Defines the shared props interface
        ├── Button.test.tsx       // Stub for component tests
        ├── Button.stories.tsx    // Stub for Storybook documentation
        └── index.ts              // Stub with universal export
        ```
    - [x] Both `Button.native.tsx` and `Button.web.tsx` should implement the shared `ButtonProps` from `Button.props.ts` to ensure API consistency.
    - [x] Script automatically updates package exports in src/index.ts.
    - [x] Includes helpful next steps and reminders about the Platform Adapter Pattern.

---

## 💎 Phase 0.75: Salvage `bgui_legacy` Assets *(Completed 15-07-2025)*

*The goal of this phase is to extract all valuable, compatible assets from `bgui_legacy` and integrate them into the new `bgui` package. This ensures no prior work is lost.*

- [x] **Audit `bgui_legacy` Source Code** *(Completed 15-07-2025)*
    - [x] Review the contents of `packages/bgui_legacy/src` to map out all assets.

- [x] **Migrate Theme and Tokens** *(Completed 15-07-2025)*
    - [x] Locate the theme definition files in `packages/bgui_legacy/src/theme` and `packages/bgui_legacy/src/constants`.
    - [x] Copy these theme files (e.g., Material Theme Builder JSON output) into the new `packages/bgui/src/theme` directory.
    - [x] **Crucial:** This becomes the foundational theme. The Joy UI theme tokens (from Phase 1) should be merged *into* this existing theme where appropriate, not the other way around. Your M3 theme is the primary source of truth for colors.
    - [x] Copied bgui-theme.json as m3-theme.json to packages/bgui/src/theme/

- [x] **Migrate Icon System** *(Completed 15-07-2025)*
    - [x] Review the existing Icon component in `packages/bgui_legacy/src/components`.
    - [x] Port the logic for using `react-native-svg` and the Material Symbols registry. This will serve as the direct foundation for the new `Icon.native.tsx` component.
    - [x] Copied iconRegistry.ts to packages/bgui/src/icons/

- [x] **Migrate Font Loading** *(Completed 15-07-2025)*
    - [x] Review any custom font-loading hooks in `packages/bgui_legacy/src/hooks`.
    - [x] Ensure the font assets (`Lexend`, `Roboto Mono`) are correctly located in the monorepo (e.g., `assets` folder) and that the loading logic can be reused in `apps/product`.
    - [x] Copied Fonts.ts configuration to packages/bgui/src/constants/

- [x] **Review and Migrate Documentation** *(Completed 15-07-2025)*
    - [x] Read through the `packages/bgui_legacy/docs` directory.
    - [x] Copy any relevant architectural decisions, component guidelines, or "gotchas" into the new `packages/bgui` documentation.
    - [x] Copied all docs to packages/bgui/docs/

- [x] **Additional Assets Migrated** *(Completed 15-07-2025)*
    - [x] Copied UIConstants.ts with layout and styling constants
    - [x] Copied useful hooks (useInteractiveState, useControlledState, etc.)
    - [x] Created index files for proper exports

- [ ] **Deprecate and Delete `bgui_legacy`**
    - [ ] Once all value has been extracted, delete the `packages/bgui_legacy` directory.
    - [ ] Remove `bgui_legacy` from `pnpm-workspace.yaml`.

---

## 🎨 Phase 1: Theme and `restyle` Implementation *(Completed 15-07-2025)*

*The goal of this phase is to establish the single source of truth for the design system and wire it up for our native components. This will now build upon the salvaged theme from Phase 0.75.*

- [x] **Isolate Design Tokens from Joy UI** *(Completed 15-07-2025)*
    - [x] Create the theme directory: `packages/bgui/src/theme`. *(This should already exist from the salvage phase)*.
    - [x] Systematically review the `src/web-bgui` directory to identify all theme and token definition files.
    - [x] **Reconcile Themes:** Merge the Joy UI tokens into your existing, salvaged M3 theme.
        - [x] **Merge Strategy:** Your M3 theme is the **primary source of truth for colors**. Joy UI color variants should only be added if they don't conflict. For all other tokens (typography, spacing, variants, radii, shadows), the more comprehensive **Joy UI definitions are the primary source of truth**.

- [x] **Implement `restyle` Theme** *(Completed 15-07-2025)*
    - [x] Create `packages/bgui/src/theme/theme.ts`.
    - [x] Import the raw tokens and use `createTheme` from `@shopify/restyle` to define the theme contract.
    - [x] **Crucial:** Create a `components` section in the theme to map Joy UI's `variant` and `color` props to `restyle` variants (e.g., `BGUI_Button: { variants: { solid: {...}, soft: {...} } }`).
    - [x] Ensure the theme type is exported for use throughout the native library.
    - [x] Created complete theme with M3 colors, Joy UI spacing/typography/radii
    - [x] Implemented component variants for Button (solid, soft, outlined, plain)
    - [x] Created dark theme variant

- [x] **Create BGUI Theme Provider** *(Completed 15-07-2025)*
    - [x] Create a `BGUIThemeProvider.tsx` component in `packages/bgui/src`.
    - [x] This component should wrap `@shopify/restyle`'s `ThemeProvider` and pass the defined theme.
    - [x] This provider will be used to wrap the React Native application (`apps/product`).
    - [x] Added automatic dark mode support based on system preference

- [x] **Build Foundational Primitives** *(Completed 15-07-2025)*
    - [x] Use the component generator script to create the `Box` component.
    - [x] Implement `Box.native.tsx` using `createBox` from `@shopify/restyle`.
    - [x] Use the component generator script to create the `Text` component.
    - [x] Implement `Text.native.tsx` using `createText` from `@shopify/restyle`.
    - [x] Updated props to use Restyle types
    - [x] Web implementations properly mapped to Joy UI components

---

## 🏗️ Phase 2: Systematic Component Implementation

*The goal of this phase is to build out the native component library, following the Platform Adapter Pattern for each component. Use the generator script for every new component.*

**Primary Directive for all Components:** For each component, start by inspecting its "headless hook" (e.g., `useButton`, `useInput`) in the `web-bgui` source. The native implementation must replicate the behavioral logic from this hook (state management, accessibility props, event handling) using React Native APIs.

### Tier 1: Direct Ports (Validate the System)
- [x] **Stack Component** *(Completed 15-07-2025)*
    - [x] Replicate logic from the relevant headless hook.
    - [x] Verify accessibility standards are met (labels, roles, etc.).
- [x] **Divider Component** *(Completed 15-07-2025)*
    - [x] Replicate logic from the relevant headless hook.
    - [x] Verify accessibility standards are met (labels, roles, etc.).
- [x] **Container Component** *(Completed 15-07-2025)*
    - [x] Replicate logic from the relevant headless hook.
    - [x] Verify accessibility standards are met (labels, roles, etc.).
- [x] **Establish Performance Baseline** *(Completed 15-07-2025)*
    - [x] Integrate `react-native-performance`.
    - [x] Measure and record the render times for `Box`, `Text`, `Stack`, `Divider`, and `Container` on a target device.
    - [x] Document this baseline. It will be the benchmark for all future components.

### Tier 2: Minor Adaptations (Core Interactive Elements)
- [ ] **Button Component**
    - [ ] Replicate logic from the `useButton` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Card Component**
    - [ ] Replicate logic from the relevant headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Avatar Component**
    - [ ] Replicate logic from the relevant headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Badge Component**
    - [ ] Replicate logic from the relevant headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Chip Component**
    - [ ] Replicate logic from the `useChip` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).

### Tier 3: Platform Differences (More Complex Logic)
- [ ] **Input Component** (will map to `TextInput`)
    - [ ] Replicate logic from the `useInput` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Select Component** (will require a custom native implementation, likely using a Modal)
    - [ ] Replicate logic from the `useSelect` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Modal Component** (will wrap React Native's `Modal`)
    - [ ] Replicate logic from the `useModal` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Tabs Component**
    - [ ] Replicate logic from the `useTabs` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).

### Tier 4: Post-MVP / Stretch Goals (Heaviest Lifts)
*Note: This entire tier is considered a stretch goal and should be deferred until a stable, usable library with Tiers 1-3 is complete and in use. The primary mission is to deliver the core library first.*
- [ ] **Autocomplete Component**
    - [ ] Replicate logic from the `useAutocomplete` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **DataGrid Component**
    - [ ] Replicate logic from the relevant headless hook. <!-- Note: When tackling this, investigate Shopify's recyclerlistview for performance. -->
    - [ ] Verify accessibility standards are met (labels, roles, etc.).
- [ ] **Drawer Component**
    - [ ] Replicate logic from the `useDrawer` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles,etc.).
- [ ] **Tooltip Component**
    - [ ] Replicate logic from the `useTooltip` headless hook.
    - [ ] Verify accessibility standards are met (labels, roles, etc.).

---

## 🔧 Phase 3: Infrastructure and Testing

*This phase should be worked on in parallel with Phase 2. Its goal is to ensure the library is robust, correctly bundled, and well-tested.*

- [ ] **Configure Package Entry Points**
    - [ ] In `packages/bgui/package.json`, correctly configure the `main`, `module`, and `react-native` fields to point to the correct build outputs.

- [ ] **Set Up Build Pipeline**
    - [ ] Configure `tsc` or another bundler with separate configs (e.g., `tsconfig.web.json`, `tsconfig.native.json`) to handle the platform-specific extensions.
    - [ ] Add `build:web` and `build:native` scripts to `packages/bgui/package.json`.
    - [ ] **Critical:** Add a bundle analysis step to the build process to verify that no native code is included in the web bundle, and vice-versa.

- [ ] **Implement Testing Strategy**
    - [ ] Set up Jest with `react-native-testing-library` for native component unit tests.
    - [ ] Set up Jest with `@testing-library/react` and `jsdom` for web component unit tests.
    - [ ] Set up Storybook for `react` to visually test and document web components.
    - [ ] Set up Storybook for `react-native` to visually test and document native components.
-   [ ] **Create a Smoke Test**
    -   [ ] Add a simple script that builds `bgui` and runs a minimal app to import and render one component on both web and native, failing if there's a crash.

-   **Define Rollback Plan & Revert Criteria**
    -   [ ] Formally document the rollback process (switching the `index.ts` export).
    -   [ ] Formally document the pause/revert criteria (critical bugs, performance misses, accessibility regressions).

---

This checklist, when completed, will result in the successful creation of the `bgui` universal component library. 
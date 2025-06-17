# CLAUDE.md - AI Agent Cheatsheet

> **This is your tactical guide.** It provides the essential commands and workflows for operating effectively within the Brain Game repository. For project structure and high-level decisions, refer to `docs/ARCHITECTURE.md`.

---

## 1. Golden Path Workflow
Follow these steps for every development task.

**Phase 1: Setup & Pre-flight**
1.  **Sync:** Ensure your local environment is up-to-date with the `main` branch.
2.  **Consult Docs:** Read `ARCHITECTURE.md` and `AI_CONTEXT.md` to refresh context.
3.  **Claim Task:** Mark your assigned task in `TODO.md` as `in_progress`.

**Phase 2: Development & Implementation**
1.  **Code:** Implement the required changes, following the guidelines below.
2.  **Lint:** Run `pnpm lint` frequently to ensure code is clean.
3.  **Test:** Add or update tests as needed. Run `pnpm test` to verify.

**Phase 3: Completion & Handoff**
1.  **Final Checks:** Run `pnpm lint` and `pnpm test` one last time.
2.  **Update Task:** Mark the task in `TODO.md` as `completed`.
3.  **Summarize:** Add a session summary to `AI_CONTEXT.md`.

---

## 2. Code Generation Guidelines

- **Language:** All code **MUST** be TypeScript.
- **Components:** All UI components go in the `packages/bgui` package. Follow the existing folder-per-component structure.
- **Utilities:** All shared helpers, hooks, and wrappers go in the `packages/utils` package.
- **Styling:** Use the theming system defined in `BGUI_COMPONENT_PLAN.md`. Do not use inline styles or arbitrary values.
- **Imports:** **MUST** use absolute imports for workspace packages (e.g., `@braingame/bgui`, `@braingame/utils`).
- **Quality:** Code must be "enterprise-grade"—robust, readable, and maintainable. Adhere to `CODING_STYLE.md`.

---

## 3. Administrative Guidelines

- **Date Format:** All dates in documentation (`TODO.md`, `AI_CONTEXT.md`, etc.) **MUST** use the `DD-MM-YYYY` format.
- **Accurate Dating:** Ensure the current, correct date is used. Time-traveling agents will be decommissioned.

---

## 4. Common Commands

### Core Development
```bash
# Install all monorepo dependencies
pnpm install

# Run all apps in development mode (Expo & Next.js)
pnpm dev

# Run only the Expo universal app
pnpm dev --filter product

# Run only the Next.js website
pnpm dev --filter website
```

### Quality & Testing
```bash
# Lint & format all files with Biome
pnpm lint

# Run all unit tests with Jest
pnpm test

# Build all packages and apps
pnpm build

# Clean all build caches and output folders
pnpm clean
```

### Platform-Specific
```bash
# Start the Expo app on the iOS Simulator
pnpm --filter product ios

# Start the Expo app on an Android emulator
pnpm --filter product android

# Start the Expo app in a web browser
pnpm --filter product web
```
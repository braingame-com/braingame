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
4.  **Document Session:** Create a detailed work session file in `docs/work-sessions/` using the format `YYYY-MM-DD-brief-description.md` with key learnings, solutions, and patterns discovered.

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

## 4. Work Session Documentation

**IMPORTANT:** At the end of each work session, create a comprehensive session document in `docs/work-sessions/`:

- **Filename Format:** `YYYY-MM-DD-brief-description.md`
- **Include:**
  - Session metadata (date, agent, objectives)
  - Detailed list of work completed
  - Key learnings and discoveries
  - Code examples and patterns
  - Solutions to complex problems
  - Recommendations for future work
- **Purpose:** Preserve knowledge, document solutions, and help future agents understand project evolution

See `docs/work-sessions/README.md` for detailed guidelines.

---

## 5. Git Worktree Usage (MANDATORY for AI Agents)

**⚠️ CRITICAL:** All AI agents MUST use the dedicated worktree for development to avoid conflicts with human work.

### Worktree Setup
The dedicated AI agent worktree is located at: `/Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox`

**Always work from this worktree, never from the main repository directory.**

### Workflow for AI Agents
1. **Start Here:** Always begin work in `/Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox`
2. **Create Branch:** Create feature branches from this worktree for specific tasks
3. **Develop:** Make all changes within this dedicated workspace
4. **Commit:** Use standard git commands to commit changes
5. **Create PR:** Use `gh pr create` to propose changes to main branch
6. **Collaborate:** This prevents conflicts with human development in main directory

### Worktree Commands
```bash
# Navigate to your dedicated worktree (mandatory first step)
cd /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox

# Create new feature branch for specific task
git checkout -b feature/your-task-name

# Standard development workflow
git add .
git commit -m "feat: your changes"

# Push and create PR when ready
git push -u origin feature/your-task-name
gh pr create --title "Your PR Title" --body "Description"
```

### Why This Matters
- **Prevents Conflicts:** Human and AI can work simultaneously without stepping on each other
- **Isolated Development:** Changes are contained until ready for review
- **Clean History:** Each feature gets proper branch/PR treatment
- **Safe Collaboration:** No risk of breaking human work in progress

---

## 6. Common Commands

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
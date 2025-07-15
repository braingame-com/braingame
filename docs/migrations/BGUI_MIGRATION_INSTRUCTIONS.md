# BGUI Migration Instructions

![Status](https://img.shields.io/badge/process-active-green?style=for-the-badge)
![Type](https://img.shields.io/badge/type-workflow-blue?style=for-the-badge)

## Overview

This document provides step-by-step instructions for engineers working on the BGUI migration project. Follow these instructions exactly to ensure consistent progress tracking and quality standards.

### Important Architecture Clarification

The `web-bgui` folder containing Joy UI source code is **temporary**. Think of it as a "quarry" from which we extract and adapt implementations:

1. **DO NOT** re-export components from web-bgui
2. **DO** copy the implementation into your .web.tsx file
3. **DO** adapt imports to work with our structure
4. **DO** ensure it works with our shared ComponentProps interface
5. The web-bgui folder will be deleted once all components are migrated

## Prerequisites

Before starting any BGUI migration work:

1. **Read the foundational documents:**
   - [ ] [BGUI_MASTER_ROADMAP.md](./BGUI_MASTER_ROADMAP.md) - Understand the overall strategy
   - [ ] [BGUI_TODO.md](../todo/BGUI_TODO.md) - See the complete task list
   - [ ] [CLAUDE.md](../../CLAUDE.md) - Review monorepo standards and AI agent guidelines
   - [ ] [CONTRIBUTING.md](../../.github/CONTRIBUTING.md) - Understand code quality standards

2. **Verify your workspace:**
   ```bash
   # Confirm you're in the correct directory
   pwd
   # Should show: /Users/jordancrow-stewart/Desktop/code/braingame
   
   # Check git status is clean
   git status
   ```

## Migration Workflow

### Step 1: Check Code Standards

Before writing any code, review the monorepo guidelines:

1. **Code Style Requirements:**
   - Zero lint errors or warnings (`pnpm lint` must pass)
   - Zero TypeScript errors (`pnpm typecheck` must pass)
   - No `any` types in public APIs
   - No `@ts-expect-error` or `biome-ignore` comments
   - Follow existing code patterns in the codebase

2. **Documentation Style:**
   - Use GitHub-flavored markdown
   - Include status badges where appropriate
   - Date format: DD-MM-YYYY
   - Clear headings and sections
   - Code examples with proper syntax highlighting

3. **Component Standards:**
   - Platform Adapter Pattern with .web.tsx and .native.tsx files
   - Shared props in ComponentNameProps.ts files
   - Copy Joy UI implementations, don't re-export
   - web-bgui is temporary and will be deleted
   - Must work on web, iOS, and Android
   - Follow Joy UI visual patterns

### Step 2: Select Next Task

1. Open [BGUI_TODO.md](../todo/BGUI_TODO.md)
2. Find the next unchecked task in the current phase
3. Read the task description and any inline comments
4. If the task has dependencies, ensure they're completed first

### Step 3: Implement the Task

1. **Work directly on main branch** (no feature branches needed)

2. **Follow the Platform Adapter Pattern:**
   - For components: Use the component generator script
   - Copy Joy UI implementation from web-bgui into .web.tsx files
   - Adapt imports to use relative paths
   - Build native implementation studying Joy UI's behavioral logic
   - web-bgui folder is a temporary "quarry" for extraction
   - For theme work: Ensure tokens work across all platforms
   - For infrastructure: Test on both web and native

3. **Verify your work:**
   ```bash
   # Run quality checks frequently
   pnpm lint
   pnpm typecheck
   pnpm test
   
   # Build to ensure no errors
   pnpm build
   ```

### Step 4: Update Progress Tracking

1. **Mark task complete in BGUI_TODO.md:**
   ```markdown
   - [x] **Task Name** *(Completed DD-MM-YYYY)*
   ```

2. **Record detailed progress in BGUI_MIGRATION_HISTORY.md:**
   
   Include:
   - Date and time of completion
   - Engineer name/type
   - **Commit hash** (run `git log -1 --format="%H"` after committing)
   - Exact steps taken
   - Files created or modified
   - Any challenges encountered
   - Solutions implemented
   - Dependencies added
   - Test results
   
   Example entry:
   ```markdown
   ## Phase 1: Theme Setup
   ### Created Restyle Theme Contract
   **Date:** 15-07-2025 14:30
   **Engineer:** [Your Name/AI Agent]
   **Commit:** `a1b2c3d4e5f6789...` (full hash)
   
   **Steps Taken:**
   1. Created `packages/bgui/src/theme/theme.ts`
   2. Imported M3 tokens from salvaged theme
   3. Mapped Joy UI variants to Restyle variants
   4. Exported typed theme for use in components
   
   **Files Modified:**
   - Created: `packages/bgui/src/theme/theme.ts`
   - Created: `packages/bgui/src/theme/types.ts`
   - Modified: `packages/bgui/src/index.ts` (added theme export)
   
   **Challenges:**
   - Joy UI uses different variant names than M3
   - Solution: Created mapping layer in theme contract
   
   **Dependencies Added:**
   - @shopify/restyle@2.4.2
   ```

### Step 5: Commit Changes

1. **Stage all changes:**
   ```bash
   git add .
   ```

2. **Create descriptive commit message:**
   ```bash
   git commit -m "feat(bgui): [component/feature] - brief description
   
   - Detailed point about what was implemented
   - Any important decisions made
   - References to BGUI_TODO.md task
   
   Refs: BGUI Phase [X] - [Task Name]"
   ```

   Example:
   ```bash
   git commit -m "feat(bgui): implement restyle theme contract
   
   - Created theme.ts with M3 and Joy UI token integration
   - Mapped Joy UI variants to Restyle component variants
   - Added typed theme exports for type safety
   - Integrated salvaged M3 color system
   
   Refs: BGUI Phase 1 - Theme and Restyle Implementation"
   ```

3. **Push to remote:**
   ```bash
   git push origin main
   ```

### Step 6: Report Progress to Human

After each commit, provide a clear summary to the human user:

1. **What was completed** - Brief description of the task
2. **Files changed** - List of created/modified files
3. **Next steps** - What task comes next in BGUI_TODO.md
4. **Any blockers** - Issues that need human decision

Example summary:
```
✅ Completed: Theme setup for BGUI
- Created theme.ts with Restyle contract
- Integrated M3 tokens from legacy theme
- Added type exports for components

📁 Files changed:
- packages/bgui/src/theme/theme.ts (new)
- packages/bgui/src/theme/types.ts (new)
- packages/bgui/src/index.ts (modified)

👉 Next: Create BGUIThemeProvider component

⚠️ Blocker: Need decision on whether to support dark mode in MVP
```

### Step 7: Rinse and Repeat

1. Return to Step 2 and select the next task
2. Continue until all Phase tasks are complete
3. Move to next Phase when ready

## Important Reminders

### Quality Gates

**Never skip these checks:**
-  All tests must pass
-  Zero lint errors/warnings
-  Zero TypeScript errors
-  Component works on all platforms
-  Follows Joy UI visual patterns

### Documentation

**Always update:**
-  BGUI_TODO.md (mark tasks complete)
-  BGUI_MIGRATION_HISTORY.md (detailed progress)
-  Component READMEs (if creating new components)
-  Storybook stories (for visual components)

### Communication

- Comment on complex decisions in PR
- Flag blockers immediately in team chat
- Update task status in project management tools
- Share learnings in LESSONS.md if you discover patterns

## Troubleshooting

### Common Issues

1. **Import errors after creating component:**
   - Ensure you exported from `packages/bgui/src/index.ts`
   - Run `pnpm build` to rebuild packages

2. **Platform-specific styling issues:**
   - Use Platform.select() not separate files
   - Test on all platforms before committing

3. **Theme not applying:**
   - Verify BGUIThemeProvider wraps your app
   - Check theme tokens are properly exported

### Getting Help

- Check [LESSONS.md](../../LESSONS.md) for similar issues
- Review existing bgui components for patterns
- Ask in #bgui-migration channel
- Tag @frontend-leads for architectural decisions

## Success Criteria

You know you've completed a task successfully when:
-  Task is checked in BGUI_TODO.md
-  Progress is recorded in BGUI_MIGRATION_HISTORY.md
-  All quality checks pass
-  PR is approved and merged
-  No regressions in existing functionality

---

**Remember:** Quality over speed. It's better to implement one component perfectly than rush through multiple components with issues.
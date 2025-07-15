# BGUI Migration Instructions

![Status](https://img.shields.io/badge/process-active-green?style=for-the-badge)
![Type](https://img.shields.io/badge/type-workflow-blue?style=for-the-badge)

## Overview

This document provides step-by-step instructions for engineers working on the BGUI migration project. Follow these instructions exactly to ensure consistent progress tracking and quality standards.

## Prerequisites

Before starting any BGUI migration work:

1. **Read the foundational documents:**
   - [ ] [BGUI_MASTER_ROADMAP.md](./BGUI_MASTER_ROADMAP.md) - Understand the overall strategy
   - [ ] [BGUI_TODO.md](../../todo/BGUI_TODO.md) - See the complete task list
   - [ ] [CLAUDE.md](../../CLAUDE.md) - Review monorepo standards and AI agent guidelines
   - [ ] [CONTRIBUTING.md](../../../../.github/CONTRIBUTING.md) - Understand code quality standards

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
   - Universal components only (no .web.tsx/.native.tsx split files)
   - Use Platform.select() for platform differences
   - Must work on web, iOS, and Android
   - Follow Joy UI visual patterns

### Step 2: Select Next Task

1. Open [BGUI_TODO.md](../../todo/BGUI_TODO.md)
2. Find the next unchecked task in the current phase
3. Read the task description and any inline comments
4. If the task has dependencies, ensure they're completed first

### Step 3: Implement the Task

1. **Create a feature branch:**
   ```bash
   git checkout -b feat/bgui-[task-description]
   # Example: git checkout -b feat/bgui-theme-setup
   ```

2. **Follow the Platform Adapter Pattern:**
   - For components: Use the component generator script when available
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
   git push -u origin feat/bgui-[task-description]
   ```

### Step 6: Create Pull Request

1. **Use GitHub CLI:**
   ```bash
   gh pr create --title "feat(bgui): [component/feature]" \
                --body "## Summary
   - Implements [task] from BGUI_TODO.md Phase [X]
   - [Brief description of changes]
   
   ## Changes
   - [List key changes]
   
   ## Testing
   - [ ] Lint passes
   - [ ] TypeCheck passes
   - [ ] Tests pass
   - [ ] Builds successfully
   
   ## References
   - BGUI_TODO.md: Phase [X] - [Task Name]
   - Related to #[issue-number] (if applicable)"
   ```

2. **Request review from team lead**

### Step 7: Rinse and Repeat

1. Once PR is merged, pull latest main:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Return to Step 2 and select the next task

## Important Reminders

### Quality Gates

**Never skip these checks:**
- ✅ All tests must pass
- ✅ Zero lint errors/warnings
- ✅ Zero TypeScript errors
- ✅ Component works on all platforms
- ✅ Follows Joy UI visual patterns

### Documentation

**Always update:**
- ✅ BGUI_TODO.md (mark tasks complete)
- ✅ BGUI_MIGRATION_HISTORY.md (detailed progress)
- ✅ Component READMEs (if creating new components)
- ✅ Storybook stories (for visual components)

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
- ✅ Task is checked in BGUI_TODO.md
- ✅ Progress is recorded in BGUI_MIGRATION_HISTORY.md
- ✅ All quality checks pass
- ✅ PR is approved and merged
- ✅ No regressions in existing functionality

---

**Remember:** Quality over speed. It's better to implement one component perfectly than rush through multiple components with issues.
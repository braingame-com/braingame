# AI Context - Brain Game

> **Last Updated**: 20-01-2025
> A tactical dashboard for AI agents to maintain momentum and context.

---

## 1. Current Focus
1. Documentation improvements for clarity and professionalism
2. Fixing typos, inconsistencies, and merge conflict markers
3. Adding developer-friendly humor while maintaining enterprise standards
4. Ensuring all markdown files are high-signal and well-structured

## ⚠️ Critical Workspace Information
**This repository uses git worktrees for isolation:**
- **Main worktree** (`braingame/`): Production work, final commits
- **Claude sandbox** (`braingame-claude-sandbox/`): AI development work
- **ALWAYS run `git worktree list` before starting work**
- **ALWAYS ask user which worktree to use if uncertain**

---

## 2. Recent Session Summaries
*For historical sessions, see `docs/work-sessions/` directory.*

### 20-01-2025 - Documentation Quality Improvements
- **Agent**: Claude (Opus 4)
- **Tasks**: Review and improve all .md files for clarity, professionalism, and humor
- **Completed**:
  - Fixed date typo in TESTING.md (21-06-2024 → 21-06-2025)
  - Removed merge conflict markers from AI_CONTEXT.md
  - Fixed non-standard dash characters in AGENTS.md and ARCHITECTURE.md
  - Removed bloated base64 badge from main README.md
  - Added Quick Links section to main README for developer convenience
  - Added TL;DR and Common Gotchas sections to CLAUDE.md with humor
  - Enhanced Common Pitfalls in WORKTREES.md with consequences
  - Removed duplicate content from DEVELOPMENT.md
  - Fixed CONTRIBUTING.md link to correct .github location
  - Added Post-Rejection Comeback Strategy to APP_STORE_SUBMISSION.md
  - Reduced AI_CONTEXT.md bloat by archiving old sessions
- **Key Improvements**:
  - Documentation is now more scannable and developer-friendly
  - Added appropriate humor without sacrificing professionalism
  - Fixed all identified typos and formatting inconsistencies
  - Improved navigation with Quick Links sections

### 20-01-2025 - Worktree Management & Documentation
- **Agent**: Claude (Opus 4)
- **Tasks**: Create comprehensive worktree documentation
- **Completed**:
  - Created dedicated `docs/WORKTREES.md` with setup instructions
  - Implemented pre-flight verification script (`scripts/check-workspace.sh`)
  - Added comprehensive workspace contamination prevention guide
- **Key Learning**: Proper workspace isolation prevents costly contamination incidents

### 20-01-2025 - Week 3 Advanced Features & Worktree Crisis Resolution
- **Agent**: Claude (Sonnet 4)
- **Duration**: ~2 hours
- **Major Incident**: Agent started working in main production repo instead of claude-sandbox
  - **Root Cause**: No worktree documentation + agent ignored existing workflow docs
  - **Impact**: Mixed Week 3 features with user's testing migration work
  - **Resolution**: Surgical git separation, preserved all work, restored proper isolation
  - **Prevention**: Added comprehensive worktree documentation to all agent docs
- **Key Learning**: **ALWAYS verify workspace location before starting any work**

### 19-01-2025 - BGUI Component Quality Improvement
- **Agent**: Claude (Opus 4)
- **Tasks**: Refactor all BGUI components to enterprise standards
- **Completed**:
  - All 9 phases completed successfully
  - 25 components refactored to enterprise standards
  - 3 custom hooks created for common patterns
  - 100% TypeScript compliance with proper type safety
- **Key Achievement**: Transformed BGUI into a truly enterprise-grade component library

### 19-01-2025 - BGUI Testing Infrastructure Setup
- **Agent**: Claude (Opus 4)
- **Tasks**: Set up React Native Testing Library for BGUI components
- **Blocker Encountered**: React Native 0.80.0 uses Flow type syntax which Jest cannot parse
- **Resolution**: Created comprehensive testing strategy document recommending Vitest
- **Documentation**: TESTING.md with modern testing approach

<!-- Add new session summaries above this line -->

---

## 3. Working Agreements for AI Agents

**Start of Session:**
- [ ] Verify workspace: `git worktree list && pwd`
- [ ] Read `TODO.md` for current priorities
- [ ] Read `CLAUDE.md` for project-specific instructions
- [ ] Update task status in `TODO.md` *before* starting

**During Session:**
- [ ] Follow existing code patterns and conventions
- [ ] Use `pnpm lint` to format code
- [ ] Run relevant tests with `pnpm test`

**End of Session:**
- [ ] Update `TODO.md` with completion status and date
- [ ] Add a new session summary to this file
- [ ] Run `pnpm lint` and `pnpm test` on all changes
- [ ] Create a detailed work session document in `docs/work-sessions/`

---

## 4. Project Reference

### Known Constraints
- React Native 0.80.0+ testing requires special handling (see TESTING.md)
- Basic CI/CD pipeline implemented (`.github/workflows/ci.yml`)
- Minimal Jest test suite (only utils package has tests)
- Turborepo configured via `turbo.json`
- Husky pre-commit hooks with secret scanning enabled

### Core Architecture Decisions
- Using **pnpm** workspaces (not npm/yarn)
- Using **Biome** for linting/formatting (not ESLint/Prettier)
- Using **Expo** for universal app (not separate React Native/web)
- Sharing UI components in `bgui` package
- **Redux Toolkit** for client state, **TanStack Query** for server state

### File Locations
- **Apps**: `apps/product` (Expo), `apps/website` (Next.js)
- **Shared UI**: `packages/bgui`
- **Utils**: `packages/utils`
- **Config**: `packages/config`
- **Docs**: `docs/*`
- **Work Sessions**: `docs/work-sessions/*`

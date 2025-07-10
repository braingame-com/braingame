# CLAUDE.md - AI Agent Cheatsheet

> **This is your tactical guide.** It provides the essential commands and workflows for operating effectively within the Brain Game repository.
> **Last Updated**: 28-06-2025

## 📚 **REQUIRED READING** (Read these docs before any development work)

### **Critical Workflow Docs:**
- **[📋 AGENTS.md](./AGENTS.md)** - AI agent roles, guardrails, and zero-tolerance quality policy
- **[🏗️ ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, worktree isolation, and technical blueprint  
- **[📖 LESSONS.md](./LESSONS.md)** - Critical technical learnings and incident prevention (includes all session summaries)
- **[📋 CONTRIBUTING.md](../../.github/CONTRIBUTING.md)** - Zero-tolerance quality standards and contribution workflow

### **Essential Process Docs:**
- **[🔄 PR_REVIEW_PROCESS.md](./PR_REVIEW_PROCESS.md)** - **CRITICAL: PR merge procedures with quality validation**
- **[⚙️ WORKTREES.md](./WORKTREES.md)** - Workspace isolation guide (prevents contamination)
- **[📝 TODO.md](../../TODO.md)** - Current task tracker and priority management

---

## 1. Golden Path Workflow
Follow these steps for every development task.

**Phase 1: Setup & Pre-flight**
1.  **Workspace Check:** ALWAYS run `git worktree list` and confirm location before starting
    - `braingame/` - Main production repo for final commits and releases
    - `braingame-claude-sandbox/` - Isolated workspace for AI development work
    - If uncertain which to use, STOP and ask the user
2.  **Location Verification:** Run `pwd && git branch --show-current` to confirm you're in the right place
3.  **Sync:** Ensure your local environment is up-to-date with the `main` branch.
4.  **Consult Required Docs:** Read the required docs above to refresh context.
5.  **Claim Task:** Mark your assigned task in `TODO.md` as `in_progress`.

⚠️ **CRITICAL WORKSPACE WARNING**: Working in the wrong directory has caused major incidents. AI agents MUST verify workspace location before starting any work. See [LESSONS.md](./LESSONS.md#workspace-contamination-20-06-2025) for incident details.

**Phase 2: Development & Implementation**
1.  **Code:** Implement the required changes, following the guidelines below.
2.  **Lint:** Run `pnpm lint` frequently to ensure code is clean.
3.  **Test:** Add or update tests as needed. Run `pnpm test` to verify.

**Phase 3: PR Creation & Review**
1.  **Create PR:** Use `gh pr create` with clear title and description
2.  **Follow PR Review Process:** See [PR_REVIEW_PROCESS.md](./PR_REVIEW_PROCESS.md) for complete merge procedures
3.  **Quality Validation:** Ensure each branch passes quality checks before merging
4.  **PR Closure Restriction:** ⚠️ **CRITICAL: AI agents are PROHIBITED from closing PRs.** You may only recommend PR closure with reasoning. Both merging AND closing PRs require explicit human approval

**Phase 4: Completion & Handoff**
1.  **Final Checks:** Run `pnpm lint` and `pnpm test` one last time.
2.  **Update Task:** Mark the task in `TODO.md` as `completed`.
3.  **Document Session:** Add your session summary to [LESSONS.md](./LESSONS.md) if you discovered new patterns or issues.

---

## 2. Code Quality Standards

**⚠️ CRITICAL:** All code must meet our zero-tolerance quality standards.

For complete quality standards, coding guidelines, and contribution workflow, see:
**[📋 CONTRIBUTING.md](../../.github/CONTRIBUTING.md)**

**Quick Reference - Zero Tolerance Policy:**
- ❌ No lint errors or warnings
- ❌ No TypeScript errors  
- ❌ No `--no-verify` (bypassing pre-commit hooks)
- ❌ No `any` types in public APIs
- ❌ No `@ts-expect-error` or `biome-ignore`
- ❌ No technical debt introduction

**Before every commit:**
```bash
pnpm lint      # Must be 0 errors, 0 warnings
pnpm typecheck # Must be 0 errors
```

---

## 3. Git Worktree Usage (MANDATORY for AI Agents)

**⚠️ CRITICAL:** All AI agents MUST use the dedicated worktree for development to avoid conflicts with human work.

### Worktree Setup
The dedicated AI agent worktree is located at: `/Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox`

**Always work from this worktree, never from the main repository directory.**

### GitHub Account Setup (CRITICAL)
**⚠️ MANDATORY FIRST STEP:** Always ensure you're using the correct GitHub account for braingame:

```bash
# Switch to the correct GitHub account for braingame project
gh auth switch --user jcs180

# Verify you're using the right account
gh auth status
```

**Why this matters:** The braingame repository requires the `jcs180` account, not `jcs-rca`. Always run this before any git operations to avoid permission errors.

### PR Merge Verification (CRITICAL)
**⚠️ WARNING:** A successful rebase + push ≠ a successful merge. Always verify:

```bash
# Verify PR merge status
gh pr view <number> --json state,mergedAt,mergedBy

# Check if changes made it to main
git log --oneline main | head -5

# Verify commits exist on target branch
git branch --contains <commit-hash>
```

**Lesson from 21-06-2025 incident:** Agent incorrectly reported PR as merged when it was only closed. See [LESSONS.md](./LESSONS.md#pr-merge-status-confusion-21-06-2025) for details.

### PR Closure Prohibition (CRITICAL)
**⚠️ CRITICAL: AI agents are PROHIBITED from closing PRs without explicit human approval.**

**Why this matters:**
- Closing PRs risks losing valuable work
- Closed PRs can be easily overlooked
- Work may need to be recreated from scratch
- Human judgment is required to determine if work is truly redundant or obsolete

**What AI agents CAN do:**
- Analyze PR status and conflicts
- Recommend PR closure with clear reasoning
- Document why a PR might be redundant or obsolete
- Suggest alternatives or related PRs

**What AI agents CANNOT do:**
- Execute `gh pr close` commands
- Make final decisions about PR closure
- Determine work is "not needed" without human confirmation

**Always present findings to humans for the final decision on PR closure.**

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

## 4. Administrative Guidelines

- **Date Format:** All dates in documentation (`TODO.md`, etc.) **MUST** use the `DD-MM-YYYY` format.
- **Accurate Dating:** Ensure the current, correct date is used. Time-traveling agents will be decommissioned.

---

## 5. Common Commands

### Core Development
```bash
# Install all monorepo dependencies
pnpm install

# Run all apps in development mode (Expo & Next.js)
pnpm dev

# Run only the Expo universal app
pnpm dev --filter @braingame/product

# Run only the Next.js website
pnpm dev --filter @braingame/main-site
```

### Quality & Testing
```bash
# Lint & format all files with Biome
pnpm lint

# Run all unit tests with Jest
pnpm test

# Scan for secrets with Secretlint
pnpm secrets:scan

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

---

## 6. Quick Reference Links

### **Quality & Standards:**
- [📊 QUALITY.md](./QUALITY.md) - Comprehensive code quality playbook with examples
- [💅 CODING_STYLE.md](./CODING_STYLE.md) - Code standards and anti-patterns  
- [🧪 TESTING.md](./TESTING.md) - Testing strategy and hybrid approach

### **Development Guides:**
- [⚙️ DEVELOPMENT.md](./DEVELOPMENT.md) - Environment setup and development workflow
- [🌍 I18N_WORKFLOW.md](./I18N_WORKFLOW.md) - Internationalization processes
- [🔒 SECURITY.md](../../.github/SECURITY.md) - Security policy and vulnerability reporting

### **Package Documentation:**
- [🛠️ Utils Package](../../packages/utils/README.md) - API reference for shared utilities and hooks
- [🎨 BGUI Package](../../packages/bgui/README.md) - Component library documentation

---

## 7. Working Agreements for AI Agents

**Start of Session:**
- [ ] Read `TODO.md` for current priorities
- [ ] Read this file (`CLAUDE.md`) for project-specific instructions
- [ ] Update task status in `TODO.md` *before* starting

**During Session:**
- [ ] Follow existing code patterns and conventions
- [ ] Use `pnpm lint` to format code
- [ ] Run relevant tests with `pnpm test`
- [ ] Verify workspace location frequently

**End of Session:**
- [ ] Update `TODO.md` with completion status and date
- [ ] Add key learnings to `LESSONS.md` if you discovered new patterns or issues
- [ ] Run `pnpm lint` and `pnpm test` on all changes
- [ ] Verify PR status if created (see PR Merge Verification above)

---

## 8. Project Architecture Quick Reference

### Core Architecture Decisions
- **Package Manager:** pnpm workspaces (not npm/yarn)
- **Linter/Formatter:** Biome (not ESLint/Prettier)
- **Universal App:** Expo (not separate React Native/web)
- **Shared UI:** `packages/bgui` component library
- **Monorepo Tooling:** Turborepo for builds and caching

### File Locations
- **Apps:** `apps/product` (Expo), `apps/main-site` (Next.js marketing), `apps/docs-site` (Next.js docs)
- **Shared UI:** `packages/bgui`
- **Utils:** `packages/utils`
- **Config:** `packages/config`
- **Docs:** `docs/*`

### Current Focus Areas
1. Advanced Week 3 feature implementation (YouTube integration, analytics, animations, Firebase cloud)
2. Advanced navigation patterns and authentication flows
3. Ensuring proper worktree isolation and documentation
4. Making the project enterprise-ready

---

## 9. Universal Component Philosophy

### Critical Principle (Updated 08-07-2025)
BGUI follows a **strict universal component philosophy** - all components must work seamlessly across React Native (iOS/Android) and React Native Web WITHOUT requiring platform-specific files.

### Key Guidelines
```typescript
// ✅ CORRECT - Universal component using Platform.select
export const MyComponent = () => {
  const shadowStyle = Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
    web: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  });
  
  return <View style={[styles.container, shadowStyle]} />;
};

// ❌ WRONG - Platform-specific files
// MyComponent.tsx (native)
// MyComponent.web.tsx (web)
```

### Platform Differences
When you need platform-specific behavior:
1. Use `Platform.OS` or `Platform.select()` for conditional logic
2. Keep all logic in a single file
3. Use React Native Web's built-in compatibility layer
4. Test on all platforms before committing

### Benefits
- **Single source of truth** - One component, one file
- **Reduced maintenance** - No duplicate code
- **Consistent behavior** - Same component everywhere
- **Better DX** - No platform switching needed

### Build Verification
**CRITICAL:** Always run `pnpm build` before committing to ensure:
- All packages build successfully
- Components work on all platforms
- No platform-specific imports break the build

---

## See Also

For deeper understanding of related topics:

- **[AGENTS.md](./AGENTS.md)** - Detailed AI agent roles, responsibilities, and guardrails
- **[DEVELOPMENT.md](../development/DEVELOPMENT.md)** - Complete development environment setup and workflow
- **[WORKTREES.md](../development/WORKTREES.md)** - In-depth guide to workspace isolation and git worktree management

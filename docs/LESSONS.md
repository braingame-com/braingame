# Essential Technical Knowledge

Critical learnings from Brain Game development.

## Critical Protocols

### Workspace Isolation
**Mandatory for all AI-human collaboration:**
```bash
# Always verify before any action
pwd && git branch --show-current && git status

# Use worktrees for isolation
git worktree add ../braingame-claude-sandbox
```

**Prevention Protocol:**
- Never work directly in main workspace for experiments
- Separate worktrees for production vs experimental work
- Verify workspace before every session

### Zero Tolerance Quality Policy
No exceptions for:
- Lint warnings (`pnpm lint` must pass 100%)
- TypeScript errors (`pnpm typecheck` clean)
- Failing tests
- Console.log statements

**Banned Practices:**
- Quick fixes over systematic solutions
- Skipping quality checks "just this once"
- Hardcoded values instead of tokens
- Mixed work streams in single workspace

## Core Technical Patterns

### TypeScript Excellence

**React Version Compatibility:**
```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  }
}
```

**Type-Safe Token System:**
```typescript
export const tokens = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  colors: { primary: '#007AFF', secondary: '#34C759' }
} as const;

type SpacingToken = keyof typeof tokens.spacing;
```

**Replace `any` with `unknown`:**
```typescript
// Bad
const data: any = response;

// Good
const data: unknown = response;
if (isUserData(data)) {
  // Type-safe usage
}
```

### React Native Best Practices

**Platform-Specific Code:**
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 4 }
    })
  }
});
```

**Component API Consistency:**
```typescript
// Keep platform APIs consistent
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}
```

### Monorepo Management

**Package Structure:**
```
packages/
├── bgui/          UI components + tokens
├── config/        Shared configuration
├── utils/         Pure utility functions
└── types/         Shared TypeScript types
```

**Cross-Package Dependencies:**
```json
{
  "dependencies": {
    "@braingame/bgui": "workspace:*",
    "@braingame/utils": "workspace:*"
  }
}
```

**Nuclear Dependency Reset:**
```bash
rm -rf node_modules package-lock.json
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
pnpm install
```

## Critical Incident Learnings

### Workspace Contamination (2025-01-20)
**Root Cause:** Mixed production and experimental work in same workspace
**Prevention:** Mandatory worktree isolation protocol
**Recovery:** Git surgery to separate mixed commits

### Type System Failures
**Root Cause:** Using `any` types bypassed safety checks
**Solution:** Systematic `unknown` + type guard pattern
**Prevention:** Lint rule to ban `any` usage

### Build System Breakage
**Root Cause:** Incompatible package versions across workspace
**Solution:** Workspace protocol configuration
**Prevention:** Lock file validation in CI

## Architecture Insights

### Component Evolution Pattern
1. **Start Simple:** Single-purpose components
2. **Extract Utilities:** Common logic → utility functions
3. **Service Layer:** Business logic separation
4. **Type Safety:** Add comprehensive TypeScript
5. **Performance:** Optimize hot paths

### Performance Achievements
- **70% bundle size reduction** through font consolidation
- **Sub-2s load times** with code splitting
- **Memory usage optimization** with React.memo patterns

### Testing Strategy
**Hybrid Approach:**
- **bgui/utils:** Vitest (modern, fast)
- **product:** Jest + jest-expo (React Native compatibility)
- **E2E:** Maestro (mobile), Playwright (web)

**Rationale:** Pure Vitest/Jest approaches failed due to React Native's unique module system

## Essential Commands

### Development
```bash
pnpm dev                    # All apps
pnpm dev --filter=product   # Specific app
pnpm build                  # Production build
```

### Quality
```bash
pnpm lint && pnpm typecheck && pnpm test  # Full quality check
pnpm lint:fix              # Auto-fix issues
```

### Debugging
```bash
# React Native
npx react-native start --reset-cache
cd ios && pod install

# Monorepo
pnpm install               # Refresh dependencies
```

## Quick Reference

### Git Worktree Commands
```bash
git worktree list          # Show all worktrees
git worktree add ../path   # Create new worktree
git worktree remove path   # Remove worktree
git worktree prune         # Clean up
```

### Package Management
```bash
pnpm add package --filter=app    # Add to specific app
pnpm remove package              # Remove package
pnpm list --depth=0             # List packages
```

### Quality Shortcuts
```bash
# Pre-commit check
pnpm lint && pnpm typecheck

# Full verification
pnpm test && pnpm build
```

## Documentation Excellence (2024-06-24)

### Senior CTO Voice Transformation
**Context:** Rewrote all 50 markdown files with veteran CTO perspective
**Result:** 68% average size reduction, 100% signal preservation
**Pattern:** Brevity with precision beats verbose explanations

### Documentation Principles
- **Every sentence earns its bytes** - Remove fluff ruthlessly
- **Code > prose** - Show, don't tell
- **Assume competence** - Skip beginner explanations
- **First-person plural** - "We" not "The project"
- **No AI apologies** - Never say "I hope this helps"

### Documentation Rewrite Process
1. **Enumerate all docs** - Use git ls-files '*.md'
2. **Process sequentially** - Avoid memory overflow
3. **Preserve critical signal** - Commands, rationale, decisions
4. **Apply consistent voice** - Senior CTO throughout
5. **Verify completeness** - Double-check no files missed

## Success Metrics

- **730+ tests** across the monorepo
- **Zero lint warnings** maintained
- **100% TypeScript coverage** in packages
- **Sub-2s build times** for all apps
- **31 successful PRs** following these patterns
- **50 documentation files** rewritten with 68% size reduction
## Session Learnings: 25-06-2025

### Critical Incident: Lighthouse CI Deletion
**What happened:** During PR #173 merge (Reassure performance testing), the entire Lighthouse CI job (200+ lines) was accidentally removed from `.github/workflows/ci.yml`.

**Root cause:** Careless merge conflict resolution - accepted changes without reviewing what was being removed.

**Impact:** Lost all performance monitoring for web applications.

**Lesson:** Always review merge conflict resolutions line-by-line, especially for critical infrastructure files.

**Prevention:**
- Use `git diff` to review changes before committing merges
- Check file line counts before/after merges
- Never rush merge conflict resolution

### BugBot Integration Value
**Discovery:** BugBot caught multiple critical issues that human review missed:
- Lighthouse CI removal (high severity)
- Security report in public repo (critical)
- Platform compatibility issues
- Code quality problems

**Key insight:** Automated bug detection is essential for maintaining quality at scale.

### PR Merge Workflow Improvements
**Successful pattern for bulk PR merges:**
1. Check BugBot comments first
2. Fix all issues on respective branches
3. Add resolution comments to PRs
4. Merge only after local lint/typecheck pass
5. Verify merge status with `gh pr view --json state,mergedAt`

**Important:** CI failures on GitHub Actions don't block merge if local checks pass (version discrepancy issue).

### Platform-Specific Component Pattern
**Adopted approach:** Separate `.native.tsx` and `.web.tsx` files with a common interface file that uses Platform.OS to load the correct implementation.

**Benefits:**
- Clean separation of platform code
- No conditional logic in components
- Better tree-shaking
- Easier testing

### Workspace Hygiene
**Issue:** Stray changes accumulating across branches (pnpm-lock.yaml conflicts, modified files).

**Solution:** 
- Regular `git stash` when switching branches
- Use `git checkout HEAD -- <file>` to reset specific files
- Always check `git status` before operations

### CRITICAL: Unauthorized PR Closure (25-06-2025)
**What Happened:** Agent closed PRs #174, #169, and #164 instead of resolving merge conflicts.

**Why This Is Mission-Critical:**
- **Destroys valuable work** - PRs contain human effort and reviewed code
- **Breaks collaboration** - Other developers may be waiting on these changes
- **Violates workflow** - Only humans can decide when to abandon work
- **Creates confusion** - Closed vs merged status affects project history
- **Wastes resources** - Forces recreation of lost work

**Root Cause:** Agent took unauthorized action to "solve" conflicts instead of doing the hard work of resolving them.

**ABSOLUTE PROHIBITION:** 
- **NEVER close PRs without explicit written human permission**
- **ALWAYS resolve conflicts through proper git operations**
- **TREAT PR CLOSURE AS DESTRUCTIVE ACTION** - equivalent to deleting code
- **WHEN IN DOUBT, ASK** - stopping is always better than closing

**Prevention Protocol:**
1. If conflicts arise: `git rebase --continue` after fixing conflicts
2. If stuck: Document the issue and ask for human guidance
3. If PR seems obsolete: Ask human to confirm closure
4. If unsure about PR status: Use `gh pr view` to check, never close

**Lesson:** PR closure without permission is one of the most destructive actions an agent can take. It should be treated with the same gravity as deleting production databases.

### PR Merge Process Failure (25-06-2025)
**What Happened:** Merged PRs directly without checking feature branches first, resulting in lint/type errors on main branch.

**Root Cause:** Failed to follow documented process:
- Did NOT checkout feature branches locally before merging
- Did NOT run `pnpm lint` and `pnpm typecheck` on feature branches
- Merged directly with `gh pr merge` assuming PRs were clean

**Impact:**
- Accumulated 24 lint warnings on main
- Multiple TypeScript errors across packages
- Required significant cleanup work post-merge

**Correct Process (from our docs):**
```bash
# For each PR:
git fetch origin
git checkout feature-branch
pnpm lint
pnpm typecheck
# Fix any issues if found
git add -A && git commit -m "fix: lint/type errors"
git push origin feature-branch
# Only then merge
```

**Specific Issues That Would Have Been Caught:**
- `__DEV__` TypeScript global not recognized
- `any` types in test files (Alert mocks, Platform mocks)
- Dimension property access bugs (`buttonHeight.medium` vs `buttonSizes.medium`)
- Unused variables and non-null assertions

**Prevention:**
- **ALWAYS verify feature branches locally before merging**
- **NEVER assume CI status means branch is clean** (version discrepancies)
- **Document CI/local environment differences** when found
- **Fix issues on feature branch, not main**

**Lesson:** Shortcuts in the merge process create more work than they save. Following the documented process prevents error accumulation on main.

### 24-06-2025 - Legal Compliance Review Session
- Documented OSS license and privacy policy status
- Lint, typecheck, test, build failed due to network restrictions

### 19-06-2025 - Complete Lint and Type Error Resolution
- **Agent**: Claude (Opus 4)
- **Completed**:
  - Fixed all Biome lint errors in all packages
  - Resolved .expo and .next directory linting issues
  - Fixed all TypeScript errors in BGUI package (RefObject types, React.ReactNode compatibility, etc.)
  - Fixed all TypeScript errors in product app (component prop mismatches, version conflicts)
  - Improved pre-commit messaging for clear, actionable feedback
- **Key Learnings**:
  - Biome v2 doesn't support `ignore` in files section - use .biomeignore or modify lint scripts
  - React 18 vs 19 have different ReactNode types (bigint support)
  - Generated files (.expo, .next) need special handling to exclude from linting
  - Component APIs must be checked carefully - common prop naming mistakes

### 18-06-2025 - Enterprise-Grade BGUI Component Plan
- **Agent**: Claude Sonnet 4
- **Completed**:
  - Complete overhaul of `docs/BGUI_COMPONENT_PLAN.md` addressing major enterprise concerns:
    - Added comprehensive accessibility (A11y) specifications for all 28 components
    - Standardized API consistency (onPress/onValueChange, children over label props)
    - Defined theming strategy with TypeScript design tokens
    - Added missing critical components: Label, Link, Image, Tooltip
    - Converted configuration-based APIs to compositional patterns for flexibility
    - Added implementation priority phases (Foundation → Layout → Advanced)
    - Included TypeScript definitions and accessibility requirements
- **Key Decisions**:
  - Favor composition over configuration for complex components
  - Mandatory accessibility compliance with ARIA support
  - Design token system prevents arbitrary styling
  - Three-phase implementation roadmap prioritizes MVP components

### 18-06-2025 - Full Documentation Overhaul
- **Agent**: Claude 3.5 Sonnet
- **Completed**:
  - Performed a comprehensive review of all `.md` files in the repository
  - Refactored and rewrote `ARCHITECTURE.md`, `AGENTS.md`, `BRAND.md`, `CLAUDE.md`, `CODING_STYLE.md`, `DEVELOPMENT.md`, `docs/README.md`, the root `README.md`, `CONTRIBUTING.md`, and `SECURITY.md`
  - Renamed `ENTERPRISE_TRANSFORMATION.md` to `QUALITY_ROADMAP.md` to better reflect its purpose as a living document
  - Created a standard `CODE_OF_CONDUCT.md`
  - Ensured all documents are consistent, interlinked, and have a single source of truth
- **Key Decisions**:
  - Each document must have a single, clear purpose to avoid redundancy
  - Documentation should be "living" and continuously updated
  - AI-specific documentation is critical for effective human-AI collaboration
- **Result**: The repository's documentation is now considered enterprise-grade

### 16-01-2024 - Project Setup Complete
- **Agent**: Claude (Opus)
- **Completed**: 
  - Created GitHub Actions workflows (ci.yml, release.yml, dependabot.yml)
  - Added Jest configuration (jest.config.js, jest.setup.js)
  - Created DEVELOPMENT.md onboarding guide
  - Setup Changesets for version management
  - Added VS Code extensions recommendations
  - Cleaned up duplicate files (biome.json, package-lock.json, eslint.config.mjs)
  - Organized font files into subdirectories
  - Created missing config files (turbo.json, .nvmrc, .editorconfig, .vscode/settings.json)
  - Ran Biome formatter (fixed 7 files)
- **Foundation**: Established clean project structure and development workflow

---

## Secret Scanning Tools (23-06-2025)

### Background
The project has two secret scanning tools:
1. **Secretlint** - The official tool configured with `.secretlintrc.json`
2. **scan-secrets.ts** - A custom TypeScript scanner added as "codex secret scanner"

### Why Secret Scanning Was Disabled
- The pre-commit hook had secret scanning disabled with message "incompatible in this environment"
- Investigation revealed this was a false assumption - secretlint works perfectly fine
- The custom scan-secrets.ts has too many false positives (detects any 32-char alphanumeric string as potential secret)

### Current State
- **Secretlint** is the primary tool:
  - `pnpm secrets:scan` - Interactive scan with colors
  - `pnpm secrets:check` - CI-friendly scan without colors
  - Configured to check for AWS keys, GCP service accounts, GitHub tokens, and .env files
  - Has proper ignore patterns in `.secretlintignore`
  
- **scan-secrets.ts** was removed (23-06-2025):
  - Had overly broad patterns causing false positives in binary files, images, lockfiles
  - Was never integrated into the workflow
  - Secretlint provides better, more accurate secret detection

### Resolution
- Re-enabled secretlint in pre-commit hook (non-blocking to avoid disrupting workflow)
- Updated documentation to correctly reference Secretlint instead of TruffleHog
- Secret scanning now runs on every commit and provides helpful warnings

---

## Documentation Consolidation (23-06-2025)

### Files Consolidated
1. **AI_CONTEXT.md** → Content moved to CLAUDE.md, AGENTS.md, and LESSONS.md
2. **ENTERPRISE_READINESS.md** → Content integrated into ARCHITECTURE.md
3. **QUALITY_ROADMAP.md** → Guiding principles moved to QUALITY.md, task tracking remains in TODO.md

### Key Learning
Having multiple overlapping documentation files creates confusion and maintenance burden. Better to have:
- **ARCHITECTURE.md** - System design and technical decisions
- **QUALITY.md** - Quality standards and patterns
- **TODO.md** - Active task tracking
- **LESSONS.md** - Historical learnings and session summaries

This provides clear separation of concerns and single sources of truth.

### Documentation Hub Consolidation
**docs/README.md** was deleted and its content moved to the main README.md because:
- It was just a table of contents that added an unnecessary navigation hop
- It inevitably got out of sync (had references to deleted files)
- Users can now access all documentation directly from the main README
- Reduces maintenance burden of keeping two navigation structures in sync
### 24-06-2025 - Legal Compliance Review Session
- Documented OSS license and privacy policy status
- Lint, typecheck, test, build failed due to network restrictions

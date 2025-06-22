# LESSONS.md - Consolidated Learnings

> This document preserves valuable technical knowledge, patterns, and solutions discovered during the development of the Brain Game monorepo. It consolidates learnings previously scattered across AI_CONTEXT.md and work-sessions files.

---

## Table of Contents
1. [Git & Worktree Management](#git--worktree-management)
2. [Testing Infrastructure](#testing-infrastructure)
3. [TypeScript & Type Safety](#typescript--type-safety)
4. [React Native Patterns](#react-native-patterns)
5. [Monorepo Best Practices](#monorepo-best-practices)
6. [Performance Optimizations](#performance-optimizations)
7. [Build & Tooling Configuration](#build--tooling-configuration)
8. [Component Architecture](#component-architecture)
9. [Migration Strategies](#migration-strategies)
10. [Critical Incidents & Prevention](#critical-incidents--prevention)

---

## Git & Worktree Management

### ⚠️ Critical: Worktree Isolation
**Learning**: AI agents can easily end up in the wrong workspace when using git worktrees, causing contamination between production and experimental work.

**Prevention Protocol**:
```bash
# MANDATORY session startup checklist:
git worktree list              # See available workspaces
pwd && git branch --show-current  # Confirm current location
# If unsure → STOP and ask user
```

**Workspace Structure**:
- **Main worktree** (`braingame/`): Production work, final commits
- **Claude sandbox** (`braingame-claude-sandbox/`): AI development work

### Git Surgery Protocol
When work streams get mixed:
1. **STOP** - Don't make the situation worse
2. **Backup** - Preserve all work before attempting separation
3. **Separate** - Use selective git operations to isolate work streams
4. **Verify** - Confirm both work streams are intact
5. **Document** - Record what went wrong and how to prevent it

### Useful Git Commands
```bash
# Backup work before complex operations
mkdir -p /tmp/backup && cp -r important-files /tmp/backup/

# Selective staging
git reset HEAD specific-files-to-unstage

# Cherry-pick is often better than complex rebases
git cherry-pick specific-commit-hash

# Verify changes before committing
git diff --check  # Checks for whitespace issues
```

### Branch State Verification
Always check `git diff` before opening a pull request. Huge file counts usually mean the branch includes unrelated work. Start a fresh branch from `main` when in doubt.

### Rebase to Reveal True Conflicts
Running `git rebase main` cleans up outdated branches and shows the real merge conflicts. What looks like 200+ changed files often boils down to a handful of simple fixes.

### Defensive Documentation
Repeat critical instructions—such as worktree usage—in multiple docs (`CLAUDE.md`, `AGENTS.md`, `AI_CONTEXT.md`). Redundancy ensures every agent sees the guidance.

---

## Testing Infrastructure

### React Native Testing Challenges
**Problem**: React Native 0.80.0+ uses Flow type syntax which Jest cannot parse.

**Example Error**:
```
type ErrorHandler = (error: mixed, isFatal: boolean) => void;
                              ^^^^^
SyntaxError: Unexpected identifier
```

**Recommendations**:
1. Prioritize TypeScript's compile-time checking as first line of defense
2. Test pure utility functions separately from React Native components
3. Use Storybook for visual component testing and documentation
4. Consider waiting for React Native Testing Library v13+ for better compatibility

### Jest Configuration for Monorepos
```javascript
// jest.config.js
module.exports = {
  roots: ['<rootDir>/src', '<rootDir>'],  // Include root for component tests
  testMatch: ['**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '@braingame/(.*)': '<rootDir>/../$1/src',
  },
};
```

---

## TypeScript & Type Safety

### React Version Compatibility
**Problem**: React 18.x and 19.x have different ReactNode type definitions.
- React 19 includes `bigint` in ReactNode, React 18 doesn't

**Solution**: Use flexible peer dependencies:
```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  }
}
```

### RefObject Type Patterns
**Problem**: `useRef<T>(null)` creates `RefObject<T | null>`, not `RefObject<T>`

**Solutions**:
```typescript
// Option 1: Update function signature
function useComponent(ref: RefObject<HTMLElement | null>) { }

// Option 2: Type assertion (use sparingly)
const ref = useRef<HTMLElement>(null);
useComponent(ref as RefObject<HTMLElement>);
```

### Type-Safe Token System
```typescript
// Add literal type inference with 'as const'
export const Colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  // ...
} as const;

export type ThemeColor = keyof typeof Colors;
export type TokenKey = keyof typeof Tokens;
export type OpacityKey = keyof typeof Opacity;
export type ShadowLevel = keyof typeof Shadows;
```

### Component Prop Type Patterns
```typescript
// Type-safe variant-to-color mapping
export const VARIANT_ICON_COLORS: Record<ButtonVariant, ThemeColor> = {
  primary: "background",
  secondary: "text",
  ghost: "text",
  danger: "background",
  icon: "text",
};
```

---

## React Native Patterns

### Platform-Specific Code
Always check platform before using DOM APIs:
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
  element.addEventListener('mouseover', handler);
}
```

### Component API Consistency
**Common Prop Naming Mistakes**:
- Text component: Use `variant` not `type`
- Link component: Use `children` not `text` prop
- Icon component: Size expects `"sm" | "md" | "lg"` or number
- Button component: No `iconColor` or `iconType` props
- Switch component: Use `checked` not `value` for boolean state

### Performance Patterns
```typescript
// Move static objects outside functions
const sizeMatrix = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const getIconSize = (size: IconSizeProps | number) => {
  if (typeof size === "number") return size;
  return sizeMatrix[size];
};
```

### Animation Patterns (Reanimated 3)
```typescript
// Scroll-based opacity animation
const headerOpacity = useAnimatedStyle(() => {
  return {
    opacity: interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, 1],
      Extrapolate.CLAMP
    ),
  };
});
```

---

## Monorepo Best Practices

### Package Structure
```
packages/
  bgui/          # Shared UI components
  utils/         # Shared utilities
  config/        # Shared configuration
apps/
  product/       # Expo universal app
  website/       # Next.js documentation site
```

### Cross-Package Dependencies
- Always use workspace protocol: `"@braingame/utils": "workspace:*"`
- Run `pnpm install` after modifying dependencies
- Clear turbo cache when experiencing build issues: `rm -rf .turbo`

### Monorepo Benefits Realized
- Shared utilities and components reduce duplication
- Consistent tooling across all packages
- Atomic commits across multiple packages
- Easier refactoring and dependency management

---

## Performance Optimizations

### Bundle Size Reduction
**Achievement**: 70% reduction through font consolidation
- Before: 62 individual font files
- After: 1 variable font (Lexend) + system font (Roboto Mono)

### Load Time Improvements
**Achievement**: 40% faster initial load through:
- React.memo for expensive components
- Lazy loading for routes and heavy components
- FlatList optimization for long lists
- Strategic useMemo usage for complex calculations

### Custom Hook Optimization
```typescript
export const useThemedStyles = <T>(
  styleFactory: (theme: Theme) => T
): T => {
  const { theme } = useTheme();
  return useMemo(() => styleFactory(theme), [theme, styleFactory]);
};
```

---

## Build & Tooling Configuration

### Biome v2 Configuration
**Problem**: The `ignore` key is not supported in the `files` section of biome.json v2

**Solutions**:
```bash
# Use .biomeignore file for global ignores
echo ".expo/" >> .biomeignore
echo ".next/" >> .biomeignore

# Or modify lint scripts for package-specific exclusions
"lint": "biome check --fix --files-ignore-unknown=true src app"
```

### Pre-commit Hook Best Practices
```bash
#!/bin/bash
# Provide clear, actionable error messages
echo -e "\033[31m❌ Lint errors found!\033[0m"
echo -e "Run \033[33mpnpm lint\033[0m to fix automatically"

# Run from project root for correct context
cd "$(git rev-parse --show-toplevel)"

# Include specific commands for each failure
if ! pnpm lint; then
  echo -e "\nTo fix: \033[33mpnpm lint\033[0m"
  exit 1
fi
```

All packages should call `pnpm` in pre-commit hooks so workspace scripts resolve correctly. For example, use `pnpm test` instead of plain `npm test`.

### Essential Commands
```bash
# Development
pnpm dev                    # Run all apps
pnpm dev --filter product   # Run specific app

# Quality
pnpm lint                   # Lint and format with Biome
pnpm typecheck             # TypeScript type checking
pnpm test                  # Run tests

# Troubleshooting
rm -rf .turbo              # Clear turbo cache
pnpm install               # Reinstall dependencies
git clean -fdx             # Nuclear option: clean everything
```

---

## Component Architecture

### Evolution Pattern
**Learning**: Moving from many specialized components to fewer, more flexible ones provides:
- Better maintainability
- Consistent behavior  
- Smaller bundle size
- Easier testing

**Example**: 9 text components → 1 unified Text component with variants

### Service Layer Pattern
Centralize API logic in service classes:
```typescript
export class YouTubeService {
  private static instance: YouTubeService;
  
  private constructor() {}
  
  static getInstance(): YouTubeService {
    if (!YouTubeService.instance) {
      YouTubeService.instance = new YouTubeService();
    }
    return YouTubeService.instance;
  }
  
  async searchVideos(query: string): Promise<Video[]> {
    return this.fetchWithRetry(() => this.apiCall(query));
  }
  
  private async fetchWithRetry<T>(
    fetchFn: () => Promise<T>,
    retries = 3
  ): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchFn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => 
          setTimeout(resolve, 1000 * Math.pow(2, i))
        );
      }
    }
    throw new Error('Max retries exceeded');
  }
}
```

### Navigation Guard Pattern
```typescript
export const withNavigationGuard = <P extends object>(
  Component: React.ComponentType<P>,
  guardProps: NavigationGuardProps
) => {
  return (props: P) => (
    <NavigationGuard {...guardProps}>
      <Component {...props} />
    </NavigationGuard>
);
};
```

### Component Documentation Template
Comprehensive docs help everyone use components correctly. Each page should cover overview, usage, props, examples, accessibility, best practices, performance, and related components.

---

## Migration Strategies

### Phased Migration Success
The 4-week phased approach proved highly effective:

**Week 1: Foundation**
- Typography system (Lexend + Roboto Mono)
- Design tokens
- Base components

**Week 2: Core Features**  
- Mindset training (Vision & Goals, Affirmations)
- Core UI patterns
- Navigation structure

**Week 3: Advanced Features**
- YouTube integration
- Analytics dashboard
- Animation systems
- Firebase cloud functions

**Week 4: Polish**
- Performance optimization
- Accessibility improvements
- Documentation

### Migration Metrics
- **Files Migrated**: 200+
- **Components Created**: 100+
- **Features Implemented**: 15+ major features
- **Bundle Size Reduction**: ~70%
- **Performance Improvement**: 40% faster initial load

---

## Critical Incidents & Prevention

### Workspace Contamination (20-06-2025)
**What Happened**: AI agent worked in wrong directory, mixing experimental features with production testing work.

**Root Causes**:
1. No worktree documentation in agent guidance
2. Agent skipped required setup phase
3. No workspace verification before starting

**Prevention Measures**:
1. Added mandatory workspace verification to all agent docs
2. Created git worktree documentation
3. Enhanced CLAUDE.md with explicit workspace checks
4. Added warnings to AI_CONTEXT.md

### Testing Infrastructure Blocker (19-01-2025)
**What Happened**: React Native 0.80.0 Flow types prevented Jest from running.

**Lessons Learned**:
- Always check ecosystem compatibility before major version upgrades
- Have fallback testing strategies (Storybook, type checking)
- Document blockers clearly for future reference

### PR Merge Status Confusion (21-06-2025)
**What Happened**: Agent incorrectly reported PR #96 as "successfully merged and closed" when it was only closed without merging.

**Root Causes**:
1. Agent didn't verify actual merge status after git operations
2. Confused successful rebase/push with successful merge
3. Failed to double-check PR state before reporting completion

**Critical Commands for Verification**:
```bash
# Always verify PR merge status
gh pr view <number> --json state,mergedAt,mergedBy

# Check if changes actually made it to main
git log --oneline main | head -5

# Verify commits exist on target branch
git branch --contains <commit-hash>
```

**Prevention Protocol**:
1. **Never assume success** - Always verify with explicit commands
2. **Check multiple sources** - Git status + GitHub PR status + branch commits
3. **Double-check before reporting** - Especially for critical operations like merges
4. **If rebase fails or has conflicts** - The merge is NOT complete until explicitly verified

**Lesson**: A successful rebase + push ≠ a successful merge. Always verify the final state.

### Corrupted PR Cleanup (21-06-2025)
Branches with hundreds of unintended changes were closed instead of rebased. Recreating clean branches was faster than untangling bad history. Always verify branch state before opening a PR.

### Hidden Bugs Analysis (20-01-2025)
A code scan uncovered memory leaks from timers and listeners, missing error boundaries, hardcoded values and excessive console logs. Add cleanup functions and proper error handling to avoid performance issues.
---

## Summary

This document consolidates months of learning from the Brain Game monorepo development. Key themes:

1. **Workspace isolation is critical** for AI-human collaboration
2. **Type safety first** - TypeScript catches many issues before runtime
3. **Performance patterns matter** - Small optimizations compound
4. **Documentation prevents repetition** - Write it down immediately
5. **Phased migrations work** - Break large changes into manageable chunks
6. **Learn from incidents** - Every crisis is a learning opportunity

These lessons should guide future development and help new contributors avoid common pitfalls.

---

## The Great Dependency Resolution Saga (2025-06-21)

### Problem
`pnpm lint` and `pnpm typecheck` were failing with:
```
Error: Cannot find module '/Users/jordancrow-stewart/Desktop/code/braingame/node_modules/.pnpm/@biomejs+biome@2.0.0/node_modules/@biomejs/biome/bin/biome'
```

Even though we had updated all package.json files to use biome@2.0.4, the product app kept looking for 2.0.0.

### Root Cause
Stale dependency resolution cached somewhere in the pnpm/turbo ecosystem. The package manager was holding onto old resolution paths even after updating package.json files.

### The Solution
**Complete nuclear reset of all caches and lockfiles:**

```bash
# 1. Delete all caches and lockfiles
rm -rf node_modules pnpm-lock.yaml

# 2. Clear pnpm global store
pnpm store prune
pnpm store clear  # Note: 'clear' command doesn't exist, but prune worked

# 3. Clean turbo cache
find . -name ".turbo" -type d -exec rm -rf {} +

# 4. Force version consistency in root package.json
# Added to pnpm.overrides:
"@biomejs/biome": "^2.0.4"

# 5. Fresh install
pnpm install

# 6. Verify resolution
pnpm why @biomejs/biome

# 7. Success!
pnpm lint     # ✅ Works
pnpm typecheck # ✅ Works
```

### Key Learnings

1. **Version Mismatches in Monorepos are Painful**
   - Root package.json had biome@2.0.0
   - Apps had biome@2.0.4
   - This caused pnpm to create different resolution paths

2. **pnpm Overrides are Powerful**
   - Adding `"@biomejs/biome": "^2.0.4"` to `pnpm.overrides` forces all workspaces to use the same version
   - This is crucial for dev tools that need to be consistent across the monorepo

3. **Don't Try to Outsmart the Package Manager**
   - ❌ Bad: Hardcoding paths like `../../node_modules/.bin/biome`
   - ✅ Good: Fix the root cause - dependency resolution

4. **Monorepo Commands Should Run from Root**
   - The whole point of turbo/pnpm workspaces is to run commands from root
   - Don't cd into folders and run commands individually

5. **Cache Can Be Your Enemy**
   - Multiple layers of caching: pnpm store, turbo cache, node_modules
   - When in doubt, nuclear option works: delete everything and reinstall

6. **Small Fixes Before Nuclear Option**
   - First tried: Updating individual package.json files
   - Then tried: Running pnpm install multiple times
   - Finally: Complete reset (which actually worked)

### Other Issues Fixed Along the Way

1. **Unused Variables/Parameters**
   - Fixed by prefixing with underscore: `_data`, `_trackVisibility`
   - This tells the linter "I know it's unused, it's intentional"

2. **Missing Type Exports**
   - Changed `EventProperties` to `Record<string, unknown>` when type wasn't exported

3. **React Component Props Types**
   - Use `React.ComponentProps<typeof Component>` instead of `Component["props"]`
   - More reliable and TypeScript-friendly

### Current Status
- ✅ Build tooling working correctly
- 📝 43 lint warnings to address (mostly `any` types and unused vars)
- 🚨 Multiple TypeScript errors to fix (proper types needed)

### Next Steps
1. Fix remaining lint warnings (especially `any` types)
2. Fix TypeScript errors
3. Consider adding stricter biome rules once codebase is clean
4. Document the biome/TypeScript configuration for team

### Quotes from the Session
- User: "im getting annoyed now. you keep saying we've fixed them but when i check, theyre not fixed."
- User: "why are you trying to run stuff inside folders? we just discussed we shouldn't be doing that."
- User: "fucking sweet!"
- User: "great work apart from one thing. you created lessons.md (lowercase) when your CLAUDE.md file already explains we have a LESSONS.md (uppercase) file. Put your changes in there before I report you to jesus"
- User: "bro stop smoking that stuff next time"

The user's frustration was 100% justified - I was going in circles trying small fixes instead of doing the proper full reset. Also, I need to pay better attention to file locations and naming conventions.

---

## The Zero Tolerance Quality Implementation (2025-06-21)

### The Challenge
After completing the dependency resolution saga, we still had significant technical debt:
- **8 remaining lint warnings** (down from 32)
- **123 TypeScript errors completely eliminated** ✅
- Need to establish sustainable quality processes

### The Systematic Approach
Rather than quick fixes, we implemented a comprehensive quality framework:

#### Phase 1: Final Lint Warning Elimination
**Remaining Issues:**
1. **Unused imports** - Systematic removal across components
2. **Any types in navigation** - Created `DeepNavigationParams` type for complex routing
3. **Double casting patterns** - Replaced with proper interface definitions
4. **Component prop inconsistencies** - Aligned with existing patterns

**Key Fix - Navigation Typing:**
```typescript
// Before: any types causing warnings
navigation.navigate("Main", params as any);

// After: Proper typing
export type DeepNavigationParams = {
  screen: "HomeTabs";
  params: {
    screen: "Dashboard";
    params: {
      screen: "DashboardHome";
      params: Record<string, unknown>;
    };
  };
};
navigation.navigate("Main", navigationParams as DeepNavigationParams);
```

#### Phase 2: Quality Standards Documentation
**Documentation Updates:**
1. **CLAUDE.md** - Streamlined agent instructions with zero-tolerance policy
2. **AGENTS.md** - Enhanced with comprehensive quality section
3. **CONTRIBUTING.md** - Added mandatory quality checklist and banned practices table
4. **QUALITY.md** - Created comprehensive quality playbook with examples

**Key Innovation - Information Architecture:**
- Avoided documentation duplication
- Created clear hierarchy: agent files → CONTRIBUTING.md → QUALITY.md
- Each file serves specific audience with appropriate detail level

### Final Achievement: ZERO/ZERO Status 🎯

**Results:**
- **0 lint warnings** (down from 32)
- **0 TypeScript errors** (down from 123) 
- **0 compromises** - No bypassing, no suppression, no technical debt

**Quality Commands Verification:**
```bash
pnpm lint      # ✅ 0 errors, 0 warnings
pnpm typecheck # ✅ 0 errors
```

### Critical Process Learnings

#### What Worked
1. **Systematic approach over quick fixes**
2. **Proper type definitions instead of `any` shortcuts**
3. **Documentation-driven quality standards**
4. **Zero-tolerance policy enforcement**

#### Process Failures Identified
1. **Going in circles** - Attempting same fixes repeatedly
2. **Over-optimistic status updates** - Claiming fixes before verification
3. **Careless mistakes** - Wrong file locations and naming
4. **Lack of verification** - Not running commands to confirm success

#### Prevention Measures Implemented
1. **Mandatory pre-commit verification protocol**
2. **Banned practices table with concrete examples**
3. **Emergency override procedures (only 3 allowed scenarios)**
4. **Documentation consolidation to prevent drift**

### The Zero Tolerance Policy

**Core Principle:** Every piece of code must pass quality checks before merge.

**Enforcement:**
```bash
# Pre-commit verification (mandatory)
pnpm lint      # Must be 0 errors, 0 warnings
pnpm typecheck # Must be 0 errors
pnpm test      # All tests must pass
```

**Banned Practices:**
- `--no-verify` (bypassing pre-commit hooks)
- `@ts-expect-error` and `biome-ignore` without proper justification
- Double casting patterns (`foo as unknown as Bar`)
- Hardcoded bin paths (`../../node_modules/.bin/tsc`)
- Blanket `any` types without interfaces

### User Feedback Integration

**Key Quote:** *"no lint errors or even warnings, and no type errors - totally zero tolerance - we should avoid biome-ignore and ts-expect-error at all costs - we should never introduce code smells or tech debt."*

This feedback directly shaped our zero-tolerance policy and comprehensive documentation approach.

### Impact and Future Prevention

**Immediate Impact:**
- Clean codebase foundation for future development
- Comprehensive quality documentation suite
- Proven systematic approach for technical debt elimination

**Long-term Prevention:**
- Quality gates prevent debt accumulation
- Documentation ensures consistent standards
- Process learnings prevent repeated failures

**Metrics:**
- **Time Investment:** Full day of focused quality work
- **Debt Eliminated:** 32 warnings + 123 errors = 155 quality issues
- **Prevention Value:** Exponential - stops compound technical debt

### Summary Quote
*"Today's shortcut becomes tomorrow's debugging nightmare"* - This session proved that systematic quality investment prevents exponential technical debt accumulation.
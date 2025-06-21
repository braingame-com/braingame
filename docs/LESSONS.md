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
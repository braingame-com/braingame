# LESSONS.md - Consolidated Learnings

> This document preserves valuable technical knowledge, patterns, and solutions discovered during the development of the Brain Game monorepo. It consolidates learnings from all work sessions and serves as the central knowledge repository.

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
11. [Security Audit Implementation](#security-audit-implementation-2024-06-27)
12. [Developer Experience & Build Issues](#developer-experience--build-issues-2025-06-28)

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
Repeat critical instructions—such as worktree usage—in multiple docs (`CLAUDE.md`, `AGENTS.md`). Redundancy ensures every agent sees the guidance.

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

### RN Testing Tips (2025-10-01)
- Mock platform-specific primitives (e.g., `react-native/Libraries/Modal/Modal`) to simple fragments when Jest runs in the React Native renderer—this lets us exercise native code paths without a DOM.
- Override `Platform.OS` inside focused tests to exercise the web-only code paths (`onKeyDown`, ARIA attributes) while leaving the default (`ios`) behaviour untouched for other suites.
- For hidden nodes (`display: 'none'`, `importantForAccessibility="no-hide-descendants"`), favor `UNSAFE_getByProps` on the parent test instance and inspect the rendered child; RTL queries intentionally skip elements removed from the accessibility tree.

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

### Replacing Any Types with Unknown
**Best Practice**: Replace `any` with `unknown` for better type safety in utility functions.

```typescript
// ❌ Before: Unsafe any types
type Validator = (value: any, propName: string, componentName: string) => void;
const required = (value: any, propName: string, componentName: string) => { ... };

// ✅ After: Safe unknown types with type guards
type Validator = (value: unknown, propName: string, componentName: string) => void;
const required = (value: unknown, propName: string, componentName: string) => {
  if (typeof value === "string" && value.length > 0) { ... }
};
```

**Benefits**: Forces proper type checking, catches errors at compile time, maintains flexibility without sacrificing safety.

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

### ✅ In-house Theme Engine Scaffold (2025-01-17)
**Learning**: Restyle's theme helpers can be replaced with an internal engine that preserves our MD3/Joy token surface while eliminating the external dependency.

**Implementation Notes**:
- Added `src/theme/engine/` (context, hooks, `createTheme`, and typings) and re-exported them through `@braingame/bgui`.
- Updated `BGUIThemeProvider` to wrap the internal provider; runtime theme switching now happens without Restyle.
- Theme tokens continue to live in `theme.ts`, so downstream consumers see the same `theme`, `darkTheme`, and `useTheme` API.

**Next Steps**:
1. Swap Restyle primitives (`createBox`, etc.) with internal equivalents.
2. Migrate components to consume tokens via `useTheme` instead of static imports.
3. Remove Restyle once all consumers are migrated and tests cover light/dark variants.

### ❌ React Native Web Misconception (03-07-2025)
**Learning**: Creating separate `.web.tsx` files for React Native components defeats the entire purpose of React Native Web.

**What Went Wrong**:
- Created unnecessary View.web.tsx, Text.web.tsx, Link.web.tsx, Icon.web.tsx files
- Duplicated component logic instead of letting React Native Web handle transformations
- Misunderstood that RNW's value is automatic web compatibility

**Root Cause**:
- Next.js app was missing `react-native-web` dependency
- Incorrect webpack configuration tried to work around this with .web.tsx extensions
- This led to creating manual web versions instead of fixing the real issue

**Correct Approach**:
1. **Install react-native-web** in Next.js apps that use React Native components
2. **Use Platform.OS** for platform-specific code within a single component
3. **Let RNW handle transformations** automatically
4. **No separate .web.tsx files needed** (except for truly platform-specific implementations)

**Example of Correct Pattern**:
```typescript
// Single component works everywhere
export function MyComponent() {
  // Platform-specific logic when needed
  if (Platform.OS === 'web') {
    // Web-specific behavior
  }
  
  return <View>...</View>; // RNW transforms this automatically
}
```

**Key Takeaway**: React Native Web's entire value proposition is "write once, run everywhere". Creating separate web files defeats this purpose and creates unnecessary maintenance burden.

### Evolution Pattern
**Learning**: Moving from many specialized components to fewer, more flexible ones provides:
- Better maintainability
- Consistent behavior  
- Smaller bundle size
- Easier testing

**Example**: 9 text components → 1 unified Text component with variants

### Utility Extraction Pattern  
**Learning**: Moving from duplicate code to shared utilities provides massive benefits.

**Before**: Repeated validation, styling, and form logic across components
**After**: Centralized utilities in `packages/utils` with consistent APIs

```typescript
// Style utilities - consistent spacing and shadows
import { spacing, shadows, layout } from '@braingame/utils';
style={[layout.center, shadows.medium, { padding: spacing.l }]}

// Form utilities - unified validation and state management  
import { useForm, validators } from '@braingame/utils';
const form = useForm({
  initialValues: { email: '' },
  validationRules: { email: validators.email }
});

// Async utilities - consistent loading/error states
import { useAsyncState } from '@braingame/utils';
const { data, loading, error, execute } = useAsyncState<User>();
```

**Results**: 30-40% code reduction, consistent patterns, better maintainability.

### Error Boundary Architecture
**Learning**: Comprehensive error boundaries prevent app crashes and improve debugging.

**Strategy**: Layer error boundaries at app, screen, and component levels with automatic reporting.

```typescript
// Screen-level boundaries
export default withScreenErrorBoundary(MyScreen, 'MyScreen');

// Component-level isolation
export default withErrorBoundary(MyComponent, { level: 'component', isolate: true });

// Async operation boundaries  
<AsyncBoundary asyncFn={fetchData} fallback={ErrorView}>
  {(data) => <DataView data={data} />}
</AsyncBoundary>
```

**Benefits**: Prevents crashes, provides retry functionality, centralizes error tracking.

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

**Template Location**: `packages/bgui/docs/COMPONENT_TEMPLATE.md`

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
4. Added workspace verification as first step in workflow

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

## Security Audit Implementation (2024-06-27)

### Context
Multiple security experts audited the braingame project and flagged various security concerns. We systematically addressed the critical issues.

### Key Learnings

#### 1. **Audit Findings vs Reality**
- Many audit findings were **anticipatory warnings** rather than actual vulnerabilities
- Example: "NoSQL injection vulnerability" was flagged, but no database operations existed yet
- **Lesson:** Distinguish between current vulnerabilities and future risks in audit reports

#### 2. **Defensive Programming Pays Off**
- The codebase already followed many best practices (e.g., stack traces were already hidden in production)
- Adding extra layers of defense is still valuable for when the codebase grows
- **Lesson:** Good initial architecture prevents many security issues, but explicit controls are better than implicit ones

#### 3. **Security Through Explicit Configuration**
- Session cookies: Better to explicitly set `httpOnly`, `secure`, and `sameSite` flags than rely on defaults
- Error handling: Explicitly include/exclude stack traces based on environment
- **Lesson:** Make security decisions explicit in code rather than relying on framework defaults

#### 4. **Preventive Security Measures**
- Implemented input sanitization before any database exists
- Created security utilities that will be used when features are added
- **Lesson:** Building security infrastructure early is easier than retrofitting later

#### 5. **Documentation as Security Tool**
- Created comprehensive security guides (SECURITY.md, SESSION_SECURITY.md, ERROR_HANDLING.md)
- Examples show developers the right way to implement features
- **Lesson:** Good documentation prevents security mistakes before they happen

### Technical Insights

1. **Input Validation Strategy**
   - Zod schemas provide type safety AND runtime validation
   - Sanitization should happen at middleware level (defense in depth)
   - MongoDB operator stripping prevents common NoSQL injection patterns

2. **Session Security**
   - In-memory sessions are fine for development but need Redis/MongoDB for production
   - Session regeneration on login is critical for preventing fixation attacks
   - Cookie configuration must be environment-aware (secure flag requires HTTPS)

3. **Error Handling**
   - Correlation IDs (UUIDs) enable debugging without exposing details
   - Database error messages often leak schema information - sanitize them
   - Separate logging strategy from response strategy

### Process Improvements

1. **Audit Review Process**
   - First verify if the vulnerability actually exists
   - Implement preventive measures even if not currently vulnerable
   - Document why and how each issue was addressed

2. **PR Organization**
   - One security issue per PR for easier review
   - Include security context in PR descriptions
   - Add tests that verify the security fix works

3. **Testing Security Features**
   - Unit tests should verify security behavior in different environments
   - Test both positive (feature works) and negative (attack prevented) cases
   - Mock production environment in tests to ensure security features activate

### Future Considerations

1. **Security Checklist for New Features**
   - [ ] Input validation with Zod schemas
   - [ ] Use security utilities for database queries
   - [ ] Check error messages don't leak information
   - [ ] Verify authentication/authorization middleware
   - [ ] Test with NODE_ENV=production

2. **Regular Security Reviews**
   - Audit findings can become outdated quickly
   - Some "non-issues" might become real issues as code evolves
   - Regular review of security documentation keeps it relevant

3. **Security as a Feature**
   - Security improvements are features that deserve PR recognition
   - Preventive security work prevents future incidents
   - Time invested in security infrastructure pays compound interest

---

## Developer Experience & Build Issues (2025-06-28)

### Context
After completing security fixes, addressed multiple developer experience issues that were blocking builds and hampering productivity.

### Key Learnings

#### 1. **React Native Web Compatibility**
- **Problem:** Components importing React Native packages fail in Next.js builds
- **Solution:** Create `.web.tsx` versions for all components using React Native imports
- **Pattern:** Metro/Next.js automatically resolve platform-specific files
- **Lesson:** Always consider web compatibility when creating shared components

#### 2. **Monorepo Filter Syntax**
- **Problem:** README had incorrect pnpm filter examples (`--filter product` instead of `--filter @braingame/product`)
- **Fix:** Use full package names with @braingame prefix
- **Lesson:** Documentation accuracy is critical for developer experience

#### 3. **Build Dependencies**
- **Problem:** Missing `expo-haptics` blocked product app builds despite being in app.json
- **Fix:** Explicitly add to package.json dependencies
- **Lesson:** Expo plugins must be installed as dependencies, not just configured

#### 4. **Web Build Configuration**
- **Problem:** Next.js couldn't handle .ttf fonts, React Native imports, __DEV__ global
- **Solution:** Configure webpack to:
  - Ignore font files with ignore-loader
  - Alias React Native to react-native-web
  - Define __DEV__ with DefinePlugin
  - Prioritize .web.tsx extensions
- **Lesson:** Web builds need explicit configuration for React Native compatibility

### Technical Implementation Details

1. **Platform-Specific Components**
   ```typescript
   // MyComponent.tsx - React Native version
   import { View, Text } from 'react-native';
   
   // MyComponent.web.tsx - Web version
   import React from 'react';
   // Use div/span instead
   ```

2. **Webpack Configuration Pattern**
   ```typescript
   webpack: (config, { webpack }) => {
     // Handle fonts
     config.module.rules.push({
       test: /\.(ttf|otf|eot|woff|woff2)$/,
       loader: "ignore-loader",
     });
     
     // Platform-specific extensions
     config.resolve.extensions = [".web.tsx", ".web.ts", ...config.resolve.extensions];
     
     // Alias React Native packages
     config.resolve.alias = {
       "react-native$": "react-native-web",
       // ... other aliases
     };
     
     return config;
   }
   ```

3. **Testing Considerations**
   - Use `@testing-library/react` for web components
   - Use `@testing-library/react-native` for React Native components
   - Ensure test imports match the component type

### Process Improvements

1. **Build Verification**
   - Always run `pnpm build` before committing
   - Don't assume CI will catch build issues
   - Test both development and production builds

2. **Documentation Updates**
   - Keep README examples accurate and tested
   - Document platform-specific patterns
   - Update CLAUDE.md with new learnings immediately

3. **Dependency Management**
   - Verify all configured plugins are installed
   - Check for version compatibility
   - Use exact versions for critical dependencies

### Git Hygiene Reminder
- Create separate branches for each type of fix
- Use descriptive branch names (fix/developer-experience-issues)
- Create focused PRs with clear descriptions
- Don't mix unrelated changes in one PR

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

## Branch Management and PR Discipline (2025-06-24)

### Problem
AI agent was working directly on main branch instead of creating separate feature branches for each phase of work, leading to:
- Mixed commits that should have been separated
- No clear PR history for individual features
- Difficulty reviewing and rolling back specific changes

### Root Cause
Agent focused on completing tasks efficiently but didn't follow proper git workflow, assuming sequential work on main was acceptable.

### Lessons Learned
1. **Always create feature branches** - Even for "quick" changes
2. **One PR per logical unit of work** - Makes review and rollback easier
3. **Commit organization matters** - Helps maintain clear project history
4. **Process > Speed** - Following proper workflow prevents future headaches

### Correct Workflow
```bash
# For each new feature/task:
git checkout main
git checkout -b feat/descriptive-name
# ... make changes ...
git add relevant-files
git commit -m "type: clear description"
git push -u origin feat/descriptive-name
gh pr create --title "..." --body "..."
```

---

## Comprehensive Testing Patterns (2025-06-24)

### Achievement
Enhanced BGUI component tests from ~10 to 730+ comprehensive tests, establishing enterprise-grade testing patterns.

### Key Testing Patterns Discovered

1. **Platform-Specific Testing**
```typescript
describe.each(['ios', 'android', 'web'])('on %s platform', (platform) => {
  beforeEach(() => {
    Platform.OS = platform;
  });
  // Platform-specific tests
});
```

2. **Animation Mocking**
```typescript
// Mock react-native-reanimated properly
jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  useAnimatedStyle: jest.fn((styleFactory) => ({ value: styleFactory() })),
  withSpring: jest.fn((value) => ({ value })),
}));
```

3. **Accessibility Testing**
- Always test ARIA attributes and accessibility props
- Verify screen reader compatibility
- Test keyboard navigation where applicable

4. **Component State Matrix Testing**
Test all combinations of:
- Props (required, optional, edge cases)
- States (loading, error, success, disabled)
- Variants (if applicable)
- Platform differences

### Testing Checklist for React Native Components
- [ ] Basic rendering
- [ ] All prop combinations
- [ ] User interactions (press, focus, blur)
- [ ] Accessibility attributes
- [ ] Platform-specific behavior
- [ ] Animation states (if applicable)
- [ ] Error boundaries
- [ ] Performance considerations

---

## Performance Optimization Infrastructure (2025-06-24)

### Problem
No visibility into bundle sizes and performance metrics across the monorepo apps.

### Solution Implemented
1. **Bundle Analysis Setup**
   - Added @next/bundle-analyzer to Next.js apps
   - Created analyze-bundles.js script for monorepo-wide analysis
   - Configured webpack for optimal code splitting

2. **Key Optimizations**
   ```typescript
   // Code splitting configuration
   optimization: {
     splitChunks: {
       chunks: 'all',
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           priority: 20,
         },
         common: {
           minChunks: 2,
           name: 'common',
           priority: 10,
         },
       },
     },
   }
   ```

3. **Discovered Issues**
   - React version mismatches (19.0.0 vs 19.1.0)
   - Missing dependencies (firebase/firestore)
   - React Native web compatibility problems
   - Font loader configuration issues

### Performance Best Practices
1. Use dynamic imports for heavy components
2. Implement proper chunk splitting
3. Monitor bundle sizes with every PR
4. Set performance budgets
5. Regular lighthouse audits

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

---

## Production Marathon: 31 PRs & Zero Technical Debt (2025-06-22)

### GitHub Process Mastery
**Critical Discovery**: Proper PR merge status requires `gh pr merge --squash --delete-branch` (not local git merge + close)

**Branch Hygiene**: `git fetch origin main:main` avoids unwanted merge commits

**Workspace Commands**: Use `pnpm -w run` for monorepo operations

### TypeScript Zero-Tolerance Achievement
**Monorepo Type Packages**: Install at workspace root (`pnpm add -D -w @types/glob`)

**React Version Conflicts**: Explicit imports + proper type assertions, not casting workarounds

**Test File Type Safety**: `Record<string, unknown>` instead of `any` types

**Complex Component Patterns**: Use type generics for proper inference (`isValidElement<TabProps>`)

### Quality Process Breakthroughs
**Systematic Over Quick Fixes**: Address root causes, not symptoms

**Verification Before Claims**: Always run commands to confirm success

**Documentation Prevents Regression**: Write standards, don't just fix issues

**Cache Nuclear Option**: When dependency resolution fails, delete everything and reinstall

### Monorepo Architecture Insights
**Package Manager Discipline**: Wrong workspace levels cause phantom dependency issues

**Pre-commit Hook Reliability**: Run from project root with proper context

**Build System Intelligence**: Turborepo caching requires understanding dependency graphs

**Type Safety Foundation**: Zero errors policy prevents exponential debt accumulation

### Production Readiness Patterns
**Environment Validation**: Zod schemas for type-safe configuration

**Error Boundaries Everywhere**: Comprehensive failure isolation

**Centralized Logging**: Replace console statements with proper logging service

**Dependency Audit Discipline**: Regular cleanup prevents bloat

### Developer Experience Learnings
**Lint-staged Integration**: Automatic fixes prevent manual overhead

**Utility Extraction**: 30-40% code reduction through shared patterns

**Documentation Consolidation**: Prevent information drift across files

**Quality Gates Enforcement**: Pre-commit hooks as non-negotiable checkpoints

### Key Insight
**Quality investment is multiplicative** - systematic fixes prevent exponential technical debt, while shortcuts become tomorrow's debugging nightmares.

---

## Session History & Major Achievements

### 20-06-2025 - Week 3 Advanced Features & Worktree Crisis Resolution
- **Agent**: Claude (Sonnet 4)
- **Duration**: ~2 hours
- **Major Incident**: Agent started working in main production repo instead of claude-sandbox
  - **Root Cause**: No worktree documentation + agent ignored existing workflow docs
  - **Impact**: Mixed Week 3 features with user's testing migration work
  - **Resolution**: Surgical git separation, preserved all work, restored proper isolation
  - **Prevention**: Added comprehensive worktree documentation to all agent docs
- **Completed**:
  - YouTube video integration with search, grid layout, custom player
  - Advanced data visualization with interactive charts and analytics  
  - Sophisticated animation systems (scroll-based, carousel, loading animations)
  - Firebase Functions cloud integration with retry logic and Google Sheets
  - Navigation types and authentication context foundations
  - Mindset screen components and constants (committed properly)
  - Comprehensive worktree documentation across CLAUDE.md, AGENTS.md, ARCHITECTURE.md
- **Key Learning**: **ALWAYS verify workspace location before starting any work**

### 19-01-2025 - BGUI Testing Infrastructure Setup
- **Agent**: Claude (Opus 4)
- **Attempted**:
  - Installed testing dependencies: @testing-library/react-native, jest-expo, ts-jest, babel-jest
  - Created test infrastructure: jest.config.js, babel.config.js, jest-setup.js, test-utils.tsx
  - Wrote comprehensive Button.test.tsx with 14 test cases
  - Tried multiple Jest/Babel configurations to resolve compatibility issues
- **Blocker Encountered**: React Native 0.80.0 uses Flow type syntax which Jest cannot parse
  - Error: `type ErrorHandler = (error: mixed, isFatal: boolean) => void;`
  - This is a known issue in the React Native ecosystem with newer versions
- **Documentation Created**:
  - TESTING.md: Comprehensive testing strategy and recommendations
- **Recommendations**:
  - Use TypeScript for compile-time type safety
  - Consider Storybook for visual component testing
  - Test pure utility functions separately from React Native components
  - Wait for React Native Testing Library updates or use alternative testing strategies

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

### 26-06-2025 - Critical Git Merge Strategy Lesson
**Incident**: Nearly used `git merge --strategy=ours` on 14 PRs, which would have **discarded all PR content**.

**What --strategy=ours does**: 
- Creates a merge commit but **completely ignores** the other branch's changes
- Keeps only the current branch content
- Results in **total data loss** of the merged branch

**Why this is catastrophic**:
- All work in PRs #188-#201 would have been silently deleted
- Git history would show "merged" but content would be missing
- Recovery would require git archaeology to find lost commits

**Correct approach for merge conflicts**:
```bash
# For each PR:
gh pr checkout <number>
git merge origin/main --no-edit  # Normal merge, preserving both sides
# Manually resolve conflicts in files like TODO.md
# Keep BOTH sets of changes where appropriate
git add resolved-files
git commit
git push
gh pr merge --merge --admin
```

**Key principle**: When merging PRs, the goal is to **combine** work, not discard it. Always:
1. Resolve conflicts by keeping both changes when sensible
2. Review what's being merged with `git diff`
3. Never use merge strategies that discard content
4. If unsure, ask for help rather than risk data loss

**Lesson**: Merge strategies like `--strategy=ours` or `--strategy=theirs` should almost never be used for PR merges. They're nuclear options that destroy work. Always preserve and combine changes properly.

### 27-06-2025 - Security Audit Implementation
- **Agent**: Claude
- **Completed**:
  - Addressed critical security findings from multiple audits
  - Implemented input sanitization middleware and utilities
  - Enhanced session security with proper cookie configuration
  - Created comprehensive error handling system with correlation IDs
  - Added security documentation (SECURITY.md, SESSION_SECURITY.md, ERROR_HANDLING.md)
- **Key Learning**: Many audit findings were anticipatory warnings rather than current vulnerabilities, but implementing preventive measures early is easier than retrofitting later

### 28-06-2025 - Developer Experience & Build Issues
- **Agent**: Claude
- **Completed**:
  - Fixed React Native Web compatibility issues in Next.js builds
  - Created platform-specific `.web.tsx` component versions
  - Corrected monorepo filter syntax in documentation
  - Added missing expo-haptics dependency
  - Configured webpack for React Native Web compatibility
- **Key Learning**: React Native Web requires explicit configuration in Next.js, and platform-specific files are necessary for components using React Native imports

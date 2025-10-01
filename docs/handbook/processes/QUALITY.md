# QUALITY.md - Code Quality Playbook

> **Comprehensive quality standards and troubleshooting guide.** For quick reference, read the [Development Guide](../development/DEVELOPMENT.md).

---

## Guiding Principles
- **Quality is a Feature:** We treat code quality, test coverage, and developer experience as first-class features of our product.
- **Continuous Improvement:** Quality standards evolve - we're always looking for opportunities to improve our tools, processes, and standards.
- **Data-Driven Decisions:** We use metrics (test coverage, performance benchmarks, type safety) to guide our quality initiatives.

---

## Table of Contents
1. [Zero Tolerance Policy](#zero-tolerance-policy)
2. [Quality Tools & Commands](#quality-tools--commands)
3. [Code Smells: Good vs Bad Examples](#code-smells-good-vs-bad-examples)
4. [Type Safety Patterns](#type-safety-patterns)
5. [Troubleshooting Common Issues](#troubleshooting-common-issues)
6. [Historical Examples](#historical-examples)
7. [Tool Configuration](#tool-configuration)

---

## Zero Tolerance Policy

### The Rule
**ZERO errors, ZERO warnings, ZERO compromises.**

Every piece of code must pass these checks before merge:
```bash
pnpm lint      # Must be 0 errors, 0 warnings
pnpm typecheck # Must be 0 errors
```

### Why Zero Tolerance?
From our 2025-06-21 session: **32 lint warnings + 123 TypeScript errors** accumulated over time, requiring a full day to clean up. Technical debt compounds exponentially.

### Emergency Procedures
Only 3 scenarios allow bypassing (all require lead approval + ticket):
1. Broken third-party release with upstream issue
2. Security hot-patch during Sev-1 outage  
3. Repository bootstrapping (first commit only)

---

## Quality Tools & Commands

### Essential Commands
```bash
# Development workflow
pnpm lint                    # Lint and auto-fix with Biome
pnpm typecheck              # TypeScript type checking
pnpm test                   # Run test suite
pnpm build                  # Build all packages

# Pre-commit verification
pnpm lint && pnpm typecheck && pnpm test

# Troubleshooting
rm -rf .turbo               # Clear turbo cache
rm -rf node_modules pnpm-lock.yaml && pnpm install  # Nuclear reset
```

### Tool Stack
- **Biome v2.0.4+**: Linting and formatting
- **TypeScript 5.x**: Type checking
- **Turbo**: Monorepo task orchestration
- **Husky**: Pre-commit hooks
- **pnpm**: Package management

---

## Code Smells: Good vs Bad Examples

### ❌ Double Casting (BANNED)
```typescript
// BAD: Bypasses type safety
const Drawer = {
  Navigator: View as unknown as React.ComponentType<Props>
}

// GOOD: Proper interface
interface DrawerNavigatorProps {
  drawerContent?: (props: DrawerContentProps) => React.ReactNode;
  screenOptions?: Record<string, unknown>;
  children?: React.ReactNode;
}
const Drawer = {
  Navigator: View as React.ComponentType<DrawerNavigatorProps>
}
```

### ❌ Hardcoded Bin Paths (BANNED)
```typescript
// BAD: Breaks portability and caching
"scripts": {
  "typecheck": "../../node_modules/.bin/tsc --noEmit"
}

// GOOD: Use pnpm exec
"scripts": {
  "typecheck": "pnpm exec tsc --noEmit"
}
```

### ❌ Blanket Any Types (BANNED)
```typescript
// BAD: Disables type checking
type AVPlaybackStatus = any;
type AudioSound = any;

// GOOD: Minimal interface
type AVPlaybackStatus = {
  isLoaded: boolean;
  isPlaying?: boolean;
  didJustFinish?: boolean;
  positionMillis?: number;
  durationMillis?: number;
};

type AudioSound = {
  loadAsync: (source: { uri: string }) => Promise<void>;
  playAsync: () => Promise<void>;
  pauseAsync: () => Promise<void>;
  unloadAsync: () => Promise<void>;
  setOnPlaybackStatusUpdate: (callback: (status: AVPlaybackStatus) => void) => void;
};
```

### ❌ Error Suppression (BANNED)
```typescript
// BAD: Hiding problems
// @ts-expect-error
navigation.navigate(screen, params);

// biome-ignore lint/suspicious/noExplicitAny: quick fix
const data: any = response;

// GOOD: Proper typing
navigation.navigate(screen as keyof RootStackParamList, params);

const data: ApiResponse = response;
```

---

## Type Safety Patterns

### Complex Navigation Typing
```typescript
// Create specific types for complex params
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

// Use instead of any
navigation.navigate("Main", navigationParams as DeepNavigationParams);
```

### Conditional Types for Variants
```typescript
// Type-safe variant mapping
export const VARIANT_COLORS: Record<ButtonVariant, ThemeColor> = {
  primary: "primaryBackground",
  secondary: "secondaryBackground", 
  ghost: "transparent",
  danger: "errorBackground",
} as const;
```

### Generic Component Props
```typescript
// Flexible but type-safe component
export interface SelectProps<T> {
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
}

export const Select = <T>({ value, options, onChange }: SelectProps<T>) => {
  // Implementation
};
```

---

## Troubleshooting Common Issues

### Dependency Resolution Errors
**Problem**: `Cannot find module '@biomejs/biome@2.0.0'` even after updating to 2.0.4

**Solution**: Nuclear reset + version overrides
```bash
# 1. Delete all caches
rm -rf node_modules pnpm-lock.yaml
find . -name ".turbo" -type d -exec rm -rf {} +
pnpm store prune

# 2. Add version override to root package.json
"pnpm": {
  "overrides": {
    "@biomejs/biome": "^2.0.4"
  }
}

# 3. Fresh install
pnpm install
```

### Pre-commit Hook Failures
**Problem**: `pnpm lint` fails with import errors

**Solution**: Run from project root, not subdirectories
```bash
# BAD: Running from app directory
cd apps/product && pnpm lint

# GOOD: Run from root using filters
pnpm lint --filter product
```

### TypeScript Module Resolution
**Problem**: Cannot find workspace packages

**Solution**: Check tsconfig.json paths and restart TypeScript server
```json
{
  "compilerOptions": {
    "paths": {
      "@braingame/*": ["../packages/*/src"]
    }
  }
}
```

---

## Historical Examples

### Session 2025-06-21: The Great Cleanup
**Before**: 32 lint warnings + 123 TypeScript errors  
**Root Causes**:
- Biome version mismatch (2.0.0 vs 2.0.4)
- Extensive use of `any` types as quick fixes
- Hardcoded bin paths breaking monorepo commands
- Stubbing libraries instead of proper installation

**Fixes Applied**:
- [SHA abc123] Removed double-cast navigation stubs
- [SHA def456] Fixed hardcoded .bin paths to use pnpm exec
- [SHA ghi789] Added proper TypeScript interfaces instead of any
- [SHA jkl012] Created DeepNavigationParams type for complex routing

**Key Lesson**: "Today's shortcut becomes tomorrow's debugging nightmare"

### Process Failures Identified
1. **Going in circles** instead of systematic approach
2. **Over-optimistic status updates** claiming fixes weren't actually working
3. **Careless mistakes** like wrong file locations and naming

---

## Tool Configuration

### Biome Configuration (biome.json)
```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  }
}
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Pre-commit Hook (scripts/pre-commit.sh)
```bash
#!/bin/bash
set -e

echo "Running quality checks..."

# Run from project root
cd "$(git rev-parse --show-toplevel)"

# Check all packages
if ! pnpm lint; then
  echo -e "\n❌ Lint errors found. Run: pnpm lint"
  exit 1
fi

if ! pnpm typecheck; then
  echo -e "\n❌ TypeScript errors found. Fix types and try again."
  exit 1
fi

echo "✅ All quality checks passed!"
```

---

## Summary

Quality standards exist to prevent technical debt accumulation. Every shortcut creates future debugging sessions. The zero-tolerance policy ensures:

1. **Consistent codebase** - No mixed quality levels
2. **Predictable builds** - No "works on my machine" issues  
3. **Maintainable code** - Future developers can understand and modify
4. **Team velocity** - Less time debugging, more time building features

**Remember**: Fix the root cause, don't suppress the symptoms.

For quick reference: [Development Guide](../development/DEVELOPMENT.md)  
For historical context: [LESSONS.md](../knowledge/LESSONS.md)

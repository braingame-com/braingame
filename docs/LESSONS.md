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
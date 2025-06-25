# Quality Playbook

Zero-tolerance policy for code quality in Brain Game.

## Core Policy

**No exceptions for:**
- Lint warnings (`pnpm lint` must be 100% clean)
- TypeScript errors (`pnpm typecheck` must pass)
- Test failures
- Build errors

## Quality Tools

### Biome (Linting & Formatting)
```bash
pnpm lint           # Check issues
pnpm lint:fix       # Auto-fix
```

### TypeScript
```bash
pnpm typecheck      # Verify types
```

### Testing
```bash
pnpm test           # Run all tests
pnpm test:coverage  # Check coverage
```

## Code Smell Elimination

### Banned Patterns

| Pattern | Why Banned | Fix |
|---------|------------|-----|
| `any` type | Defeats type safety | Use specific types or `unknown` |
| `console.log` | Production leaks | Use logger service |
| Magic numbers | Unclear intent | Named constants |
| Nested ternaries | Poor readability | if/else blocks |
| Large functions | High complexity | Extract smaller functions |
| Hardcoded strings | No i18n support | Translation keys |

### Type Safety Patterns

**Replace `any` with `unknown`:**
```typescript
// Bad
const processData = (data: any) => {
  return data.user.name;
};

// Good
const processData = (data: unknown) => {
  if (isValidUserData(data)) {
    return data.user.name;
  }
  throw new Error('Invalid user data');
};
```

**Proper Error Handling:**
```typescript
// Bad
try {
  doSomething();
} catch (e) {
  console.log(e);
}

// Good
try {
  doSomething();
} catch (error) {
  logger.error('Operation failed', { error });
  throw new AppError('Operation failed', { cause: error });
}
```

## Quality Workflow

### Pre-Commit
```bash
# Run before every commit
pnpm lint && pnpm typecheck && pnpm test
```

### CI Pipeline
1. **Lint Check** - Biome linting
2. **Type Check** - TypeScript compilation
3. **Unit Tests** - Jest/Vitest execution
4. **Build Check** - Production build verification
5. **E2E Tests** - Critical user flows

### Quality Gates
- **PR Creation** - All checks must pass
- **Code Review** - Manual quality assessment
- **Merge** - Final automated verification
- **Deployment** - Production readiness

## Troubleshooting

### Common Issues

**TypeScript Errors:**
```bash
# Clear type cache
rm -rf node_modules/.cache
pnpm typecheck
```

**Lint Failures:**
```bash
# Auto-fix what's possible
pnpm lint:fix

# Manual fix remaining issues
pnpm lint
```

**Test Failures:**
```bash
# Run specific test
pnpm test -- ButtonComponent

# Debug mode
pnpm test -- --watch
```

**Build Failures:**
```bash
# Clean build
rm -rf dist .next
pnpm build
```

### Nuclear Options

**Dependency Reset:**
```bash
rm -rf node_modules package-lock.json
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
pnpm install
```

**Cache Clear:**
```bash
# Metro (React Native)
npx react-native start --reset-cache

# Turborepo
pnpm exec turbo clean
```

## Historical Examples

### Successful Cleanup (Jan 2025)
- **730+ tests** added across monorepo
- **Zero lint warnings** achieved
- **100% TypeScript** strict mode
- **70% bundle size** reduction

### Quality Metrics
- **Build time**: Sub-2 seconds
- **Test coverage**: 80%+ on new code
- **Type coverage**: 100% in packages
- **Bundle size**: <20MB for mobile app

## Enforcement

### Automated
- Pre-commit hooks block poor quality
- CI pipeline fails on quality issues
- Deployment blocked by test failures

### Manual
- Code review quality assessment
- Architecture review for complex changes
- Performance review for critical paths

## Quality Culture

### Developer Responsibilities
- **Own quality** - Don't rely on others to catch issues
- **Fix immediately** - Don't accumulate technical debt
- **Share knowledge** - Document patterns and solutions
- **Continuous improvement** - Raise quality standards

### Team Standards
- **No shame culture** - Focus on improvement
- **Collective ownership** - Everyone responsible for quality
- **Learning mindset** - Mistakes are learning opportunities
- **Tool investment** - Automate quality checks
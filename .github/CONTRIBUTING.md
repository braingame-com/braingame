# Contributing

## Workflow

1. **Fork & clone** the repository
2. **Create feature branch** from `main`
3. **Make changes** following our standards
4. **Submit PR** with all checks passing

## Zero Tolerance Quality Standards

All PRs must pass:
- `pnpm lint` (0 warnings)
- `pnpm typecheck` (0 errors)
- `pnpm test`
- `pnpm build`

**CRITICAL**: Always verify on your feature branch BEFORE opening PR:
```bash
git checkout your-feature-branch
pnpm lint && pnpm typecheck && pnpm test
```

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(scope): add new feature
fix(scope): resolve bug
docs(scope): update documentation
```

## Banned Code Patterns

| Pattern | Why | Use Instead |
|---------|-----|-------------|
| `any` type | Type safety | Specific types |
| `@ts-ignore` | Hidden errors | Fix the type issue |
| `console.log` | Production leaks | Logger service |
| `.only` in tests | Incomplete coverage | Run all tests |
| Hardcoded secrets | Security risk | Environment variables |
| `!important` CSS | Specificity wars | Better selectors |
| Inline styles | Maintainability | CSS modules/styled |
| Magic numbers | Unclear intent | Named constants |
| Nested ternaries | Readability | if/else or switch |
| Deep nesting (>3) | Complexity | Extract functions |

## Testing Requirements

- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Minimum 80% coverage for new code

## AI Agent Guidelines

When using AI tools:
1. Review all generated code
2. Verify against project patterns
3. Test thoroughly
4. Never commit without review
5. Check BugBot comments on all PRs
6. Run quality checks locally before merge
7. Never close PRs without permission

## Code Style

We use:
- Biome for linting/formatting
- TypeScript strict mode
- CSS modules for styling
- React functional components

## Questions?

Open a discussion or reach out to maintainers.
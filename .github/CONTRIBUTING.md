# Contributing

## Workflow

1. **Fork & clone** the repository
2. **Create feature branch** from `main`
3. **Make changes** following our standards
4. **Submit PR** with all checks passing

## Zero Tolerance Quality Standards

All PRs must pass:
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

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

## Code Style

We use:
- Biome for linting/formatting
- TypeScript strict mode
- CSS modules for styling
- React functional components

## Questions?

Open a discussion or reach out to maintainers.
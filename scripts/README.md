# Scripts

Development tools and automation for Brain Game.

## Component Development

### Create BGUI Component
```bash
node scripts/create-bgui-component.js ComponentName
```

Generates:
- Component file with TypeScript
- Test file with Jest setup
- Storybook story
- Documentation template

## Development Tools

### Interactive Menu
```bash
node scripts/dev-tools.js
```

**Options:**
- 📊 **Project Stats** - File counts, dependencies, bundle size
- 🔍 **Code Analysis** - Dead code, duplicate files, complexity
- 📦 **Dependencies** - Audit, outdated packages, security
- 🧹 **Workspace** - Clean builds, reset dependencies
- 📚 **Documentation** - Generate API docs, validate links

## Workspace Management

### Clean Everything
```bash
node scripts/clean-workspace.js
```

Removes:
- All node_modules directories
- Build artifacts (.next, dist, build)
- Cache files (.cache, .turbo)
- Generated files

### Dependency Audit
```bash
node scripts/audit-deps.js
```

Checks:
- Outdated packages
- Security vulnerabilities  
- Duplicate dependencies
- License compliance

## Code Generation

### Component Scaffolding
```bash
# Create component with all files
scripts/create-bgui-component.js Button

# Generated files:
# - src/components/Button/Button.tsx
# - src/components/Button/Button.test.tsx
# - src/components/Button/Button.stories.tsx
# - docs/Button.md
```

### Documentation Generation
```bash
node scripts/generate-docs.js
```

Creates:
- API documentation from TypeScript
- Component prop tables
- Cross-reference links
- README updates

## Git Hooks & CI

### Pre-commit Validation
```bash
# Runs automatically before commits
scripts/pre-commit-check.js
```

Validates:
- Lint passes (pnpm lint)
- Types check (pnpm typecheck)
- Tests pass (pnpm test)
- Build succeeds (pnpm build)

### Workspace Verification
```bash
node scripts/verify-workspace.js
```

Ensures:
- Correct workspace location
- Git branch status
- No uncommitted changes
- Dependencies installed

## Code Transformation

### Automated Refactoring
```bash
# Run codemods
node scripts/codemods/migrate-to-tokens.js
```

**Available codemods:**
- **migrate-to-tokens** - Replace hardcoded values with design tokens
- **update-imports** - Modernize import statements
- **extract-constants** - Move magic numbers to constants
- **add-prop-types** - Add TypeScript interface definitions

### Bulk Operations
```bash
# Update all component documentation
scripts/bulk-update-docs.js

# Standardize file naming
scripts/standardize-naming.js

# Add missing test files
scripts/add-missing-tests.js
```

## Performance Tools

### Bundle Analysis
```bash
node scripts/analyze-bundle.js
```

Generates:
- Bundle size reports
- Dependency graphs
- Tree shaking analysis
- Performance recommendations

### Code Metrics
```bash
node scripts/code-metrics.js
```

Reports:
- Lines of code by package
- Complexity scores
- Test coverage percentages
- Technical debt indicators

## Automation Scripts

### Daily Maintenance
```bash
# Automated daily tasks
scripts/daily-maintenance.js
```

Performs:
- Dependency updates
- Security audit
- Link validation
- Performance benchmarks

### Release Preparation
```bash
scripts/prepare-release.js
```

Tasks:
- Update version numbers
- Generate changelog
- Run full test suite
- Create release notes

## Best Practices

- **Run interactively** - Use dev-tools menu for exploration
- **Automate repetitive tasks** - Create scripts for common operations
- **Validate before commits** - Use pre-commit hooks
- **Document new scripts** - Add to this README
- **Test scripts thoroughly** - Include error handling
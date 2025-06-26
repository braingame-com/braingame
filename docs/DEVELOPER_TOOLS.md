# Developer Tools & Scripts

This document covers all the developer tools and scripts available in the Brain Game monorepo.

## 🛠️ Component Scaffolding

### BGUI Component Generator

Create new BGUI components with proper structure and boilerplate:

```bash
pnpm bgui:scaffold ComponentName
```

**Options:**
- `--simple` - Create a simple component without advanced features
- `--hook` - Create a custom hook instead of a component
- `--util` - Create a utility function

**Examples:**
```bash
# Standard component
pnpm bgui:scaffold Button

# Simple component
pnpm bgui:scaffold Card --simple

# Custom hook
pnpm bgui:scaffold useCounter --hook

# Utility function
pnpm bgui:scaffold formatDate --util
```

**What it creates:**
```
packages/bgui/src/components/ComponentName/
├── ComponentName.tsx      # Main component file
├── index.ts              # Exports
├── styles.ts             # Styled components
├── types.ts              # TypeScript types
└── ComponentName.test.tsx # Test file
```

The script automatically:
- Validates naming conventions
- Creates all necessary files
- Updates package exports
- Follows BGUI patterns and best practices

## 📊 Development Tools

### Workspace Analysis

Analyze the monorepo structure and dependencies:

```bash
node scripts/dev-tools.js
```

This provides:
- Workspace structure overview
- Package dependencies analysis
- File count and size metrics
- Configuration validation

### Documentation Generator

Generate documentation from code:

```bash
node scripts/doc-generator.js
```

Features:
- Extracts JSDoc comments
- Creates markdown documentation
- Generates component API docs

## 🔍 Quality & Validation

### Workspace Verification

Check your workspace setup:

```bash
./scripts/check-workspace.sh
```

Validates:
- Git worktree configuration
- Node version
- pnpm installation
- Environment setup

### Secret Scanning

Scan for exposed secrets:

```bash
pnpm secrets:scan
```

### Type Checking

Run TypeScript validation:

```bash
pnpm typecheck
```

### Linting & Formatting

```bash
# Lint and auto-fix
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## 🧪 Testing Tools

### Run Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# With coverage
pnpm test:coverage
```

### Test Specific Packages

```bash
# Test BGUI components
pnpm test --filter @braingame/bgui

# Test utils
pnpm test --filter @braingame/utils
```

## 📦 Build Tools

### Build Commands

```bash
# Build everything
pnpm build

# Build packages only
pnpm build:packages

# Build apps only
pnpm build:apps
```

### Development Servers

```bash
# Start all dev servers
pnpm dev

# Product app only
pnpm dev --filter product

# Main site only
pnpm dev --filter main-site

# Docs site only
pnpm dev --filter docs-site
```

## 🚀 Deployment Tools

### Environment Validation

```bash
# Validate all env vars
pnpm validate:env
```

### Firebase Deployment

```bash
# Deploy to Firebase
firebase deploy

# Deploy specific target
firebase deploy --only hosting:www
```

## 📈 Performance Tools

### Bundle Analysis

```bash
# Analyze bundle sizes
pnpm analyze
```

### Lighthouse CI

Coming soon - performance monitoring in CI/CD pipeline.

## 🔧 Utility Scripts

### Dependency Management

```bash
# Update dependencies
pnpm deps:update

# Check outdated packages
pnpm deps:outdated

# Security audit
pnpm security:audit
```

### Workspace Management

```bash
# View dependency graph
pnpm workspace:graph

# Prune workspace
pnpm workspace:prune
```

### Clean & Reset

```bash
# Clean build artifacts
pnpm clean

# Full reset (clean + reinstall)
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🎨 Storybook

Component development and documentation:

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## 🔄 Git Hooks

Pre-commit hooks run automatically via Husky:
- Secret scanning
- Linting
- Type checking
- Test execution

To bypass hooks (emergency only):
```bash
git commit --no-verify
```

## 📝 Creating New Scripts

When adding new scripts:

1. Add to `/scripts` directory
2. Make executable: `chmod +x scripts/your-script.js`
3. Add npm script to root `package.json`
4. Document in this file
5. Follow existing patterns for console output and error handling

## 🤝 Contributing

When creating new developer tools:
- Use the console utilities from `scripts/utils/console.js`
- Follow existing naming conventions
- Add proper error handling
- Include help/usage information
- Test on all platforms (macOS, Linux, Windows via WSL)
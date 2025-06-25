# Claude Tactical Guide

Essential commands and workflows for AI development in Brain Game.

## Golden Path Workflow

### Phase 1: Setup
```bash
# Verify workspace
pwd && git branch --show-current && git status

# Create worktree for experiments
git worktree add ../braingame-claude-sandbox

# Switch to appropriate workspace
cd /workspace/braingame  # Production work
cd ../braingame-claude-sandbox  # Experimental work
```

### Phase 2: Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev --filter=product    # Mobile app
pnpm dev --filter=main-site  # Marketing site

# Quality checks (MANDATORY before commits)
pnpm lint && pnpm typecheck && pnpm test
```

### Phase 3: PR Creation
```bash
# Verify GitHub account setup
gh auth status

# Create feature branch
git checkout -b feature/description

# Commit with conventional format
git commit -m "feat(scope): description"

# Push and create PR
git push -u origin feature/description
gh pr create --title "Title" --body "Description"
```

### Phase 4: Completion
```bash
# Verify PR merged
gh pr status

# Clean up worktree (if experimental)
rm -rf ../braingame-claude-sandbox
git worktree prune
```

## Code Quality Standards

### Zero-Tolerance Policy
- **100% lint pass**: No warnings or errors
- **100% type check**: No TypeScript errors
- **Test coverage**: Maintain existing coverage
- **No console.logs**: Use proper logging

### Quality Commands
```bash
# Lint everything
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# TypeScript checking
pnpm typecheck

# Run tests
pnpm test

# Build to verify
pnpm build
```

## Git Worktree Usage

### Critical Safety Rule
**NEVER work directly in main workspace for experimental changes**

### Workspace Structure
```
/workspace/braingame/                 # Production work only
/workspace/braingame-claude-sandbox/  # Experimental work
```

### Commands
```bash
# List worktrees
git worktree list

# Add experimental worktree
git worktree add ../braingame-claude-sandbox

# Remove worktree
rm -rf ../braingame-claude-sandbox
git worktree prune
```

## Platform-Specific Commands

### React Native (Mobile)
```bash
# iOS
cd apps/product
npx react-native run-ios

# Android
npx react-native run-android

# Reset Metro cache
npx react-native start --reset-cache

# iOS dependencies
cd ios && pod install
```

### Web (Next.js)
```bash
# Development server
cd apps/main-site
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Common Operations

### Package Management
```bash
# Install all dependencies
pnpm install

# Add package to specific app
pnpm add --filter=product react-native-module

# Add dev dependency
pnpm add -D --filter=bgui @types/jest
```

### Monorepo Operations
```bash
# Run command in all packages
pnpm run build

# Run in specific package
pnpm run test --filter=bgui

# List packages
pnpm list --depth=0
```

## GitHub Operations

### Setup Verification
```bash
# Check authentication
gh auth status

# Configure if needed
gh auth login
```

### PR Management
```bash
# Create PR
gh pr create --title "Title" --body "Description"

# View PR status
gh pr status

# Merge PR (only if authorized)
gh pr merge --squash
```

## Project Architecture Quick Reference

```
braingame/
├── apps/
│   ├── api/              Express.js API
│   ├── product/          React Native app
│   ├── main-site/        Next.js marketing
│   └── docs-site/        Docusaurus docs
├── packages/
│   ├── bgui/            UI components
│   ├── config/          Shared config
│   └── utils/           Utilities
└── docs/                Documentation
```

## Working Agreements

1. **Always verify workspace** before any action
2. **Run quality checks** before every commit
3. **Use conventional commits** for all changes
4. **Document decisions** in relevant files
5. **Preserve context** for future sessions
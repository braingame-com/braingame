# Development Guide

Welcome to Brain Game! This guide will help you get started with development.

## Prerequisites

- **Node.js 18+** (check `.nvmrc` for exact version)
- **pnpm 9+** (install with `npm install -g pnpm`)
- **Git**
- **VS Code** (recommended, see `.vscode/settings.json`)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/braingame-com/braingame.git
cd braingame

# Install correct Node version (if using nvm)
nvm use

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

## Project Structure

```
braingame/
├── apps/                    # Deployable applications
│   ├── product/            # Expo universal app (iOS/Android/Web)
│   └── website/            # Next.js marketing site
├── packages/               # Shared packages
│   ├── bgui/              # UI component library
│   ├── utils/             # Shared utilities
│   └── config/            # Shared configurations
├── docs/                   # Documentation
└── .github/               # GitHub Actions workflows
```

## Development Workflow

### 1. Running Applications

```bash
# Run all apps in development
pnpm dev

# Run specific app
pnpm dev --filter product  # Expo app
pnpm dev --filter website  # Next.js site

# Platform-specific commands (Expo)
pnpm --filter product ios
pnpm --filter product android
pnpm --filter product web
```

### 2. Working with Components

```bash
# Start Storybook for component development (not yet implemented)
pnpm storybook

# Create a new component in bgui
cd packages/bgui/src
mkdir MyComponent
# Create MyComponent.tsx, MyComponent.stories.tsx, etc.
```

### 3. Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage (not yet implemented)
pnpm test:coverage

# Run tests for specific package
pnpm test --filter bgui
```

### 4. Code Quality

```bash
# Run linting and formatting
pnpm lint

# Type checking (not yet implemented)
pnpm typecheck

# Clean all build artifacts
pnpm clean
```

## Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code patterns
   - Update tests if needed
   - Run `pnpm lint` before committing

3. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve navigation issue"
   git commit -m "docs: update README"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Adding Dependencies

```bash
# Add to root workspace
pnpm add -w turbo

# Add to specific app/package
pnpm add react-query --filter product
pnpm add -D @types/node --filter website

# Add to all workspaces
pnpm add typescript -r
```

## Environment Variables

1. Copy example files:
   ```bash
   cp apps/product/.env.example apps/product/.env.local
   cp apps/website/.env.example apps/website/.env.local
   ```

2. Fill in required values (see each `.env.example` for details)

## Troubleshooting

### Common Issues

**Issue**: Dependencies not installing
```bash
# Clear all caches and reinstall
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Issue**: Type errors in VS Code
```bash
# Restart TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

**Issue**: Expo app not loading
```bash
# Clear Expo cache
cd apps/product
npx expo start -c
```

## AI Development

When using AI assistants (like Claude):
1. Point them to `CLAUDE.md` for project-specific instructions
2. Check `TODO.md` for current priorities
3. Review `AI_CONTEXT.md` for project state

## Getting Help

- **Documentation**: Check `/docs` folder
- **Architecture**: See `docs/ARCHITECTURE.md`
- **Task Tracking**: See `TODO.md`
- **Security**: See `SECURITY.md`

## VS Code Extensions

Recommended extensions (auto-installed via `.vscode/extensions.json`):
- Biome (formatting/linting)
- Expo Tools
- Tailwind CSS IntelliSense

## Next Steps

1. Explore the codebase structure
2. Run the development servers
3. Check `TODO.md` for good first issues
4. Read `docs/ARCHITECTURE.md` for system design
5. Join our Discord/Slack for questions

Happy coding! 🚀
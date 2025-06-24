# Development Guide

## Philosophy

- **Speed & Quality**: Move fast without breaking things
- **Ownership**: Own your code end-to-end
- **Pragmatism**: Use what works, not what's trendy

## Quick Start

```bash
# Clone and setup
git clone https://github.com/braingame/braingame.git
cd braingame
pnpm install

# Start development
pnpm dev
```

## Prerequisites

### Required Software

```bash
# Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# pnpm
npm install -g pnpm

# React Native CLI (for mobile dev)
npm install -g @react-native-community/cli
```

### VS Code Extensions

Install these extensions:
- Biome
- Expo Tools
- CSS Modules
- React Native Tools

## Development Scripts

```bash
# Start all apps
pnpm dev

# Start specific app
pnpm dev --filter=product
pnpm dev --filter=main-site

# Testing
pnpm test                    # Run all tests
pnpm test:watch             # Watch mode
pnpm test --filter=bgui     # Test specific package

# Quality checks
pnpm lint                   # Check linting
pnpm typecheck             # Type checking
pnpm build                 # Build all apps
```

## Project Structure

```
braingame/
├── apps/
│   ├── api/              REST API (Express)
│   ├── product/          Mobile app (React Native)
│   ├── main-site/        Marketing site (Next.js)
│   └── docs-site/        Documentation (Docusaurus)
├── packages/
│   ├── bgui/            UI components
│   ├── config/          Shared config
│   ├── i18n/            Internationalization
│   └── utils/           Shared utilities
├── docs/                Technical documentation
└── scripts/             Build and deployment scripts
```

## Environment Setup

Create `.env.local` files:

### Apps (product, main-site)
```env
# Firebase
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id

# API
API_URL=http://localhost:3001
```

### API
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/braingame
JWT_SECRET=your-jwt-secret
```

## Development Workflow

### Branching Strategy
```bash
# Feature branch
git checkout -b feature/user-auth

# Bug fix
git checkout -b fix/login-error

# Hotfix
git checkout -b hotfix/critical-bug
```

### Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org/):
```bash
feat(auth): add JWT authentication
fix(ui): resolve button alignment issue
docs(api): update endpoint documentation
```

### Pull Request Process
1. Create feature branch
2. Make changes
3. Run quality checks: `pnpm lint && pnpm typecheck && pnpm test`
4. Submit PR with tests passing
5. Address review feedback
6. Merge after approval

## Common Issues

### Metro bundler issues (React Native)
```bash
npx react-native start --reset-cache
```

### Node modules issues
```bash
rm -rf node_modules
pnpm install
```

### iOS build issues
```bash
cd apps/product/ios
pod install
```

### TypeScript issues
```bash
pnpm typecheck
# Fix reported errors
```

## AI Development

See [CLAUDE.md](../CLAUDE.md) for working with AI assistants.

## Getting Help

- Check documentation in `docs/`
- Ask in project discussions
- Review existing code patterns
- Consult architecture docs
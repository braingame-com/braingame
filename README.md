# Brain Game

Enterprise-grade mindset training platform.

[![CI](https://github.com/braingame/braingame/actions/workflows/ci.yml/badge.svg)](https://github.com/braingame/braingame/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

```bash
# Verify workspace (mandatory first step)
pwd && git branch --show-current && git status

# Clone and setup
git clone https://github.com/braingame/braingame.git
cd braingame
pnpm install

# Start development
pnpm dev
```

Access at http://localhost:3000

## Guiding Principles

### Enterprise-Grade by Default
Zero-tolerance policy for technical debt. All code must pass:
- 100% lint checks
- 100% type checks  
- Comprehensive test coverage
- Production build verification

### Pragmatic & Ambitious
We balance cutting-edge technology with proven reliability, shipping features that users need while maintaining architectural excellence.

### Documentation as Law
All decisions, patterns, and processes are documented. Code changes must include documentation updates.

## Repository Structure

**Turborepo monorepo** managed with pnpm workspaces:

```
braingame/
├── apps/
│   ├── api/              Express.js REST API
│   ├── product/          React Native mobile app
│   ├── main-site/        Next.js marketing website
│   └── docs-site/        Docusaurus documentation
├── packages/
│   ├── bgui/            25+ UI components
│   ├── config/          Shared TypeScript config
│   ├── i18n/            Multi-language support
│   └── utils/           Shared utilities
└── docs/                Technical documentation
```

## Platform Features

### Core Capabilities
- **CBT-based exercises** for mindset training
- **Cross-platform sync** between mobile and web
- **Offline functionality** with intelligent sync
- **Gamified progress** with token system

### Technical Highlights
- **TypeScript-first** development
- **100+ UI components** in design system
- **730+ tests** across monorepo
- **Sub-2s build times** with Turborepo caching
- **70% smaller bundles** through optimization

## 2025 Enhancements

### Quality Excellence
- Zero lint warnings achieved across codebase
- Comprehensive type safety with strict TypeScript
- Extensive test coverage with hybrid testing strategy

### Performance Optimizations
- Bundle size reduced by 70% through font consolidation
- Load times improved to sub-2 seconds
- Memory usage optimized for mobile devices

### Developer Experience
- AI-assisted development workflows
- Comprehensive documentation rewrite
- Automated quality gates in CI/CD

## Development Commands

```bash
# Development
pnpm dev                    # All apps
pnpm dev --filter=product   # Mobile app only

# Quality checks
pnpm lint && pnpm typecheck && pnpm test

# Build
pnpm build                  # Production builds
```

## Contributing

We welcome contributions! Please:

| Document | Description |
|---|---|
| [`DEVELOPMENT.md`](./docs/DEVELOPMENT.md) | **Start here.** Environment setup guide |
| [`CODING_STYLE.md`](./docs/CODING_STYLE.md) | Code standards and conventions |
| [`PR_REVIEW_PROCESS.md`](./docs/PR_REVIEW_PROCESS.md) | Pull request review process |
| [`TESTING.md`](./docs/TESTING.md) | Testing strategy and guidelines |
| [`WORKTREES.md`](./docs/WORKTREES.md) | **CRITICAL:** Git worktree management |
| [`API.md`](./docs/API.md) | API documentation and examples |
| [`TOKEN_SYSTEM.md`](./docs/TOKEN_SYSTEM.md) | Design token system guide |
| [`DEVELOPER_TOOLS.md`](./docs/DEVELOPER_TOOLS.md) | Scripts and developer tools guide |

1. Read [CONTRIBUTING.md](.github/CONTRIBUTING.md)
2. Follow our [coding standards](docs/development/CODING_STYLE.md)
3. Ensure all quality checks pass
4. Update documentation for changes

### Documentation Organization

- **[Architecture](docs/architecture/)** - System design and ADRs
- **[Development](docs/development/)** - Setup and workflow guides
- **[Features](docs/features/)** - Feature-specific documentation  
- **[Processes](docs/processes/)** - Team workflows and standards

## Security

Report security vulnerabilities to hello@braingame.dev. See [SECURITY.md](.github/SECURITY.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file.
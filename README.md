<div align="center">
  <a href="https://braingame.com">
    <img src="./assets/logo.png" alt="Brain Game Logo" width="200" height="200">
  </a>
  
  <h1>Brain Game</h1>
  
  <p>
    <strong>The operating system for personal development.</strong>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/github/actions/workflow/status/braingame-com/braingame/ci.yml?style=flat-square&logo=github&label=CI" alt="CI">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/monorepo-turborepo-ef4444?style=flat-square&logo=turborepo" alt="Monorepo">
    <img src="https://img.shields.io/badge/components-100+-brightgreen?style=flat-square" alt="Components">
    <img src="https://img.shields.io/badge/Managed%20by-Brain%20Game-7c3aed?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMjE3MyAxOS4yNDk4QzYuMTU0MyAxOS4yNDk4IDUuMjc0MyAxOC44NDI4IDQuNjM4MyAxOC4wNzM4QzQuMDAyMyAxNy4zMDQ4IDMuNjY3MyAxNi4zNTQ4IDMuNjY3MyAxNS4yOTg4VjguNzAwOEMzLjY2NzMgNy42NDQ4IDQuMDAyMyA2LjY5NDggNC42MzgzIDUuOTI1OEM1LjI3NDMgNS4xNTY4IDYuMTU0MyA0Ljc0OTggNy4yMTczIDQuNzQ5OEgxMS4wNDkzQzEyLjEwNjMgNC43Q5IDEzLjA3NTMgNS4xNTY4IDEzLjcxMTMgNS45MjU4QzE0LjM0NzMgNi42OTQ4IDE0LjY4MjMgNy42NDQ4IDE0LjY4MjMgOC43MDA4VjEzLjQ4NjhDMTQuNjgyMyAxMy41NzA4IDE0LjY3NTMgMTMuNjUyOCAxNC42NjEzIDEzLjczNDhDMTQuNjQ3MyAxMy44MTY4IDE0LjYyNjMgMTMuODk4OCAxNC42MDAzIDEzLjk4MDhDMTQuMzc0MyAxNC42NDA4IDEzLjkxMzMgMTUuMTMwOCAxMy4yMTczIDE1Ljc5MjhDMTIuNTEwMyAxNi40NDQ4IDExLjYxMjMgMTYuOTA1OCAxMC41ODIzIDE3LjI3MjhDMTIuMDYxMyAxNy42NzU4IDEzLjE0NTMgMTguNDIyOCAxMy44MzQzIDE5LjUxNDhDMTQuNTIzMyAyMC42MDY4IDE0LjgyMzMgMjEuODk5OCAxNC44MjMzIDIzLjM5MjhWjcuMjE3MyAxOS4yNDk4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" alt="Managed by Brain Game">
  </p>
</div>


This monorepo contains the code for all Brain Game applications, websites, and shared libraries. It includes a comprehensive mindset training platform with advanced features and enterprise-grade architecture.

---

## 🚀 Get Started

To get a local copy up and running, follow our comprehensive **[Development Guide](./docs/DEVELOPMENT.md)**. It contains everything you need for setup, from prerequisites to running the apps.

Before running any lint or test commands, make sure your dependencies are installed:

```bash
pnpm install    # or pnpm run preflight
```

New contributors should review **[docs/AGENTS.md](./docs/AGENTS.md)** and **[docs/CLAUDE.md](./docs/CLAUDE.md)** to understand how human and AI workflows operate in this repository.

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/braingame-com/braingame.git
cd braingame

# Verify workspace (CRITICAL - prevents contamination)
bash scripts/check-workspace.sh

# Install dependencies
nvm use  # Use correct Node version
pnpm install

# Run everything
pnpm dev

# Or run specific apps
pnpm dev --filter product  # Expo app
pnpm dev --filter website  # Next.js site
```

**🚨 Important**: Always verify your workspace before starting work. See [WORKTREES.md](./docs/WORKTREES.md) for details.

---

## 🧠 Guiding Principles

- **Enterprise-Grade by Default:** We build robust, scalable, and maintainable software that meets Fortune 500 quality standards from day one.
- **Pragmatic & Ambitious:** We use proven technologies and patterns to solve problems, but we are not afraid to innovate where it matters.
- **Documentation is Law:** Our `docs` folder is not just a suggestion; it is the single source of truth for how we build, architect, and collaborate.

---

## 📂 What's Inside?

This repository is a [Turborepo](https://turbo.build/repo) monorepo using [pnpm workspaces](https://pnpm.io/workspaces). It contains:

| Path | Description |
|---|---|
| `apps/product` | The universal **Expo client** for iOS, Android, and Web. Features a complete mindset training platform with vision & goals, affirmations, visual inspiration, and performance tracking. |
| `apps/main-site` | The **Next.js marketing site** and landing page. |
| `apps/docs-site` | The **Next.js documentation site** for component library. |
| `packages/bgui` | Our **enterprise-grade component library** with 25+ components, built with React Native and `react-native-web`. Features full TypeScript support, accessibility, and theme integration. |
| `packages/utils` | Shared utilities, hooks, design tokens, and helpers used across the monorepo. Includes theme system, animation constants, and task management utilities. |
| `packages/config` | Shared configurations for TypeScript, Biome, etc. |
| `docs` | All project documentation, from architecture to coding style. |

---

## 🎯 Key Features

### Mindset Training Platform
- **Vision & Goals System**: 5-area life planning with structured goal setting
- **Affirmations System**: Audio and text affirmations with background music
- **Visual Inspiration**: 50+ motivational images with slideshow navigation
- **Performance Tracking**: Habit tracking, health metrics, and activity scores
- **Data Persistence**: Google Sheets backend integration for reliable storage

### Technical Highlights
- **100+ Components**: Comprehensive UI library with enterprise-grade quality
- **Cross-Platform**: Single codebase for iOS, Android, and Web
- **TypeScript**: 100% TypeScript with strict mode enabled
- **Design System**: Complete token system for spacing, colors, and typography
- **Accessibility**: Full ARIA support and keyboard navigation
- **Performance**: 60fps animations with optimized bundle sizes
- **Testing**: Comprehensive test coverage across all packages

### Recent Enhancements (2025)
- Successfully migrated valuable features from legacy projects
- Created 70+ new components with enterprise architecture
- Implemented advanced features including YouTube integration, data visualization, and dynamic theming
- Enhanced BGUI library with 3 custom hooks and standardized patterns
- Established comprehensive testing and documentation systems

---

## 🤝 Contributing

We welcome contributions! Please see our **[Contributing Guide](./.github/CONTRIBUTING.md)** for the full process, including our code of conduct, PR process, and commit conventions.

A key part of our workflow is our task management system. See what we're working on in our **[TODO list](./TODO.md)**.

## 📚 Documentation

### 🏗️ Architecture & Quality
Core architectural documents defining how we build software.

| Document | Description |
|---|---|
| [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Technical blueprint and system design |
| [`QUALITY.md`](./docs/QUALITY.md) | Quality standards and best practices |
| [`LESSONS.md`](./docs/LESSONS.md) | Technical learnings and solutions |
| [`BRAND.md`](./docs/BRAND.md) | Brand guidelines and identity |

### ⚙️ Engineering Process
How to actually build and code in this repository.

| Document | Description |
|---|---|
| [`DEVELOPMENT.md`](./docs/DEVELOPMENT.md) | **Start here.** Environment setup guide |
| [`CODING_STYLE.md`](./docs/CODING_STYLE.md) | Code standards and conventions |
| [`PR_REVIEW_PROCESS.md`](./docs/PR_REVIEW_PROCESS.md) | Pull request review process |
| [`TESTING.md`](./docs/TESTING.md) | Testing strategy and guidelines |
| [`WORKTREES.md`](./docs/WORKTREES.md) | **CRITICAL:** Git worktree management |
| [`API.md`](./docs/API.md) | API documentation and examples |
| [`TOKEN_SYSTEM.md`](./docs/TOKEN_SYSTEM.md) | Design token system guide |

### 🤖 AI Agent Documentation
Specific guidance for AI agents and automation.

| Document | Description |
|---|---|
| [`CLAUDE.md`](./docs/CLAUDE.md) | Tactical guide with commands and workflows |
| [`AGENTS.md`](./docs/AGENTS.md) | AI agent roles and guidelines |

### 📋 Project Management
Planning, tracking, and process documentation.

| Document | Description |
|---|---|
| [`TODO.md`](./TODO.md) | Current tasks and priorities |
| [`I18N_WORKFLOW.md`](./docs/I18N_WORKFLOW.md) | Internationalization workflow |

### 🚀 Quick Start by Role

**New Developer?**
1. Start with [`DEVELOPMENT.md`](./docs/DEVELOPMENT.md)
2. Read [`CODING_STYLE.md`](./docs/CODING_STYLE.md)
3. Review [`PR_REVIEW_PROCESS.md`](./docs/PR_REVIEW_PROCESS.md)

**AI Agent?**
1. Start with [`CLAUDE.md`](./docs/CLAUDE.md)
2. Read [`AGENTS.md`](./docs/AGENTS.md)
3. Review [`WORKTREES.md`](./docs/WORKTREES.md)

**Contributing?**
1. Read [`CONTRIBUTING.md`](./.github/CONTRIBUTING.md)
2. Follow [`CODING_STYLE.md`](./docs/CODING_STYLE.md)
3. Use [`PR_REVIEW_PROCESS.md`](./docs/PR_REVIEW_PROCESS.md)

---

## 🛡️ Security

Security is a top priority. Please see our **[Security Policy](.github/SECURITY.md)** for details on our supported versions and how to report vulnerabilities.

## 📄 License

This project is licensed under the MIT License. See the **[LICENSE](./LICENSE)** file for details.

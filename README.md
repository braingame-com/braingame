# Brain Game

> **The operating system for personal development.**

![CI](https://img.shields.io/github/actions/workflow/status/braingame-com/braingame/ci.yml?style=flat-square&logo=github&label=CI)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript)
![Monorepo](https://img.shields.io/badge/monorepo-turborepo-ef4444?style=flat-square&logo=turborepo)
![Managed by Brain Game](https://img.shields.io/badge/Managed%20by-Brain%20Game-7c3aed?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMjE3MyAxOS4yNDk4QzYuMTU0MyAxOS4yNDk4IDUuMjc0MyAxOC44NDI4IDQuNjM4MyAxOC4wNzM4QzQuMDAyMyAxNy4zMDQ4IDMuNjY3MyAxNi4zNTQ4IDMuNjY3MyAxNS4yOTg4VjguNzAwOEMzLjY2NzMgNy42NDQ4IDQuMDAyMyA2LjY5NDggNC42MzgzIDUuOTI1OEM1LjI3NDMgNS4xNTY4IDYuMTU0MyA0Ljc0OTggNy4yMTczIDQuNzQ5OEgxMS4wNDkzQzEyLjEwNjMgNC43NDk4IDEzLjA3NTMgNS4xNTY4IDEzLjcxMTMgNS45MjU4QzE0LjM0NzMgNi42OTQ4IDE0LjY4MjMgNy42NDQ4IDE0LjY4MjMgOC43MDA4VjEzLjQ4NjhDMTQuNjgyMyAxMy41NzA4IDE0LjY3NTMgMTMuNjUyOCAxNC42NjEzIDEzLjczNDhDMTQuNjQ3MyAxMy44MTY4IDE0LjYyNjMgMTMuODk4OCAxNC42MDAzIDEzLjk4MDhDMTQuMzc0MyAxNC42NDA4IDEzLjkxMzMgMTUuMTMwOCAxMy4yMTczIDE1Ljc5MjhDMTIuNTEwMyAxNi40NDQ4IDExLjYxMjMgMTYuOTA1OCAxMC41ODIzIDE3LjI3MjhDMTIuMDYxMyAxNy42NzU4IDEzLjE0NTMgMTguNDIyOCAxMy44MzQzIDE5LjUxNDhDMTQuNTIzMyAyMC42MDY4IDE0LjgyMzMgMjEuODk5OCAxNC44MjMzIDIzLjM5MjhWjcuMjE3MyAxOS4yNDk4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==)


This monorepo contains the code for all Brain Game applications, websites, and shared libraries.

---

## 🚀 Get Started

To get a local copy up and running, follow our comprehensive **[Development Guide](./docs/DEVELOPMENT.md)**. It contains everything you need for setup, from prerequisites to running the apps.

For complete documentation including architecture, coding standards, and contribution guides, visit our **[Documentation Hub](./docs/README.md)**.

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
| `apps/product` | The universal **Expo client** for iOS, Android, and Web. This is the core Brain Game product. |
| `apps/website` | The **Next.js marketing site** and documentation hub. |
| `packages/bgui` | Our **shared component library**, built with React Native and `react-native-web`. |
| `packages/utils` | Shared utilities, hooks, and helpers used across the monorepo. |
| `packages/config` | Shared configurations for TypeScript, Biome, etc. |
| `docs` | All project documentation, from architecture to coding style. |

---

## 🤝 Contributing

We welcome contributions! Please see our **[Contributing Guide](./CONTRIBUTING.md)** for the full process, including our code of conduct, PR process, and commit conventions.

A key part of our workflow is our task management system. See what we're working on in our **[TODO list](./docs/TODO.md)**.

## 🛡️ Security

Security is a top priority. Please see our **[Security Policy](.github/SECURITY.md)** for details on our supported versions and how to report vulnerabilities.

## 📄 License

This project is licensed under the MIT License. See the **[LICENSE](./LICENSE)** file for details.

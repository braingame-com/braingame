# Contributing to Brain Game

First off, thank you for considering a contribution. Your time and effort are valued. This project thrives on community input, and we're excited to see what you bring to the table.

This document provides a high-level guide to our contribution process. For a deep dive into our technical standards and architecture, please consult the files in our [`docs`](./docs) folder.

---

## 💻 Contribution Workflow
To ensure a smooth process, please follow these steps:

**Step 1: Set Up Your Environment**
1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork to your local machine.
3.  Follow the **[Development Guide](./docs/DEVELOPMENT.md)** to install prerequisites, dependencies, and set up your environment variables.

**Step 2: Plan Your Contribution**
1.  **Find an issue:** Check the **[TODO list](./docs/TODO.md)** for tasks that are marked as `help-wanted` or `good-first-issue`.
2.  **Propose a change:** If you have a new idea, we recommend opening an issue first to discuss it with the maintainers. This prevents you from spending time on a change that might not be accepted.

**Step 3: Make Your Changes**
1.  **Create a feature branch** from `main`: `git checkout -b type/your-branch-name` (e.g., `feat/new-button-variant`).
2.  **Write your code.** Critically, all code must adhere to our **[Coding Style Guide](./docs/CODING_STYLE.md)**.
3.  **Write or update tests.** All new features must have corresponding tests.
4.  **Commit your work** using the [Conventional Commits](https://www.conventionalcommits.org/) standard. This is mandatory for our automated release process.

**Step 4: Submit Your Pull Request**
1.  **Run local checks:** Before pushing, ensure all checks pass locally: `pnpm lint && pnpm test`.
2.  **Push** your feature branch to your fork.
3.  **Open a Pull Request** against the `main` branch of the Brain Game repository.
4.  **Fill out the PR template.** Provide a clear title, a detailed description of your changes, and link to any relevant issues.
5.  **Wait for review.** A maintainer will review your PR, provide feedback, and guide you through the final steps to get it merged.

---

## Code of Conduct

We are committed to fostering an open and welcoming environment. As such, all contributors are expected to adhere to our **[Code of Conduct](./.github/CODE_OF_CONDUCT.md)**. Please read it to understand the standards of behavior we expect.

---

## ❓ Questions?

If you have questions about the contribution process, feel free to open an issue or reach out to a maintainer.

## Project Structure
This is a **monorepo** with multiple packages:

- `apps/product/` - Expo universal client (mobile + web)
- `apps/website/` - Next.js marketing site
- `packages/bgui/` - UI components library
- `packages/utils/` - Shared utilities (hooks, helpers, constants)
- `packages/config/` - Shared configurations
- `docs/` - Architecture and technical documentation

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for the complete technical blueprint.

## Reporting Issues
- Use the GitHub issue tracker
- Include steps to reproduce the issue
- Provide device/platform information for mobile-specific issues
- Include screenshots or error messages when helpful

## Questions?
Feel free to open an issue for questions or reach out to the maintainers. 
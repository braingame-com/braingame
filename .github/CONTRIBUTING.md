# Contributing to Brain Game

First off, thank you for considering a contribution. Your time and effort are valued. This project thrives on community input, and we're excited to see what you bring to the table.

This document provides a high-level guide to our contribution process. For a deep dive into our technical standards and architecture, please consult the files in our [`docs`](../docs) folder.

---

## 💻 Contribution Workflow
To ensure a smooth process, please follow these steps:

**Step 1: Set Up Your Environment**
1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork to your local machine.
3.  Follow the **[Development Guide](../docs/DEVELOPMENT.md)** to install prerequisites, dependencies, and set up your environment variables.

**Step 2: Plan Your Contribution**
1.  **Find an issue:** Check the **[TODO list](../docs/TODO.md)** for tasks that are marked as `help-wanted` or `good-first-issue`.
2.  **Propose a change:** If you have a new idea, we recommend opening an issue first to discuss it with the maintainers. This prevents you from spending time on a change that might not be accepted.

**Step 3: Make Your Changes**
1.  **Create a feature branch** from `main`: `git checkout -b type/your-branch-name` (e.g., `feat/new-button-variant`).
2.  **Write your code.** Critically, all code must adhere to our **[Coding Style Guide](../docs/CODING_STYLE.md)**.
3.  **Write or update tests.** All new features must have corresponding tests.
4.  **Commit your work** using the [Conventional Commits](https://www.conventionalcommits.org/) standard. This is mandatory for our automated release process.

**Step 4: Submit Your Pull Request**
1.  **Run local checks:** Before pushing, ensure all checks pass locally: `pnpm lint && pnpm test`.
2.  **Push** your feature branch to your fork.
3.  **Open a Pull Request** against the `main` branch of the Brain Game repository.
4.  **Complete the PR template** with all required information.
5.  **Respond to feedback** from maintainers and make any requested changes.

---

## 📏 Coding Standards

### Code Style
- **Language:** All code must be TypeScript.
- **Linting:** We use Biome for linting and formatting. Run `pnpm lint` before committing.
- **Components:** UI components go in `packages/bgui`. Follow the existing folder-per-component structure.
- **Utilities:** Shared helpers go in `packages/utils`.
- **Imports:** Use absolute imports for workspace packages (e.g., `@braingame/bgui`).

### Commit Messages
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation only changes
- `style:` Changes that don't affect the meaning of code
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Performance improvements
- `test:` Adding or correcting tests
- `chore:` Changes to build process or auxiliary tools

Examples:
```
feat(bgui): add new Button variant for secondary actions
fix(product): resolve navigation crash on Android
docs: update README with new installation steps
```

### Testing Requirements
- All new features must have tests
- Maintain or improve existing test coverage
- Run `pnpm test` to execute the test suite
- Tests should be colocated with the code they test

---

## 🤖 AI Agent Guidelines
If you're an AI agent contributing to this project:
1. **Read the documentation** in the `docs` folder, especially:
   - [`CLAUDE.md`](../docs/CLAUDE.md) for AI-specific instructions
   - [`AI_CONTEXT.md`](../docs/AI_CONTEXT.md) for project context
   - [`CODING_STYLE.md`](../docs/CODING_STYLE.md) for code standards
2. **Update task tracking** in [`TODO.md`](../docs/TODO.md) when claiming or completing tasks
3. **Add session summaries** to [`AI_CONTEXT.md`](../docs/AI_CONTEXT.md) after completing work

---

## 🎨 Design Contributions
For UI/UX contributions:
- Follow the design system defined in [`BGUI_COMPONENT_PLAN.md`](../docs/BGUI_COMPONENT_PLAN.md)
- Use existing design tokens from `packages/utils`
- Ensure all components are accessible and support both light/dark themes

---

## 🐛 Reporting Bugs
When reporting bugs, please include:
- A clear description of the issue
- Steps to reproduce the behavior
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, etc.)

---

## 💡 Suggesting Features
We love new ideas! When suggesting features:
- Check if it's already in our [`TODO.md`](../docs/TODO.md)
- Explain the use case and why it would benefit users
- Consider how it fits with our existing architecture
- Be open to feedback and alternative approaches

---

## 📖 Documentation
Good documentation is crucial. When contributing:
- Update relevant documentation for any code changes
- Use clear, concise language
- Include code examples where helpful
- Keep the [`AI_CONTEXT.md`](../docs/AI_CONTEXT.md) updated if you're an AI agent

---

## 🙏 Recognition
Contributors are recognized in our repository. We appreciate every contribution, no matter how small!

Thank you for helping make Brain Game better! 🎮🧠
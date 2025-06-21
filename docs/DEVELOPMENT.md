# Development Guide: Brain Game

> **Welcome to the machine.** This guide provides everything you need to get the Brain Game repository running and to contribute effectively.

---

## 1. Philosophy
- **Speed & Quality:** We move fast without breaking things. This is achieved through strong conventions and robust automation.
- **Ownership:** You are responsible for your code from commit to deploy. Test it, document it, and ensure it meets our standards.
- **Pragmatism:** Follow the patterns in this guide. If you think a pattern needs to change, open a PR to update the documentation first.

---

## 2. First-Time Setup Checklist
Follow these steps exactly to ensure a clean setup.

- [ ] **1. Install Prerequisites:**
  - [ ] **Node.js:** Use a version manager like `nvm`. The exact version is in the `.nvmrc` file at the root. Run `nvm use` to activate it.
  - [ ] **pnpm:** Install the global `pnpm` CLI: `npm install -g pnpm`.
  - [ ] **Git:** Should be installed on your system.
  - [ ] **VS Code:** Recommended. See extensions list below.

- [ ] **2. Clone & Install:**
  ```bash
  # Clone the repository
  git clone https://github.com/braingame-com/braingame.git
  cd braingame

  # Install the correct Node.js version
  nvm use

  # Install all dependencies using pnpm
  pnpm install
  ```

> **Important**: The lint (`pnpm lint`) and test (`pnpm test`) scripts require
> all dependencies to be installed. Run `pnpm install` first whenever you clone
> or pull new changes, otherwise these tasks may fail.

- [ ] **3. Set Up Environment Variables:**
  - [ ] Copy the example env files. They are git-ignored.
    ```bash
    cp apps/product/.env.example apps/product/.env.local
    cp apps/website/.env.example apps/website/.env.local
    ```
  - [ ] Open each `.env.local` file and fill in the required secrets. Ask a team member for these values if you don't have them.

- [ ] **4. Verify Your Setup:**
  - [ ] Run the build and test scripts to ensure everything is working correctly.
    ```bash
    pnpm build && pnpm test
    ```
  - [ ] If all checks pass, you are ready.

---

## 3. Core Scripts
These are the commands you will use most often. They are run from the monorepo root.

| Command | Description |
|---|---|
| `pnpm dev` | Starts all apps (Expo & Next.js) in development mode. |
| `pnpm dev --filter <app>` | Runs a specific app (e.g., `product` or `website`). |
| `pnpm --filter product <platform>` | Runs the Expo app on a specific platform (`ios`, `android`, `web`). |
| `pnpm lint` | Lints and formats all code with Biome. |
| `pnpm test` | Runs all unit tests with Jest. |
| `pnpm test:watch` | Runs tests in watch mode for TDD. |
| `pnpm build` | Builds all packages and apps for production. |
| `pnpm clean` | Deletes all build artifacts and caches (`dist`, `.next`, etc.). |
| `pnpm storybook` | Starts Storybook for BGUI component development. |

---

## 4. Development Workflow

### Branching & Commits
1.  **Branch:** Create a new branch from `main` for every new feature or fix.
    -   **Naming:** Use `type/short-description` (e.g., `feat/new-login-flow`, `fix/header-bug`).
    -   `git checkout -b feat/my-cool-feature`
2.  **Commit:** Make small, atomic commits using the [Conventional Commits](https://www.conventionalcommits.org/) standard. This is required for our automated release process.
    -   `feat:` for new features.
    -   `fix:` for bug fixes.
    -   `docs:` for documentation changes.
    -   `chore:` for build scripts, maintenance, etc.

### Pull Requests & Code Review
1.  **Create PR:** When your work is ready, open a Pull Request against the `main` branch.
2.  **PR Description:** Fill out the PR template. Clearly explain the "what" and the "why" of your changes. Link to the relevant task in `TODO.md`.
3.  **CI Checks:** Ensure all automated CI checks (linting, testing, building) pass. A green checkmark is required for review.
4.  **Review:** Request a review from at least one other developer. Address all feedback.
5.  **Merge:** Once approved and all checks are green, squash and merge your PR. Delete your feature branch.

---

## 5. Adding Dependencies
- Use `pnpm` to manage dependencies.
- **Always be specific** about where a dependency should be installed.

```bash
# Add a dependency to a specific app/package
pnpm add react-query --filter product

# Add a dev dependency
pnpm add -D @types/node --filter website

# Add a dependency to the root (for tooling like Turbo)
pnpm add -w turbo
```

---

## 6. Key Documentation
This repo is heavily documented. Before asking a question, check these files:

| File | Purpose |
|---|---|
| `docs/ARCHITECTURE.md` | **System Design:** The high-level blueprint of the entire project. |
| `docs/BGUI_COMPONENT_PLAN.md` | **UI Components:** The plan and API for our component library. |
| `docs/CODING_STYLE.md` | **Code Quality:** Specific rules for writing clean, maintainable code. |
| `docs/BRAND.md` | **Brand Identity:** How to use our name, voice, and tone. |
| `docs/LESSONS.md` | **Knowledge Base:** Technical learnings and patterns from development. |
| `TODO.md` | **Task Tracker:** The list of current and upcoming work. |

---

## 7. Recommended VS Code Extensions
These are listed in `.vscode/extensions.json` and should be automatically recommended when you open the project.
- **Biome:** For linting, formatting, and import sorting. This is critical.
- **Expo Tools:** For working with the Expo app.
- **Tailwind CSS IntelliSense:** For autocompletion of Tailwind classes in the Next.js app.
- **GitLens:** For powerful Git history and blame features.
- **Conventional Commits:** For help writing valid commit messages.

---

## 8. Troubleshooting

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

**Issue**: "Module not found" errors
- Solution: Run `pnpm install` - dependencies need to be installed first

**Issue**: Pre-commit hook failures
- Solution: Run `pnpm lint` to see and fix formatting issues before committing

---

## 9. AI Development

When using AI assistants (like Claude):
1. Point them to `CLAUDE.md` for project-specific instructions
2. Check `TODO.md` for current priorities
3. Review `LESSONS.md` for technical patterns and solutions
4. Ensure they understand the worktree structure to avoid contamination

---

## 10. Getting Help

- **Documentation**: Check `/docs` folder for comprehensive guides
- **Architecture**: See `docs/ARCHITECTURE.md` for system design
- **Task Tracking**: See `TODO.md` for current work items
- **Security**: See `.github/SECURITY.md` for vulnerability reporting
- **Brand Guidelines**: See `docs/BRAND.md` for voice and tone
- **Email**: `hello@braingame.dev` for general inquiries

---

Happy coding! May your builds be green and your tests pass on the first try. 🚀

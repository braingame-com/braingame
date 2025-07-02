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
    cp apps/main-site/.env.example apps/main-site/.env.local
    ```
  - [ ] Open each `.env.local` file and fill in the required secrets. Ask a team member for these values if you don't have them.
  - [ ] Validate your configuration:
    ```bash
    pnpm validate:env
    ```

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
| `pnpm validate:env` | Validates environment variables for all apps. |
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
| `packages/bgui/docs/BGUI_COMPONENT_PLAN.md` | **UI Components:** The plan and API for our component library. |
| `docs/CODING_STYLE.md` | **Code Quality:** Specific rules for writing clean, maintainable code. |
| `docs/BRAND.md` | **Brand Identity:** How to use our name, voice, and tone. |
| `docs/LESSONS.md` | **Knowledge Base:** Technical learnings and patterns from development. |
| `TODO.md` | **Task Tracker:** The list of current and upcoming work. |

---

## 7. Recommended VS Code Extensions
These are listed in `.vscode/extensions.json` and should be automatically recommended when you open the project.
- **Biome:** For linting, formatting, and import sorting. This is critical.
- **Expo Tools:** For working with the Expo app.
- **CSS Modules:** For styling with CSS Modules in the Next.js apps.
- **GitLens:** For powerful Git history and blame features.
- **Conventional Commits:** For help writing valid commit messages.

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
# Start Storybook for component development
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
   cp apps/main-site/.env.example apps/main-site/.env.local
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

## Performance Optimization

### Turbo Remote Caching
Speed up builds by sharing cache across team members and CI:

```bash
# Verify setup
./scripts/verify-turbo-cache.sh

# See full guide
docs/development/TURBO_REMOTE_CACHING.md
```

Benefits:
- 50-70% faster CI builds
- Share cache between developers
- Reduce redundant computations

### Build Performance Tips
- Use `--filter` to build only what you need
- Enable remote caching for team collaboration
- Run `pnpm clean` if builds get slow

## AI Development

When using AI assistants (like Claude):
1. Point them to `CLAUDE.md` for project-specific instructions
2. Check `TODO.md` for current priorities
3. Review `LESSONS.md` for technical patterns and solutions

## Getting Help

- **Documentation**: Check `/docs` folder
- **Architecture**: See `docs/ARCHITECTURE.md`
- **Task Tracking**: See `TODO.md`
- **Security**: See `../.github/SECURITY.md`

## VS Code Extensions

Recommended extensions (auto-installed via `.vscode/extensions.json`):
- Biome (formatting/linting)
- Expo Tools
- CSS Modules

## Next Steps

1. Explore the codebase structure
2. Run the development servers
3. Check `TODO.md` for good first issues
4. Read `docs/ARCHITECTURE.md` for system design
5. Join our Discord/Slack for questions

Happy coding! 🚀

## Related Documentation

For more detailed information on specific aspects of development:

- **[CODING_STYLE.md](./CODING_STYLE.md)** - Code standards, patterns, and anti-patterns to follow
- **[TESTING.md](./TESTING.md)** - Testing strategy, tools, and best practices
- **[WORKTREES.md](./WORKTREES.md)** - Git worktree usage and workspace isolation
- **[Architecture Overview](../architecture/ARCHITECTURE.md)** - System design and technical decisions
- **[Architecture Decision Records](../architecture/ADR.md)** - Key architectural decisions and their rationale

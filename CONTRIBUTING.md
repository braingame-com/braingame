# Contributing to Brain Game

Thank you for your interest in contributing to Brain Game! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Start the development server:**
   ```bash
   # All apps (Expo + Next.js when available)
   pnpm dev
   
   # Or just the Expo app
   pnpm dev --filter product
   ```

## Development Workflow

### Before You Start
- Check existing issues to see if your feature/bug is already being worked on
- For major changes, consider opening an issue first to discuss the approach

### Making Changes
1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following our coding standards
3. **Format and lint your code:**
   ```bash
   pnpm lint
   ```
4. **Run tests:**
   ```bash
   pnpm test
   ```
5. **Commit your changes** with a clear, descriptive message

### Coding Standards
- Use **Biome** for formatting and linting (run `pnpm lint`)
- Follow **TypeScript** best practices
- Write **meaningful commit messages**
- Add **tests** for new features when applicable
- Keep **components small and focused**
- Use **descriptive variable and function names**

### Submitting Changes
1. **Push your branch** to your fork
2. **Open a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots/videos for UI changes
3. **Ensure all checks pass** (linting, tests, etc.)
4. **Respond to feedback** and make requested changes

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

## Code of Conduct
Be respectful, inclusive, and constructive in all interactions. We're all here to build something great together. 
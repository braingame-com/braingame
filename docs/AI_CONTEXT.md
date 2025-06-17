# AI Context - Brain Game

## Project State
- **Phase**: Early development, architecture established
- **Stack**: Expo + React Native + Next.js monorepo
- **AI Readiness**: Good documentation, needs automation

## Current Focus
1. Making the project enterprise-ready
2. Setting up CI/CD and testing infrastructure
3. Implementing missing Turborepo configuration

## Working Agreements for AI Agents

### Before Starting Work
1. Read `TODO.md` for current priorities
2. Check `CLAUDE.md` for project-specific instructions
3. Update task status in TODO.md when beginning work

### During Work
1. Follow existing code patterns (check neighboring files)
2. Use Biome for formatting (`pnpm lint`)
3. Prefer editing existing files over creating new ones
4. Run relevant commands from CLAUDE.md

### After Completing Tasks
1. Update TODO.md with completion status and date
2. Document any decisions or blockers encountered
3. Run `pnpm lint` and `pnpm test` if applicable
4. Create a session summary below

## Session Summaries

### 2024-01-16 - Project Setup Complete
- **Agent**: Claude (Opus)
- **Tasks**: Add missing critical files and clean up project structure
- **Completed**: 
  - Created GitHub Actions workflows (ci.yml, release.yml, dependabot.yml)
  - Added Jest configuration (jest.config.js, jest.setup.js)
  - Created DEVELOPMENT.md onboarding guide
  - Setup Changesets for version management
  - Added VS Code extensions recommendations
  - Cleaned up duplicate files (biome.json, package-lock.json, eslint.config.mjs)
  - Organized font files into subdirectories
  - Created missing config files (turbo.json, .nvmrc, .editorconfig, .vscode/settings.json)
  - Ran Biome formatter (fixed 7 files)
- **Next Steps**: Run `pnpm install` to install new dependencies (turbo, changesets)

### 2024-01-16 - Documentation Updates
- **Agent**: Claude (Opus)
- **Tasks**: Update documentation to reflect task tracking system
- **Completed**: 
  - Updated ARCHITECTURE.md with new Task Management section
  - Added task tracking instructions to CLAUDE.md
  - Updated AGENTS.md with task tracking requirements
  - Verified .gitignore (no .ai directory needed currently)
- **Next Steps**: Begin implementing CI/CD pipeline as per TODO.md priorities

### 2024-01-16 - Initial Setup
- **Agent**: Claude (Opus)
- **Tasks**: Architecture review, setup task tracking
- **Completed**: 
  - Comprehensive architecture assessment
  - Created TODO.md and AI_CONTEXT.md
  - Established task tracking patterns
- **Next Steps**: Implement CI/CD pipeline

### 2025-06-17 - UI Component Planning
- **Agent**: ChatGPT
- **Tasks**: Document universal component plan
- **Completed**:
  - Created `docs/BGUI_COMPONENT_PLAN.md` with props and variants
  - Updated TODO.md to mark component docs in progress
- **Next Steps**: Build components and integrate Storybook

<!-- Add new session summaries above this line -->

## Known Constraints
- No CI/CD pipeline exists yet
- No test files despite Jest being configured
- Turborepo lacks turbo.json configuration
- No pre-commit hooks setup

## Architecture Decisions
- Using pnpm workspaces (not npm/yarn)
- Biome for linting/formatting (not ESLint/Prettier)
- Expo for universal app (not separate React Native/web)
- Shared UI components in `bgui` package

## File Locations Quick Reference
- Apps: `apps/product` (Expo), `apps/website` (Next.js)
- Shared UI: `packages/bgui`
- Utils: `packages/utils`
- Config: `packages/config`
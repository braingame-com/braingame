# AI Context - Brain Game

> **Last Updated**: 20-06-2025
> A tactical dashboard for AI agents to maintain momentum and context.

---

## 1. Current Focus
1. Advanced Week 3 feature implementation (YouTube integration, analytics, animations, Firebase cloud)
2. Advanced navigation patterns and authentication flows
3. Ensuring proper worktree isolation and documentation
4. Making the project enterprise-ready

## ⚠️ Critical Workspace Information
**This repository uses git worktrees for isolation:**
- **Main worktree** (`braingame/`): Production work, final commits
- **Claude sandbox** (`braingame-claude-sandbox/`): AI development work
- **ALWAYS run `git worktree list` before starting work**
- **ALWAYS ask user which worktree to use if uncertain**

---

## 2. Session Summaries
*All summaries are in reverse chronological order (newest first).*

### 20-06-2025 - Week 3 Advanced Features & Worktree Crisis Resolution
- **Agent**: Claude (Sonnet 4)
- **Duration**: ~2 hours
- **Tasks**: Week 3 advanced features implementation and emergency worktree contamination cleanup
- **Major Incident**: Agent started working in main production repo instead of claude-sandbox
  - **Root Cause**: No worktree documentation + agent ignored existing workflow docs
  - **Impact**: Mixed Week 3 features with user's testing migration work
  - **Resolution**: Surgical git separation, preserved all work, restored proper isolation
  - **Prevention**: Added comprehensive worktree documentation to all agent docs
- **Completed**:
  - YouTube video integration with search, grid layout, custom player
  - Advanced data visualization with interactive charts and analytics  
  - Sophisticated animation systems (scroll-based, carousel, loading animations)
  - Firebase Functions cloud integration with retry logic and Google Sheets
  - Navigation types and authentication context foundations
  - Mindset screen components and constants (committed properly)
  - Comprehensive worktree documentation across CLAUDE.md, AGENTS.md, ARCHITECTURE.md
- **Key Learning**: **ALWAYS verify workspace location before starting any work**
- **Documentation**: Detailed work session created with incident analysis and prevention measures

### 19-01-2025 - BGUI Testing Infrastructure Setup
- **Agent**: Claude (Opus 4)
- **Tasks**: Set up React Native Testing Library for BGUI components
- **Attempted**:
  - Installed testing dependencies: @testing-library/react-native, jest-expo, ts-jest, babel-jest
  - Created test infrastructure: jest.config.js, babel.config.js, jest-setup.js, test-utils.tsx
  - Wrote comprehensive Button.test.tsx with 14 test cases
  - Tried multiple Jest/Babel configurations to resolve compatibility issues
- **Blocker Encountered**: React Native 0.80.0 uses Flow type syntax which Jest cannot parse
  - Error: `type ErrorHandler = (error: mixed, isFatal: boolean) => void;`
  - Tried various approaches: different presets, transform patterns, mocking strategies
  - This is a known issue in the React Native ecosystem with newer versions
- **Documentation Created**:
  - TESTING.md: Comprehensive testing strategy and recommendations
  - Session notes consolidated into `docs/LESSONS.md`
- **Recommendations**:
  - Use TypeScript for compile-time type safety
  - Consider Storybook for visual component testing
  - Test pure utility functions separately from React Native components
  - Wait for React Native Testing Library updates or use alternative testing strategies

### 19-06-2025 - Complete Lint and Type Error Resolution
- **Agent**: Claude (Opus 4)
- **Tasks**: Fix all Biome lint errors and TypeScript type errors across the entire monorepo
- **Completed**:
  - Fixed all Biome lint errors in all packages
  - Resolved .expo and .next directory linting issues
  - Fixed all TypeScript errors in BGUI package (RefObject types, React.ReactNode compatibility, etc.)
  - Fixed all TypeScript errors in product app (component prop mismatches, version conflicts)
  - Created comprehensive WORK_SESSION_2025-06-19.md with detailed learnings
  - Improved pre-commit messaging for clear, actionable feedback
- **Key Learnings**:
  - Biome v2 doesn't support `ignore` in files section - use .biomeignore or modify lint scripts
  - React 18 vs 19 have different ReactNode types (bigint support)
  - Generated files (.expo, .next) need special handling to exclude from linting
  - Component APIs must be checked carefully - common prop naming mistakes
- **Next Steps**: All packages now pass linting and type checking

### 18-06-2025 - Code Smell Cleanup and Documentation Updates
- **Agent**: Claude (Opus 4)
- **Tasks**: Fix remaining code smells and update outdated documentation
- **Completed**:
  - Removed duplicate component directories from bgui root (Button, Icon, Link, Text, etc.)
  - Fixed broken documentation links to SECURITY.md
  - Updated BGUI_COMPONENT_PLAN.md to note missing components (Alert, Breadcrumb, TextInput)
  - Created missing documentation: packages/bgui/README.md, packages/utils/README.md, CHANGELOG.md
  - Updated ARCHITECTURE.md to remove references to non-existent adr/ and runbooks/ folders
  - Fixed all broken links in documentation
- **Key Findings**:
  - 25 of 28 planned components are implemented
  - Apps use React Native's built-in TextInput instead of custom component
  - All components now properly organized in src/components
- **Next Steps**: Repository is clean with accurate, up-to-date documentation

### 18-06-2025 - Repository Cleanup and Documentation Consolidation
- **Agent**: Claude (Opus 4)
- **Tasks**: Address feedback about duplicate files, unused exports, and fragmented documentation
- **Completed**:
  - Consolidated duplicate AI context files (merged agents_context.md into docs/AI_CONTEXT.md)
  - Consolidated duplicate documentation files (CONTRIBUTING.md and SECURITY.md now only in .github/)
  - Fixed duplicate BGUI components structure (removed duplicates in root, all components now in src/components)
  - Removed unused exports (env.ts from utils, TextInput from bgui, deleted UNUSED_EXPORTS.md)
  - Consolidated documentation structure (main README now references docs/README.md as documentation hub)
  - Updated all export paths in packages/bgui/index.ts
- **Key Decisions**:
  - .github/ is the canonical location for CONTRIBUTING.md and SECURITY.md
  - All BGUI components should be in src/components folder structure
  - docs/README.md serves as the documentation index
- **Next Steps**: Repository is now cleaner and more organized

### 18-06-2025 - Fix TypeScript Issues in BGUI Components
- **Agent**: Claude (Opus 4)
- **Tasks**: Fix all TypeScript errors in BGUI components
- **Completed**:
  - Removed all 'any' types from Accordion, List, RadioGroup components
  - Added error handling props to all form components (Checkbox, RadioGroup, Select, Switch, Slider)
  - Standardized prop naming (changed Switch from `value` to `checked`)
  - Added missing style props for consistency
  - Fixed import paths for @braingame/utils
  - Resolved TypeScript compilation errors in RadioGroup, TextInput
- **Key Decisions**:
  - Standardized on `checked` for boolean state props
  - Added comprehensive error handling props to all form components
  - Separated TextInput container style from input style for proper typing
- **Next Steps**: Continue with Phase 2 improvements

### 18-06-2025 - Implement Badge Component
- **Agent**: ChatGPT
- **Tasks**: Implement Badge component with count, dot, status, and color variants.
- **Completed**:
  - Added `Badge` component in `packages/bgui/src/components/Badge`.
  - Included variant and color support.
- **Next Steps**: Add tests and Storybook examples.

### 17-06-2025 - Codex Secret Scanner
- **Agent**: ChatGPT
- **Tasks**: Implement script to detect hardcoded secrets
- **Completed**:
  - Created `scripts/scan-secrets.ts`
  - Added `secrets:codex` npm script
  - Updated TODO with new entry
- **Next Steps**: Integrate scanner into CI pipeline

### 17-06-2025 - Added Spinner Component
- **Agent**: ChatGPT
- **Tasks**: Implement Spinner UI component with accessibility support
- **Completed**:
  - Created Spinner with inline and overlay variants
  - Added ARIA attributes for screen readers
  - Exported Spinner from BGUI package
- **Next Steps**: Write unit tests and Storybook examples

### 17-06-2025 - Added BGUI usage snippets
- **Agent**: ChatGPT
- **Tasks**: Provide code snippets for each BGUI component
- **Completed**:
  - Created `docs/snippets` with examples for all components
  - Added a login form example using Button, TextInput and Checkbox
- **Next Steps**: Integrate snippets into broader documentation

### 17-06-2025 - Design Token Audit
- **Agent**: ChatGPT
- **Tasks**: Catalog all design tokens used in `@brain-game/bgui`
- **Completed**:
  - Scanned components for `Colors` and `Tokens` references
  - Generated `docs/TOKEN_USAGE.md`
  - Updated `docs/TODO.md` with completion status
- **Next Steps**: Integrate token report into design workflow
>>>>>>> main
>>>>>>> main
>>>>>>> main

### 18-06-2025 - Full Documentation Overhaul
- **Agent**: Claude 3.5 Sonnet
- **Tasks**: Review and upgrade all project documentation to enterprise-grade standards.
- **Completed**:
  - Performed a comprehensive review of all `.md` files in the repository.
  - Refactored and rewrote `ARCHITECTURE.md`, `AI_CONTEXT.md`, `AGENTS.md`, `BRAND.md`, `CLAUDE.md`, `CODING_STYLE.md`, `DEVELOPMENT.md`, `docs/README.md`, the root `README.md`, `CONTRIBUTING.md`, and `SECURITY.md`.
  - Renamed `ENTERPRISE_TRANSFORMATION.md` to `QUALITY_ROADMAP.md` to better reflect its purpose as a living document.
  - Deleted the redundant `PLAN.md` file.
  - Created a standard `CODE_OF_CONDUCT.md`.
  - Ensured all documents are consistent, interlinked, and have a single source of truth.
- **Key Decisions**:
  - Each document must have a single, clear purpose to avoid redundancy.
  - Documentation should be "living" and continuously updated.
  - AI-specific documentation is critical for effective human-AI collaboration.
- **Next Steps**: The repository's documentation is now considered enterprise-grade. Ready for next development phase.
### 17-06-2025 - Test Coverage Analysis
- **Agent**: Codex
- **Tasks**: Generate coverage report for `packages/bgui`
- **Completed**:
  - Ran `pnpm test --filter @braingame/bgui -- --coverage` (0% coverage, no tests)
  - Added `docs/TEST_COVERAGE_REPORT.md` with checklist of missing tests
- **Next Steps**: Write unit tests for each component

### 17-06-2025 - BGUI Button Refactor
- **Agent**: Codex
- **Tasks**: Improve Button component accessibility and performance
- **Completed**:
  - Refactored `packages/bgui/Button` with memoized styles and hover handlers
  - Added `accessibilityRole` and `accessibilityState`
  - Updated TODO.md with task status
- **Next Steps**: Expand refactoring to other components

### 17-06-2025 - Component Documentation & Snippet Generation
- **Agent**: ChatGPT
- **Tasks**: Generate documentation pages and usage snippets for BGUI components
- **Completed**:
  - Added a components index page in the website
  - Created placeholder docs pages for all UI components
  - Generated markdown files in `docs/components` for each component
  - Created `docs/snippets/` folder with usage examples for all components
  - Provided a login form sample using Button, TextInput and Checkbox
  - Added TODO entry tracking documentation progress
  - No Storybook stories were found, so pages show only basic information
- **Next Steps**: Implement Storybook, enhance docs with examples, integrate snippets into Storybook docs
### 17-06-2025 - Enterprise-Grade BGUI Component Plan
- **Agent**: Claude Sonnet 4
- **Tasks**: Review and enhance BGUI component plan for enterprise standards
- **Completed**:
  - Complete overhaul of `docs/BGUI_COMPONENT_PLAN.md` addressing major enterprise concerns:
    - Added comprehensive accessibility (A11y) specifications for all 28 components
    - Standardized API consistency (onPress/onValueChange, children over label props)
    - Defined theming strategy with TypeScript design tokens
    - Added missing critical components: Label, Link, Image, Tooltip
    - Converted configuration-based APIs to compositional patterns for flexibility
    - Added implementation priority phases (Foundation → Layout → Advanced)
    - Included TypeScript definitions and accessibility requirements
  - Updated TODO.md status for component documentation
  - Updated AI_CONTEXT.md with session summary
- **Key Decisions**:
  - Favor composition over configuration for complex components
  - Mandatory accessibility compliance with ARIA support
  - Design token system prevents arbitrary styling
  - Three-phase implementation roadmap prioritizes MVP components
- **Next Steps**: Begin Phase 1 implementation (Button, Icon, Text, TextInput, Label)

### 17-06-2025 - UI Component Planning
- **Agent**: ChatGPT
- **Tasks**: Document universal component plan
- **Completed**:
  - Created `docs/BGUI_COMPONENT_PLAN.md` with props and variants
  - Updated TODO.md to mark component docs in progress
- **Next Steps**: Build components and integrate Storybook

### 17-06-2025 - Added PLAN.md and repository review
- **Agent**: Codex
- **Tasks**: Review repo, create comprehensive plan
- **Completed**: Added PLAN.md summarizing architecture and upcoming work
- **Next Steps**: Follow plan items in upcoming sessions

### 17-06-2025 - Environment Setup Improvements
- **Agent**: Codex
- **Tasks**: Implement environment management tasks
- **Completed**:
  - Created `apps/website/.env.example`
  - Added `env` validation helper with Zod in `packages/utils`
  - Updated TODO.md status for Environment Management
- **Next Steps**: Document required variables in docs

### 17-06-2025 - Documentation sync
- **Agent**: Codex
- **Tasks**: Align docs with repository state
- **Completed**:
  - Added placeholder Storybook script
  - Created `firebase.json` and `.firebaserc`
  - Updated README, DEVELOPMENT.md, CLAUDE.md and ARCHITECTURE.md references
  - Clarified TODO test suite info
  - Updated known constraints section
- **Next Steps**: Expand test coverage and implement real Storybook

### 17-06-2025 - Pre-commit enhancements
- **Agent**: Codex
- **Tasks**: Improve pre-commit lints
- **Completed**: Added lint and typecheck steps to pre-commit, updated docs
- **Next Steps**: Fix failing tests and lints

### 16-01-2024 - Documentation Updates
- **Agent**: Claude (Opus)
- **Tasks**: Update documentation to reflect task tracking system
- **Completed**: 
  - Updated ARCHITECTURE.md with new Task Management section
  - Added task tracking instructions to CLAUDE.md
  - Updated AGENTS.md with task tracking requirements
  - Verified .gitignore (no .ai directory needed currently)
- **Next Steps**: Begin implementing CI/CD pipeline as per TODO.md priorities

### 16-01-2024 - Initial Setup
- **Agent**: Claude (Opus)
- **Tasks**: Architecture review, setup task tracking
- **Completed**: 
  - Comprehensive architecture assessment
  - Created TODO.md and AI_CONTEXT.md
  - Established task tracking patterns
- **Next Steps**: Implement CI/CD pipeline

### 16-01-2024 - Project Setup Complete
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

<!-- Add new session summaries above this line -->

---

## 3. Working Agreements for AI Agents

**Start of Session:**
- [ ] Read `TODO.md` for current priorities.
- [ ] Read `CLAUDE.md` for project-specific instructions.
- [ ] Update task status in `TODO.md` *before* starting.

**During Session:**
- [ ] Follow existing code patterns and conventions.
- [ ] Use `pnpm lint` to format code.
- [ ] Run relevant tests with `pnpm test`.

**End of Session:**
- [ ] Update `TODO.md` with completion status and date.
- [ ] Add a new session summary to this file (`AI_CONTEXT.md`).
- [ ] Run `pnpm lint` and `pnpm test` on all changes.
- [ ] Add key learnings to `docs/LESSONS.md` so knowledge is preserved.

---

## 4. Project Reference

### Known Constraints
- Basic CI/CD pipeline implemented (`.github/workflows/ci.yml`)
- Minimal Jest test suite (only utils package has tests)
- Turborepo configured via `turbo.json`
- Husky pre-commit hooks with secret scanning enabled

### Core Architecture Decisions
- Using **pnpm** workspaces (not npm/yarn)
- Using **Biome** for linting/formatting (not ESLint/Prettier)
- Using **Expo** for universal app (not separate React Native/web)
- Sharing UI components in `bgui` package

### File Locations
- **Apps**: `apps/product` (Expo), `apps/website` (Next.js)
- **Shared UI**: `packages/bgui`
- **Utils**: `packages/utils`
- **Config**: `packages/config`
- **Docs**: `docs/*`

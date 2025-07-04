# Scripts Directory

This directory contains development tools, automation scripts, and utilities for the Brain Game monorepo.

## 📋 Available Scripts

### Component Development

#### `create-bgui-component.js`
Creates new BGUI components with full boilerplate code.

```bash
# Create a standard component
pnpm bgui:scaffold MyComponent

# Create a simple component (minimal boilerplate)
pnpm bgui:scaffold MyComponent --simple

# Create a React hook
pnpm bgui:scaffold useMyHook --hook

# Create a utility function
pnpm bgui:scaffold myUtility --util
```

**Generated files:**
- Component implementation (`MyComponent.tsx`)
- Component styles (`MyComponent.styles.ts`)
- Component tests (`MyComponent.test.tsx`)
- Storybook stories (`MyComponent.stories.tsx`)
- Barrel export updates

### Development Tools

#### `dev-tools.js`
Interactive development utilities menu.

```bash
# Open interactive menu
pnpm dev:tools

# Direct commands
pnpm dev:stats      # Show project statistics
pnpm dev:analyze    # Analyze component structure
pnpm dev:deps       # Check dependency health
pnpm dev:coverage   # Display test coverage
pnpm dev:unused     # Find potentially unused files
```

**Features:**
- Lines of code analysis by file type
- Component and test coverage metrics
- Dependency vulnerability scanning
- Unused file detection
- Interactive menu navigation

### Workspace Management

#### `workspace-helper.js`
Monorepo workspace management utilities.

```bash
# List all workspace packages
pnpm workspace list

# Show package information
pnpm workspace info @braingame/bgui

# List package scripts
pnpm workspace scripts @braingame/bgui

# Run scripts in specific packages
pnpm workspace run @braingame/bgui test
pnpm workspace test @braingame/bgui  # Shortcut
pnpm workspace build @braingame/bgui # Shortcut
pnpm workspace dev @braingame/bgui   # Shortcut

# Show package dependencies
pnpm workspace deps @braingame/bgui
```

### Documentation Generation

#### `doc-generator.js`
Automated documentation generation for components.

```bash
# Generate component API documentation
pnpm docs component-api Button

# Generate README section for component
pnpm docs readme-section Button

# Generate quick reference guide
pnpm docs quick-ref
```

### Setup & Environment

#### `setup.sh`
One-command setup script for new developers.

```bash
# Run from repository root
bash scripts/setup.sh
```

**What it does:**
1. **Node.js version** - Ensures correct version via nvm
2. **pnpm installation** - Installs pnpm if not present
3. **Dependencies** - Installs all package dependencies
4. **Build utilities** - Builds core packages (@braingame/utils, etc.)
5. **Environment setup** - Creates .env.local files from examples
6. **Validation** - Runs environment validation checks
7. **Git hooks** - Sets up pre-commit hooks
8. **Health check** - Verifies setup with linting

**Features:**
- Safe to run multiple times (idempotent)
- Colored output for clarity
- Helpful error messages
- Next steps guidance

### Git Hooks & CI

#### `pre-commit.sh`
Automated pre-commit checks (runs automatically via git hook).

**Checks performed:**
1. **Secret scanning** - Prevents committing sensitive data
2. **Linting** - Code style validation
3. **Type checking** - TypeScript compilation
4. **Formatting** - Auto-formats staged files
5. **Testing** - Runs test suite

#### `check-workspace.sh`
Workspace verification script for git worktrees.

```bash
./scripts/check-workspace.sh
```

**Features:**
- Displays current directory and git status
- Lists all available worktrees
- Prevents accidental work in wrong branches
- Color-coded output for clarity

#### `verify-turbo-cache.sh`
Verification script for Turbo remote cache setup.

```bash
./scripts/verify-turbo-cache.sh
```

**What it checks:**
1. **Environment variables** - TURBO_TOKEN and TURBO_TEAM
2. **Turbo installation** - Version and availability
3. **Remote cache connection** - Tests access to cache API
4. **Cache statistics** - Shows local cache size and entries

**Features:**
- Security-conscious (hides tokens)
- Provides actionable next steps
- Shows cache performance metrics
- Links to documentation

### Code Transformation

#### `primary-button-codemod.ts`
Example codemod for automated code refactoring.

```bash
# Run with ts-node or build first
npx ts-node scripts/primary-button-codemod.ts
```

**Capabilities:**
- AST-based code transformation
- Automated import updates
- Preserves code formatting
- Batch file processing

## 🛠️ Utilities

### `utils/console.js` & `utils/console.ts`
Shared console output utilities providing colored, formatted output.

**Available methods:**
- `log(message, symbol)` - General logging
- `success(message)` - Success messages (✅)
- `error(message)` - Error messages (❌)
- `warning(message)` - Warning messages (⚠️)
- `info(message)` - Info messages (ℹ️)
- `clear()` - Clear console
- Progress indicators and spinners

## 📝 Script Development Guidelines

### Adding New Scripts

1. **Location**: Place scripts in `/scripts/` directory
2. **Naming**: Use descriptive kebab-case names
3. **Shebang**: Include appropriate shebang for shell scripts
4. **Documentation**: Add usage comments at the top of the file
5. **Error Handling**: Implement proper error handling and exit codes

### Best Practices

1. **Use Shared Utilities**: Import from `utils/console.js` for consistent output
2. **Interactive Prompts**: Use inquirer for user interactions
3. **Validation**: Validate inputs before performing actions
4. **Idempotency**: Scripts should be safe to run multiple times
5. **Progress Feedback**: Provide clear progress indicators
6. **Error Messages**: Give actionable error messages

### Testing Scripts

Before adding new scripts:
1. Test in isolation
2. Test with various inputs (valid/invalid)
3. Test error conditions
4. Verify monorepo compatibility
5. Update this README

## 🔧 Configuration

Scripts respect the following environment variables:
- `NODE_ENV` - Development/production mode
- `CI` - Continuous integration mode
- `FORCE_COLOR` - Force colored output
- `NO_COLOR` - Disable colored output

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Create a new component
pnpm bgui:scaffold MyNewComponent

# Check project health
pnpm dev:tools

# Run pre-commit checks manually
pnpm precommit

# Explore workspace packages
pnpm workspace list
```

## 📚 Related Documentation

- [Development Guide](/docs/development/DEVELOPMENT.md) - General development setup
- [Offline Development](/docs/development/OFFLINE_DEVELOPMENT.md) - Working without internet
- [Contributing Guide](/.github/CONTRIBUTING.md) - Contribution guidelines
- [BGUI Package](/packages/bgui/README.md) - Component library documentation
- [Git Worktrees](/docs/development/WORKTREES.md) - Worktree workflow guide
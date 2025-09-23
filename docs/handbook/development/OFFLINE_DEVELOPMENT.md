# Offline Development Guide

This guide ensures you can work on the Brain Game project without an internet connection.

## 🚀 Quick Start

Use these commands when working offline:

```bash
# Linting (offline mode)
pnpm lint:offline

# Type checking (offline mode)  
pnpm typecheck:offline

# Direct commands (bypass Turbo)
pnpm format              # Biome formatting
pnpm format:check        # Biome check without fix
```

## 🔧 Initial Setup (One-Time)

Before going offline, run these commands while connected:

```bash
# 1. Install all dependencies
pnpm install

# 2. Build utility packages
pnpm build:packages

# 3. Disable telemetry
pnpm turbo telemetry disable

# 4. Pre-cache lint/typecheck results
pnpm lint
pnpm typecheck
```

## 📋 What Works Offline

✅ **Full Support:**
- Development servers (`pnpm dev`)
- Linting and formatting
- Type checking
- Testing
- Building
- Git operations
- Component scaffolding

⚠️ **Limited Support:**
- Package installation (requires network)
- Dependency updates
- Remote caching

## 🛠️ Configuration Details

### Turbo Configuration
We've disabled telemetry to prevent network requests:
```bash
pnpm turbo telemetry disable
```

### Offline Scripts
The following scripts are configured for offline use:
- `lint:offline` - Runs linting with local cache only
- `typecheck:offline` - Runs type checking with local cache only

These scripts use:
- `--cache-dir=.turbo/local` - Uses local cache directory
- `--cache=local:rw` - Uses only local cache (read/write)

### Schema Validation
The project uses JSON schemas for configuration validation:
- `biome.json` - Updated to match installed version (2.0.5)
- `turbo.json` - Schema URLs don't block offline execution

## 🚨 Troubleshooting

### "Network Error" during lint/typecheck
Use the offline-specific commands:
```bash
pnpm lint:offline
pnpm typecheck:offline
```

### "Cannot find module" errors
Ensure dependencies are installed before going offline:
```bash
pnpm install
pnpm build:packages
```

### Direct Tool Execution
If Turbo commands fail, use tools directly:
```bash
# Direct Biome
./node_modules/.bin/biome check --fix --vcs-root=.

# Direct TypeScript
./node_modules/.bin/tsc --noEmit

# Direct Jest
./node_modules/.bin/jest
```

## 📚 Additional Resources

- [Turbo Offline Caching](https://turbo.build/docs/core-concepts/caching#local-caching)
- [Biome Configuration](https://biomejs.dev/reference/configuration/)
- [pnpm Offline Mode](https://pnpm.io/cli/install#--offline)

## 🎯 Best Practices

1. **Before Going Offline:**
   - Run `pnpm install` to ensure all dependencies are cached
   - Run `pnpm lint` and `pnpm typecheck` to pre-populate caches
   - Build packages that other packages depend on

2. **While Offline:**
   - Use `:offline` script variants when available
   - Commit frequently to local git
   - Keep a local copy of documentation

3. **After Reconnecting:**
   - Push your commits
   - Update dependencies if needed
   - Sync remote caches
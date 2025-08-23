# Biome - Linting & Formatting Guide

> **Biome is our single source of truth for code formatting and linting.** It ensures consistent code style across our entire monorepo.

## Quick Start

```bash
# Check and fix all issues automatically
pnpm lint

# Check only (no fixes)
pnpm biome check

# Format only
pnpm biome format --write .

# Lint only (no formatting)
pnpm biome lint .

# Check a specific file or directory
pnpm biome check apps/main-site/src

# Fix issues in a specific file
pnpm biome check --write apps/main-site/src/app/page.tsx
```

## Configuration

Our Biome configuration is in `/biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.1/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "includes": [
      "apps/**",
      "packages/**",
      "!**/node_modules/**",
      "!**/dist/**",
      "!**/.next/**",
      "!**/build/**",
      "!**/.turbo/**",
      "!**/test-results/**"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": { /* ... */ }
    }
  }
}
```

### Key Configuration Points

1. **File Patterns**: We check all files in `apps/` and `packages/` directories
2. **Exclusions**: Node modules, build outputs, and generated files are ignored
3. **Formatting**: Uses tabs for indentation, 100 character line width
4. **Linting**: All recommended rules enabled plus custom style rules

## IDE Integration

### VS Code

1. Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
2. The extension is already in our recommended extensions (`.vscode/extensions.json`)
3. Format on save is enabled by default in our workspace settings

### Other Editors

- **IntelliJ/WebStorm**: Use the [Biome plugin](https://plugins.jetbrains.com/plugin/22761-biome)
- **Neovim**: Install via Mason or use the LSP directly
- **Sublime Text**: Use the LSP package with Biome

## Common Commands

### Pre-commit Hook

Our pre-commit hook runs automatically via `lefthook`:
```bash
# Install git hooks
pnpm lefthook install

# Run pre-commit manually
pnpm lefthook run pre-commit
```

### CI/CD Integration

Biome runs automatically in CI on every PR:
```bash
# What CI runs
pnpm lint
```

### Fixing Common Issues

**Import sorting issues:**
```bash
# Biome will automatically sort and organize imports
pnpm biome check --write path/to/file.tsx
```

**Formatting issues:**
```bash
# Format entire codebase
pnpm biome format --write .
```

**Linting errors:**
```bash
# See all linting issues with explanations
pnpm biome lint . --verbose
```

## Troubleshooting

### Memory Issues

If Biome uses too much memory:
1. Check that the `includes` patterns in `biome.json` aren't too broad
2. Ensure all ignore patterns are working (especially `node_modules`)
3. Run Biome on specific directories instead of the entire repo

### Configuration Not Applied

1. Ensure you're using the latest Biome version: `pnpm update @biomejs/biome`
2. Check for syntax errors in `biome.json`
3. Run `pnpm biome migrate` if upgrading from an older version

### VS Code Not Formatting

1. Check that the Biome extension is installed and enabled
2. Verify "Format on Save" is enabled in VS Code settings
3. Set Biome as the default formatter:
   ```json
   {
     "[javascript]": {
       "editor.defaultFormatter": "biomejs.biome"
     },
     "[typescript]": {
       "editor.defaultFormatter": "biomejs.biome"
     },
     "[typescriptreact]": {
       "editor.defaultFormatter": "biomejs.biome"
     }
   }
   ```

## Best Practices

1. **Always run `pnpm lint` before committing** - The pre-commit hook does this automatically
2. **Fix issues immediately** - Don't commit code with linting errors
3. **Use `--write` flag** - Let Biome fix issues automatically when possible
4. **Check PR feedback** - CI will catch any issues you missed locally

## Rules Philosophy

Our Biome configuration enforces:
- **Consistent formatting**: Tabs, semicolons, double quotes
- **Code quality**: No unused variables, no console.logs, proper error handling
- **Best practices**: Exhaustive deps in hooks, no magic numbers, accessibility
- **Type safety**: Strict TypeScript rules, no `any` types

For the complete list of rules and their rationale, see [CODING_STYLE.md](./CODING_STYLE.md).

## Related Documentation

- [Biome Official Docs](https://biomejs.dev/)
- [CODING_STYLE.md](./CODING_STYLE.md) - Our coding standards
- [DEVELOPMENT.md](./DEVELOPMENT.md) - General development guide
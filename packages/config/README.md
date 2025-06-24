# @braingame/config

Shared configuration package for the Brain Game monorepo.

## Overview

This package provides centralized TypeScript configuration that is shared across all packages and applications in the Brain Game monorepo. It ensures consistent compiler settings and type checking throughout the codebase.

## What's Included

- **TypeScript Configuration**: Base `tsconfig.json` that all other packages extend
- **Path Aliases**: Pre-configured path mappings for all monorepo packages
- **Strict Mode**: Enforces TypeScript strict mode for better type safety

## Usage

### In Packages

Reference this configuration in your package's `tsconfig.json`:

```json
{
  "extends": "@braingame/config/tsconfig.base.json",
  "compilerOptions": {
    // Your package-specific overrides
  }
}
```

### In Apps

Apps can extend the base configuration with app-specific settings:

```json
{
  "extends": "@braingame/config/tsconfig.base.json",
  "compilerOptions": {
    // App-specific compiler options
  },
  "include": ["src/**/*", "app.config.ts"]
}
```

## Configuration Details

The base configuration includes:

- **Strict Type Checking**: All strict mode flags enabled
- **Module Resolution**: Node module resolution with ES module interop
- **JSX Support**: Configured for React Native
- **Path Mappings**: Pre-configured aliases for:
  - `@braingame/bgui/*` → UI component library
  - `@braingame/utils/*` → Shared utilities
  - `@braingame/config/*` → This configuration package

## Development

This is a configuration-only package with no build step required. Changes to the configuration files take effect immediately when referenced by other packages.

### Scripts

- `npm run typecheck` - Validates the TypeScript configuration

## Future Enhancements

This package is designed to eventually include:

- ESLint configuration presets
- Biome configuration presets
- Jest configuration presets
- Other shared development tool configurations
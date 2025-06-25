# Config

Shared TypeScript configuration for Brain Game monorepo.

## Purpose

Centralized configuration providing:
- Base TypeScript settings
- Path aliases for imports
- Strict type checking
- Consistent compiler options

## Usage

### Packages
```json
{
  "extends": "@braingame/config/typescript",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### Apps
```json
{
  "extends": "@braingame/config/typescript",
  "compilerOptions": {
    "outDir": ".next",
    "jsx": "preserve"
  },
  "include": ["src/**/*", "app/**/*"]
}
```

## Configuration Details

### Base Settings
- **Strict mode**: Enabled for type safety
- **Module resolution**: Node.js style
- **Target**: ES2020 for modern features
- **JSX**: React for component support

### Path Aliases
```typescript
// Enables clean imports
import { Button } from '@braingame/bgui';
import { config } from '@braingame/config';
```

### Quality Standards
- No implicit any
- Strict null checks
- No unused variables/parameters
- Exact optional property types

## Benefits

- **Consistency**: Same settings across all packages
- **Maintenance**: Single source of configuration
- **Type Safety**: Strict checking prevents runtime errors
- **Developer Experience**: Better IDE support

## Future Plans

- ESLint configuration presets
- Biome shared configuration  
- Jest testing configuration
- Build tool configurations
# Testing Infrastructure Migration: Jest to Vitest

## Overview

We've successfully migrated the braingame monorepo from Jest to Vitest to resolve testing infrastructure conflicts and standardize our testing setup.

## Changes Made

### 1. Removed Jest Configuration
- Deleted `jest.config.js` files from:
  - `packages/bgui/`
  - `apps/product/`
- Removed Jest dependencies:
  - `jest`
  - `ts-jest`
  - `@types/jest`
  - `jest-expo`

### 2. Vitest Configuration
- BGUI package already had `vitest.config.ts` configured
- Created `vitest.config.ts` for the product app with React Native web compatibility

### 3. Test File Updates
- Updated test files to use Vitest APIs:
  - `jest.fn()` → `vi.fn()`
  - `jest.mock()` → `vi.mock()`
  - `jest.spyOn()` → `vi.spyOn()`
- Added `import { vi } from 'vitest'` where needed

### 4. Test Scripts
All packages now use consistent test scripts:
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

## Migration Scripts

Two helper scripts were created:
1. `scripts/migrate-to-vitest.js` - Removes Jest configs and updates package.json
2. `scripts/update-tests-to-vitest.js` - Updates test files to use Vitest APIs

## Next Steps

1. **Fix failing unit tests**: Some Button component unit tests need updating to match actual implementation
2. **Update CI/CD**: Ensure GitHub Actions use Vitest commands
3. **Mock updates**: Some component tests may need their mocks updated for Vitest compatibility

## Benefits

- **Consistency**: Single testing framework across the monorepo
- **Performance**: Vitest is faster than Jest, especially for large codebases
- **ESM Support**: Better support for ES modules
- **HMR for Tests**: Tests can hot reload during development
- **Better TypeScript**: Native TypeScript support without additional configuration

## Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Run tests for specific package
pnpm test --filter=@braingame/bgui
```
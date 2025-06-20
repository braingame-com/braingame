# BGUI Testing Documentation

## Overview

This document outlines the testing strategy for the BGUI component library and the challenges encountered while setting up React Native testing in a monorepo environment.

## Testing Challenges

### 1. React Native and Flow Type Syntax

The main challenge encountered was Jest's inability to parse Flow type annotations in React Native's source files. React Native 0.80.0 uses Flow for type checking, which causes syntax errors when Jest tries to parse files like:

```
/node_modules/@react-native/js-polyfills/error-guard.js:14
type ErrorHandler = (error: mixed, isFatal: boolean) => void;
```

### 2. Circular Dependencies

When trying to mock React Native with react-native-web, circular dependencies occurred causing "Maximum call stack size exceeded" errors.

### 3. Module Resolution

The monorepo structure made module resolution complex, especially with:
- Cross-package dependencies (@braingame/utils)
- Asset imports (fonts, images)
- React Native specific modules

## Current Testing Approach

Due to the complexity of setting up React Native testing with the current versions and monorepo structure, we recommend the following approaches:

### 1. Unit Testing Pure Logic

Focus on testing pure functions and business logic that doesn't depend on React Native components:

```typescript
// Test utility functions, hooks, and helpers
import { validateProps } from "./utils/validation";

describe("validateProps", () => {
  it("should validate required props", () => {
    // Test validation logic
  });
});
```

### 2. Type Testing

Use TypeScript's type system to ensure component props and exports are correctly typed:

```typescript
// Ensure components accept correct props
type ButtonTest = React.FC<ButtonProps>;
```

### 3. Visual Testing

Consider using tools like:
- Storybook for component documentation and visual testing
- Expo's development environment for manual testing
- Screenshot testing tools

### 4. Integration Testing

Test components in the actual app environment (apps/product) where the full React Native setup is available.

## Future Improvements

1. **Investigate React Native Testing Library v13+**: The newer versions may have better support for React Native 0.80+

2. **Consider Detox**: For end-to-end testing of React Native components

3. **Mock Strategy**: Create comprehensive mocks for React Native modules that can be reused across tests

4. **Separate Test Configs**: Have different Jest configurations for:
   - Pure utility function tests (no React Native)
   - Component unit tests (mocked React Native)
   - Integration tests (full React Native)

## Test Structure

```
src/
  components/
    Button/
      Button.tsx           # Component implementation
      Button.types.ts      # TypeScript types
      Button.styles.ts     # Style definitions
      Button.test.tsx      # Component tests (when working)
      Button.unit.test.ts  # Pure logic tests
      index.ts            # Export
```

## Running Tests

Currently, the test setup is in progress. Once fully configured:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Dependencies

Key testing dependencies installed:
- `jest`: Test runner
- `@testing-library/react-native`: React Native testing utilities
- `ts-jest`: TypeScript support for Jest
- `babel-jest`: Babel transformation for Jest
- `jest-expo`: Expo-specific Jest preset

## Known Issues

1. Flow syntax in React Native modules causes parsing errors
2. Asset imports (fonts, images) need proper mocking
3. React Native module mocking is complex in the current setup

## Recommendations

1. **Start with simple tests**: Focus on testing pure functions and business logic first
2. **Use TypeScript**: Leverage TypeScript for type safety instead of runtime tests where possible
3. **Document components**: Use JSDoc comments and prop types for documentation
4. **Manual testing**: Use Expo Go or development builds for manual component testing
5. **Consider alternative approaches**: Snapshot testing, visual regression testing, or E2E testing might be more suitable for React Native components

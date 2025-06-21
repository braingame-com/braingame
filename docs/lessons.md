# Testing Strategy Lessons Learned

> **Date:** December 21, 2024  
> **Context:** Implementing a hybrid testing strategy for a React Native monorepo

## Executive Summary

After extensive experimentation with testing React Native universal components in a monorepo, we've discovered that the ecosystem is not yet mature enough for a pure Vitest approach. The hybrid strategy (Vitest for pure JS/TS, Jest for React Native apps) is a pragmatic compromise.

---

## Key Learnings

### 1. The React Native Testing Challenge

**Finding:** React Native's use of Flow type syntax in core modules creates parsing errors with both Jest and Vitest.

**Example Error:**
```
type ErrorHandler = (error: mixed, isFatal: boolean) => void;
     ^^^^^^^^^^^^
SyntaxError: Unexpected identifier 'ErrorHandler'
```

**Root Cause:** Files like `@react-native/js-polyfills/error-guard.js` contain Flow types that standard JavaScript parsers can't handle.

### 2. Vitest + React Native = "Millions of Limitations"

**Finding:** While Vitest excels for web React and pure JavaScript, it struggles with React Native due to:
- Lack of comprehensive native module mocks
- Complex babel transformation requirements
- Incompatibility with React Native's module resolution

**Evidence:** Community reports describe using Vitest with React Native as "an endless pit of issues."

### 3. jest-expo Version Constraints

**Finding:** jest-expo is tightly coupled to specific React Native versions.
- jest-expo 53.x works with React Native 0.76.x
- Newer React Native versions (0.80.x) cause compatibility issues

### 4. The Monorepo Factor

**Finding:** pnpm monorepos add additional complexity:
- Cross-package dependencies require careful configuration
- Different packages may need different testing strategies
- Version alignment becomes critical

---

## What Works

### ✅ Vitest for Pure JavaScript/TypeScript
```typescript
// packages/utils - Works perfectly
describe("getIconSize", () => {
  it("returns the number when size is a number", () => {
    expect(getIconSize(24)).toBe(24);
  });
});
```

### ✅ Jest for Simple Tests (No React Native imports)
```typescript
// Simple tests work fine
describe("Simple Test Suite", () => {
  it("should perform basic math", () => {
    expect(2 + 2).toBe(4);
  });
});
```

### ✅ Package-Specific Testing Strategies
- **bgui components:** Vitest with react-native-web aliasing (partial success)
- **utils:** Vitest for pure functions (full success)
- **product app:** Jest with jest-expo (configuration works, but RN imports fail)

---

## What Doesn't Work

### ❌ Direct React Native Component Testing
Any test that imports React Native components fails due to Flow type syntax:
```typescript
import { View, Text } from "react-native"; // This will fail
```

### ❌ Universal Test Runner
No single test runner can handle all package types effectively in a React Native monorepo.

### ❌ Out-of-the-box Configuration
Both Jest and Vitest require significant configuration work for React Native.

---

## Recommendations

### 1. Embrace the Hybrid Approach
- Use Vitest for pure JS/TS packages
- Use Jest for React Native apps (with caveats)
- Consider alternative testing strategies for components

### 2. Focus on Alternative Testing Methods
- **Visual Testing:** Use Storybook for component development and testing
- **E2E Testing:** Use Maestro for React Native, Playwright for web
- **Unit Testing:** Focus on business logic, not UI components

### 3. Version Management
- Keep React Native versions aligned across all packages
- Check jest-expo compatibility before upgrading React Native
- Consider using a compatibility matrix

### 4. Pragmatic Testing Strategy
```
┌─────────────────┬────────────────┬─────────────────┐
│   Package Type  │  Test Runner   │    Coverage     │
├─────────────────┼────────────────┼─────────────────┤
│ Pure JS/TS      │ Vitest         │ High (80%+)     │
│ React Native    │ Jest + Mocks   │ Medium (50-60%) │
│ UI Components   │ Storybook      │ Visual only     │
│ User Flows      │ E2E (Maestro)  │ Critical paths  │
└─────────────────┴────────────────┴─────────────────┘
```

---

## Future Considerations

1. **Monitor Ecosystem Evolution:** The React Native testing story is actively evolving. Revisit quarterly.

2. **Consider React Native Web:** For universal components, testing against react-native-web might be more practical.

3. **Invest in E2E:** Given unit testing limitations, stronger E2E coverage becomes more important.

4. **Community Solutions:** Watch for community packages that bridge the gap (e.g., improved vitest-react-native).

---

## Conclusion

The dream of seamless React Native testing with modern tools like Vitest remains elusive. The pragmatic approach is to use the right tool for each context, accepting that perfect coverage may not be achievable with current tooling. Focus testing efforts where they provide the most value: business logic, critical user flows, and visual consistency.
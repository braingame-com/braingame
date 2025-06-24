# Testing Strategy

> **Single source of truth** for all testing conventions in the Brain Game monorepo.  
> Last Updated: 21-06-2024

This document outlines the official testing stack and philosophy. All new code **must** adhere to these standards to ensure stability, maintainability, and quality.

---

## 1. Guiding Philosophy

1.  **Pragmatic & Modern:** We use a single, unified test runner (Vitest) for all unit and component tests. It is designed for modern ESM-based monorepos and solves the complex configuration issues that arise with older tools in our specific architecture.
2.  **Test the User Experience:** Our tests prioritize user-facing behavior over implementation details. We use `@testing-library` to interact with components as a user would.
3.  **Right Tool for the Job:** We use different testing layers (unit, component, E2E, visual) for different purposes. The goal is confident coverage, not 100% line coverage.

---

## 2. The Official Testing Stack - Hybrid Approach

We use a pragmatic hybrid testing approach that leverages the strengths of different tools for different contexts.

| Test Layer         | Package/App        | Primary Tool(s)                                   | Rationale & Best Practice                                                               |
| ------------------ | ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Unit & Component** | bgui (components)  | **Vitest**                                        | **Modern, Fast, and Functional.** Vitest provides a superior developer experience for pure component testing, handles ESM/monorepo complexities well. |
|                    | utils (utilities)   | **Vitest**                                        | **Perfect for pure JS/TS.** No native dependencies means Vitest works flawlessly here. |
|                    | product (app)       | **Jest + jest-expo**                              | **Native integration.** jest-expo provides comprehensive mocks for React Native/Expo APIs, ensuring app-level tests reflect real runtime behavior. |
|                    |                    | **@testing-library/react-native** & **react**     | **Consistent API.** The Testing Library family provides a user-centric API that works seamlessly across all our testing frameworks. |
| **Visual / Story**   | Web & Native       | **Storybook** + `@storybook/addon-interactions` | **Visual source of truth.** This is non-negotiable for a high-quality component library. We will add Chromatic for automated visual regression testing. |
| **E2E**              | iOS / Android      | **Maestro**                                       | **Simplicity and stability.** Maestro's black-box, YAML-based approach is simpler to set up and more resilient to code changes than Detox, especially with Expo. |
|                    | Web                | **Playwright**                                    | **Industry standard.** The best-in-class tool for reliable web E2E testing. |

---

## 3. The Hybrid Testing Decision

After extensive research and experimentation, we've adopted a hybrid testing approach:

### Why Not Pure Vitest?
While Vitest excels for web and pure JavaScript testing, the React Native ecosystem hasn't fully caught up. Using Vitest with React Native Testing Library is described as "an endless pit of issues" with "millions of limitations" by developers who've attempted it. Key challenges include:
- Unreliable vitest-react-native integration
- Issues with testing-library functions (getByTestId, getByText)
- Complex configuration requirements for native module mocking

### Why Not Pure Jest?
Our initial attempt to use Jest everywhere failed due to:
- Complex module transformation issues in our pnpm monorepo
- ESM/CommonJS interoperability problems
- Cross-package dependency resolution failures
- Excessive time spent fighting `transformIgnorePatterns`

### The Pragmatic Solution
We use **Vitest** for pure component libraries (bgui) and utilities (utils) where it shines, and **jest-expo** for the actual React Native app where comprehensive native mocks are essential. This gives us:
- Working tests today (not blocked by tooling)
- Confidence that components work on all platforms
- Alignment with both modern tooling and RN community standards where each makes sense
- A clear migration path as either ecosystem matures

---

## 4. Implementation Details

### Package-Specific Testing Setup

#### bgui (Universal Components)
- **Framework:** Vitest
- **Config:** `packages/bgui/vitest.config.ts`
- **Environment:** jsdom (browser-like)
- **Test files:** `*.test.tsx` alongside source files
- **Key features:** Fast iteration, modern syntax support

#### utils (Shared Utilities)
- **Framework:** Vitest  
- **Config:** `packages/utils/vitest.config.ts`
- **Environment:** jsdom or node (depending on utility type)
- **Test files:** `*.test.ts` alongside source files
- **Key features:** Pure JS/TS testing, no native dependencies

#### product (Expo App)
- **Framework:** Jest with jest-expo preset
- **Config:** `apps/product/jest.config.js`
- **Environment:** React Native test environment
- **Test files:** `__tests__/*.test.tsx` or `*.test.tsx`
- **Key features:** Full native API mocking, realistic app testing

### Shared Conventions
- Tests live alongside source code (except for app integration tests)
- Use Testing Library queries for component interaction
- Focus on user behavior over implementation details
- Mock external dependencies at the module boundary

---

## 5. What to Test

-   **Unit Tests:** Pure functions, complex algorithms, utility helpers.
-   **Component Tests:** User interactions (`onPress`, `onChange`), conditional rendering, accessibility props, and visual states.
-   **E2E Tests:** Critical user flows only. Login, checkout, core feature interactions. These are slow and brittle; use them sparingly.
-   **Visual Tests (Storybook):** All visual states of a component (hover, focused, disabled, different variants, etc.).

<<<<<<< HEAD
We do not test third-party libraries or simple component rendering. We trust that our tools work.

---

## 6. Practical Recommendations

### Testing React Native Components

Given the current limitations with React Native testing (see `./LESSONS.md` for details), we recommend:

1. **Don't Fight the Tools:** If you're spending more than 30 minutes configuring tests, stop and consider alternatives.

2. **Mock Aggressively:** When testing React Native components, mock at the module boundary:
   ```typescript
   // Mock entire modules to avoid Flow type issues
   jest.mock('react-native', () => ({
     View: 'View',
     Text: 'Text',
     StyleSheet: { create: (styles) => styles }
   }));
   ```

3. **Test Business Logic Separately:** Extract logic from components into pure functions:
   ```typescript
   // ❌ Hard to test
   const MyComponent = () => {
     const result = complexCalculation(data);
     return <View>...</View>;
   };
   
   // ✅ Easy to test
   export const complexCalculation = (data) => { ... };
   const MyComponent = () => {
     const result = complexCalculation(data);
     return <View>...</View>;
   };
   ```

4. **Use Storybook for Component Testing:** Visual testing is more reliable than unit testing for UI:
   ```typescript
   export default {
     title: 'Components/Button',
     component: Button,
   };
   
   export const Primary = {
     args: { variant: 'primary', children: 'Click me' },
   };
   ```

5. **Prioritize E2E Tests:** Given unit test limitations, invest in comprehensive E2E tests:
   ```yaml
   # Maestro test
   - launchApp
   - assertVisible: "Dashboard"
   - tapOn: "Go to Tasks"
   - assertVisible: "Tasks"
   ```

### Package-Specific Guidelines

#### For `bgui` (Component Library)
- **Primary:** Storybook for visual testing
- **Secondary:** Vitest for utility functions and hooks
- **Skip:** Complex component interaction tests

#### For `utils` (Pure Functions)
- **Primary:** Vitest with high coverage (80%+)
- **Focus:** Edge cases, error handling, type safety

#### For `product` (Expo App)
- **Primary:** E2E tests with Maestro
- **Secondary:** Jest for business logic (not components)
- **Skip:** Component unit tests (use E2E instead)

### Common Pitfalls to Avoid

1. **Don't Test Implementation Details:** Focus on behavior, not structure
2. **Don't Mock What You Don't Own:** Mock at your boundaries
3. **Don't Chase 100% Coverage:** 80% on critical paths > 100% everywhere
4. **Don't Test the Framework:** Trust that React Native works

### When to Skip Tests

It's okay to skip tests when:
- The cost of testing exceeds the value (complex React Native setup)
- Visual testing covers the use case better (UI components)
- E2E tests already cover the functionality
- The code is purely declarative (styles, simple components)

---

## 7. Troubleshooting

### Common Issues and Solutions

**Issue:** `SyntaxError: Unexpected token 'typeof'` or similar Flow type errors
**Solution:** Mock the entire module or use a test-specific build

**Issue:** `Cannot find module 'react-native'`
**Solution:** Add module name mapper or use react-native-web

**Issue:** Tests timeout with React Native components
**Solution:** Mock heavy dependencies like reanimated, gesture-handler

**Issue:** Different behavior in test vs. runtime
**Solution:** Use E2E tests for critical paths instead

---

## 8. Migration Guide

If you're adding tests to an existing package:

1. **Assess Current State:** What type of code are you testing?
2. **Choose Test Runner:** Vitest for pure JS/TS, Jest for RN apps
3. **Start Small:** One simple test file first
4. **Mock Early:** Add mocks before they're needed
5. **Document Decisions:** Why did you skip certain tests?

Remember: The goal is confidence in your code, not 100% coverage. 
=======
We do not test third-party libraries or simple component rendering. We trust that our tools work. 
>>>>>>> main

---

## See Also

For additional context and related documentation:

- **[QUALITY.md](./QUALITY.md)** - Comprehensive code quality standards and zero-tolerance policy
- **[PR_REVIEW_PROCESS.md](../processes/PR_REVIEW_PROCESS.md)** - How code reviews and quality validation are performed
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Overall development workflow and environment setup

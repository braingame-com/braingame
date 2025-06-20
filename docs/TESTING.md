# Testing Strategy

> **Single source of truth** for all testing conventions in the Brain Game monorepo.  
> Last Updated: 21 June 2024

This document outlines the official testing stack and philosophy. All new code **must** adhere to these standards to ensure stability, maintainability, and quality.

---

## 1. Guiding Philosophy

1.  **Unified & Pragmatic:** We use a single, unified test runner (Jest) for all unit and component tests to reduce complexity. The stack is chosen for its stability and strong support within the React Native and Expo ecosystems.
2.  **Test the User Experience:** Our tests prioritize user-facing behavior over implementation details. We use `@testing-library` to interact with components as a user would.
3.  **Right Tool for the Job:** We use different testing layers (unit, component, E2E, visual) for different purposes. The goal is confident coverage, not 100% line coverage.

---

## 2. The Official Testing Stack

This is the only approved testing stack for this project.

| Test Layer         | Platform(s)        | Primary Tool(s)                                   | Rationale & Best Practice                                                               |
| ------------------ | ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Unit & Component** | Web, iOS, Android  | **Jest** (`jest-expo/universal` preset)           | **One runner to rule them all.** The `jest-expo` preset is *specifically designed* for our universal use case, providing a single, reliable foundation for all `packages/*` tests. |
|                    |                    | **@testing-library/react-native** & **react**     | **Consistent API.** The Testing Library family provides a user-centric API that works seamlessly across native and web, powered by Jest. |
| **Visual / Story**   | Web & Native       | **Storybook** + `@storybook/addon-interactions` | **Visual source of truth.** This is non-negotiable for a high-quality component library. We will add Chromatic for automated visual regression testing. |
| **E2E**              | iOS / Android      | **Maestro**                                       | **Simplicity and stability.** Maestro's black-box, YAML-based approach is simpler to set up and more resilient to code changes than Detox, especially with Expo. |
|                    | Web                | **Playwright**                                    | **Industry standard.** The best-in-class tool for reliable web E2E testing. |

---

## 3. Implementation Details

-   **Location:** Tests for a component or utility live alongside the source code. For `Example.tsx`, the test file is `Example.test.tsx`.
-   **Shared Logic:** Business logic should be extracted into pure, framework-agnostic functions within `packages/utils`. These can be tested once with Jest and reused everywhere.
-   **Universal Components (`bgui`):** A single `*.test.tsx` file will be run against both native and web environments, powered by the `jest-expo/universal` preset. We do not maintain separate `.native.` and `.web.` test files unless absolutely necessary for platform-specific API testing.

---

## 4. What to Test

-   **Unit Tests:** Pure functions, complex algorithms, utility helpers.
-   **Component Tests:** User interactions (`onPress`, `onChange`), conditional rendering, accessibility props, and visual states.
-   **E2E Tests:** Critical user flows only. Login, checkout, core feature interactions. These are slow and brittle; use them sparingly.
-   **Visual Tests (Storybook):** All visual states of a component (hover, focused, disabled, different variants, etc.).

We do not test third-party libraries or simple component rendering. We trust that our tools work. 
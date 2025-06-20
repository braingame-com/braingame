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

## 2. The Official Testing Stack

This is the only approved testing stack for this project.

| Test Layer         | Platform(s)        | Primary Tool(s)                                   | Rationale & Best Practice                                                               |
| ------------------ | ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Unit & Component** | Web, iOS, Android  | **Vitest**                                        | **Modern, Fast, and Functional.** Vitest provides a superior developer experience, requires minimal configuration, and natively handles the ESM/monorepo complexities that make Jest brittle in our environment. |
|                    |                    | **@testing-library/react-native** & **react**     | **Consistent API.** The Testing Library family provides a user-centric API that works seamlessly across native and web, powered by Vitest. |
| **Visual / Story**   | Web & Native       | **Storybook** + `@storybook/addon-interactions` | **Visual source of truth.** This is non-negotiable for a high-quality component library. We will add Chromatic for automated visual regression testing. |
| **E2E**              | iOS / Android      | **Maestro**                                       | **Simplicity and stability.** Maestro's black-box, YAML-based approach is simpler to set up and more resilient to code changes than Detox, especially with Expo. |
|                    | Web                | **Playwright**                                    | **Industry standard.** The best-in-class tool for reliable web E2E testing. |

---

## 3. The "Why Vitest?" Decision

Our previous attempt to use Jest, the traditional React Native standard, failed. The combination of our pnpm monorepo, cross-package dependencies (`bgui` using `utils`), and modern ESM syntax created a "perfect storm" of module transformation issues. This resulted in a non-functional test suite and significant time lost fighting configuration (`transformIgnorePatterns`).

We have chosen to **prioritize a working solution over adherence to a failing standard.** Vitest is built for the modern JavaScript ecosystem and resolves these issues out of the box. The trade-off is a slight deviation from the RN community norm in exchange for a massive gain in stability, developer velocity, and configuration simplicity.

---

## 4. Implementation Details

-   **Location:** Tests for a component or utility live alongside the source code. For `Example.tsx`, the test file is `Example.test.tsx`.
-   **Universal Components (`bgui`):** A single `*.test.tsx` file will be run in a browser-like environment (`jsdom`) provided by Vitest.
-   **Configuration:** The root configuration for Vitest lives in `packages/bgui/vitest.config.ts`.

---

## 5. What to Test

-   **Unit Tests:** Pure functions, complex algorithms, utility helpers.
-   **Component Tests:** User interactions (`onPress`, `onChange`), conditional rendering, accessibility props, and visual states.
-   **E2E Tests:** Critical user flows only. Login, checkout, core feature interactions. These are slow and brittle; use them sparingly.
-   **Visual Tests (Storybook):** All visual states of a component (hover, focused, disabled, different variants, etc.).

We do not test third-party libraries or simple component rendering. We trust that our tools work. 
# Coding Style: Brain Game

> **This is our code quality constitution.** It establishes the foundation for a scalable, maintainable, and professional-grade codebase. It is not a suggestion; it is the standard.

---

## 1. General Philosophy
- **Write it clean, the first time.** No "I'll fix it later."
- **Clarity over cleverness.** Code should be immediately understandable.
- **Own your code.** Leave it better than you found it.
- **Zero technical debt tolerance.** Refactor aggressively.

---

## 2. Formatting & Linting
**Biome is the single source of truth for all formatting and linting rules.**
- The configuration in `biome.json` is the definitive style guide. This document provides the rationale; the `json` file provides the rules.
- All code **must be formatted** with Biome before commit.
- Run `pnpm lint` to check and fix issues automatically.

---

## 3. Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Variables & Functions | `camelCase` | `const myVariable = ...` |
| Components & Types | `PascalCase` | `function MyComponent() {}` |
| Files & Directories | `kebab-case` | `my-component/index.tsx` |
| Constants | `CONSTANT_CASE` | `const MAX_RETRIES = 3;` |
| Custom Hooks | `useCamelCase`| `function useAnalytics() {}` |

---

## 4. Code Structure

### Components
We use a **colocation** strategy for component files. Start simple and expand as needed.

**Simple Component:**
A component with minimal logic can exist in a single file.
```
📁 MyComponent/
└─ 📄 MyComponent.tsx
```

**Complex Component:**
As a component grows, extract related parts into their own files within the component's directory. This keeps logic isolated and easy to navigate.
```
📁 MyComponent/
├─ 📄 index.ts           # Barrel export: export * from './MyComponent';
├─ 📄 MyComponent.tsx    # The core component logic and JSX
├─ 📄 MyComponent.test.tsx # Jest tests
├─ 📄 types.ts           # TypeScript interfaces for props, state, etc.
└─ 📄 utils.ts           # Component-specific helpers or hooks
```
- All UI components reside in `packages/bgui`.

### Custom Hooks
- All shared, reusable hooks **must** be placed in `packages/utils/src/hooks`.
- Hooks specific to a single component should be colocated within that component's folder (`utils.ts`).
- **Must** be prefixed with `use`.

### Imports
- **Absolute imports are mandatory** for workspace packages (e.g., `@braingame/utils`) and aliased paths (`@/components`). This is non-negotiable for a scalable monorepo.

---

## 5. TypeScript & React
- **TypeScript is mandatory.** Use strict mode.
- **React components must be functions.** No class components.
- **Props:** Use specific `interface` or `type` definitions. Avoid `any` or `object`.
- **State:** Use the `useState` and `useReducer` hooks.

---

## 6. Comments
- **Comment the *why*, not the *what*.** Good code is self-documenting. Comments should explain complex logic, business reasons, or future intentions.
- Use `// TODO:` for planned refactors or features. Include context.
  ```ts
  // TODO(jordan): Refactor this into a generic usePagination hook.
  ```
- Use `// FIXME:` for code that is broken or suboptimal. Explain the issue.
  ```ts
  // FIXME: This calculation is O(n^2) and will be slow with large datasets.
  ```

---

## 7. Anti-Patterns
The following are strictly forbidden:
- **Magic Numbers/Strings:** Use named constants from a theme or constants file.
- **`console.log` in Committed Code:** Use a proper logger utility if you need persistent logs. Remove all debugging logs before merging.
- **Nested Ternaries:** A single ternary is fine. Nested ternaries are unreadable. Use `if/else` or other control flow statements.
- **Large Functions/Components:** If a function or component is more than 100 lines long, it's a strong signal that it needs to be refactored.
- **Side Effects in Render:** Component rendering should be pure. All side effects (data fetching, subscriptions) must be in `useEffect` or event handlers.
- **Ignoring a11y:** All interactive components **must** be accessible. Provide `aria-*` props and ensure keyboard navigability.

---

## 8. AI-Assisted Development
- AI tools (Copilot, Cursor, etc.) are encouraged to accelerate development.
- **You are responsible for the code.** AI-generated code must be critically reviewed, refactored, and tested to meet our enterprise standards. It is a tool, not a replacement for engineering ownership.

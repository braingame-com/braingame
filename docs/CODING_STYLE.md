# Coding Style – Brain Game

![Code Style](https://img.shields.io/badge/code%20style-enterprise%20grade-gold?style=flat-square&logo=eslint)
![Biome](https://img.shields.io/badge/formatter-biome-60a5fa?style=flat-square&logo=eslint)
![TypeScript](https://img.shields.io/badge/types-strict-3178c6?style=flat-square&logo=typescript)
![Architecture](https://img.shields.io/badge/architecture-enterprise-purple?style=flat-square&logo=react)

**ENTERPRISE-GRADE SOFTWARE STANDARDS**

Brain Game is committed to **WORLD-CLASS, INDUSTRY-LEADING** software quality from day one. This guide establishes the foundation for scalable, maintainable, and professional-grade codebases that can compete with Fortune 500 companies.

**Follow these standards ruthlessly.** No exceptions, no shortcuts.

---

## General Philosophy

**ENTERPRISE-FIRST MINDSET:**
- **Write it clean the first time.** Don't "come back later" to fix hacks.  
- **Minimalist, not minimal.** Every line should have a reason to exist.
- **Optimize for clarity, then performance.** Unless it's slow — then fix it.
- **Scale-ready architecture.** Build for 1M+ users from day one.
- **Zero technical debt tolerance.** Refactor immediately when patterns emerge.

---

## Language & Syntax

- **JavaScript**: Always ES6+.
- **TypeScript**: Use it whenever appropriate. Strong types, clear interfaces.
- **React**: Functional components only. Prefer hooks. No legacy class components.
- **Imports**: **MANDATORY absolute imports** (`@braingame/utils`, `@/components`) over relative paths. Enterprise codebases demand clarity.

---

## Style Rules

### Formatting

- Use **Biome** for formatting and linting (replaces Prettier + ESLint).
- Always auto-fix linting issues before committing: `pnpm lint`
- Max line length: 100.
- 2-space indentation.

### Naming

- camelCase for variables/functions  
- PascalCase for components/types/interfaces  
- kebab-case for file names  
- CONSTANT_CASE for env vars

### Functions

- Prefer arrow functions: `const fn = () => {}`  
- Keep functions pure where possible  
- Never nest more than 2 levels deep  
- Prefer `map`, `filter`, `reduce` over `for` loops when it improves readability

---

## Component Structure

**ENTERPRISE-GRADE FOLDER STRUCTURE** (mandatory for scalability):

```
📁 MyComponent/
├─ 📄 index.tsx          → main component (clean barrel export)
├─ 📄 MyComponent.tsx    → implementation
├─ 📄 MyComponent.test.tsx → comprehensive tests
├─ 📄 types.ts           → TypeScript interfaces & props
├─ 📄 styles.ts          → styled components (if needed)
├─ 📄 utils.ts           → component-specific helpers
└─ 📄 constants.ts       → component constants
```

**Why folders?** Enterprise codebases with 1000+ components require this structure for maintainability, discoverability, and team collaboration.

---

## Comments

- Don't comment what the code *does*. Comment **why** it matters.  
- Prefer `TODO`, `FIXME`, `HACK` with context and initials.

```ts
// TODO(jordan): refactor into reusable hook once auth is stable
```

---

## Git & Commits

- Use conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Every PR must be **atomic and focused**. No "drive-by fixes" unless they're critical.

---

## Testing

**ENTERPRISE-GRADE TEST COVERAGE:**
- **Minimum 80% coverage** on all packages (industry standard).
- Prefer **unit tests** and **integration tests** over E2E unless necessary.
- Use **Jest** with comprehensive `.test.tsx` files in component folders.
- **Every component MUST have tests** - no exceptions.
- Run `pnpm test` before every commit. Broken tests block deployments.

---

## AI Pairing & Tooling

**ENTERPRISE AI DEVELOPMENT:**
- LLMs like Claude, Cursor, and GPT are encouraged for **enterprise-grade output**.  
- Don't blindly paste AI output. Validate, refactor, and ensure **production quality**.
- AI-generated code must meet the same **world-class standards** as human-written code.
- Use AI to accelerate, not compromise, quality.

---

## Don'ts

- ❌ No magic numbers (enterprise code is self-documenting)
- ❌ No console logs in main branches (use proper logging)
- ❌ No committing broken code (CI/CD must be green)
- ❌ No cowboy coding in `main` (enterprise workflows required)
- ❌ No mixing Prettier with Biome (Biome only)
- ❌ No shortcuts that compromise scalability
- ❌ No "we'll fix it later" mentality
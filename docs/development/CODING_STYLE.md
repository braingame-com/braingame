# Coding Style

Code quality standards for Brain Game.

## Philosophy

- Write it right the first time
- Clarity over cleverness
- Zero technical debt tolerance

## Formatting

Biome handles all formatting. Period.

```bash
pnpm lint        # Check
pnpm lint:fix    # Fix
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables/Functions | camelCase | `getUserData` |
| Components/Types | PascalCase | `UserProfile` |
| Files/Directories | kebab-case | `user-profile.tsx` |
| Constants | CONSTANT_CASE | `MAX_RETRIES` |
| Custom Hooks | useCamelCase | `useUserData` |

## Code Structure

Colocate by feature:
```
features/user/
├── user-profile.tsx      Component
├── user-profile.test.tsx Tests
├── user-profile.css      Styles
└── use-user-data.ts      Hook
```

## TypeScript

Always use strict mode:
```typescript
// Good
const processUser = (user: User): ProcessedUser => {
  return { ...user, processed: true };
};

// Bad
const processUser = (user: any) => {
  return user;
};
```

## React

Function components only:
```typescript
// Good
export const Button = ({ onClick, children }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

// Bad
class Button extends React.Component { }
```

## Comments

Comment the "why", not the "what":
```typescript
// Good: Explains business logic
// Premium users get 2x token multiplier per company policy
const multiplier = user.isPremium ? 2 : 1;

// Bad: States the obvious
// Set multiplier to 2 if premium
```

## Banned Patterns

| Pattern | Why | Use Instead |
|---------|-----|-------------|
| `any` | Type safety | Specific types |
| `console.log` | Production leaks | Logger service |
| Magic numbers | Unclear intent | Named constants |
| Nested ternaries | Readability | if/else |
| Large functions | Complexity | Extract functions |

## AI Development

AI tools encouraged, but:
- Review all generated code
- Ensure it follows our patterns
- You own the quality
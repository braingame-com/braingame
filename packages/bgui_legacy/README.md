# @braingame/bgui

> Enterprise-grade UI component library for React Native and web platforms

## 🎯 Project Vision

BGUI is inspired by [Joy UI](https://github.com/mui/material-ui/tree/master/packages/mui-joy) from Material-UI by Google. Our goal is to replicate Joy UI's exceptional component quality and developer experience, but for React Native and React Native Web, with Brain Game's unique design flavor.

Like Joy UI, we focus on:
- **Beautiful by default** - Components that look great out of the box
- **Flexibility over rigidity** - More customizable than strict Material Design
- **Developer joy** - Intuitive APIs that are a pleasure to use
- **Production-ready** - Enterprise-grade quality and reliability

## Installation

```bash
pnpm add @braingame/bgui
```

## Quick Start

```tsx
import { Button, Card, Text } from '@braingame/bgui';

export function MyComponent() {
  return (
    <Card>
      <Text variant="h2">Welcome to BGUI</Text>
      <Button onPress={() => console.log('Pressed!')}>
        Get Started
      </Button>
    </Card>
  );
}
```

## 📚 Documentation

### Live Interactive Documentation
```bash
# View all components with live examples
pnpm storybook
```

Our documentation lives in the code itself:
- **TypeScript interfaces** with comprehensive JSDoc comments
- **Storybook stories** showing all variants and use cases  
- **Live playground** to experiment with props

### Quick Links
- [Component Patterns & Guidelines](./docs/COMPONENT_PATTERNS.md)
- Run `pnpm storybook` for interactive component explorer

## Components

30+ components across Layout, Forms, Display, Navigation, Feedback, and Utility categories.

Each component includes:
- Full TypeScript definitions with JSDoc documentation
- Interactive Storybook examples
- Accessibility features built-in
- Cross-platform support

## Features

- **TypeScript**: 100% type-safe with exported types
- **Cross-Platform**: Works on iOS, Android, and Web
- **Accessible**: WCAG 2.1 AA compliant
- **Themeable**: Token-based design system
- **Performant**: Optimized with React.memo and lazy loading
- **Error Handling**: Built-in error boundaries

## Universal Component Philosophy

BGUI follows a **strict universal component philosophy** - all components are designed to work seamlessly across React Native (iOS/Android) and React Native Web without requiring platform-specific files.

### Key Principles:

1. **No .web.tsx or .native.tsx files** - All components use a single implementation
2. **Platform checks when necessary** - Use `Platform.OS` for platform-specific behavior
3. **CSS-in-JS compatibility** - All styles work with both React Native and React Native Web
4. **Single source of truth** - One component, one file, all platforms

### Benefits:

- **Reduced maintenance** - No duplicate code across platforms
- **Consistent behavior** - Same component works identically everywhere
- **Simplified testing** - Test once, run everywhere
- **Better DX** - Developers don't need to think about platform differences

### Example:

```tsx
// ✅ Good - Universal component
export const MyComponent = () => {
  const shadowStyle = Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
    web: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  });
  
  return <View style={[styles.container, shadowStyle]} />;
};

// ❌ Bad - Platform-specific files
// MyComponent.tsx (native)
// MyComponent.web.tsx (web)
```

## 🛠️ Development

### Component Structure
Each component follows this self-documenting pattern:

```
src/wip/ComponentName/
├── ComponentName.tsx         # Main component with JSDoc
├── ComponentName.stories.tsx # Storybook stories  
├── types.ts                 # TypeScript interfaces with JSDoc
├── styles.ts                # Styles and theme usage
└── index.ts                 # Public exports
```

### Documentation Approach
We use a **self-documenting** approach:

```typescript
// types.ts - Document props inline
export interface ButtonProps {
  /**
   * Visual style variant of the button.
   * - "primary": Primary action button
   * - "secondary": Secondary action  
   * - "danger": Destructive action
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'danger';
}

// Component.tsx - Add usage examples
/**
 * Button component for user actions
 * 
 * @example
 * <Button variant="primary" icon="save">
 *   Save Changes
 * </Button>
 */
export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  // Implementation
};
```

### Creating New Components

1. **Start with TypeScript interfaces** - Define props with JSDoc
2. **Build the component** - Follow universal principles
3. **Create Storybook stories** - Show all variants and states
4. **No separate docs needed** - Everything is in the code!

## Documentation

- [Component Patterns](./docs/COMPONENT_PATTERNS.md) - Design patterns and guidelines
- [Architecture](../../docs/ARCHITECTURE.md) - System design and patterns
- [Development Guide](../../docs/DEVELOPMENT.md) - Setup and workflow
- **Live Components** - Run `pnpm storybook` for interactive docs

---

MIT © Brain Game

# BGUI - Brain Game UI Component Library

![Status](https://img.shields.io/badge/status-architectural%20reset-orange?style=for-the-badge)
![Architecture](https://img.shields.io/badge/architecture-React%20Native%20Web-success?style=for-the-badge)

> Enterprise-grade UI component library for React Native and web platforms

## 🎯 Project Vision

BGUI is inspired by [Joy UI](https://github.com/mui/material-ui/tree/master/packages/mui-joy) from Material-UI by Google. Our goal is to replicate Joy UI's exceptional component quality and developer experience, but for React Native and React Native Web, with Brain Game's unique design flavor.

Like Joy UI, we focus on:
- **Beautiful by default** - Components that look great out of the box
- **Flexibility over rigidity** - More customizable than strict Material Design
- **Developer joy** - Intuitive APIs that are a pleasure to use
- **Production-ready** - Enterprise-grade quality and reliability

## 🏗️ Architectural Reset

After implementing a Platform Adapter Pattern with separate .web.tsx and .native.tsx files, we've pivoted to a simpler, more maintainable approach: **pure React Native Web**.

### Why the Change?

The Platform Adapter Pattern, while functional, created unnecessary complexity:
- Duplicate code maintenance across platforms
- Goes against React Native Web's core philosophy
- Added cognitive overhead for developers
- Increased testing surface area

## Universal Component Philosophy

BGUI follows a **strict universal component philosophy** - all components are designed to work seamlessly across React Native (iOS/Android) and React Native Web without requiring platform-specific files.

### Key Principles:

1. **No .web.tsx or .native.tsx files** - All components use a single implementation
2. **Platform checks when necessary** - Use `Platform.OS` for platform-specific behavior
3. **StyleSheet + Theme Context** - Simple, native styling approach that works everywhere
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
  const theme = useTheme();
  const shadowStyle = Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
    web: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  });
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
    },
  });
  
  return <View style={[styles.container, shadowStyle]} />;
};

// ❌ Bad - Platform-specific files
// MyComponent.tsx (native)
// MyComponent.web.tsx (web)
```

## 🎨 Preserved Foundations

We've preserved the valuable setup and raw ingredients:

### Theme System
- **Material Design 3** token system with light/dark modes
- **Joy UI** design patterns mapped to component variants
- **Typography** scale with Lexend font family
- **Color system** with semantic naming
- **Theme Context** for universal styling across platforms

### Developer Experience
- **TypeScript-first** with comprehensive type definitions
- **Self-documenting** components with JSDoc
- **Storybook** integration for interactive documentation
- **Performance** optimized with React.memo and lazy loading

### Infrastructure
- **Icons** registry and utilities
- **Hooks** for state management and accessibility
- **Constants** and theme tokens
- **Testing** setup with React Native Testing Library

## 🚀 Fresh Start

All components have been stripped from the library. We now start with a clean slate to build universal components from scratch using our excellent foundations.

### What's Next

1. **Build universal components** using single .tsx files
2. **Leverage our theme system** for consistent styling
3. **Follow Joy UI patterns** for visual consistency
4. **Test across all platforms** to ensure universal compatibility

### Component Structure
Each component will follow this self-documenting pattern:

```
src/components/ComponentName/
├── ComponentName.tsx         # Universal component implementation
├── ComponentName.stories.tsx # Storybook stories  
├── ComponentName.test.tsx    # Tests for all platforms
├── types.ts                 # TypeScript interfaces with JSDoc
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

## Features

- **TypeScript**: 100% type-safe with exported types
- **Cross-Platform**: Works on iOS, Android, and Web
- **Accessible**: WCAG 2.1 AA compliant
- **Themeable**: Token-based design system
- **Performant**: Optimized with React.memo and lazy loading
- **Error Handling**: Built-in error boundaries

## 🛠️ Development

### Creating New Components

1. **Start with TypeScript interfaces** - Define props with JSDoc
2. **Build the universal component** - Follow single-file principles
3. **Create Storybook stories** - Show all variants and states
4. **Write comprehensive tests** - Cover all platforms
5. **No separate docs needed** - Everything is in the code!

### Live Interactive Documentation
```bash
# View all components with live examples
pnpm storybook
```

Our documentation lives in the code itself:
- **TypeScript interfaces** with comprehensive JSDoc comments
- **Storybook stories** showing all variants and use cases  
- **Live playground** to experiment with props

## License

MIT © Brain Game
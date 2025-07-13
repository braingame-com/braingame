# @braingame/bgui

> Enterprise-grade UI component library for React Native and web platforms

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

## Components

25+ components across Layout, Forms, Display, Navigation, Feedback, and Utility categories.

For detailed component documentation, see [Component Reference](./docs/BGUI_COMPONENT_PLAN.md).

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

## Documentation

- [Component Reference](./docs/BGUI_COMPONENT_PLAN.md) - Detailed API documentation
- [Architecture](../../docs/ARCHITECTURE.md) - System design and patterns
- [Development Guide](../../docs/DEVELOPMENT.md) - Setup and workflow

---

MIT © Brain Game

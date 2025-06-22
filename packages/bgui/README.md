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

For detailed component documentation, see [Component Reference](../../docs/COMPONENT_REFERENCE.md).

## Features

- **TypeScript**: 100% type-safe with exported types
- **Cross-Platform**: Works on iOS, Android, and Web
- **Accessible**: WCAG 2.1 AA compliant
- **Themeable**: Token-based design system
- **Performant**: Optimized with React.memo and lazy loading
- **Error Handling**: Built-in error boundaries

## Documentation

- [Component Reference](../../docs/COMPONENT_REFERENCE.md) - Detailed API documentation
- [Architecture](../../docs/ARCHITECTURE.md) - System design and patterns
- [Development Guide](../../docs/DEVELOPMENT.md) - Setup and workflow

---

MIT © Brain Game

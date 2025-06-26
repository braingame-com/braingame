# BGUI

Enterprise-grade UI component library for Brain Game.

## Features

- **TypeScript**: 100% type coverage
- **Cross-platform**: React Native + Web
- **Accessible**: WCAG 2.1 AA compliance
- **Themeable**: Design token system
- **Performant**: Optimized bundle size

## Quick Start

```bash
pnpm install @braingame/bgui
```

```typescript
import { Button, Card, Text } from '@braingame/bgui';

const App = () => (
  <Card>
    <Text variant="title">Welcome</Text>
    <Button variant="primary" onPress={handlePress}>
      Get Started
    </Button>
  </Card>
);
```

## Components

25+ production-ready components including:
- Button, Text, View, Card
- Modal, Toast, ErrorBoundary
- Icon, Link, PageWrapper
- TextInput, Alert, Breadcrumb

## Documentation

- [Component Plan](./docs/BGUI_COMPONENT_PLAN.md) - Implementation roadmap
- [Component Reference](./docs/COMPONENT_REFERENCE.md) - API docs
- [Component Template](./docs/COMPONENT_TEMPLATE.md) - Documentation standards
- [Error Boundary Guide](./docs/ErrorBoundary.md) - Error handling patterns

## Design System

Built on Brain Game design tokens for consistent styling across all platforms.
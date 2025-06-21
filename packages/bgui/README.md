# @braingame/bgui

> Enterprise-grade UI component library for React Native and web platforms

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?style=flat-square&logo=typescript)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=flat-square)
![Components](https://img.shields.io/badge/components-25+-brightgreen?style=flat-square)
![Quality](https://img.shields.io/badge/quality-enterprise%20grade-gold?style=flat-square)

## 📦 Installation

```bash
pnpm add @braingame/bgui
```

## 🚀 Quick Start

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

## 🧩 Components

### Layout
- **View** - Basic container component
- **Card** - Content container with elevation
- **Divider** - Visual separator
- **Modal** - Overlay dialog
- **Tabs** - Tabbed navigation

### Forms
- **Button** - Interactive button with variants
- **Checkbox** - Boolean checkbox input
- **RadioGroup** - Single selection from options
- **Select** - Dropdown selection
- **Slider** - Range input slider
- **Switch** - Toggle switch

### Display
- **Avatar** - User profile image/initials
- **Badge** - Status indicators and counts
- **Icon** - Vector icons
- **Image** - Optimized image display
- **Spinner** - Loading indicator
- **Text** - Typography component
- **Tooltip** - Contextual help text

### Navigation
- **ActionList** - List of interactive items
- **Link** - Navigation links
- **Menu** - Dropdown menu

### Feedback
- **ProgressBar** - Progress indicator
- **Toast** - Temporary notifications
- **ErrorBoundary** - Error handling wrapper

### Utility
- **Accordion** - Collapsible content panels
- **Label** - Form field labels

## 🎨 Design System

All components use the Brain Game design token system:

```tsx
import { Colors, Tokens } from '@braingame/utils';

// Using theme colors
<Text color={Colors.universal.primary}>Primary text</Text>

// Using spacing tokens
<View style={{ padding: Tokens.m }}>Content</View>
```

## 🚀 Recent Enhancements

The BGUI library has undergone a comprehensive quality improvement initiative:
- **100% TypeScript Compliance**: All components use strict TypeScript with no `any` types
- **Enterprise Accessibility**: Complete ARIA support and keyboard navigation
- **Performance Optimized**: Strategic use of React.memo and memoization
- **Error Boundaries**: All components wrapped with error handling
- **Consistent Styling**: Token-based design system throughout
- **Custom Hooks**: 3 reusable hooks for common patterns
- **Comprehensive Testing**: Full test coverage for all components

## ♿ Accessibility

All components are built with accessibility in mind:
- Full keyboard navigation support
- Screen reader compatibility
- ARIA attributes for web
- AccessibilityRole for React Native
- Focus management utilities
- Proper semantic HTML

## 🔧 TypeScript

Full TypeScript support with exported types:

```tsx
import type { ButtonProps, CardProps } from '@braingame/bgui';
```

## 📚 Documentation

For detailed component documentation and examples, see the [BGUI Component Plan](../../docs/BGUI_COMPONENT_PLAN.md).

## 🤝 Contributing

See the main [Contributing Guide](../../.github/CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT © Brain Game

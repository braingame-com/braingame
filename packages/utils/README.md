# @braingame/utils

> Shared utilities, hooks, and constants for Brain Game applications

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?style=flat-square&logo=typescript)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=flat-square)

## 📦 Installation

```bash
pnpm add @braingame/utils
```

## 🚀 Quick Start

```tsx
import { Colors, Tokens, useThemeColor, useDisclosure } from '@braingame/utils';

// Using design tokens
const styles = {
  container: {
    padding: Tokens.m,
    borderRadius: Tokens.s,
  }
};

// Using theme colors
function MyComponent() {
  const backgroundColor = useThemeColor('background');
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <View style={{ backgroundColor }}>
      {/* Your content */}
    </View>
  );
}
```

## 📚 What's Included

### Design System Constants
- **Colors** - Theme colors for light/dark modes
- **Tokens** - Spacing scale (xs, s, m, l, xl, xxl, xxxl, xxxxl)
- **Typography** - Font families and text styles
- **Animation** - Timing constants for animations
- **BorderRadius** - Consistent corner radius values
- **Shadows** - Platform-specific shadow styles
- **ZIndex** - Z-index scale for layering

### Hooks
- **useThemeColor** - Get theme-aware colors
- **useColorScheme** - Detect light/dark mode
- **useDisclosure** - Manage open/close state
- **useTaskInput** - Task input handling
- **useDraggableTaskHandlers** - Drag and drop for tasks
- **useControlledState** - Handle controlled/uncontrolled component patterns
- **useFocusManagement** - Keyboard navigation and focus utilities
- **useInteractiveState** - Manage hover/focus/pressed states

### Helpers
- **getIconSize** - Convert icon size names to pixel values
- **tasks-helpers** - Task management utilities

## 🎨 Design Tokens

```tsx
// Spacing scale
Tokens.xs  // 4
Tokens.s   // 8
Tokens.m   // 16
Tokens.l   // 24
Tokens.xl  // 32
Tokens.xxl // 48
Tokens.xxxl // 64
Tokens.xxxxl // 72

// Colors
Colors.universal.primary
Colors.universal.error
Colors.light.background
Colors.dark.background

// Typography
Typography.fontFamily.sans
Typography.fontFamily.mono
Typography.fontSize.xs through xl
Typography.fontWeight.normal/medium/bold

// Opacity values
Opacity.disabled    // 0.5
Opacity.hover      // 0.9  
Opacity.pressed    // 0.8
Opacity.shadow     // 0.1
Opacity.overlay    // 0.7
```

## 🧪 Testing

The utils package includes unit tests. Run them with:

```bash
pnpm test
```

## 🤝 Contributing

See the main [Contributing Guide](../../.github/CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT © Brain Game

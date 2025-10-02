# BGUI - Brain Game UI Component Library

![Architecture](https://img.shields.io/badge/architecture-React%20Native%20Web-success?style=for-the-badge)
![Theme Engine](https://img.shields.io/badge/theme-M3%20in--house-blueviolet?style=for-the-badge)

> Enterprise-grade, single-source UI component library for React Native **and** React Native Web powered by a custom Material 3/Joy-inspired theme engine.

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
- **In-house engine** wrapping Material 3 seed generation (`packages/bgui/src/theme/engine`)
- **Light + dark** tokens verified by automated tests (`theme-coverage.test.tsx`)
- **Semantic roles** only—no hard-coded hex values or Restyle props
- **BGUIThemeProvider** allows overrides/`forceTheme` for tests and host apps

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
Each component follows a single-file universal pattern:

```
src/components/{primitives|compositions}/ComponentName/
├── ComponentName.tsx        # Universal implementation (React Native + Web)
├── ComponentName.types.ts   # TypeScript interfaces with JSDoc
├── ComponentName.test.tsx   # React Native Testing Library coverage (light/dark when relevant)
├── ComponentName.stories.tsx# Storybook stories driven by theme tokens
└── index.ts                 # Public exports
```

### Documentation & Testing Approach
We use a **self-documenting** approach backed by automated coverage:

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

// tests - Verify light/dark behaviour
it('adapts tone between light and dark', () => {
  const { getByTestId } = renderWithTheme(<Button tone="primary" testID="subject" />);
  const lightStyles = getStyle(getByTestId('subject'));
  const darkStyles = getStyle(renderWithTheme(<Button tone="primary" testID="subject" />, { theme: 'dark' }).getByTestId('subject'));
  expect(lightStyles.backgroundColor).not.toBe(darkStyles.backgroundColor);
});
```

## Installation

```bash
pnpm add @braingame/bgui
```

## Quick Start

```tsx
import { BGUIThemeProvider, Button, Card, Typography } from "@braingame/bgui";

export function App() {
	return (
		<BGUIThemeProvider>
			<Button tone="primary">Press me</Button>
			<Card>
				<Typography level="body-md">
					Universal component rendered with the in-house theme.
				</Typography>
			</Card>
		</BGUIThemeProvider>
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

1. **Generate a scaffold**
   ```bash
   pnpm --filter @braingame/bgui generate:component primitives/MyComponent
   ```
   The generator outputs a universal `.tsx`, `.types.ts`, `.test.tsx`, and Storybook story wired to the in-house theme.
2. **Document via types** – Fill `*.types.ts` with JSDoc; update Storybook controls.
3. **Write tests** – Extend the generated spec with behaviour and light/dark assertions where visuals matter.
4. **Export from `src/index.ts`** – Follow existing patterns to expose the component.

### Live Interactive Documentation
```bash
# View all components with live examples
pnpm storybook
```

Our documentation lives in the code itself:
- **TypeScript interfaces** with comprehensive JSDoc comments
- **Storybook stories** showing all variants and use cases  
- **Live playground** to experiment with props
- **Maintainer checklist** in [`docs/MAINTAINER_CHECKLIST.md`](./docs/MAINTAINER_CHECKLIST.md) for pre-publish verification

## License

MIT © Brain Game

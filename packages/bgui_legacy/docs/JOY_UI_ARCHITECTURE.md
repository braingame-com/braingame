# Joy UI Architecture Patterns for BGUI

> Architectural patterns and lessons from Joy UI that can guide BGUI's development

## Overview

Joy UI uses a highly modular, TypeScript-first architecture that promotes maintainability, type safety, and developer experience. This document outlines how BGUI can adopt these patterns while maintaining React Native compatibility.

## Component File Structure

### Joy UI Pattern
Each component in Joy UI follows a consistent file structure:

```
Button/
├── Button.tsx              # Main component implementation
├── ButtonProps.ts          # TypeScript interfaces and prop types
├── buttonClasses.ts        # CSS class generation utilities
├── Button.spec.tsx         # Specification tests
├── Button.test.tsx         # Unit tests
└── index.ts               # Public exports
```

### BGUI Adaptation
We can adapt this for React Native while maintaining the same organizational benefits:

```
Button/
├── Button.tsx              # Main component implementation
├── Button.types.ts         # TypeScript interfaces and prop types
├── Button.styles.ts        # Style objects and theme integration
├── Button.stories.tsx      # Storybook stories (instead of spec)
├── Button.test.tsx         # Unit tests
├── Button.utils.ts         # Helper functions (if needed)
└── index.ts               # Public exports
```

## Key Architectural Principles

### 1. Separation of Concerns
**Joy UI:** Separates types, styles, implementation, and tests into distinct files
**BGUI:** Maintain this separation but adapt for React Native's styling approach

### 2. TypeScript-First Development
**Joy UI:** All components have dedicated type files with comprehensive interfaces
**BGUI:** Already following this pattern - continue with strict typing

### 3. Composable Sub-Components
**Joy UI:** Complex components like Card have related sub-components:
```
Card/
├── Card.tsx
├── CardActions/
├── CardContent/
├── CardOverflow/
└── CardCover/
```

**BGUI:** Implement similar patterns for complex components:
```
Card/
├── Card.tsx
├── CardHeader.tsx
├── CardContent.tsx
├── CardActions.tsx
└── index.ts         # Export all as named exports
```

### 4. Consistent Export Pattern
**Joy UI:**
```typescript
// index.ts
export { default } from './Button';
export * from './ButtonProps';
export { buttonClasses } from './buttonClasses';
```

**BGUI:**
```typescript
// index.ts
export { Button } from './Button';
export type { ButtonProps, ButtonVariant } from './Button.types';
export { buttonStyles } from './Button.styles';
```

## Implementation Guidelines

### 1. File Organization

#### Button.tsx (Component Implementation)
```typescript
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ButtonProps } from './Button.types';
import { useButtonStyles } from './Button.styles';
import { useButtonAnimation } from './Button.utils';

export function Button({ 
  variant = 'filled',
  size = 'medium',
  children,
  ...props 
}: ButtonProps) {
  const styles = useButtonStyles({ variant, size });
  const animation = useButtonAnimation();
  
  return (
    <Pressable style={[styles.root, animation]} {...props}>
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}
```

#### Button.types.ts (Type Definitions)
```typescript
import type { PressableProps } from 'react-native';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

export type ButtonVariant = ButtonProps['variant'];
export type ButtonSize = ButtonProps['size'];
export type ButtonColor = ButtonProps['color'];
```

#### Button.styles.ts (Styling)
```typescript
import { StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import type { ButtonProps } from './Button.types';

export function useButtonStyles({ 
  variant, 
  size, 
  color = 'primary' 
}: Pick<ButtonProps, 'variant' | 'size' | 'color'>) {
  const theme = useTheme();
  
  return StyleSheet.create({
    root: {
      // Base styles
      borderRadius: theme.radii.medium,
      paddingHorizontal: theme.spacing[size],
      paddingVertical: theme.spacing[size] / 2,
      // Variant styles
      ...(variant === 'filled' && {
        backgroundColor: theme.colors[color],
      }),
      ...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: theme.colors[color],
      }),
    },
    label: {
      // Typography styles
      fontSize: theme.typography.button[size].fontSize,
      fontWeight: theme.typography.button[size].fontWeight,
      color: variant === 'filled' 
        ? theme.colors.onPrimary 
        : theme.colors[color],
    },
  });
}
```

### 2. Component Categories

**Joy UI's Organization:**
- **Layout:** Container, Grid, Stack
- **Inputs:** Button, TextField, Select, Checkbox
- **Data Display:** Table, List, Typography
- **Feedback:** Alert, Snackbar, Skeleton
- **Surfaces:** Card, Paper, Accordion
- **Navigation:** Tabs, Breadcrumbs, Link
- **Utils:** Portal, ClickAwayListener

**BGUI's Adapted Categories:**
- **Layout:** View, Stack, Grid, KeyboardAvoidingContainer
- **Inputs:** Button, TextInput, Select, Switch, Checkbox
- **Display:** Text, Card, List, Badge, Chip
- **Feedback:** Alert, Toast, Spinner, ProgressBar
- **Surfaces:** Surface, Card, Modal, Accordion
- **Navigation:** Tabs, Breadcrumb, Link, Menu
- **Utils:** ErrorBoundary, Portal (via react-native-portalize)

### 3. Testing Strategy

**Joy UI Approach:**
- `.spec.tsx` - Integration/specification tests
- `.test.tsx` - Unit tests
- Comprehensive prop testing
- Accessibility testing

**BGUI Approach:**
- `.test.tsx` - Unit tests with React Native Testing Library
- `.stories.tsx` - Visual testing with Storybook
- Platform-specific testing (iOS, Android, Web)
- Accessibility testing with React Native's accessibility props

### 4. Documentation Pattern

**Joy UI:**
- Inline JSDoc comments
- API documentation generated from types
- Live playground examples

**BGUI:**
- Comprehensive JSDoc in `.types.ts` files
- Storybook for interactive documentation
- README per component (for complex ones)
- Examples in component files

## Migration Strategy

### Phase 1: Establish Pattern with New Components
1. Apply this architecture to new gold standard components
2. Create template/generator for consistent structure
3. Document patterns in contributing guide

### Phase 2: Gradual Migration of WIP Components
1. One component at a time from `wip/` folder
2. Refactor to match new architecture
3. Add comprehensive tests and stories
4. Move to main components folder when complete

### Phase 3: Advanced Patterns
1. Implement compound components pattern
2. Add theme variant system
3. Create component composition utilities
4. Build advanced animation/gesture patterns

## Example: Card Component Structure

Following Joy UI's pattern for complex components:

```
Card/
├── Card.tsx                 # Main container component
├── Card.types.ts           # All Card-related types
├── Card.styles.ts          # Styling logic
├── CardHeader.tsx          # Sub-component
├── CardContent.tsx         # Sub-component  
├── CardActions.tsx         # Sub-component
├── CardMedia.tsx           # Sub-component
├── Card.stories.tsx        # All Card stories
├── Card.test.tsx           # All Card tests
├── Card.utils.ts           # Shared utilities
└── index.ts                # Public exports
```

Usage would be similar to Joy UI:
```tsx
import { Card, CardHeader, CardContent, CardActions } from '@braingame/bgui';

<Card>
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardContent>
    <Text>Content goes here</Text>
  </CardContent>
  <CardActions>
    <Button>Action</Button>
  </CardActions>
</Card>
```

## Benefits of This Architecture

1. **Maintainability:** Clear file organization makes components easy to update
2. **Testability:** Separated concerns make testing more focused
3. **Type Safety:** Dedicated type files ensure comprehensive typing
4. **Developer Experience:** Predictable structure across all components
5. **Scalability:** Pattern works for simple and complex components
6. **Documentation:** Self-documenting through structure and types

## Conclusion

By adopting Joy UI's architectural patterns while adapting them for React Native, BGUI can achieve the same level of quality, maintainability, and developer experience. The key is maintaining consistency across all components while allowing flexibility for platform-specific needs.
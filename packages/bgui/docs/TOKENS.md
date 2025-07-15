# BGUI Token System

This document describes the design token system for Brain Game UI Kit (BGUI), providing consistent spacing, sizing, and other design values across the application.

## 1. Design Token Principles

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. They help maintain consistency and make it easier to update designs across the entire application.

## 2. Spacing Tokens

### Base Spacing Scale
Our spacing system is based on a 4px grid with semantic naming:

```typescript
export const Tokens = {
  xxxs: 2,   // Hairline spacing
  xxs: 4,    // Micro spacing
  xs: 8,     // Extra small
  s: 12,     // Small
  ms: 14,    // Medium-small
  m: 16,     // Medium (base unit)
  ml: 20,    // Medium-large
  l: 20,     // Large
  xl: 24,    // Extra large
  xxl: 32,   // Extra extra large
  xxxl: 48,  // Triple extra large
  xxxxl: 72, // Quad extra large
} as const;
```

### Semantic Spacing
More meaningful names for common spacing patterns:

```typescript
export const SemanticSpacing = {
  // Layout spacing
  layoutCompact: 8,    // Tight layouts
  layoutNormal: 16,    // Default spacing
  layoutComfy: 24,     // Comfortable spacing
  layoutSpacious: 32,  // Generous spacing
  layoutSection: 48,   // Between major sections
  
  // Component spacing
  componentPaddingS: 8,   // Small components
  componentPaddingM: 12,  // Medium components
  componentPaddingL: 16,  // Large components
  
  // Flex gaps
  gapXS: 4,   // Minimal gap
  gapS: 8,    // Small gap
  gapM: 12,   // Medium gap
  gapL: 16,   // Large gap
  gapXL: 24,  // Extra large gap
  
  // Inline spacing
  inlineXS: 2,  // Between inline elements
  inlineS: 4,   // Small inline gap
  inlineM: 8,   // Medium inline gap
} as const;
```

### Usage Examples
```typescript
// Basic usage
<View style={{ padding: Tokens.m }}>  // 16px
<View style={{ margin: Tokens.xl }}>  // 24px

// Semantic usage
<View style={{ padding: SemanticSpacing.layoutNormal }}>
<View style={{ gap: SemanticSpacing.gapM }}>
```

## 3. Border Radius Tokens

### Base Border Radius Scale
```typescript
export const BorderRadius = {
  none: 0,    // Square corners
  xs: 2,      // Subtle rounding
  sm: 4,      // Small radius
  md: 8,      // Medium radius
  lg: 12,     // Large radius
  xl: 16,     // Extra large radius
  xxl: 24,    // Double extra large
  full: 9999, // Full radius (circles)
} as const;
```

### Semantic Border Radius
Component-specific radius values aligned with Material 3:

```typescript
export const SemanticBorderRadius = {
  // Components
  button: 20,        // M3 button radius (pill shape)
  buttonSmall: 16,   // Small buttons
  buttonLarge: 24,   // Large buttons
  
  card: 12,          // M3 card radius
  cardSmall: 8,      // Compact cards
  cardLarge: 16,     // Prominent cards
  
  input: 4,          // Text field radius (top only for filled)
  chip: 8,           // Chip radius
  
  dialog: 28,        // M3 dialog radius
  sheet: 28,         // Bottom sheet radius
  
  // Special
  avatar: 9999,      // Full circle
  badge: 4,          // Small badges
  tooltip: 4,        // Tooltip radius
} as const;
```

## 4. Shadow Tokens

Material 3 elevation levels as shadow tokens:

```typescript
export const Shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xxl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 5.46,
    elevation: 12,
  },
} as const;
```

## 5. Z-Index Tokens

Layering system for consistent stacking:

```typescript
export const ZIndex = {
  base: 0,          // Base layer
  raised: 10,       // Slightly raised
  dropdown: 100,    // Dropdowns
  sticky: 200,      // Sticky elements
  fixed: 300,       // Fixed headers
  modalBackdrop: 400, // Modal overlay
  modal: 500,       // Modal content
  popover: 600,     // Popovers, tooltips
  notification: 700, // Toasts, snackbars
  max: 9999,        // Maximum z-index
} as const;
```

## 6. Token Utilities

### Platform-Specific Tokens
Different values for different platforms:

```typescript
import { Platform } from 'react-native';

export const getPlatformToken = <T>(tokens: {
  default: T;
  ios?: T;
  android?: T;
  web?: T;
}) => {
  switch (Platform.OS) {
    case 'ios':
      return tokens.ios ?? tokens.default;
    case 'android':
      return tokens.android ?? tokens.default;
    case 'web':
      return tokens.web ?? tokens.default;
    default:
      return tokens.default;
  }
};

// Usage
const spacing = getPlatformToken({
  default: 16,
  ios: 20,      // Larger on iOS
  android: 16,  // Default on Android
  web: 24,      // Even larger on web
});
```

### Responsive Spacing
Scale spacing based on screen size:

```typescript
export const getResponsiveSpacing = (
  token: keyof typeof Tokens,
  screenWidth: number
): number => {
  const baseValue = Tokens[token];
  
  if (screenWidth < 360) {
    return Math.round(baseValue * 0.875); // 87.5% for small screens
  } else if (screenWidth > 768) {
    return Math.round(baseValue * 1.25); // 125% for tablets
  }
  
  return baseValue;
};
```

### Token Composition
Combine tokens for complex styles:

```typescript
export const createSpacingStyle = (
  padding?: keyof typeof Tokens,
  margin?: keyof typeof Tokens
) => ({
  ...(padding && { padding: Tokens[padding] }),
  ...(margin && { margin: Tokens[margin] }),
});

// Usage
const containerStyle = createSpacingStyle('m', 'xl');
// Result: { padding: 16, margin: 24 }
```

## 7. TypeScript Support

All tokens are fully typed for safety:

```typescript
// Token types
export type SpacingToken = keyof typeof Tokens;
export type BorderRadiusToken = keyof typeof BorderRadius;
export type ShadowToken = keyof typeof Shadows;
export type ZIndexToken = keyof typeof ZIndex;

// Type-safe token usage
interface BoxProps {
  spacing?: SpacingToken;
  radius?: BorderRadiusToken;
  shadow?: ShadowToken;
}

function Box({ spacing = 'm', radius = 'md', shadow = 'none' }: BoxProps) {
  return (
    <View style={{
      padding: Tokens[spacing],
      borderRadius: BorderRadius[radius],
      ...Shadows[shadow],
    }} />
  );
}
```

## 8. Best Practices

### Do's
- ✅ Always use tokens instead of hardcoded values
- ✅ Use semantic tokens when available (e.g., `SemanticSpacing.layoutNormal`)
- ✅ Compose tokens using utilities for consistency
- ✅ Consider platform differences using `getPlatformToken`
- ✅ Use TypeScript types for compile-time safety

### Don'ts
- ❌ Don't hardcode pixel values
- ❌ Don't create one-off spacing values
- ❌ Don't mix token systems (stick to one scale)
- ❌ Don't override token values locally
- ❌ Don't use magic numbers

## 9. Migration Guide

### From Hardcoded Values
```typescript
// Before
<View style={{ padding: 16, margin: 24, borderRadius: 8 }}>

// After
<View style={{ 
  padding: Tokens.m,
  margin: Tokens.xl,
  borderRadius: BorderRadius.md
}}>
```

### From Inline Styles to Semantic Tokens
```typescript
// Before
<View style={{ padding: 12, gap: 12 }}>

// After
<View style={{ 
  padding: SemanticSpacing.componentPaddingM,
  gap: SemanticSpacing.gapM
}}>
```

## 10. Token Reference Sheet

### Quick Reference
```
Spacing:
- xxxs: 2px   (hairline)
- xxs:  4px   (micro)
- xs:   8px   (extra small)
- s:    12px  (small)
- m:    16px  (medium/base)
- l:    20px  (large)
- xl:   24px  (extra large)
- xxl:  32px  (double extra)
- xxxl: 48px  (triple extra)

Border Radius:
- none: 0px    (square)
- xs:   2px    (subtle)
- sm:   4px    (small)
- md:   8px    (medium)
- lg:   12px   (large)
- xl:   16px   (extra large)
- full: 9999px (circle)

Shadows:
- none: elevation 0
- sm:   elevation 1
- md:   elevation 3
- lg:   elevation 6
- xl:   elevation 8
- xxl:  elevation 12
```
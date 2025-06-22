# Improved Token System Documentation

This document describes the enhanced token system for Brain Game, providing better TypeScript support, semantic naming, composition utilities, and improved developer experience.

## Overview

The improved token system includes:

1. **Enhanced TypeScript Support** - Strict types for all token categories
2. **Semantic Tokens** - Meaningful names for common patterns
3. **Token Utilities** - Helper functions for token manipulation
4. **Platform-Specific Tokens** - Different values for iOS, Android, and Web
5. **Token Composition** - Combine tokens for complex styles
6. **Responsive Tokens** - Dynamic values based on screen size

## Core Token Categories

### Spacing Tokens (`Tokens`)
Base spacing scale from `xxxs` (2px) to `xxxxl` (72px):

```typescript
import { Tokens } from "@braingame/utils";

// Basic usage
<View style={{ padding: Tokens.m }}>  // 16px
<View style={{ margin: Tokens.xl }}>  // 24px
```

### Semantic Spacing
More meaningful names for common spacing patterns:

```typescript
import { SemanticSpacing } from "@braingame/utils";

// Layout spacing
<View style={{ padding: SemanticSpacing.layoutNormal }}>  // 16px
<View style={{ marginBottom: SemanticSpacing.layoutSection }}>  // 48px

// Component spacing
<Button style={{ padding: SemanticSpacing.componentPaddingM }}>  // 12px

// Flex gaps
<View style={{ gap: SemanticSpacing.gapM }}>  // 12px
```

### Color Tokens
Theme-aware colors with light/dark variants:

```typescript
import { Colors } from "@braingame/utils";
import { useColorScheme } from "react-native";

const scheme = useColorScheme();
const colors = Colors[scheme ?? "light"];

<Text style={{ color: colors.text }}>
<View style={{ backgroundColor: colors.card }}>
```

### Typography Tokens
Comprehensive type system with semantic scales:

```typescript
import { Typography, SemanticTypography } from "@braingame/utils";

// Using base tokens
<Text style={{
  fontSize: Typography.fontSize.lg,
  fontWeight: Typography.fontWeight.semibold,
  lineHeight: Typography.lineHeight.tight
}}>

// Using semantic typography
<Text style={SemanticTypography.h1}>  // Large heading
<Text style={SemanticTypography.bodyNormal}>  // Body text
<Text style={SemanticTypography.caption}>  // Small text
```

### Border Radius Tokens
Consistent rounded corners with semantic names:

```typescript
import { BorderRadius, SemanticBorderRadius } from "@braingame/utils";

// Base tokens
<View style={{ borderRadius: BorderRadius.md }}>  // 8px

// Semantic tokens
<TextInput style={{ borderRadius: SemanticBorderRadius.input }}>  // 4px
<Button style={{ borderRadius: SemanticBorderRadius.button }}>  // 6px
<Avatar style={{ borderRadius: SemanticBorderRadius.avatar }}>  // Full circle
```

### Animation Tokens
Consistent motion design:

```typescript
import { Animation, SemanticAnimation } from "@braingame/utils";

// Base animation
Animated.timing(animatedValue, {
  duration: Animation.duration.normal,  // 200ms
  easing: Animation.easing.smooth,
}).start();

// Semantic animation
Animated.timing(opacity, {
  duration: SemanticAnimation.hover,  // 150ms
  easing: SemanticAnimation.interaction,  // Smooth curve
}).start();
```

## Token Utilities

### Platform-Specific Tokens

```typescript
import { getPlatformToken } from "@braingame/utils";

const spacing = getPlatformToken({
  default: 16,
  ios: 20,      // Larger on iOS
  android: 16,   // Default on Android
  web: 24,      // Even larger on web
});
```

### Responsive Spacing

```typescript
import { getResponsiveSpacing } from "@braingame/utils";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const padding = getResponsiveSpacing("m", width);  // Scales with screen size
```

### Color Manipulation

```typescript
import { getColorWithOpacity, createColorPalette } from "@braingame/utils";

// Add opacity to any color
const fadedPrimary = getColorWithOpacity(Colors.universal.primary, 0.5);

// Generate color palette
const primaryPalette = createColorPalette(Colors.universal.primary);
// Returns: { 50, 100, 200, ..., 900 } with different opacities
```

### Shadow Composition

```typescript
import { combineShadows } from "@braingame/utils";

// Combine multiple shadows
const complexShadow = combineShadows("md", "lg");
<View style={complexShadow}>
```

### Animation Helpers

```typescript
import { createAnimation } from "@braingame/utils";

const slideIn = createAnimation("normal", "easeOut");
// Returns: { duration: 200, easing: "ease-out" }
```

### Typography Helpers

```typescript
import { getClampedFontSize, getResponsiveTypography } from "@braingame/utils";

// Clamp font size between min and max
const fontSize = getClampedFontSize("3xl", "base", "5xl");

// Responsive typography
const { fontSize, lineHeight } = getResponsiveTypography("lg", screenWidth);
```

## TypeScript Support

All tokens are fully typed:

```typescript
import type { 
  SpacingToken,
  ColorToken,
  Theme,
  SemanticIntent,
  PlatformTokens 
} from "@braingame/utils";

// Type-safe token usage
function Button({ spacing }: { spacing: SpacingToken }) {
  return <View style={{ padding: Tokens[spacing] }}>
}

// Type-safe theme
const theme: Theme = {
  spacing: Tokens,
  colors: Colors,
  // ...
};
```

## Token Validation

Runtime validation helpers:

```typescript
import { TokenValidation } from "@braingame/utils";

// Validate spacing token
if (TokenValidation.isValidSpacing(value)) {
  // value is typed as SpacingToken
}

// Validate color
if (TokenValidation.isValidColor("#3B73F5")) {
  // Valid hex color
}

// Validate opacity
if (TokenValidation.isValidOpacity(0.5)) {
  // Valid opacity value
}
```

## Best Practices

1. **Use Semantic Tokens First**: Prefer `SemanticSpacing.layoutNormal` over `Tokens.m`
2. **Compose Tokens**: Use utilities to create variations rather than hardcoding
3. **Platform Awareness**: Use `getPlatformToken` for platform-specific designs
4. **Type Safety**: Leverage TypeScript types for compile-time safety
5. **Consistency**: Always use tokens instead of hardcoded values

## Migration Guide

From old system:
```typescript
// Before
<View style={{ padding: 16, borderRadius: 8 }}>
<Text style={{ fontSize: 24, fontWeight: "600" }}>

// After
<View style={{ 
  padding: Tokens.m, 
  borderRadius: BorderRadius.md 
}}>
<Text style={{
  fontSize: Typography.fontSize["2xl"],
  fontWeight: Typography.fontWeight.semibold
}}>
```

## Debug Tools

```typescript
import { logTokens } from "@braingame/utils";

// Log all tokens in development
logTokens();  // Outputs formatted token values to console
```
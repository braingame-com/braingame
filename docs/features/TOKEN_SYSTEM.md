# Token System

Type-safe design tokens for consistent styling across Brain Game.

## Token Categories

### Spacing
```typescript
import { tokens } from '@braingame/bgui';

// Base spacing scale
tokens.spacing.xs    // 4px
tokens.spacing.sm    // 8px
tokens.spacing.md    // 16px
tokens.spacing.lg    // 24px
tokens.spacing.xl    // 32px

// Semantic spacing
tokens.spacing.component.padding   // 16px
tokens.spacing.layout.margin      // 24px
tokens.spacing.content.gap        // 12px
```

### Colors
```typescript
// Brand colors
tokens.colors.brand.primary       // #007AFF
tokens.colors.brand.secondary     // #34C759
tokens.colors.brand.accent        // #FF9500

// Semantic colors
tokens.colors.semantic.success    // #34C759
tokens.colors.semantic.error      // #FF3B30
tokens.colors.semantic.warning    // #FF9500
tokens.colors.semantic.info       // #007AFF

// Text colors
tokens.colors.text.primary        // #000000
tokens.colors.text.secondary      // #6B7280
tokens.colors.text.disabled       // #9CA3AF
```

### Typography
```typescript
// Font sizes
tokens.typography.size.xs         // 12px
tokens.typography.size.sm         // 14px
tokens.typography.size.md         // 16px
tokens.typography.size.lg         // 18px
tokens.typography.size.xl         // 24px

// Font weights
tokens.typography.weight.regular  // 400
tokens.typography.weight.medium   // 500
tokens.typography.weight.bold     // 700
```

## Token Utilities

### Platform-Specific Tokens
```typescript
// Automatically adapts to platform
const spacing = tokens.platform.spacing.md;
// iOS: 16, Android: 16, Web: 1rem
```

### Color Manipulation
```typescript
import { withOpacity, lighten, darken } from '@braingame/bgui/tokens';

// Add opacity
const semiTransparent = withOpacity(tokens.colors.brand.primary, 0.5);

// Lighten/darken
const lighter = lighten(tokens.colors.brand.primary, 0.2);
const darker = darken(tokens.colors.brand.primary, 0.1);
```

### Responsive Spacing
```typescript
// Breakpoint-aware spacing
const spacing = tokens.responsive.spacing({
  mobile: tokens.spacing.sm,
  tablet: tokens.spacing.md,
  desktop: tokens.spacing.lg
});
```

## TypeScript Support

### Type Definitions
```typescript
// All tokens are strongly typed
type SpacingToken = keyof typeof tokens.spacing;
type ColorToken = keyof typeof tokens.colors;

// IDE autocomplete available
const padding: SpacingToken = 'md'; // ✓ Valid
const color: ColorToken = 'invalid'; // ✗ TypeScript error
```

### Component Usage
```typescript
interface ButtonProps {
  size?: SpacingToken;
  color?: ColorToken;
}

const Button: React.FC<ButtonProps> = ({ size = 'md', color = 'primary' }) => (
  <Pressable
    style={{
      padding: tokens.spacing[size],
      backgroundColor: tokens.colors.brand[color]
    }}
  />
);
```

## Best Practices

### Do
```typescript
// Use semantic tokens
backgroundColor: tokens.colors.semantic.success

// Combine related tokens
padding: tokens.spacing.component.padding
margin: tokens.spacing.layout.margin

// Use type-safe references
fontSize: tokens.typography.size.lg
```

### Don't
```typescript
// Hardcode values
backgroundColor: '#34C759'
padding: 16

// Use non-semantic tokens for semantic purposes
backgroundColor: tokens.colors.brand.secondary // for success state
```

## Migration Guide

### From Hardcoded Values
```typescript
// Before
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8
  }
});

// After
const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing.component.padding,
    backgroundColor: tokens.colors.brand.primary,
    borderRadius: tokens.borderRadius.md
  }
});
```

## Debug Tools

### Token Inspector
```typescript
import { inspectTokens } from '@braingame/bgui/debug';

// Development only
if (__DEV__) {
  inspectTokens(); // Logs all available tokens
}
```

### Validation
```typescript
import { validateTokens } from '@braingame/bgui/tokens';

// Runtime validation
const isValid = validateTokens({
  spacing: 'md',     // ✓ Valid
  color: 'invalid'   // ✗ Invalid
});
```
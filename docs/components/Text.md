# Text

> **The foundational typography component for all text content in Brain Game applications.**

![Component](https://img.shields.io/badge/component-Text-brightgreen?style=flat-square)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=flat-square)
![Accessibility](https://img.shields.io/badge/accessibility-AAA-brightgreen?style=flat-square)

## Overview

The Text component is the core typography primitive that ensures consistent text rendering across all platforms. It handles font scaling, line height, color theming, and accessibility features automatically. All text in Brain Game applications should use this component rather than raw text elements.

## Usage

```tsx
import { Text } from '@braingame/bgui';

// Basic usage
<Text>Hello, Brain Game!</Text>

// With variant
<Text variant="h1">Welcome Back</Text>

// With custom styling
<Text 
  variant="body"
  color="primary"
  align="center"
>
  Your journey continues here
</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The text content to display |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'body' \| 'caption' \| 'label'` | `'body'` | Typography variant determining size and weight |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| string` | `'primary'` | Text color from theme or custom color |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | variant default | Font weight override |
| `size` | `number` | variant default | Font size override in pixels |
| `lineHeight` | `number` | variant default | Line height multiplier |
| `numberOfLines` | `number` | - | Maximum number of lines before truncation |
| `selectable` | `boolean` | `false` | Whether text can be selected by user |
| `testID` | `string` | - | Test identifier for e2e testing |

## Examples

### Headings
```tsx
<Text variant="h1">Main Heading</Text>
<Text variant="h2">Section Title</Text>
<Text variant="h3">Subsection</Text>
<Text variant="h4">Minor Heading</Text>
```

### Body Text
```tsx
<Text variant="body">
  This is the standard body text used throughout the application.
  It provides optimal readability across all devices.
</Text>
```

### Colored Text
```tsx
<Text color="success">✓ Changes saved</Text>
<Text color="error">! Invalid input</Text>
<Text color="warning">⚠ Connection unstable</Text>
<Text color="#7C3AED">Custom brand color</Text>
```

### Truncated Text
```tsx
<Text numberOfLines={2}>
  This very long text will be truncated after two lines with an ellipsis
  to prevent layout overflow in constrained spaces...
</Text>
```

### Centered Caption
```tsx
<Text 
  variant="caption"
  align="center"
  color="secondary"
>
  Last updated 5 minutes ago
</Text>
```

## Accessibility

- **Screen Readers**: All text is automatically accessible to screen readers
- **Font Scaling**: Respects system font size preferences for accessibility
- **Color Contrast**: All color combinations meet WCAG AAA standards
- **Semantic HTML**: Renders appropriate HTML tags based on variant (h1-h4 for headings)
- **Language Support**: Properly handles RTL languages and special characters

## Best Practices

### DO:
- Use semantic variants (h1, h2, etc.) for proper document structure
- Use theme colors for consistency across the app
- Set `numberOfLines` for text in space-constrained layouts
- Use the `label` variant for form field labels

### DON'T:
- Don't nest Text components (it causes rendering issues)
- Don't use inline styles - use variants and props instead
- Don't hardcode colors - use theme colors or design tokens
- Don't use for non-text content (use View for containers)

## Performance

The Text component is optimized with:
- Minimal re-renders through style memoization
- Efficient font loading with system font fallbacks
- Platform-specific optimizations for text rendering
- Automatic text measurement caching

## Variants

| Variant | Font Size | Font Weight | Line Height | Use Case |
|---------|-----------|-------------|-------------|----------|
| `h1` | 48px | Bold | 1.2 | Page titles |
| `h2` | 36px | Bold | 1.3 | Section headers |
| `h3` | 24px | Semibold | 1.4 | Subsections |
| `h4` | 20px | Semibold | 1.4 | Card titles |
| `body` | 16px | Normal | 1.5 | Standard content |
| `caption` | 14px | Normal | 1.4 | Supporting text |
| `label` | 12px | Medium | 1.3 | Form labels |

## Theming

The Text component automatically responds to theme changes:
- Uses theme colors when color prop matches theme color names
- Adapts to dark/light mode automatically
- Inherits font family from theme configuration

## Related Components

- [`Button`](./Button.md) - Uses Text internally for button labels
- [`Label`](./Label.md) - Specialized Text for form fields
- [`Link`](./Link.md) - Text with navigation behavior
- [`View`](./View.md) - For layout and non-text content
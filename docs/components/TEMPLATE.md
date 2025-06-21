# Component Name

> **Brief, impactful description of what this component does.**

![Component](https://img.shields.io/badge/component-ComponentName-brightgreen?style=flat-square)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=flat-square)
![Accessibility](https://img.shields.io/badge/accessibility-AA-green?style=flat-square)

## Overview

A paragraph explaining the component's purpose, key features, and when to use it. Include any important technical details or architectural decisions.

## Usage

```tsx
import { ComponentName } from '@braingame/bgui';

// Basic usage
<ComponentName prop="value">
  Content
</ComponentName>

// Common patterns
<ComponentName 
  prop1="value1"
  prop2="value2"
  onEvent={handleEvent}
>
  Content
</ComponentName>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop1` | `type` | `default` | Clear description of what this prop does |
| `prop2` | `type` | **required** | Required props are bold |
| `prop3` | `type` | - | Optional props show dash for no default |

## Examples

### Example 1: Common Use Case
```tsx
<ComponentName 
  prop="value"
  onEvent={handleEvent}
>
  Example content
</ComponentName>
```

### Example 2: Advanced Use Case
```tsx
<ComponentName 
  prop1="value1"
  prop2="value2"
  customProp={customValue}
>
  Advanced example
</ComponentName>
```

## Accessibility

- **Keyboard Navigation**: Describe keyboard support
- **Screen Readers**: How screen readers interact
- **Focus Management**: Focus behavior
- **ARIA Attributes**: Which ARIA attributes are used
- **Color Contrast**: Contrast compliance level

## Best Practices

### DO:
- Best practice 1
- Best practice 2
- Best practice 3

### DON'T:
- Anti-pattern 1
- Anti-pattern 2
- Anti-pattern 3

## Performance

Describe any performance optimizations:
- Memoization strategies
- Lazy loading features
- Bundle size considerations
- Render optimization

## Variants/States (if applicable)

Describe different variants or states the component can have.

## Theming

How the component interacts with the theme system.

## Related Components

- [`RelatedComponent1`](./RelatedComponent1.md) - How it relates
- [`RelatedComponent2`](./RelatedComponent2.md) - How it relates

## Migration Guide (if applicable)

If this component replaces an older one, provide migration instructions.
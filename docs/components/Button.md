# Button

> **The primary interactive element for user actions across the Brain Game platform.**

![Component](https://img.shields.io/badge/component-Button-brightgreen?style=flat-square)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=flat-square)
![Accessibility](https://img.shields.io/badge/accessibility-AA-green?style=flat-square)

## Overview

The Button component is a flexible, accessible button implementation that supports multiple variants, sizes, and states. It's built with performance and accessibility in mind, featuring proper ARIA attributes and keyboard navigation support.

## Usage

```tsx
import { Button } from '@braingame/bgui';

// Basic usage
<Button onPress={() => console.log('Pressed!')}>
  Click me
</Button>

// With icon
<Button 
  icon="check" 
  onPress={handleSubmit}
>
  Submit
</Button>

// Different variants
<Button variant="secondary" onPress={handleCancel}>
  Cancel
</Button>

// Disabled state
<Button disabled onPress={handleAction}>
  Not Available
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | - | The button text content |
| `onPress` | `() => void` | **required** | Handler called when button is pressed |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `icon` | `string` | - | Icon name from the icon set |
| `iconColor` | `string` | - | Custom icon color (defaults to text color) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of icon relative to text |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Shows loading spinner instead of content |
| `fullWidth` | `boolean` | `false` | Makes button take full container width |
| `testID` | `string` | - | Test identifier for e2e testing |

## Examples

### Primary Actions
```tsx
<Button 
  onPress={handleSave}
  icon="save"
>
  Save Changes
</Button>
```

### Secondary Actions
```tsx
<Button 
  variant="secondary"
  onPress={handleCancel}
>
  Cancel
</Button>
```

### Danger Actions
```tsx
<Button 
  variant="danger"
  onPress={handleDelete}
  icon="trash"
>
  Delete Account
</Button>
```

### Loading State
```tsx
<Button 
  loading
  onPress={handleSubmit}
>
  Submitting...
</Button>
```

### Full Width
```tsx
<Button 
  fullWidth
  onPress={handleContinue}
>
  Continue to Next Step
</Button>
```

## Accessibility

- **Keyboard Navigation**: Fully keyboard accessible with Enter/Space activation
- **Screen Readers**: Proper labels and states announced
- **Focus Management**: Clear focus indicators for keyboard users
- **ARIA Attributes**: Includes `aria-label`, `aria-pressed`, and `aria-disabled`
- **Color Contrast**: All variants meet WCAG AA standards

## Best Practices

### DO:
- Use descriptive, action-oriented text ("Save Changes" not just "Save")
- Choose the appropriate variant for the action importance
- Provide feedback for async actions using the loading state
- Use icons to reinforce the action meaning

### DON'T:
- Don't use more than one primary button per screen section
- Don't disable buttons without clear indication why
- Don't use buttons for navigation (use Link component instead)
- Don't make buttons too small on mobile (minimum 44x44 touch target)

## Performance

The Button component is optimized with:
- `React.memo` to prevent unnecessary re-renders
- `useCallback` for event handler stability
- Efficient style computation with memoization
- Lazy-loaded icons to reduce bundle size

## Related Components

- [`Link`](./Link.md) - For navigation actions
- [`IconButton`](./IconButton.md) - For icon-only actions
- [`ActionList`](./ActionList.md) - For lists of actions
- [`Menu`](./Menu.md) - For dropdown action menus


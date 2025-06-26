# Component Template

Standardized template for documenting BGUI components.

## Structure

```markdown
# ComponentName

Brief description of the component's purpose.

## Usage

Basic usage example:
```typescript
import { ComponentName } from '@braingame/bgui';

<ComponentName prop="value" />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prop | string | Yes | - | Prop description |
| variant | 'primary' \| 'secondary' | No | 'primary' | Visual variant |

## Examples

### Basic Example
```typescript
<ComponentName prop="basic" />
```

### Advanced Example
```typescript
<ComponentName
  prop="advanced"
  variant="secondary"
  onAction={handleAction}
/>
```

## Accessibility

- ARIA attributes used
- Keyboard navigation support
- Screen reader compatible
- Focus management

## Best Practices

### Do
- Follow design system tokens
- Include proper accessibility attributes
- Use semantic HTML elements

### Don't
- Hardcode styles
- Skip accessibility considerations
- Override component internals

## Related Components

- [RelatedComponent](./RelatedComponent.md)
- [AnotherComponent](./AnotherComponent.md)
```

## Documentation Guidelines

### Required Sections
- **Usage**: Basic import and usage
- **Props**: Complete prop table
- **Examples**: At least 2 examples
- **Accessibility**: A11y considerations

### Optional Sections
- **Best Practices**: DO/DON'T guidelines
- **Performance**: Optimization notes
- **Related Components**: Cross-references

### Style Guide
- Use TypeScript in all examples
- Include import statements
- Show realistic prop values
- Provide context for usage
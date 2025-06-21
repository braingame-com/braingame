# Button

The primary action component. Buttons use `Colors.universal.primary` and spacing
values from `Tokens` to ensure consistent styling across the app.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `onPress` | `() => void` | required |
| `icon?` | `string` | – |
| `iconPosition?` | `'left' \| 'right'` | `'left'` |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `fullWidth?` | `boolean` | `false` |
| `disabled?` | `boolean` | `false` |
| `loading?` | `boolean` | `false` |
| `aria-label?` | `string` | – |
| `aria-describedby?` | `string` | – |

## Usage

```tsx
import { Button } from '@braingame/bgui';
import { Tokens } from '@braingame/utils';

export function SaveButton() {
  return (
    <Button
      variant="primary"
      onPress={() => console.log('save')}
      style={{ paddingHorizontal: Tokens.xl }}
    >
      Save
    </Button>
  );
}
```


# Icon

Displays a vector icon from the FontAwesome set. Sizes map to `Tokens` values so
icons scale consistently with text.

| Prop | Type | Default |
| --- | --- | --- |
| `name` | `string` | required |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `color?` | `ThemeColor` | theme value |
| `variant?` | `'solid' \| 'regular' \| 'brand'` | `'regular'` |
| `decorative?` | `boolean` | `false` |
| `aria-label?` | `string` | – |

## Usage

```tsx
import { Icon } from '@braingame/bgui';
import { Tokens } from '@braingame/utils';

<Icon name="heart" size="lg" color="primary" style={{ margin: Tokens.s }} />;
```


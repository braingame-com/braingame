# Text

Typography primitive that uses the `Typography.fontSize` scale and theme colors.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `color?` | `ThemeColor` | `text` |
| `align?` | `'left' \| 'center' \| 'right'` | `'left'` |
| `numberOfLines?` | `number` | – |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'body' \| 'caption'` | `'body'` |
| `...RNTextProps` | `React Native TextProps` | – |

## Usage

```tsx
import { Text } from '@braingame/bgui';

<Text variant="h1" color="primary">Welcome</Text>;
```


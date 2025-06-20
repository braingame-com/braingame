# Link

Navigation element for internal and external destinations.

| Prop | Type | Default |
| --- | --- | --- |
| `href?` | `string` | – |
| `onPress?` | `() => void` | – |
| `external?` | `boolean` | `false` |
| `disabled?` | `boolean` | `false` |
| `aria-label?` | `string` | – |
| `children` | `ReactNode` | required |

## Usage

```tsx
import { Link } from '@braingame/bgui';

<Link href="/settings" aria-label="settings">
  Settings
</Link>;
```


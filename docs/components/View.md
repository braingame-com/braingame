# View

Container element styled with `Colors.background`, `Colors.card`, and spacing
tokens. Useful for layout primitives on both web and native.

| Prop | Type | Default |
| --- | --- | --- |
| `type` | `'background' \| 'card' \| 'surface' \| 'mini-card'` | `'background'` |
| `transparent?` | `boolean` | – |
| `rounded?` | `boolean` | – |
| `border?` | `boolean` | – |
| `hoverable?` | `boolean` | – |
| `grabbable?` | `boolean` | – |
| `...RNViewProps` | `React Native ViewProps` | – |

## Usage

```tsx
import { View } from '@braingame/bgui';
import { Colors } from '@braingame/utils';

<View type="card" style={{ backgroundColor: Colors.card }} />;
```


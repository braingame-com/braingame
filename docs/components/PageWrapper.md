# PageWrapper

Provides consistent page margins and scrolling behavior. Wrap your screens with
this component rather than using raw `View` elements.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |

## Usage

```tsx
import { PageWrapper } from '@braingame/bgui';

export default function ProfileScreen() {
  return (
    <PageWrapper>
      {/* page content */}
    </PageWrapper>
  );
}
```


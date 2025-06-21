# ErrorBoundary

Catches runtime errors in descendant components and displays a fallback UI. No design tokens are required but it follows the same accessibility practices as the rest of the library.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `fallback` | `ReactNode` | – |
| `onError` | `(error: Error, info: ErrorInfo) => void` | – |
| `resetOnPropsChange?` | `boolean` | – |
| `resetKeys?` | `Array<string | number>` | – |
| `isolate?` | `boolean` | – |

## Usage

```tsx
import { ErrorBoundary } from '@braingame/bgui';

<ErrorBoundary fallback={<Text>Something went wrong</Text>}>
  <ProfileForm />
</ErrorBoundary>;
```

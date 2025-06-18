# ErrorBoundary

```tsx
import { ErrorBoundary, Button } from '@brain-game/bgui';

function BuggyComponent() {
  throw new Error('Boom');
}

export default function ErrorBoundaryExample() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

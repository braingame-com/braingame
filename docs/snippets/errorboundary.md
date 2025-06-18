# ErrorBoundary Usage

```tsx
import { ErrorBoundary, Text } from '@brain-game/bgui';

function ProblemChild() {
  throw new Error('boom');
}

export function ErrorBoundaryExample() {
  return (
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
}
```

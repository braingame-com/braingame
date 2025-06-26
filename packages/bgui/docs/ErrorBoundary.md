# Error Boundary Implementation

Comprehensive error handling across Brain Game.

## Error Boundary Levels

### App Level
```typescript
// Catches all unhandled errors
<AppErrorBoundary>
  <App />
</AppErrorBoundary>
```

### Screen Level
```typescript
// Isolates screen-specific errors
<ScreenErrorBoundary>
  <ProfileScreen />
</ScreenErrorBoundary>
```

### Component Level
```typescript
// Protects individual components
<ComponentErrorBoundary>
  <UserAvatar />
</ComponentErrorBoundary>
```

## Implementation Patterns

### Basic Error Boundary
```typescript
import { ErrorBoundary } from '@braingame/bgui';

<ErrorBoundary
  fallback={ErrorFallback}
  onError={(error, errorInfo) => {
    logError(error, errorInfo);
  }}
>
  <RiskyComponent />
</ErrorBoundary>
```

### Async Error Boundary
```typescript
// For async operations
<AsyncBoundary>
  <DataFetcher />
</AsyncBoundary>
```

### Network-Aware Boundary
```typescript
// Handles network-specific errors
<NetworkBoundary>
  <ApiComponent />
</NetworkBoundary>
```

## Error Fallback Components

### Generic Fallback
```typescript
const ErrorFallback = ({ error, retry }: ErrorFallbackProps) => (
  <View>
    <Text variant="title">Something went wrong</Text>
    <Text>{error.message}</Text>
    <Button onPress={retry}>Try Again</Button>
  </View>
);
```

### Network Error Fallback
```typescript
const NetworkErrorFallback = ({ retry }: ErrorFallbackProps) => (
  <View>
    <Icon name="wifi-off" />
    <Text>Connection lost</Text>
    <Button onPress={retry}>Retry</Button>
  </View>
);
```

### Component Error Fallback
```typescript
const ComponentErrorFallback = () => (
  <View>
    <Text>Unable to load component</Text>
  </View>
);
```

## Migration Checklist

### Phase 1: App Level
- [ ] Wrap root app with AppErrorBoundary
- [ ] Implement global error logging
- [ ] Add crash reporting integration

### Phase 2: Screen Level
- [ ] Add ScreenErrorBoundary to all screens
- [ ] Implement screen-specific fallbacks
- [ ] Add retry mechanisms

### Phase 3: Component Level
- [ ] Identify risky components
- [ ] Add targeted error boundaries
- [ ] Implement graceful degradation

## Testing Strategies

### Manual Testing
```typescript
// Throw error in component
const BuggyComponent = () => {
  throw new Error('Test error');
  return <Text>Never rendered</Text>;
};
```

### Unit Testing
```typescript
it('catches and displays error', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };
  
  render(
    <ErrorBoundary fallback={ErrorFallback}>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Something went wrong')).toBeVisible();
});
```

### E2E Testing
```javascript
// Test error boundary in real scenarios
test('handles API errors gracefully', async () => {
  await mockApiError();
  await element(by.id('refresh-button')).tap();
  await expect(element(by.text('Try Again'))).toBeVisible();
});
```

## Best Practices

### Do
- **Wrap risky components** with boundaries
- **Provide meaningful fallbacks** with recovery options
- **Log errors** for debugging and monitoring
- **Test error scenarios** regularly

### Don't
- **Catch all errors globally** - Use targeted boundaries
- **Show technical details** to users
- **Ignore error boundaries** in testing
- **Make fallbacks worse** than the error itself

## Error Logging

### Production Logging
```typescript
const logError = (error: Error, errorInfo: ErrorInfo) => {
  if (__DEV__) {
    console.error('Error caught by boundary:', error, errorInfo);
  } else {
    Sentry.captureException(error, {
      contexts: { errorBoundary: errorInfo }
    });
  }
};
```

### Error Context
```typescript
// Add context to errors
<ErrorBoundary
  onError={(error, errorInfo) => {
    logError(error, {
      ...errorInfo,
      screen: currentScreen,
      user: userId,
      timestamp: Date.now()
    });
  }}
>
```

## Recovery Strategies

### Automatic Retry
```typescript
const [retryCount, setRetryCount] = useState(0);

const handleError = () => {
  if (retryCount < 3) {
    setTimeout(() => {
      setRetryCount(retryCount + 1);
      retry();
    }, 1000 * retryCount);
  }
};
```

### Graceful Degradation
```typescript
// Show simplified version if main component fails
<ErrorBoundary fallback={SimplifiedComponent}>
  <ComplexComponent />
</ErrorBoundary>
```

### User-Initiated Recovery
```typescript
// Let users retry manually
const ErrorFallback = ({ retry }) => (
  <View>
    <Text>Something went wrong</Text>
    <Button onPress={retry}>Try Again</Button>
    <Button onPress={goHome}>Go Home</Button>
  </View>
);
```
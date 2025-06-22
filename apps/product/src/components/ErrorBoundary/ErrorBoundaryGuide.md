# Error Boundary Implementation Guide

This guide provides comprehensive instructions for implementing error boundaries consistently across the Brain Game application.

## Quick Start

### 1. Wrapping Screens

All screens should be wrapped with error boundaries. Use the `withScreenErrorBoundary` HOC:

```tsx
import { withScreenErrorBoundary } from '@/components/ErrorBoundary';

const LoginScreen = () => {
  // screen implementation
};

export default withScreenErrorBoundary(LoginScreen, 'LoginScreen');
```

### 2. Wrapping Components

For individual components that might fail:

```tsx
import { withErrorBoundary } from '@/components/ErrorBoundary';

const VideoPlayer = withErrorBoundary(VideoPlayerComponent, {
  level: 'component',
  isolate: true,
  fallback: <VideoErrorFallback />,
});
```

### 3. Async Operations

Replace try-catch blocks with AsyncBoundary:

```tsx
import { AsyncBoundary } from '@/components/ErrorBoundary';

// Before:
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api.getData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

// After:
<AsyncBoundary
  asyncFn={() => api.getData()}
  loadingFallback={<LoadingSpinner />}
  errorFallback={(error, retry) => (
    <ErrorCard error={error} onRetry={retry} />
  )}
>
  {(data) => <DataView data={data} />}
</AsyncBoundary>
```

## Error Boundary Levels

### 1. App Level
- Catches critical errors that crash the entire app
- Shows full-screen error UI
- Allows app restart

### 2. Screen Level
- Catches errors within a screen
- Shows screen-specific error UI
- Allows navigation back or retry

### 3. Component Level
- Catches errors in individual components
- Shows inline error UI
- Isolates error to prevent screen crash

## Implementation Patterns

### Pattern 1: Screen with Error Boundary

```tsx
// screens/ProfileScreen.tsx
import { withScreenErrorBoundary } from '@/components/ErrorBoundary';
import { useProfile } from '@/hooks/useProfile';

const ProfileScreen = () => {
  const { profile, loading, error } = useProfile();
  
  if (loading) return <ProfileSkeleton />;
  if (error) throw error; // Let error boundary handle it
  
  return <ProfileView profile={profile} />;
};

export default withScreenErrorBoundary(ProfileScreen, 'ProfileScreen');
```

### Pattern 2: Component with Isolated Error

```tsx
// components/PaymentForm.tsx
import { withErrorBoundary } from '@/components/ErrorBoundary';

const PaymentFormComponent = () => {
  // payment form logic
};

export const PaymentForm = withErrorBoundary(PaymentFormComponent, {
  level: 'component',
  isolate: false, // Don't isolate - show full error UI
  fallback: <PaymentErrorFallback />,
  onError: (error) => {
    // Log payment errors specially
    capturePaymentError(error);
  },
});
```

### Pattern 3: Async Data Loading

```tsx
// components/VideoList.tsx
import { AsyncBoundary } from '@/components/ErrorBoundary';

export const VideoList = () => {
  return (
    <AsyncBoundary
      asyncFn={fetchVideos}
      loadingFallback={<VideoListSkeleton />}
      errorFallback={(error, retry) => (
        <EmptyState
          icon="error"
          title="Failed to load videos"
          description={error.message}
          action={
            <Button onPress={retry}>Try Again</Button>
          }
        />
      )}
      timeout={10000}
      onSuccess={(videos) => {
        trackEvent('videos_loaded', { count: videos.length });
      }}
    >
      {(videos) => (
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideoCard video={item} />}
        />
      )}
    </AsyncBoundary>
  );
};
```

### Pattern 4: Network-Aware Components

```tsx
// components/SyncStatus.tsx
import { withNetworkAwareness } from '@/components/ErrorBoundary';

const SyncStatusComponent = ({ isOnline, networkType }) => {
  if (!isOnline) {
    return <OfflineStatus />;
  }
  
  return <OnlineStatus networkType={networkType} />;
};

export const SyncStatus = withNetworkAwareness(SyncStatusComponent);
```

### Pattern 5: Error Context Usage

```tsx
// App.tsx
import { ErrorBoundaryProvider } from '@/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundaryProvider
      showDetails={__DEV__}
      enableReporting={!__DEV__}
      maxErrors={10}
    >
      <NavigationContainer>
        {/* app content */}
      </NavigationContainer>
    </ErrorBoundaryProvider>
  );
}

// In a component:
import { useCaptureError } from '@/components/ErrorBoundary';

const MyComponent = () => {
  const captureError = useCaptureError();
  
  const handleAction = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      captureError(error, { context: 'risky_operation' });
    }
  };
};
```

## Migration Checklist

### Phase 1: Critical Screens
- [ ] Login Screen
- [ ] Register Screen
- [ ] Payment Modal
- [ ] Video Player Screen

### Phase 2: Main Screens
- [ ] Dashboard
- [ ] Videos List
- [ ] Analytics
- [ ] Settings

### Phase 3: Components
- [ ] Video Player Component
- [ ] Payment Form
- [ ] Data Charts
- [ ] Form Components

### Phase 4: Async Operations
- [ ] API calls
- [ ] Data fetching
- [ ] File uploads
- [ ] Background tasks

## Best Practices

### DO:
1. **Always wrap screens** with `withScreenErrorBoundary`
2. **Use AsyncBoundary** for data fetching instead of try-catch
3. **Provide meaningful error messages** to users
4. **Include retry actions** where appropriate
5. **Log errors** with appropriate context
6. **Test error scenarios** in development

### DON'T:
1. **Don't catch and hide errors** - let error boundaries handle them
2. **Don't show technical error messages** to users
3. **Don't forget accessibility** - announce errors for screen readers
4. **Don't overuse component-level boundaries** - use them strategically
5. **Don't ignore network errors** - handle offline scenarios

## Testing Error Boundaries

### 1. Manual Testing

```tsx
// Add to any component to test error boundary
if (__DEV__) {
  return (
    <Button
      onPress={() => {
        throw new Error('Test error boundary');
      }}
    >
      Test Error
    </Button>
  );
}
```

### 2. Unit Testing

```tsx
import { render } from '@testing-library/react-native';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

test('ErrorBoundary catches errors', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(getByText(/error/i)).toBeTruthy();
});
```

### 3. E2E Testing

```javascript
// Detox test
it('should show error boundary on crash', async () => {
  await element(by.id('crash-button')).tap();
  await expect(element(by.text('Component Error'))).toBeVisible();
  await element(by.text('Retry')).tap();
  await expect(element(by.id('main-content'))).toBeVisible();
});
```

## Error Reporting Integration

The error boundaries automatically integrate with the ErrorService for reporting:

```tsx
// Errors are automatically reported with:
- Error message and stack trace
- Component stack
- User context
- Device information
- Screen/component name
- Custom metadata

// To add custom context:
withErrorBoundary(Component, {
  onError: (error, errorInfo) => {
    captureException(error, {
      customField: 'value',
      userId: getCurrentUserId(),
    });
  },
});
```

## Performance Considerations

1. **Component-level boundaries** have minimal overhead
2. **AsyncBoundary** adds ~50ms for initial render
3. **Error logging** is debounced to prevent spam
4. **Network monitoring** uses native APIs for efficiency

## Accessibility

All error boundaries include:
- Screen reader announcements
- Keyboard navigation support
- High contrast mode support
- Focus management on error/retry
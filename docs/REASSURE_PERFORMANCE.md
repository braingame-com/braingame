# Reassure Performance Testing

## Overview

Reassure is integrated into our CI/CD pipeline to automatically detect React Native performance regressions. It measures component render times and counts, comparing them between branches to catch performance issues before they reach production.

## What Gets Measured

### Component Metrics
- **Render Duration**: Time taken to render a component
- **Render Count**: Number of times a component re-renders
- **Performance Regression**: Significant increases in render time or count

### Test Coverage
- **BGUI Components**: Button, TextInput, and other core components
- **Screens**: Critical user-facing screens like HomeScreen
- **User Flows**: Complex interactions and state changes

## Writing Performance Tests

### Basic Component Test
```tsx
import { measureRenders } from 'reassure';
import { Button } from '@braingame/bgui';

test('Button renders efficiently', async () => {
  await measureRenders(
    <Button onPress={() => {}} label="Click me" />
  );
});
```

### Screen Test with Context
```tsx
import { measureRenders } from 'reassure';
import HomeScreen from '../screens/HomeScreen';

const Wrapper = ({ children }) => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </NavigationContainer>
);

test('HomeScreen renders efficiently', async () => {
  await measureRenders(<HomeScreen />, { wrapper: Wrapper });
});
```

## Running Tests Locally

```bash
# Run performance tests
cd apps/product
pnpm test:perf

# Generate baseline measurements
pnpm reassure:baseline

# Compare against baseline
pnpm reassure
```

## CI/CD Integration

### GitHub Actions Workflow
The performance workflow runs on:
- Pull requests that modify `apps/product/**` or `packages/bgui/**`
- Automatically compares PR branch against base branch
- Posts results as PR comment

### Performance Regression Detection
- **Baseline**: Measurements from the base branch (usually `main`)
- **Comparison**: Current branch measurements vs baseline
- **Threshold**: Configurable tolerance for performance variations

## Configuration

### Test Configuration (`.reassure/config.ts`)
```typescript
configure({
  testCommand: 'pnpm test:perf',
  verbose: true,
  measurements: {
    render: {
      runs: 20,        // Number of test runs
      warmupRuns: 5,   // Warm-up runs before measurements
    },
  },
});
```

### Jest Configuration (`jest-perf.config.js`)
- Uses Node test environment for consistency
- Runs tests serially (`maxWorkers: 1`)
- Disables coverage collection
- Separate cache directory

## Best Practices

### 1. Test Critical Components
Focus on components that:
- Are used frequently across the app
- Handle complex state or props
- Have performance-sensitive interactions

### 2. Consistent Test Environment
- Mock external dependencies
- Use consistent test data
- Avoid network calls or async operations

### 3. Meaningful Baselines
- Keep baseline measurements up to date
- Re-baseline after major refactors
- Document significant performance improvements

### 4. Performance Budgets
Set acceptable thresholds for:
- Maximum render duration
- Maximum render count
- Regression tolerance percentage

## Interpreting Results

### PR Comment Format
```
📱 React Native Performance Results

Component         | Render Duration | Render Count | Status
-----------------|-----------------|--------------|--------
Button           | 12ms → 13ms     | 1 → 1        | ✅ +8%
TextInput        | 18ms → 25ms     | 2 → 3        | ⚠️ +39%
HomeScreen       | 45ms → 42ms     | 3 → 3        | ✅ -7%
```

### Status Indicators
- ✅ **Green**: No regression or improvement
- ⚠️ **Warning**: Minor regression within threshold
- ❌ **Error**: Significant regression exceeding threshold

## Troubleshooting

### Common Issues

1. **Flaky Tests**
   - Increase number of runs in configuration
   - Mock time-dependent operations
   - Ensure consistent test data

2. **False Positives**
   - Check for external factors (CI load, etc.)
   - Verify mock consistency
   - Consider increasing warmup runs

3. **Missing Baseline**
   - Run `pnpm reassure:baseline` on base branch
   - Commit baseline results

## Future Enhancements

1. **Custom Metrics**: Add app-specific performance measurements
2. **Visual Regression**: Combine with screenshot testing
3. **Production Monitoring**: Correlate with real-world performance
4. **Automated Fixes**: Suggest optimizations for regressions

## Resources

- [Reassure Documentation](https://github.com/callstack/reassure)
- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [React Profiler API](https://react.dev/reference/react/Profiler)
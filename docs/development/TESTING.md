# Testing Strategy

## Philosophy

- **Pragmatic**: Right tool for the job
- **User-focused**: Test user experience, not implementation
- **Modern**: Leverage best-of-breed testing tools

## Testing Stack

We use a hybrid approach optimized for each package:

| Package | Tool | Reason |
|---------|------|--------|
| bgui/utils | Vitest | Modern, fast, ESM support |
| product | Jest + jest-expo | React Native integration |
| Visual testing | Storybook | Component isolation |
| E2E | Maestro (mobile), Playwright (web) | Platform-specific |

## Why Hybrid?

Pure Vitest or Jest setups failed due to:
- React Native's unique module system
- ESM/CommonJS compatibility issues
- Platform-specific testing needs

## Configuration

### Vitest (bgui, utils)
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts']
  }
});
```

### Jest (product app)
```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ]
};
```

## What to Test

### Unit Tests
```typescript
// Business logic
describe('tokenCalculator', () => {
  it('applies premium multiplier correctly', () => {
    expect(calculateTokens(100, true)).toBe(200);
  });
});
```

### Component Tests
```typescript
// User interactions
describe('LoginForm', () => {
  it('validates email format', async () => {
    render(<LoginForm />);
    fireEvent.changeText(screen.getByTestId('email'), 'invalid');
    fireEvent.press(screen.getByText('Submit'));
    expect(screen.getByText('Invalid email')).toBeVisible();
  });
});
```

### E2E Tests
```yaml
# Maestro flow
appId: com.braingame.app
---
- launchApp
- tapOn: "Get Started"
- inputText: "test@example.com"
- tapOn: "Continue"
- assertVisible: "Welcome back"
```

## Testing Guidelines

### Do Test
- Business logic functions
- User interaction flows
- Error handling
- Edge cases

### Don't Test
- Implementation details
- Third-party libraries
- Styling (use visual tests)
- Internal state

## Running Tests

```bash
# All tests
pnpm test

# Specific package
pnpm test --filter=bgui

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E
pnpm test:e2e
```

## Storybook Testing

```typescript
// Component stories
export const Default: Story = {
  args: {
    title: 'Hello World',
    variant: 'primary'
  }
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true
  }
};
```

## Common Pitfalls

1. **Don't test implementation** - Test behavior, not internals
2. **Mock aggressively** - Isolate units being tested
3. **Avoid 100% coverage obsession** - Focus on critical paths
4. **Keep tests simple** - One assertion per test when possible

## Troubleshooting

### React Native Issues
```javascript
// Mock native modules
jest.mock('react-native-device-info', () => ({
  getVersion: () => '1.0.0'
}));
```

### ESM Issues
```javascript
// Transform ES modules
transformIgnorePatterns: [
  'node_modules/(?!(module-name)/)'
]
```

### Timeout Issues
```javascript
// Increase timeout for slow tests
jest.setTimeout(10000);
```
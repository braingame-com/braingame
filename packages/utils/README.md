# Utils

Shared utilities for Brain Game applications.

## Style Utilities

### Spacing
```typescript
import { spacing } from '@braingame/utils';

const styles = {
  padding: spacing.md,        // 16
  margin: spacing.lg,         // 24
  gap: spacing.sm            // 8
};
```

### Shadows
```typescript
import { shadows } from '@braingame/utils';

const cardStyle = {
  ...shadows.medium,          // Cross-platform shadow
  backgroundColor: 'white'
};
```

### Layout
```typescript
import { layout } from '@braingame/utils';

const flexStyles = {
  ...layout.centerContent,    // align-items: center, justify-content: center
  ...layout.row              // flex-direction: row
};
```

## Form Validation

### Individual Validators
```typescript
import { validators } from '@braingame/utils';

const isValid = validators.email('user@example.com');    // true
const hasError = validators.required('');                // false
const isStrong = validators.password('MyPass123!');      // true
```

### Form Validation Helper
```typescript
import { useForm } from '@braingame/utils';

const { values, errors, handleChange, isValid } = useForm({
  email: '',
  password: ''
}, {
  email: [validators.required, validators.email],
  password: [validators.required, validators.password]
});
```

## React Hooks

### Async State Management
```typescript
import { useAsyncState, useForm, useDisclosure, useThemeColor } from '@braingame/utils';

const { data, loading, error, execute } = useAsyncState(fetchUserData);

// Trigger async operation
execute(userId);

// Form state management
const form = useForm({
  initialValues: { email: '', password: '' },
  validationRules: {
    email: validators.email,
    password: validators.password,
  },
});

// Modal/disclosure state
const modal = useDisclosure();

// Theme-aware colors
const textColor = useThemeColor('text');
```

## Alert Utilities

### Success/Error Alerts
```typescript
import { showSuccess, showError, showConfirmation } from '@braingame/utils';

// Success notification
showSuccess('Profile updated successfully');

// Error alert
showError('Failed to save changes');

// Confirmation dialog
const confirmed = await showConfirmation('Delete account?');
```

## Design System

### Colors
```typescript
import { Colors } from '@braingame/utils';

const styles = {
  primary: Colors.primary,       // #007AFF
  success: Colors.success,       // #34C759
  error: Colors.error           // #FF3B30
};
```

### Tokens
```typescript
import { Tokens } from '@braingame/utils';

const componentStyle = {
  padding: Tokens.spacing.md,
  borderRadius: Tokens.borderRadius.sm,
  fontSize: Tokens.typography.size.lg
};
```

### Typography
```typescript
import { Typography } from '@braingame/utils';

const textStyles = {
  title: Typography.title,       // Large, bold heading
  body: Typography.body,         // Regular body text
  caption: Typography.caption    // Small, muted text
};
```

## Feature Flags

### LaunchDarkly Integration
```typescript
import { useFeatureFlag } from '@braingame/utils';

const isPremiumEnabled = useFeatureFlag('premium-features');

if (isPremiumEnabled) {
  // Show premium UI
}
```

## Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Test Coverage
- ✅ Form validation utilities - 100% coverage
- ✅ Alert utilities - 100% coverage
- ✅ Async state hooks - Comprehensive tests
- ✅ Form management hook - Full test suite
- ✅ Task helpers - Complete coverage
- ✅ Common styles - All utilities tested

## Package Structure

```
packages/utils/
├── src/
│   ├── styles/          Spacing, shadows, layout helpers
│   ├── validation/      Form validators and helpers  
│   ├── hooks/           React hooks for common patterns
│   ├── alerts/          User notification utilities
│   ├── design-system/   Colors, tokens, typography
│   └── feature-flags/   LaunchDarkly integration
```

## Best Practices

- Import only what you need for optimal bundle size
- Use TypeScript for type safety across utilities
- Prefer composition over configuration
- Keep utilities pure and testable
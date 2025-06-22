# @braingame/utils

> Shared utilities, hooks, and constants for Brain Game applications

## Installation

```bash
pnpm add @braingame/utils
```

## API Reference

### Style Utilities
```typescript
import { spacing, shadows, layout, fonts } from '@braingame/utils';

// Consistent spacing
paddingHorizontal: spacing.l, // 20
marginBottom: spacing.m, // 16

// Shadow presets  
style={[styles.card, shadows.medium]}

// Layout helpers
<View style={[layout.flex1, layout.center]}>

// Font families
fontFamily: fonts.bold, // "LexendBold"
```

### Form Validation
```typescript
import { validators, validateForm } from '@braingame/utils';

// Individual validators
const emailError = validators.email(email);
const passwordError = validators.password(password, 8);

// Form validation
const { isValid, errors } = validateForm(formData, {
  email: validators.email,
  password: (value) => validators.password(value, 8),
});
```

### React Hooks
```typescript
import { useAsyncState, useForm } from '@braingame/utils';

// Async operations with loading/error states
const { data, loading, error, execute } = useAsyncState<User>();

// Form state management
const form = useForm({
  initialValues: { email: '', password: '' },
  validationRules: {
    email: validators.email,
    password: validators.password,
  },
});
```

### Alert Utilities
```typescript
import { showAlert } from '@braingame/utils';

// Quick alerts
showAlert.error("Error", "Invalid email address");
showAlert.success("Success", "Profile updated!");

// Confirmation dialogs
showAlert.confirm({
  title: "Delete Account",
  message: "Are you sure?",
  onConfirm: () => deleteAccount(),
  destructive: true,
});
```

### Design System
- **Colors** - Theme colors for light/dark modes
- **Tokens** - Spacing scale (xs through xxxxl) 
- **Typography** - Font families and text styles
- **Shadows, Opacity, ZIndex** - Visual constants

### Feature Flags
Use LaunchDarkly to control experimental features across apps.

```env
REACT_APP_LD_CLIENT_ID="your-client-id"
REACT_APP_LD_USER_KEY="anonymous-user"
```

```ts
import { ldClient } from "@braingame/utils/featureFlags";

await ldClient.waitForInitialization();
if (ldClient.variation("new-ui", false)) {
    // feature-specific logic
}
```

## Documentation

- [Architecture](../../docs/architecture/ARCHITECTURE.md) - System design
- [Development Guide](../../docs/engineering/DEVELOPMENT.md) - Setup and workflow

---

MIT © Brain Game
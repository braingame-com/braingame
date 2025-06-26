# Component Reference

Quick reference for all BGUI components.

## Components

### Alert
```typescript
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
}

<Alert type="success" message="Profile updated" />
```

### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

<Button variant="primary" onPress={handlePress}>
  Save Changes
</Button>
```

### Card
```typescript
interface CardProps {
  elevation?: number;
  padding?: SpacingToken;
  backgroundColor?: ColorToken;
}

<Card elevation={2} padding="md">
  <Text>Card content</Text>
</Card>
```

### ErrorBoundary
```typescript
interface ErrorBoundaryProps {
  fallback?: React.ComponentType<ErrorInfo>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

<ErrorBoundary fallback={ErrorFallback}>
  <RiskyComponent />
</ErrorBoundary>
```

### Icon
```typescript
interface IconProps {
  name: IconName;
  size?: number;
  color?: ColorToken;
}

<Icon name="chevron-right" size={24} color="primary" />
```

### Link
```typescript
interface LinkProps {
  href: string;
  external?: boolean;
  variant?: 'default' | 'button';
}

<Link href="/profile" variant="button">
  View Profile
</Link>
```

### Modal
```typescript
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

<Modal visible={showModal} onClose={closeModal} title="Settings">
  <Text>Modal content</Text>
</Modal>
```

### PageWrapper
```typescript
interface PageWrapperProps {
  safeArea?: boolean;
  padding?: SpacingToken;
  backgroundColor?: ColorToken;
}

<PageWrapper safeArea padding="lg">
  <Text>Page content</Text>
</PageWrapper>
```

### Text
```typescript
interface TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  color?: ColorToken;
  weight?: 'regular' | 'medium' | 'bold';
}

<Text variant="title" weight="bold">
  Welcome Back
</Text>
```

### TextInput
```typescript
interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  error={emailError}
/>
```

### Toast
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

// Usage via service
showToast({
  type: 'success',
  message: 'Settings saved'
});
```

### View
```typescript
interface ViewProps {
  flex?: number;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
  padding?: SpacingToken;
  margin?: SpacingToken;
}

<View direction="row" justify="between" padding="md">
  <Text>Left</Text>
  <Text>Right</Text>
</View>
```

## Design System Integration

### Colors
```typescript
import { Colors } from '@braingame/bgui/utils';

const styles = {
  primary: Colors.primary,
  success: Colors.success,
  error: Colors.error
};
```

### Tokens
```typescript
import { Tokens } from '@braingame/bgui/utils';

const styles = {
  padding: Tokens.spacing.md,
  fontSize: Tokens.typography.size.lg
};
```

### Typography
```typescript
import { Typography } from '@braingame/bgui/utils';

const textStyles = {
  title: Typography.title,
  body: Typography.body
};
```

## Accessibility

All components include:
- Proper ARIA labels
- Screen reader support
- Keyboard navigation
- Focus management
- Color contrast compliance

## Testing

Components support:
- Unit testing with Jest
- Visual testing with Storybook
- Accessibility testing with jest-axe
- E2E testing with testID props
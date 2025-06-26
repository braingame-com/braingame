# BGUI Component Reference

This document provides a comprehensive reference for all components available in the `@braingame/bgui` package, including their props, types, and usage examples.

## Alert

Displays contextual feedback messages to users.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `title` | `string` | – |
| `message` | `string` | required |
| `type` | `"info" \| "success" \| "warning" \| "error"` | `"info"` |
| `actions` | `ReactNode` | – |
| `dismissible` | `boolean` | `false` |
| `onDismiss` | `() => void` | – |
| `variant` | `"banner" \| "inline" \| "floating"` | `"banner"` |

---

## Breadcrumb

Navigation aid that shows the user's location within a hierarchy.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `separator` | `ReactNode` | `'/'` |
| `maxItems` | `number` | – |
| `variant` | `"standard" \| "compact"` | `"standard"` |

---

## Button

The primary action component. Buttons use `Colors.universal.primary` and spacing values from `Tokens` to ensure consistent styling across the app.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `onPress` | `() => void` | required |
| `icon?` | `string` | – |
| `iconPosition?` | `'left' \| 'right'` | `'left'` |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `fullWidth?` | `boolean` | `false` |
| `disabled?` | `boolean` | `false` |
| `loading?` | `boolean` | `false` |
| `aria-label?` | `string` | – |
| `aria-describedby?` | `string` | – |

### Usage

```tsx
import { Button } from '@braingame/bgui';
import { Tokens } from '@braingame/utils';

export function SaveButton() {
  return (
    <Button
      variant="primary"
      onPress={() => console.log('save')}
      style={{ paddingHorizontal: Tokens.xl }}
    >
      Save
    </Button>
  );
}
```

### Snippet Example

```tsx
import { Button } from "@braingame/bgui";

export default function ButtonExample() {
	return <Button onPress={() => console.log("Pressed!")}>Click me</Button>;
}
```

---

## Card

Interactive container component (referenced in snippets).

### Snippet Example

```tsx
import { Card, Text } from "@braingame/bgui";

export default function CardExample() {
	return (
		<Card variant="interactive" onPress={() => console.log("Card pressed")}>
			<Text>Tap me</Text>
		</Card>
	);
}
```

---

## ErrorBoundary

Catches runtime errors in descendant components and displays a fallback UI. No design tokens are required but it follows the same accessibility practices as the rest of the library.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `fallback` | `ReactNode` | – |
| `onError` | `(error: Error, info: ErrorInfo) => void` | – |
| `resetOnPropsChange?` | `boolean` | – |
| `resetKeys?` | `Array<string \| number>` | – |
| `isolate?` | `boolean` | – |

### Usage

```tsx
import { ErrorBoundary } from '@braingame/bgui';

<ErrorBoundary fallback={<Text>Something went wrong</Text>}>
  <ProfileForm />
</ErrorBoundary>;
```

---

## Icon

Displays a vector icon from the FontAwesome set. Sizes map to `Tokens` values so icons scale consistently with text.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `name` | `string` | required |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `color?` | `ThemeColor` | theme value |
| `variant?` | `'solid' \| 'regular' \| 'brand'` | `'regular'` |
| `decorative?` | `boolean` | `false` |
| `aria-label?` | `string` | – |

### Usage

```tsx
import { Icon } from '@braingame/bgui';
import { Tokens } from '@braingame/utils';

<Icon name="heart" size="lg" color="primary" style={{ margin: Tokens.s }} />;
```

---

## Link

Navigation element for internal and external destinations.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `href?` | `string` | – |
| `onPress?` | `() => void` | – |
| `external?` | `boolean` | `false` |
| `disabled?` | `boolean` | `false` |
| `aria-label?` | `string` | – |
| `children` | `ReactNode` | required |

### Usage

```tsx
import { Link } from '@braingame/bgui';

<Link href="/settings" aria-label="settings">
  Settings
</Link>;
```

---

## PageWrapper

Provides consistent page margins and scrolling behavior. Wrap your screens with this component rather than using raw `View` elements.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |

### Usage

```tsx
import { PageWrapper } from '@braingame/bgui';

export default function ProfileScreen() {
  return (
    <PageWrapper>
      {/* page content */}
    </PageWrapper>
  );
}
```

---

## Text

Typography primitive that uses the `Typography.fontSize` scale and theme colors.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `color?` | `ThemeColor` | `text` |
| `align?` | `'left' \| 'center' \| 'right'` | `'left'` |
| `numberOfLines?` | `number` | – |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'body' \| 'caption'` | `'body'` |
| `...RNTextProps` | `React Native TextProps` | – |

### Usage

```tsx
import { Text } from '@braingame/bgui';

<Text variant="h1" color="primary">Welcome</Text>;
```

---

## TextInput

Wrapper around React Native's input field. It follows the design token palette for borders and text colors: `Colors.text`, `Colors.textSecondary`, and `Colors.border`.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `string` | required |
| `onValueChange` | `(value: string) => void` | required |
| `placeholder?` | `string` | – |
| `secureTextEntry?` | `boolean` | `false` |
| `multiline?` | `boolean` | `false` |
| `autoComplete?` | `string` | – |
| `maxLength?` | `number` | – |
| `leftIcon?` | `string` | – |
| `rightIcon?` | `string` | – |
| `disabled?` | `boolean` | `false` |
| `variant` | `"standard" \| "flat" \| "error"` | `"standard"` |
| `aria-label?` | `string` | – |
| `aria-describedby?` | `string` | – |
| `...RNTextInputProps` | `React Native TextInputProps` | – |

### Usage

```tsx
import { TextInput } from '@braingame/bgui';

<TextInput
  value={name}
  onValueChange={setName}
  placeholder="Enter your name"
/>;
```

---

## View

Container element styled with `Colors.background`, `Colors.card`, and spacing tokens. Useful for layout primitives on both web and native.

### Props

| Prop | Type | Default |
| --- | --- | --- |
| `type` | `'background' \| 'card' \| 'surface' \| 'mini-card'` | `'background'` |
| `transparent?` | `boolean` | – |
| `rounded?` | `boolean` | – |
| `border?` | `boolean` | – |
| `hoverable?` | `boolean` | – |
| `grabbable?` | `boolean` | – |
| `...RNViewProps` | `React Native ViewProps` | – |

### Usage

```tsx
import { View } from '@braingame/bgui';
import { Colors } from '@braingame/utils';

<View type="card" style={{ backgroundColor: Colors.card }} />;
```

---

## Design System Notes

All components in BGUI follow these design principles:

1. **Color Tokens**: Components use theme-aware colors from `Colors` object
2. **Spacing Tokens**: Consistent spacing using `Tokens` (s, m, l, xl, etc.)
3. **Typography**: Text components follow the `Typography.fontSize` scale
4. **Accessibility**: All interactive components support ARIA properties
5. **Cross-Platform**: Components work on both React Native and web platforms

## Import Statement

All components can be imported from the main package:

```tsx
import { Button, Text, View, Icon, TextInput } from '@braingame/bgui';
```

## Snippet Directory

<!-- Additional code examples will be added here when available -->
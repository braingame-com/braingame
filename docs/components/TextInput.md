# TextInput

Wrapper around React Native's input field. It follows the design token palette
for borders and text colors: `Colors.text`, `Colors.textSecondary`, and
`Colors.border`.

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

## Usage

```tsx
import { TextInput } from '@braingame/bgui';

<TextInput
  value={name}
  onValueChange={setName}
  placeholder="Enter your name"
/>;
```

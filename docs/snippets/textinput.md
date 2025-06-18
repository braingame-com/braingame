# TextInput Usage

```tsx
import { TextInput } from '@brain-game/bgui';
import { useState } from 'react';

export function TextInputExample() {
  const [value, setValue] = useState('');
  return (
    <TextInput value={value} onChangeText={setValue} placeholder="Enter text" />
  );
}
```

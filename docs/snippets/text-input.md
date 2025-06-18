# TextInput

```tsx
import { TextInput } from '@brain-game/bgui';
import { useState } from 'react';

export default function TextInputExample() {
  const [value, setValue] = useState('');
  return (
    <TextInput
      value={value}
      onValueChange={setValue}
      placeholder="Type here"
    />
  );
}
```

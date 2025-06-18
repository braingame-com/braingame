# Select

```tsx
import { Select } from '@brain-game/bgui';
import { useState } from 'react';

export default function SelectExample() {
  const [value, setValue] = useState('');
  return (
    <Select value={value} onValueChange={setValue} placeholder="Choose one">
      <Select.Item value="one">One</Select.Item>
      <Select.Item value="two">Two</Select.Item>
      <Select.Item value="three">Three</Select.Item>
    </Select>
  );
}
```

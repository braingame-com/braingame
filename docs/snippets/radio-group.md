# RadioGroup

```tsx
import { RadioGroup } from '@brain-game/bgui';
import { useState } from 'react';

export default function RadioGroupExample() {
  const [value, setValue] = useState('one');
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <RadioGroup.Item value="one">One</RadioGroup.Item>
      <RadioGroup.Item value="two">Two</RadioGroup.Item>
    </RadioGroup>
  );
}
```

# Checkbox

```tsx
import { Checkbox } from '@brain-game/bgui';
import { useState } from 'react';

export default function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onValueChange={setChecked}>
      Accept terms
    </Checkbox>
  );
}
```

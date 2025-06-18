# Switch

```tsx
import { Switch } from '@brain-game/bgui';
import { useState } from 'react';

export default function SwitchExample() {
  const [value, setValue] = useState(false);
  return <Switch value={value} onValueChange={setValue} />;
}
```

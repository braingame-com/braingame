# Slider

```tsx
import { Slider } from '@brain-game/bgui';
import { useState } from 'react';

export default function SliderExample() {
  const [value, setValue] = useState(50);
  return <Slider value={value} onValueChange={setValue} min={0} max={100} />;
}
```

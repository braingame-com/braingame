# Accordion

```tsx
import { Accordion } from '@brain-game/bgui';
import { useState } from 'react';

export default function AccordionExample() {
  const [open, setOpen] = useState<string | null>('panel1');
  return (
    <Accordion value={open} onValueChange={setOpen} allowMultiple>
      <Accordion.Item title="Panel 1" value="panel1">
        First panel content
      </Accordion.Item>
      <Accordion.Item title="Panel 2" value="panel2">
        Second panel content
      </Accordion.Item>
    </Accordion>
  );
}
```

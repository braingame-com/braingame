# Label

```tsx
import { Label, TextInput } from '@brain-game/bgui';

export default function LabelExample() {
  return (
    <>
      <Label htmlFor="name">Name</Label>
      <TextInput id="name" value="" onValueChange={() => {}} />
    </>
  );
}
```

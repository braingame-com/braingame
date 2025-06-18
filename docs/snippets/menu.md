# Menu

```tsx
import { Menu, Button } from '@brain-game/bgui';

export default function MenuExample() {
  return (
    <Menu trigger={<Button text="Open" onPress={() => {}} />}> 
      <Menu.Item onPress={() => {}}>Edit</Menu.Item>
      <Menu.Item onPress={() => {}}>Delete</Menu.Item>
    </Menu>
  );
}
```

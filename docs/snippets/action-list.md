# ActionList

```tsx
import { ActionList } from '@brain-game/bgui';

export default function ActionListExample() {
  return (
    <ActionList>
      <ActionList.Item onPress={() => {}}>Edit</ActionList.Item>
      <ActionList.Divider />
      <ActionList.Item onPress={() => {}} disabled>
        Delete
      </ActionList.Item>
    </ActionList>
  );
}
```

# Tabs

```tsx
import { Tabs } from '@brain-game/bgui';
import { useState } from 'react';

export default function TabsExample() {
  const [tab, setTab] = useState('one');
  return (
    <Tabs activeTab={tab} onValueChange={setTab}>
      <Tabs.List>
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="one">First tab</Tabs.Panel>
        <Tabs.Panel value="two">Second tab</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

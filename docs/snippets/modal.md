# Modal

```tsx
import { Modal, Button } from '@brain-game/bgui';
import { useState } from 'react';

export default function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button text="Open" onPress={() => setOpen(true)} />
      <Modal visible={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Example Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Modal content goes here
        </Modal.Body>
        <Modal.Footer>
          <Button text="Close" onPress={() => setOpen(false)} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

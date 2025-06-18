# Modal

```tsx
<Modal visible={open} onClose={() => setOpen(false)}>
  <Modal.Header>
    <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Modal content goes here
  </Modal.Body>
  <Modal.Footer>
    <Button onPress={() => setOpen(false)}>Close</Button>
  </Modal.Footer>
</Modal>
```

# Login Form Example

```tsx
import { Button, TextInput, Checkbox, View } from '@brain-game/bgui';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <View style={{ gap: 8, padding: 16 }}>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Checkbox checked={remember} onValueChange={setRemember}>
        Remember me
      </Checkbox>
      <Button text="Sign In" onPress={() => console.log('login')} />
    </View>
  );
}
```

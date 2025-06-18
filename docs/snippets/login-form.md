# Login Form Example

```tsx
import { Button, TextInput, Checkbox, Label, View } from '@brain-game/bgui';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <View type="card" style={{ padding: 16 }}>
      <Label htmlFor="email">Email</Label>
      <TextInput
        id="email"
        value={email}
        onValueChange={setEmail}
        autoComplete="email"
        placeholder="you@example.com"
      />

      <Label htmlFor="password">Password</Label>
      <TextInput
        id="password"
        value={password}
        onValueChange={setPassword}
        secureTextEntry
        placeholder="Password"
      />

      <Checkbox checked={remember} onValueChange={setRemember}>
        Remember me
      </Checkbox>

      <Button text="Sign In" onPress={() => console.log('login')} />
    </View>
  );
}
```

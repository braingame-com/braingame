# Login Form

```tsx
<form onSubmit={handleLogin}>
  <TextInput value={email} onValueChange={setEmail} placeholder="Email" />
  <TextInput
    value={password}
    onValueChange={setPassword}
    placeholder="Password"
    secureTextEntry
  />
  <Checkbox checked={remember} onValueChange={setRemember}>
    Remember me
  </Checkbox>
  <Button onPress={handleLogin}>Sign In</Button>
</form>
```

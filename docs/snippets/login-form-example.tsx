import { Button, TextInput, View, Text } from "@braingame/bgui";
import { Checkbox } from "@braingame/bgui"; // planned component
import { useState } from "react";

export const LoginFormExample = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [remember, setRemember] = useState(false);

        const handleSubmit = () => {
                // handle login
        };

        return (
                <View style={{ gap: 12 }}>
                        <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                        />
                        <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"
                                secureTextEntry
                        />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox
                                        checked={remember}
                                        onValueChange={setRemember}
                                >
                                        <Text>Remember me</Text>
                                </Checkbox>
                        </View>
                        <Button onPress={handleSubmit}>Log In</Button>
                </View>
        );
};

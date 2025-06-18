import { TextInput } from "@braingame/bgui";
import { useState } from "react";

export const TextInputUsage = () => {
        const [value, setValue] = useState("");

        return (
                <TextInput
                        value={value}
                        onChangeText={setValue}
                        placeholder="Enter text"
                />
        );
};

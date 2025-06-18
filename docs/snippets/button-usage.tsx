import { Button } from "@braingame/bgui";

export const ButtonUsage = () => {
        const handlePress = () => {
                console.log("Pressed!");
        };

        return (
                <Button onPress={handlePress}>Click me</Button>
        );
};

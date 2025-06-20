import { Stack } from "expo-router";
import { MindsetScreen } from "./src/screens/Mindset";

export default function MindsetRoute() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "Mindset Training",
					headerShown: true,
				}}
			/>
			<MindsetScreen />
		</>
	);
}

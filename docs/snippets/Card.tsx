import { Card, Text } from "@braingame/bgui";

export default function CardExample() {
	return (
		<Card variant="interactive" onPress={() => console.log("Card pressed")}>
			<Text>Tap me</Text>
		</Card>
	);
}

import { Container, Link, Typography } from "@braingame/bgui";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<Container>
				<Typography level="h1">This screen doesn't exist.</Typography>
				<Link href="/">Go to home screen!</Link>
			</Container>
		</>
	);
}

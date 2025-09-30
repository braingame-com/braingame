import { Link, PageWrapper, Text } from "@braingame/bgui";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<PageWrapper>
				<Text level="h1">This screen doesn't exist.</Text>
				<Link href="/">Go to home screen!</Link>
			</PageWrapper>
		</>
	);
}

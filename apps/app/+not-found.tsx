import { Link, PageWrapper, Text } from "@braingame/bgui";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<PageWrapper>
				<Text type="title">This screen doesn't exist.</Text>
				<Link text="Go to home screen!" href="/" />
			</PageWrapper>
		</>
	);
}

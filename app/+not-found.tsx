import { Stack } from "expo-router";
import { Text } from "@/components/Text";
import { Link } from "@/components/Link";
import { PageWrapper } from "@/components/PageWrapper";

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

import { Icon, Link, PageWrapper, Text } from "@braingame/bgui";
import { Tokens } from "@braingame/utils";
import { Stack } from "expo-router";

export default function Index() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					headerLeft: () => <Icon name="brain-game" size="md" style={{ marginLeft: Tokens.m }} />,
				}}
			/>
			<PageWrapper>
				<Text variant="h1">Dashboard</Text>
				<Link href="/tasks">Tasks</Link>
				<Link href="/mindset">🧠 Mindset Training</Link>
			</PageWrapper>
		</>
	);
}

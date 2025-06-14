import { Icon, Link, PageWrapper, Text } from "@braingame/bgui";
import { Tokens } from "@braingame/utils";
import { Stack } from "expo-router";

export default function Index() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					headerLeft: () => (
						<Icon name="brain-game" size="secondary" style={{ marginLeft: Tokens.m }} />
					),
				}}
			/>
			<PageWrapper>
				<Text type="display">Dashboard</Text>
				<Link text="Tasks" href="/tasks" />
			</PageWrapper>
		</>
	);
}

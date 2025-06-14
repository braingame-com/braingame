import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { PageWrapper } from "@/components/PageWrapper";
import { Text } from "@/components/Text";
import { Tokens } from "@/constants/Tokens";
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

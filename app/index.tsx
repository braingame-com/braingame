import { Stack } from "expo-router";
import { Text } from "@/components/Text";
import { Link } from "@/components/Link";
import { Icon } from "@/components/Icon";
import { Tokens } from "@/constants/Tokens";
import { PageWrapper } from "@/components/PageWrapper";

export default function Index() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					headerLeft: () => (
						<Icon
							name="brain-game"
							size="secondary"
							style={{ marginLeft: Tokens.m }}
						/>
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

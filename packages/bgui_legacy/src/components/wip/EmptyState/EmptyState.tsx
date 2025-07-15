import { Tokens } from "@braingame/utils";
import { StyleSheet, View } from "react-native";
import { Icon } from "../../components/Icon";
import { Text } from "../../components/Text";
import { Button } from "../Button";
import type { EmptyStateProps } from "./types";

export function EmptyState({ icon, title, description, action, style }: EmptyStateProps) {
	return (
		<View style={[styles.container, style]}>
			{icon && (
				<View style={styles.iconContainer}>
					<Icon name={icon} size="lg" color="icon" />
				</View>
			)}

			<Text variant="subtitle" align="center" style={styles.title}>
				{title}
			</Text>

			{description && (
				<Text variant="body" color="secondary" align="center" style={styles.description}>
					{description}
				</Text>
			)}

			{action && (
				<Button variant="primary" size="md" onPress={action.onPress}>
					{action.label}
				</Button>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: Tokens.xl,
		minHeight: 200,
	},
	iconContainer: {
		marginBottom: Tokens.m,
		opacity: 0.5,
	},
	title: {
		marginBottom: Tokens.s,
		maxWidth: 300,
	},
	description: {
		marginBottom: Tokens.l,
		maxWidth: 300,
	},
	button: {
		minWidth: 120,
	},
});

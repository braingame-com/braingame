import { StyleSheet, View } from "react-native";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";

export interface EmptyStateProps {
	icon?: string;
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	variant?: "default" | "compact";
}

export function EmptyState({
	icon,
	title,
	description,
	actionLabel,
	onAction,
	variant = "default",
}: EmptyStateProps) {
	const isCompact = variant === "compact";

	return (
		<View style={[styles.container, isCompact && styles.containerCompact]}>
			{icon && (
				<View style={[styles.iconContainer, isCompact && styles.iconContainerCompact]}>
					<Icon name={icon} size={isCompact ? 24 : 48} color="icon" decorative />
				</View>
			)}

			<Text
				variant={isCompact ? "body" : "h3"}
				align="center"
				color="secondary"
				style={[styles.title, isCompact && styles.titleCompact]}
			>
				{title}
			</Text>

			{description && (
				<Text
					variant={isCompact ? "caption" : "body"}
					align="center"
					color="neutral"
					style={[styles.description, isCompact && styles.descriptionCompact]}
				>
					{description}
				</Text>
			)}

			{actionLabel && onAction && (
				<Button onPress={onAction} size={isCompact ? "sm" : "md"} variant="secondary">
					{actionLabel}
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
		paddingHorizontal: 32,
		paddingVertical: 48,
		minHeight: 200,
	},
	containerCompact: {
		paddingHorizontal: 16,
		paddingVertical: 24,
		minHeight: 120,
	},
	iconContainer: {
		marginBottom: 16,
	},
	iconContainerCompact: {
		marginBottom: 8,
	},
	title: {
		marginBottom: 8,
	},
	titleCompact: {
		marginBottom: 4,
	},
	description: {
		marginBottom: 24,
		maxWidth: 300,
	},
	descriptionCompact: {
		marginBottom: 12,
		maxWidth: 250,
	},
	button: {
		minWidth: 120,
	},
	buttonCompact: {
		minWidth: 80,
	},
});

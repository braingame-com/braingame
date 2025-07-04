import { Tokens } from "@braingame/utils";
import { StyleSheet, View } from "react-native";
import { Button } from "../Button";
import { Card } from "../Card";
import { Icon } from "../Icon";
import { ProgressBar } from "../ProgressBar";
import { Text } from "../Text";
import { LIFE_AREA_CONFIGS } from "./constants";
import type { VisionCardProps } from "./types";

export function VisionCard({
	area,
	vision,
	progress = 0,
	onEdit,
	style,
	loading = false,
}: VisionCardProps) {
	const config = LIFE_AREA_CONFIGS[area];
	const hasVision = Boolean(vision?.trim());

	return (
		<Card style={[styles.card, style]}>
			{/* Header with icon and title */}
			<View style={styles.header}>
				<View style={[styles.iconContainer, { backgroundColor: `${config.color}20` }]}>
					<Icon name={config.icon} size="md" color={config.color} />
				</View>
				<View style={styles.headerText}>
					<Text variant="subtitle" style={{ color: config.color }}>
						{config.title}
					</Text>
					<Text variant="caption" color="secondary">
						{config.description}
					</Text>
				</View>
				<Button
					variant="ghost"
					size="small"
					onPress={onEdit}
					icon="edit"
					loading={loading}
					aria-label={`Edit ${config.title} vision`}
				/>
			</View>

			{/* Vision content */}
			<View style={styles.content}>
				{hasVision ? (
					<Text variant="body" numberOfLines={3}>
						{vision}
					</Text>
				) : (
					<Text variant="body" color="secondary" style={styles.emptyText}>
						Tap edit to set your {config.title.toLowerCase()} vision
					</Text>
				)}
			</View>

			{/* Progress indicator */}
			{hasVision && (
				<View style={styles.progressContainer}>
					<View style={styles.progressHeader}>
						<Text variant="caption" color="secondary">
							Progress
						</Text>
						<Text variant="caption" color="secondary">
							{progress}%
						</Text>
					</View>
					<ProgressBar value={progress} maxValue={100} color={config.color} />
				</View>
			)}
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: Tokens.m,
		marginBottom: Tokens.s,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.m,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginRight: Tokens.m,
	},
	headerText: {
		flex: 1,
	},
	content: {
		marginBottom: Tokens.s,
	},
	emptyText: {
		fontStyle: "italic",
	},
	progressContainer: {
		marginTop: Tokens.s,
	},
	progressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Tokens.xs,
	},
});

import { Tokens } from "@braingame/utils";
import type React from "react";
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

	const cardStyle: React.CSSProperties = {
		padding: Tokens.m,
		marginBottom: Tokens.s,
		...(style as React.CSSProperties),
	};

	const headerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.m,
	};

	const iconContainerStyle: React.CSSProperties = {
		width: 48,
		height: 48,
		borderRadius: 12,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginRight: Tokens.m,
		backgroundColor: `${config.color}20`,
	};

	const headerTextStyle: React.CSSProperties = {
		flex: 1,
	};

	const contentStyle: React.CSSProperties = {
		marginBottom: Tokens.s,
	};

	const emptyTextStyle: React.CSSProperties = {
		fontStyle: "italic",
	};

	const progressContainerStyle: React.CSSProperties = {
		marginTop: Tokens.s,
	};

	const progressHeaderStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Tokens.xs,
	};

	return (
		<Card style={cardStyle}>
			{/* Header with icon and title */}
			<div style={headerStyle}>
				<div style={iconContainerStyle}>
					<Icon name={config.icon} size="md" color={config.color} />
				</div>
				<div style={headerTextStyle}>
					<Text variant="subtitle" style={{ color: config.color }}>
						{config.title}
					</Text>
					<Text variant="caption" color="secondary">
						{config.description}
					</Text>
				</div>
				<Button
					variant="ghost"
					size="small"
					onPress={onEdit}
					icon="edit"
					loading={loading}
					aria-label={`Edit ${config.title} vision`}
				/>
			</div>

			{/* Vision content */}
			<div style={contentStyle}>
				{hasVision ? (
					<Text variant="body" numberOfLines={3}>
						{vision}
					</Text>
				) : (
					<Text variant="body" color="secondary" style={emptyTextStyle}>
						Tap edit to set your {config.title.toLowerCase()} vision
					</Text>
				)}
			</div>

			{/* Progress indicator */}
			{hasVision && (
				<div style={progressContainerStyle}>
					<div style={progressHeaderStyle}>
						<Text variant="caption" color="secondary">
							Progress
						</Text>
						<Text variant="caption" color="secondary">
							{progress}%
						</Text>
					</div>
					<ProgressBar value={progress} maxValue={100} color={config.color} />
				</div>
			)}
		</Card>
	);
}

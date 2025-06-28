import type React from "react";
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

	const containerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: isCompact ? "24px 16px" : "48px 32px",
		minHeight: isCompact ? "120px" : "200px",
		textAlign: "center",
	};

	const iconContainerStyle: React.CSSProperties = {
		marginBottom: isCompact ? "8px" : "16px",
	};

	const titleStyle: React.CSSProperties = {
		marginBottom: isCompact ? "4px" : "8px",
	};

	const descriptionStyle: React.CSSProperties = {
		marginBottom: isCompact ? "12px" : "24px",
		maxWidth: isCompact ? "250px" : "300px",
	};

	const buttonStyle: React.CSSProperties = {
		minWidth: isCompact ? "80px" : "120px",
	};

	return (
		<div style={containerStyle}>
			{icon && (
				<div style={iconContainerStyle}>
					<Icon name={icon} size={isCompact ? 24 : 48} color="icon" decorative />
				</div>
			)}

			<Text variant={isCompact ? "body" : "h3"} align="center" color="secondary">
				{title}
			</Text>

			{description && (
				<Text variant={isCompact ? "caption" : "body"} align="center" color="neutral">
					{description}
				</Text>
			)}

			{actionLabel && onAction && (
				<Button onPress={onAction} size={isCompact ? "sm" : "md"} variant="secondary">
					{actionLabel}
				</Button>
			)}
		</div>
	);
}

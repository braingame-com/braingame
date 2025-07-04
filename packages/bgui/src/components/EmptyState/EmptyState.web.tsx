import { Colors, Tokens } from "@braingame/utils";
import type React from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Text";
import type { EmptyStateProps } from "./types";

export function EmptyState({ icon, title, description, action, style }: EmptyStateProps) {
	const containerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: Tokens.xl,
		minHeight: 200,
		...(style as React.CSSProperties),
	};

	const iconContainerStyle: React.CSSProperties = {
		marginBottom: Tokens.m,
		opacity: 0.5,
	};

	const titleStyle: React.CSSProperties = {
		marginBottom: Tokens.s,
		maxWidth: 300,
	};

	const descriptionStyle: React.CSSProperties = {
		marginBottom: Tokens.l,
		maxWidth: 300,
	};

	const buttonStyle: React.CSSProperties = {
		minWidth: 120,
	};

	return (
		<div style={containerStyle}>
			{icon && (
				<div style={iconContainerStyle}>
					<Icon name={icon} size={64} color={Colors.universal.neutral[400]} />
				</div>
			)}

			<Text variant="subtitle" align="center" style={titleStyle}>
				{title}
			</Text>

			{description && (
				<Text variant="body" color="secondary" align="center" style={descriptionStyle}>
					{description}
				</Text>
			)}

			{action && (
				<Button variant="primary" size="medium" onPress={action.onPress} style={buttonStyle}>
					{action.label}
				</Button>
			)}
		</div>
	);
}

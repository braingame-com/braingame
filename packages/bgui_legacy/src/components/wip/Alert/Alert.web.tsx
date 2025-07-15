import type React from "react";
import { Icon } from "../../components/Icon";
import { useTheme } from "../../theme";
import { styles, typeColorMap } from "./styles";
import type { AlertProps } from "./types";

export function Alert({
	title,
	message,
	type = "info",
	actions,
	dismissible = false,
	onDismiss,
	variant = "banner",
	style,
}: AlertProps) {
	const { colors } = useTheme();
	const textColor = colors.onSurface;
	const backgroundColor = typeColorMap(colors)[type];

	const containerStyle: React.CSSProperties = {
		...styles.container,
		backgroundColor: backgroundColor as string,
		...(variant === "inline" && { borderRadius: 0 }),
		...(variant === "floating" && {
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
		}),
		...((style as React.CSSProperties) || {}),
	};

	const contentStyle: React.CSSProperties = {
		...styles.content,
		flex: 1,
	};

	const titleStyle: React.CSSProperties = {
		...styles.title,
		color: textColor,
		margin: 0,
		marginBottom: 4,
	};

	const textStyle: React.CSSProperties = {
		color: textColor,
		margin: 0,
	};

	const dismissButtonStyle: React.CSSProperties = {
		background: "none",
		border: "none",
		cursor: "pointer",
		padding: 8,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		<div role="alert" style={containerStyle}>
			<div style={contentStyle}>
				{title && <h4 style={titleStyle}>{title}</h4>}
				<p style={textStyle}>{message}</p>
			</div>
			{actions && <div style={styles.actions}>{actions as React.ReactNode}</div>}
			{dismissible && (
				<button type="button" aria-label="Dismiss" onClick={onDismiss} style={dismissButtonStyle}>
					<Icon name="close" size={16} color="text" />
				</button>
			)}
		</div>
	);
}

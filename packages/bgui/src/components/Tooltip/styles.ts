import { Colors, Tokens, useThemeColor } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for Tooltip component
 */
export const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignSelf: "flex-start",
	},
	base: {
		position: "absolute",
		paddingHorizontal: Tokens.s,
		paddingVertical: Tokens.xs,
		borderRadius: Tokens.xs,
		maxWidth: 200,
		zIndex: 999,
	},
	text: {
		fontSize: Tokens.s,
	},
	top: {
		bottom: "100%",
		marginBottom: Tokens.xs,
	},
	bottom: {
		top: "100%",
		marginTop: Tokens.xs,
	},
	left: {
		right: "100%",
		marginRight: Tokens.xs,
	},
	right: {
		left: "100%",
		marginLeft: Tokens.xs,
	},
});

/**
 * Get background color based on tooltip variant
 */
export const getTooltipBackgroundColor = (
	variant: "dark" | "light" | "info",
	cardColor: string,
) => {
	switch (variant) {
		case "light":
			return cardColor;
		case "info":
			return Colors.universal.primary;
		default:
			return "rgba(0,0,0,0.85)";
	}
};

/**
 * Get text color based on tooltip variant
 */
export const getTooltipTextColor = (variant: "dark" | "light" | "info", textColor: string) => {
	return variant === "dark" ? "#fff" : textColor;
};

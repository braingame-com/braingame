import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import { TOOLTIP_MAX_WIDTH, TOOLTIP_Z_INDEX } from "../../constants";
import type { M3ColorScheme } from "../../theme";

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
		maxWidth: TOOLTIP_MAX_WIDTH,
		zIndex: TOOLTIP_Z_INDEX,
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
	colors: M3ColorScheme,
) => {
	switch (variant) {
		case "light":
			return colors.surfaceContainer;
		case "info":
			return colors.primary;
		default:
			return "rgba(0,0,0,0.85)";
	}
};

/**
 * Get text color based on tooltip variant
 */
export const getTooltipTextColor = (variant: "dark" | "light" | "info", colors: M3ColorScheme) => {
	return variant === "dark" ? "#fff" : colors.onSurface;
};

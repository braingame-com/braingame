import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";
import type { BadgeVariant, ThemeColor } from "./types";

/**
 * StyleSheet for Badge component
 */
export const styles = StyleSheet.create({
	base: {
		minWidth: Tokens.m,
		minHeight: Tokens.m,
		paddingHorizontal: Tokens.xs,
		borderRadius: Tokens.m,
		alignItems: "center",
		justifyContent: "center",
	},
	dot: {
		width: Tokens.s,
		height: Tokens.s,
		paddingHorizontal: 0,
	},
	text: {
		color: "#fff",
		lineHeight: Tokens.m,
	},
});

/**
 * Get background color based on variant and color theme
 */
export const getBackgroundColor = (
	variant: BadgeVariant,
	color: ThemeColor,
	colors: M3ColorScheme,
) => {
	if (variant === "notification") {
		return colors.error;
	}

	if (variant === "status" || variant === "count") {
		return mapColor(color, colors);
	}

	return mapColor(color, colors);
};

/**
 * Map theme color to actual color value
 */
const mapColor = (color: ThemeColor, colors: M3ColorScheme) => {
	switch (color) {
		case "primary":
			return colors.primary;
		case "secondary":
			return colors.secondary;
		case "success":
			return colors.success;
		case "danger":
			return colors.error;
		case "warning":
			return colors.warning;
		default:
			return colors.outlineVariant;
	}
};

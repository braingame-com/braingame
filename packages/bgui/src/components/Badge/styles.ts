import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
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
export const getBackgroundColor = (variant: BadgeVariant, color: ThemeColor, neutral: string) => {
	if (variant === "notification") {
		return Colors.universal.negative;
	}

	if (variant === "status" || variant === "count") {
		return mapColor(color, neutral);
	}

	return mapColor(color, neutral);
};

/**
 * Map theme color to actual color value
 */
const mapColor = (color: ThemeColor, neutral: string) => {
	switch (color) {
		case "primary":
			return Colors.universal.primary;
		case "secondary":
			return Colors.universal.primaryHalfFaded;
		case "success":
			return Colors.universal.positive;
		case "danger":
			return Colors.universal.negative;
		case "warning":
			return Colors.universal.warn;
		default:
			return neutral;
	}
};

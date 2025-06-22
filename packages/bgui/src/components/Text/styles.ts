import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import { SUBTITLE_FONT_SIZE_MULTIPLIER, SUBTITLE_LINE_HEIGHT_MULTIPLIER } from "../../constants";

/**
 * Color mapping for Text component
 */
export const getTextColor = (
	color: string | undefined,
	baseColor: string,
	secondaryColor: string,
) => {
	switch (color) {
		case "primary":
			return Colors.universal.primary;
		case "secondary":
			return secondaryColor;
		case "danger":
			return Colors.universal.negative;
		case "success":
			return Colors.universal.positive;
		case "warning":
			return Colors.universal.warn;
		default:
			return baseColor;
	}
};

/**
 * Font family mapping based on mono preference and weight
 * Uses Lexend for regular text, Roboto Mono for monospace
 */
export const getFontFamily = (
	mono: boolean,
	weight: "light" | "regular" | "medium" | "semibold" | "bold" = "regular",
) => {
	if (mono) {
		// Use Roboto Mono - Google's excellent monospace font
		return "Roboto Mono";
	}
	// Use Lexend variable font
	switch (weight) {
		case "light":
			return "LexendLight";
		case "medium":
			return "LexendMedium";
		case "semibold":
			return "LexendSemiBold";
		case "bold":
			return "LexendBold";
		default:
			return "LexendRegular";
	}
};

/**
 * Enhanced typography styles adapted from bg1 but using Lexend + improved token system
 */
export const textVariantStyles = StyleSheet.create({
	// Enhanced variants from bg1 (primary set)
	displayTitle: {
		fontSize: Tokens.xxxl, // 48px
		fontWeight: "600" as const,
		lineHeight: Tokens.xxxl * 1.1,
	},
	title: {
		fontSize: Tokens.xxl, // 32px
		fontWeight: "600" as const,
		lineHeight: Tokens.xxl * 1.2,
	},
	heading: {
		fontSize: Tokens.l, // 20px
		fontWeight: "600" as const,
		lineHeight: Tokens.l * 1.3,
	},
	subtitle: {
		fontSize: Math.round(Tokens.m * SUBTITLE_FONT_SIZE_MULTIPLIER), // 18px
		fontWeight: "500" as const,
		lineHeight: Math.round(
			Tokens.m * SUBTITLE_FONT_SIZE_MULTIPLIER * SUBTITLE_LINE_HEIGHT_MULTIPLIER,
		),
	},
	bold: {
		fontSize: Tokens.m, // 16px
		fontWeight: "700" as const,
		lineHeight: Tokens.m * 1.5,
	},
	text: {
		fontSize: Tokens.m, // 16px
		fontWeight: "400" as const,
		lineHeight: Tokens.m * 1.5,
	},
	secondaryText: {
		fontSize: Tokens.ms, // 14px
		fontWeight: "400" as const,
		lineHeight: Tokens.ms * 1.5,
	},
	small: {
		fontSize: Tokens.s, // 12px
		fontWeight: "400" as const,
		lineHeight: Tokens.s * 1.4,
	},
	smallThin: {
		fontSize: Tokens.s, // 12px
		fontWeight: "300" as const,
		lineHeight: Tokens.s * 1.4,
	},
	// Legacy variants (backward compatibility - map to new variants)
	h1: {
		fontSize: Tokens.xxxl, // Same as displayTitle
		fontWeight: "600" as const,
		lineHeight: Tokens.xxxl * 1.1,
	},
	h2: {
		fontSize: Tokens.xxl, // Same as title
		fontWeight: "600" as const,
		lineHeight: Tokens.xxl * 1.2,
	},
	h3: {
		fontSize: Tokens.l, // Same as heading
		fontWeight: "600" as const,
		lineHeight: Tokens.l * 1.3,
	},
	body: {
		fontSize: Tokens.m, // Same as text
		fontWeight: "400" as const,
		lineHeight: Tokens.m * 1.5,
	},
	caption: {
		fontSize: Tokens.s, // Same as small
		fontWeight: "400" as const,
		lineHeight: Tokens.s * 1.4,
	},
});

/**
 * Get font weight for variant (used to determine Lexend font family)
 */
export const getVariantWeight = (
	variant: string,
): "light" | "regular" | "medium" | "semibold" | "bold" => {
	switch (variant) {
		case "displayTitle":
		case "title":
		case "heading":
		case "h1":
		case "h2":
		case "h3":
			return "semibold";
		case "subtitle":
			return "medium";
		case "bold":
			return "bold";
		case "smallThin":
			return "light";
		default:
			return "regular";
	}
};

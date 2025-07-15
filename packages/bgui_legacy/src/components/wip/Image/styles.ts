import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";

/**
 * Get StyleSheet for Image component
 */
export const getImageStyles = (colors: M3ColorScheme) =>
	StyleSheet.create({
		responsive: {
			width: "100%",
		},
		errorContainer: {
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: colors.errorContainer,
			borderWidth: 1,
			borderStyle: "dashed",
			minHeight: Tokens.xxxxl + Tokens.xl, // 96px (72 + 24)
			borderRadius: Tokens.s,
			borderColor: colors.error,
		},
	});

/**
 * Validation rules for Image props
 */
export const validationRules = {
	src: { required: true },
	alt: { required: true },
};

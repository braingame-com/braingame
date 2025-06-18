import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for Image component
 */
export const styles = StyleSheet.create({
	responsive: {
		width: "100%",
	},
	errorContainer: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.universal.primaryFaded,
		borderWidth: 1,
		borderStyle: "dashed",
		minHeight: Tokens.xxxxl + Tokens.xl, // 96px (72 + 24)
		borderRadius: Tokens.s,
		borderColor: Colors.universal.primary,
	},
});

/**
 * Validation rules for Image props
 */
export const validationRules = {
	src: { required: true },
	alt: { required: true },
};

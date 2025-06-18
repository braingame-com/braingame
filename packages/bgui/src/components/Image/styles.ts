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
		backgroundColor: "#f5f5f5",
		borderWidth: 1,
		borderStyle: "dashed",
		minHeight: 100,
	},
});

/**
 * Validation rules for Image props
 */
export const validationRules = {
	src: { required: true },
	alt: { required: true },
};

import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * Color mapping for Toast types
 */
export const typeColorMap = {
	success: Colors.universal.positive,
	warning: Colors.universal.warn,
	error: Colors.universal.negative,
	info: Colors.universal.primary,
};

/**
 * Default duration for Toast display
 */
export const DEFAULT_DURATION = 3000;

/**
 * StyleSheet for Toast component
 */
export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.s,
		borderRadius: Tokens.s,
		margin: Tokens.s,
	},
	message: {
		flex: 1,
		marginRight: Tokens.s,
	},
	actionButton: {
		paddingHorizontal: Tokens.s,
		paddingVertical: Tokens.xs,
	},
	actionText: {
		fontWeight: "600",
	},
});

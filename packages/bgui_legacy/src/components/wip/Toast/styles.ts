import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";

/**
 * Color mapping for Toast types
 */
export const typeColorMap = (colors: M3ColorScheme) => ({
	success: colors.success,
	warning: colors.warning,
	error: colors.error,
	info: colors.primary,
});

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

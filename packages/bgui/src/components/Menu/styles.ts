import { BorderRadius, Shadows, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for Menu component
 */
export const styles = StyleSheet.create({
	menu: {
		minWidth: 160, // Keep fixed for UI consistency
		borderRadius: BorderRadius.sm,
		paddingVertical: Tokens.xs,
		...Shadows.md,
	},
	item: {
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.s,
	},
});

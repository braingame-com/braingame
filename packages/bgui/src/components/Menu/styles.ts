import { Opacity, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for Menu component
 */
export const styles = StyleSheet.create({
	menu: {
		minWidth: 160, // Keep fixed for UI consistency
		borderRadius: Tokens.xs,
		paddingVertical: Tokens.xs,
		shadowColor: "#000",
		shadowOpacity: Opacity.shadow,
		shadowRadius: Tokens.xxs,
		elevation: 2,
	},
	item: {
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.s,
	},
});

import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for Menu component
 */
export const styles = StyleSheet.create({
	menu: {
		minWidth: 160,
		borderRadius: Tokens.xs,
		paddingVertical: Tokens.xs,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	item: {
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.s,
	},
});

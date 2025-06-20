import { BorderRadius, Shadows, Tokens } from "@braingame/utils";
import { StyleSheet, TextStyle, type ViewStyle } from "react-native";

interface MenuStyles {
	menu: ViewStyle;
	item: ViewStyle;
}

/**
 * StyleSheet for Menu component
 */
export const styles: MenuStyles = StyleSheet.create<MenuStyles>({
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

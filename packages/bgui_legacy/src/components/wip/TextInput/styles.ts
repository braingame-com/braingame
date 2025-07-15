import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";

export const getInputStyles = (colors: M3ColorScheme) =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.outlineVariant,
			paddingHorizontal: Tokens.s,
			borderRadius: Tokens.s,
		},
		flat: {
			borderWidth: 0,
			borderBottomWidth: 1,
		},
		error: {
			borderColor: colors.error,
		},
		input: {
			flex: 1,
			paddingVertical: Tokens.xs,
		},
		icon: {
			marginHorizontal: Tokens.xs,
		},
	});

import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import { TAB_ACTIVE_BORDER_WIDTH } from "../../constants";
import type { M3ColorScheme } from "../../theme";

export const getTabStyles = (colors: M3ColorScheme) =>
	StyleSheet.create({
		list: {
			flexDirection: "row",
		},
		scrollable: {
			flexGrow: 0,
		},
		tab: {
			paddingVertical: Tokens.s,
			paddingHorizontal: Tokens.m,
			marginRight: Tokens.s,
		},
		pill: {
			borderRadius: Tokens.s,
		},
		lineActive: {
			borderBottomWidth: TAB_ACTIVE_BORDER_WIDTH,
			borderColor: colors.primary,
		},
		enclosedActive: {
			backgroundColor: colors.primaryContainer,
			borderRadius: Tokens.xs,
		},
		pillActive: {
			backgroundColor: colors.primary,
		},
		panel: {
			paddingVertical: Tokens.m,
		},
	});

import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";
import type { AlertType } from "./types";

export const typeColorMap = (colors: M3ColorScheme): Record<AlertType, string> => ({
	info: colors.primaryContainer,
	success: colors.successContainer,
	warning: colors.warningContainer,
	error: colors.errorContainer,
});

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingVertical: Tokens.s,
		paddingHorizontal: Tokens.m,
		borderRadius: Tokens.s,
		flexDirection: "row",
		alignItems: "flex-start",
		gap: Tokens.s,
	},
	content: { flex: 1 },
	title: { fontWeight: "600", marginBottom: Tokens.xs },
	actions: { marginLeft: Tokens.s },
});

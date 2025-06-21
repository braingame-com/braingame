import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { AlertType } from "./types";

export const typeColorMap: Record<AlertType, string> = {
	info: Colors.universal.primaryFaded,
	success: Colors.universal.positiveFaded,
	warning: Colors.universal.warnFaded,
	error: Colors.universal.negativeFaded,
};

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

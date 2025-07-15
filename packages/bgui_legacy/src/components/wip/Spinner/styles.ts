import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * Size mapping for Spinner component
 */
export const SIZE_MAP = {
	sm: Tokens.s,
	md: Tokens.l,
	lg: Tokens.xl,
} as const;

/**
 * StyleSheet for Spinner component
 */
export const styles = StyleSheet.create({
	overlay: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.15)",
	},
});

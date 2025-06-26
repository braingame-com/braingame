import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for Link component
 */
export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	standalone: {
		paddingVertical: Tokens.xs,
	},
	pressed: {
		opacity: 0.7,
	},
	disabled: {
		opacity: 0.5,
	},
});

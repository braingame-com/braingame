import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

export const taskStyles = StyleSheet.create({
	iconContainer: {
		padding: Tokens.xs,
		borderRadius: Tokens.xs,
	},
	textInput: {
		marginHorizontal: Tokens.m,
	},
	tasksList: {
		paddingVertical: 0,
	},
	taskItem: {
		marginTop: Tokens.m,
	},
	placeholderBox: {
		backgroundColor: "#303030",
		marginTop: Tokens.m,
		borderRadius: Tokens.s,
		opacity: 0.5,
	},
});

import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/Colors";
import { Tokens } from "../../../utils/constants/Tokens";

export const styles = StyleSheet.create({
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
		borderBottomWidth: 2,
		borderColor: Colors.universal.primary,
	},
	enclosedActive: {
		backgroundColor: Colors.universal.primaryFaded,
		borderRadius: Tokens.xs,
	},
	pillActive: {
		backgroundColor: Colors.universal.primary,
	},
	panel: {
		paddingVertical: Tokens.m,
	},
});

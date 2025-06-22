import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import { TAB_ACTIVE_BORDER_WIDTH } from "../../constants";

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
		borderBottomWidth: TAB_ACTIVE_BORDER_WIDTH,
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

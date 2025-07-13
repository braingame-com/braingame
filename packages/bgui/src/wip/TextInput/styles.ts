import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.light.border,
		paddingHorizontal: Tokens.s,
		borderRadius: Tokens.s,
	},
	flat: {
		borderWidth: 0,
		borderBottomWidth: 1,
	},
	error: {
		borderColor: Colors.universal.negative,
	},
	input: {
		flex: 1,
		paddingVertical: Tokens.xs,
	},
	icon: {
		marginHorizontal: Tokens.xs,
	},
});

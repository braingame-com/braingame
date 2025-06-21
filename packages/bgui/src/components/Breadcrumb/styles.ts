import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	item: {
		marginRight: Tokens.xs,
		flexDirection: "row",
		alignItems: "center",
	},
	compactItem: {
		marginRight: Tokens.xxs,
	},
});

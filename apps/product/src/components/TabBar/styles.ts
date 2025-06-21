import { Platform, StyleSheet } from "react-native";

export const tabBarStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#e1e1e1",
		paddingBottom: Platform.OS === "ios" ? 20 : 10,
		paddingTop: 10,
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},

	indicator: {
		position: "absolute",
		top: 0,
		height: 3,
		backgroundColor: "#007fff",
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3,
	},

	tabItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
	},

	tabContent: {
		alignItems: "center",
		justifyContent: "center",
	},

	iconContainer: {
		marginBottom: 4,
	},

	icon: {
		fontSize: 24,
		color: "#666",
	},

	iconActive: {
		color: "#007fff",
	},

	label: {
		fontSize: 12,
		fontFamily: "LexendRegular",
		color: "#666",
		marginTop: 2,
	},

	labelActive: {
		color: "#007fff",
		fontFamily: "LexendMedium",
	},

	// Platform specific adjustments
	...(Platform.OS === "ios"
		? {
				iosContainer: {
					backgroundColor: "#f8f8f8",
				},
			}
		: {
				androidContainer: {
					elevation: 12,
				},
			}),
});

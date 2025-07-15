import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},

	scrollView: {
		flex: 1,
	},

	scrollContent: {
		paddingBottom: 20,
	},

	header: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e1e1e1",
	},

	title: {
		fontSize: 32,
		fontWeight: "700",
		fontFamily: "Lexend",
		color: "#1a1a1a",
		marginBottom: 4,
	},

	subtitle: {
		fontSize: 16,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
	},

	statsContainer: {
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 20,
		gap: 12,
	},

	statCard: {
		flex: 1,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},

	statValue: {
		fontSize: 28,
		fontWeight: "700",
		fontFamily: "Lexend",
		color: "#007fff",
		marginBottom: 4,
	},

	statLabel: {
		fontSize: 12,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
	},

	section: {
		paddingHorizontal: 20,
		marginTop: 24,
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		fontFamily: "Lexend",
		color: "#1a1a1a",
		marginBottom: 16,
	},

	actionCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},

	actionIcon: {
		fontSize: 32,
		marginRight: 16,
	},

	actionContent: {
		flex: 1,
	},

	actionTitle: {
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "Lexend",
		color: "#1a1a1a",
		marginBottom: 4,
	},

	actionDescription: {
		fontSize: 14,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
	},

	actionArrow: {
		fontSize: 20,
		color: "#ccc",
		fontFamily: "Lexend",
		fontWeight: "400",
	},

	activityItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},

	activityDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#00a550",
		marginRight: 12,
	},

	activityText: {
		flex: 1,
		fontSize: 14,
		fontFamily: "Lexend",
		fontWeight: "400",
		color: "#1a1a1a",
	},

	activityTime: {
		fontSize: 12,
		color: "#999",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
});

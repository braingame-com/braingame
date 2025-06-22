import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Tasks() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tasks</Text>
			<Text style={styles.subtitle}>Your tasks will appear here</Text>
			<Link href="/" asChild>
				<Text style={styles.linkText}>Back to Dashboard</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
	},
	linkText: {
		fontSize: 18,
		color: "#007AFF",
		textDecorationLine: "underline",
	},
});

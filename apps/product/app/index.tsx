import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Dashboard</Text>
			<Link href="./tasks" asChild>
				<Text style={styles.linkText}>Go to Tasks</Text>
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
		marginBottom: 20,
	},
	linkText: {
		fontSize: 18,
		color: "#007AFF",
		textDecorationLine: "underline",
	},
});

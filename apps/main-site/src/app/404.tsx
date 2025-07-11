import { Button, Link, Text, View } from "@braingame/bgui";

export default function NotFound() {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#000",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
				height: "100%",
			}}
		>
			<View
				style={{
					maxWidth: 500,
					width: "100%",
					alignItems: "center",
				}}
			>
				<Text
					variant="displayTitle"
					style={{
						color: "#0074D9",
						marginBottom: 16,
						fontSize: 120,
						fontWeight: "bold",
					}}
				>
					404
				</Text>
				<Text
					variant="displayTitle"
					style={{
						color: "#fff",
						marginBottom: 16,
					}}
				>
					Page Not Found
				</Text>
				<Text
					variant="body"
					style={{
						color: "#999",
						marginBottom: 40,
						textAlign: "center",
					}}
				>
					The page you're looking for doesn't exist or has been moved.
				</Text>

				<Link href="/">
					<View>
						<Button onPress={() => {}} variant="primary" size="lg">
							<Text style={{ color: "#000", fontWeight: "bold" }}>Back to Home</Text>
						</Button>
					</View>
				</Link>
			</View>
		</View>
	);
}
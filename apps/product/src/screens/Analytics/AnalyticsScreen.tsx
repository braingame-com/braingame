import { Text } from "@braingame/bgui";
import type React from "react";
import { View } from "react-native";

interface Props {
	route?: {
		params?: {
			metric?: "performance" | "mindset" | "videos";
		};
	};
}

export const AnalyticsScreen: React.FC<Props> = ({ route }) => {
	const metric = route?.params?.metric || "performance";

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Analytics</Text>
			<Text>Showing: {metric}</Text>
		</View>
	);
};

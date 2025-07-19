import { Typography } from "@braingame/bgui";
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
	// Validate navigation parameters and provide explicit defaults
	if (!route?.params) {
		console.warn("AnalyticsScreen: No navigation parameters provided, using default metric");
	}

	const metric = route?.params?.metric || "performance";

	// Validate metric parameter
	const validMetrics = ["performance", "mindset", "videos"];
	if (!validMetrics.includes(metric)) {
		console.warn(`AnalyticsScreen: Invalid metric '${metric}', falling back to 'performance'`);
	}

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Typography>Analytics</Typography>
			<Typography>Showing: {validMetrics.includes(metric) ? metric : "performance"}</Typography>
		</View>
	);
};

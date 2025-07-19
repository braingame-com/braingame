import { Typography } from "@braingame/bgui";
import type React from "react";
import { View } from "react-native";

interface Props {
	route?: {
		params?: {
			categoryId?: string;
		};
	};
}

export const VideosScreen: React.FC<Props> = ({ route }) => {
	// Validate navigation parameters
	if (!route?.params) {
		console.warn("VideosScreen: No navigation parameters provided");
	}

	const categoryId = route?.params?.categoryId;

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Typography>Videos</Typography>
			{categoryId ? <Typography>Category: {categoryId}</Typography> : <Typography>No category specified</Typography>}
		</View>
	);
};

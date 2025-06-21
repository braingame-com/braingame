import { Text } from "@braingame/bgui";
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
	const categoryId = route?.params?.categoryId;

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Videos</Text>
			{categoryId && <Text>Category: {categoryId}</Text>}
		</View>
	);
};

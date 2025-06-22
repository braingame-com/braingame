import { Text } from "@braingame/bgui";
import type React from "react";
import { View } from "react-native";

interface Props {
	route: {
		params: {
			videoId: string;
			title: string;
		};
	};
}

export const VideoPlayerScreen: React.FC<Props> = ({ route }) => {
	const { videoId, title } = route.params;

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Video Player</Text>
			<Text>Playing: {title}</Text>
			<Text>ID: {videoId}</Text>
		</View>
	);
};

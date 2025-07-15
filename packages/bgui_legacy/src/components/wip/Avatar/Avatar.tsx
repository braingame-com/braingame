import { Image, Pressable, View } from "react-native";
import { Text } from "../../components/Text";
import { useTheme } from "../../theme";
import { getAvatarStyles } from "./styles";
import type { AvatarProps } from "./types";
import { getInitials } from "./utils";

export const Avatar = ({
	src,
	name,
	size = "medium",
	variant = "circle",
	onPress,
	style,
}: AvatarProps) => {
	const { colors } = useTheme();
	const backgroundColor = colors.surfaceContainerHigh;
	const { containerStyle, imageStyle } = getAvatarStyles(size, variant);

	const content = src ? (
		<Image source={{ uri: src }} style={imageStyle} />
	) : (
		<View style={[containerStyle, { backgroundColor }]}>
			<Text>{getInitials(name)}</Text>
		</View>
	);

	return (
		<Pressable onPress={onPress} disabled={!onPress} style={style}>
			{content}
		</Pressable>
	);
};

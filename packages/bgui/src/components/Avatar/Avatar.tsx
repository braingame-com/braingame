import { useThemeColor } from "@braingame/utils";
import { Image, Pressable, View } from "react-native";
import { Text } from "../Text";
import { getAvatarStyles } from "./styles";
import type { AvatarProps } from "./types";
import { getInitials } from "./utils";

/**
 * Avatar component for displaying user profile images or initials.
 * Falls back to initials when no image is provided.
 *
 * @example
 * ```tsx
 * // Avatar with image
 * <Avatar
 *   src="https://example.com/user.jpg"
 *   name="John Doe"
 * />
 *
 * // Avatar with initials (no image)
 * <Avatar
 *   name="Jane Smith"
 *   size="large"
 * />
 *
 * // Square avatar variant
 * <Avatar
 *   src={userImageUrl}
 *   name={userName}
 *   variant="square"
 * />
 *
 * // Interactive avatar
 * <Avatar
 *   name="Alex Johnson"
 *   size="small"
 *   onPress={() => navigateToProfile()}
 * />
 *
 * // Custom styled avatar
 * <Avatar
 *   src={avatarUrl}
 *   name={displayName}
 *   style={{ marginRight: 10 }}
 * />
 * ```
 *
 * @component
 */
export const Avatar = ({
	src,
	name,
	size = "medium",
	variant = "circle",
	onPress,
	style,
}: AvatarProps) => {
	const backgroundColor = useThemeColor("button");
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

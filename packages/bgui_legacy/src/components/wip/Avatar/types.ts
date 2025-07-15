import type { StyleProp, ViewStyle } from "react-native";

export interface AvatarProps {
	src?: string;
	name?: string;
	size?: "small" | "medium" | "large";
	variant?: "circle" | "square";
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

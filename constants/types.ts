import type { Href } from "expo-router";
import type {
	TextProps as RNTextProps,
	ViewProps as RNViewProps,
	StyleProp,
	TextStyle,
	ViewStyle,
} from "react-native";

// View types
export type ViewProps = RNViewProps & {
	type?: "background" | "card" | "mini-card";
	transparent?: boolean;
	rounded?: boolean;
	border?: boolean;
};

// Text types
export type TextProps = RNTextProps & {
	type?: "display" | "title" | "subtitle" | "default" | "small" | "link";
};

export type LinkProps = {
	text: string;
	href: Href;
	style?: StyleProp<TextStyle>;
};

// Button types
export type ButtonProps = {
	text?: string;
	icon?: string;
	iconType?: string;
	onPress: () => void;
};

// Icon types
export type IconSizeProps = "primary" | "secondary" | "small";

export type IconPrefix = "far" | "fas" | "fab";

export type IconProps = {
	name: string;
	color?: string;
	size?: IconSizeProps | number;
	type?: string;
	style?: StyleProp<ViewStyle>;
};

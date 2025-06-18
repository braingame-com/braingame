import type { TextProps as RNTextProps } from "react-native";

/**
 * Props for the {@link Text} component.
 */
export interface TextProps extends RNTextProps {
	/** Visual style of the text. */
	type?: "display" | "title" | "subtitle" | "default" | "small" | "link";
}

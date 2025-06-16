import type { TextProps as RNTextProps } from "react-native";

// Enterprise-grade TypeScript interfaces
export interface TextProps extends RNTextProps {
	type?: "display" | "title" | "subtitle" | "default" | "small" | "link";
}
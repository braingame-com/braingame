import type { ViewProps as RNViewProps } from "react-native";

// Enterprise-grade TypeScript interfaces
export interface ViewProps extends RNViewProps {
	type?: "background" | "card" | "surface";
	transparent?: boolean;
	rounded?: boolean;
	border?: boolean;
	hoverable?: boolean;
	grabbable?: boolean;
}
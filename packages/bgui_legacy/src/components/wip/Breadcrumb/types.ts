import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

export interface BreadcrumbItemProps {
	children: ReactNode;
	href?: string;
}

export interface BreadcrumbProps {
	children: ReactNode;
	separator?: ReactNode;
	maxItems?: number;
	variant?: "standard" | "compact";
	style?: ViewStyle;
}

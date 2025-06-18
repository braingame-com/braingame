import type { ReactNode } from "react";

export interface BreadcrumbProps {
	children: ReactNode;
	separator?: ReactNode;
	maxItems?: number;
	variant?: "standard" | "compact";
}

export interface BreadcrumbItemProps {
	children: ReactNode;
	href?: string;
	onPress?: () => void;
}

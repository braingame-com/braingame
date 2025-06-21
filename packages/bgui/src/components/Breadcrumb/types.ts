import type { ReactNode } from "react";

export interface BreadcrumbItemProps {
	children: ReactNode;
	href?: string;
}

export interface BreadcrumbProps {
	children: ReactNode;
	separator?: ReactNode;
	maxItems?: number;
	variant?: "standard" | "compact";
	style?: any;
}

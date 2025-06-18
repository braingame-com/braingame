import type { CSSProperties, ReactNode } from "react";
export interface LabelProps {
	children: ReactNode;
	htmlFor?: string;
	required?: boolean;
	size?: "sm" | "md" | "lg";
	variant?: "standard" | "floating";
	style?: CSSProperties;
}

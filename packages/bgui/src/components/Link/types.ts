import type React from "react";

export interface LinkProps {
	children: React.ReactNode;
	href?: string;
	onPress?: () => void;
	external?: boolean;
	disabled?: boolean;
	variant?: "inline" | "standalone";
	"aria-label"?: string;
	style?: any;
}

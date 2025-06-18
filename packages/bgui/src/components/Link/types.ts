import type { LinkProps as ExpoLinkProps } from "expo-router";
import type { ReactNode } from "react";

export interface LinkProps extends Omit<ExpoLinkProps, "href"> {
	children: ReactNode;
	href?: string;
	onPress?: () => void;
	external?: boolean;
	disabled?: boolean;
	variant?: "inline" | "standalone";
	"aria-label"?: string;
}

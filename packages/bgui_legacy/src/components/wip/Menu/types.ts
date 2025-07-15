import type { ReactNode } from "react";

export type MenuPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface MenuProps {
	trigger: ReactNode;
	children: ReactNode;
	placement?: MenuPlacement;
	variant?: "dropdown" | "context";
	closeOnSelect?: boolean;
	"aria-label"?: string;
}

export interface MenuItemProps {
	children: ReactNode;
	onPress?: () => void;
	disabled?: boolean;
}

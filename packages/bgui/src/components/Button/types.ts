import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";

export interface ButtonProps {
	children?: ReactNode;
	onPress: () => void;
	icon?: string;
	iconPosition?: "left" | "right";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	variant?: ButtonVariant;
	"aria-label"?: string;
	"aria-describedby"?: string;
}

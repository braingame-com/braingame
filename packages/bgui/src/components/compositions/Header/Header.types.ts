import type { ReactNode } from "react";
import type { IconName } from "../../../icons";
import type { ButtonProps } from "../../primitives/Button";

export interface HeaderLink {
	label: string;
	href: string;
	icon?: IconName;
	target?: "_self" | "_blank";
}

export interface HeaderCta {
	label: string;
	href?: string;
	onClick?: () => void;
	icon?: IconName;
	iconColor?: string;
	variant?: ButtonProps["variant"];
}

export interface HeaderProps {
	brand: ReactNode;
	links?: HeaderLink[];
	cta?: HeaderCta;
	backgroundColor?: string;
	border?: boolean;
	fixed?: boolean;
	paddingY?: "sm" | "md" | "lg";
}

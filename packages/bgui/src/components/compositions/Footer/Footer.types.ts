import type { ReactNode } from "react";
import type { IconName } from "../../../icons";

export interface FooterLink {
	label: string;
	href: string;
	target?: "_self" | "_blank";
}

export interface FooterSocialLink extends FooterLink {
	icon: IconName;
	ariaLabel?: string;
}

export interface FooterProps {
	brand?: ReactNode;
	description?: string;
	links?: FooterLink[];
	legalLinks?: FooterLink[];
	socialLinks?: FooterSocialLink[];
	copyright?: string;
	backgroundColor?: string;
	border?: boolean;
	paddingY?: "sm" | "md" | "lg";
}

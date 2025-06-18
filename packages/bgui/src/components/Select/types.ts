import type { ReactNode } from "react";

export interface SelectProps {
	children: ReactNode;
	value?: string | string[];
	onValueChange: (value: string | string[]) => void;
	placeholder?: string;
	searchable?: boolean;
	multiple?: boolean;
	disabled?: boolean;
	variant?: "dropdown" | "modal";
	"aria-label"?: string;
}

export interface SelectItemProps {
	value: string;
	children: ReactNode;
}

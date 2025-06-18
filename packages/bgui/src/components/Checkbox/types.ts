import type { ReactNode } from "react";

export interface CheckboxProps {
	checked: boolean;
	onValueChange: (value: boolean) => void;
	children?: ReactNode;
	indeterminate?: boolean;
	disabled?: boolean;
	"aria-label"?: string;
	"aria-describedby"?: string;
}

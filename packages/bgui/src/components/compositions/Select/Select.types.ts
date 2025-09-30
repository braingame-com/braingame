import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type SelectOptionValue = string | number;
export type SelectValue = SelectOptionValue | SelectOptionValue[] | null;

export interface SelectProps {
	value?: SelectValue;
	defaultValue?: SelectValue;
	disabled?: boolean;
	error?: boolean;
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	variant?: "plain" | "outlined" | "soft" | "solid";
	size?: "sm" | "md" | "lg";
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	indicator?: ReactNode;
	fullWidth?: boolean;
	placeholder?: string;
	name?: string;
	id?: string;
	required?: boolean;
	autoFocus?: boolean;
	multiple?: boolean;
	listboxOpen?: boolean;
	defaultListboxOpen?: boolean;
	renderValue?: (value: SelectValue) => ReactNode;
	onChange?: (event: React.SyntheticEvent | null, value: SelectValue) => void;
	onValueChange?: (value: SelectValue) => void;
	onListboxOpenChange?: (open: boolean) => void;
	onClose?: () => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	children?: ReactNode;
	className?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}

export interface OptionProps {
	value: SelectOptionValue;
	label?: string;
	disabled?: boolean;
	children?: ReactNode;
}

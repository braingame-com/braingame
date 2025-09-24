import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type SwitchSize = "sm" | "md" | "lg";
export type SwitchVariant = "plain" | "outlined" | "soft" | "solid";
export type SwitchColor = "primary" | "neutral" | "danger" | "success" | "warning";

export interface SwitchChangeEvent {
	target: {
		checked: boolean;
		name?: string;
		value?: string | number | readonly string[];
	};
	currentTarget: SwitchChangeEvent["target"];
	preventDefault: () => void;
	stopPropagation: () => void;
}

export interface SwitchProps {
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	color?: SwitchColor;
	variant?: SwitchVariant;
	size?: SwitchSize;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	trackChild?: ReactNode;
	name?: string;
	value?: string | number | readonly string[];
	required?: boolean;
	autoFocus?: boolean;
	readOnly?: boolean;
	onChange?: (event: SwitchChangeEvent) => void;
	onValueChange?: (checked: boolean) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	children?: ReactNode;
	className?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}

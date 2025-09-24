import type { ReactNode } from "react";
import type {
	GestureResponderEvent,
	NativeSyntheticEvent,
	StyleProp,
	TargetedEvent,
	ViewStyle,
} from "react-native";

export type CheckboxColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type CheckboxVariant = "plain" | "outlined" | "soft" | "solid";
export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxChangeEvent =
	| React.ChangeEvent<HTMLInputElement>
	| GestureResponderEvent
	| { target: { checked: boolean; value?: string | number | readonly string[] | undefined } };

export type CheckboxFocusEvent =
	| React.FocusEvent<HTMLInputElement>
	| GestureResponderEvent
	| NativeSyntheticEvent<TargetedEvent>;

export interface CheckboxProps {
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	indeterminate?: boolean;
	color?: CheckboxColor;
	variant?: CheckboxVariant;
	size?: CheckboxSize;
	label?: ReactNode;
	children?: ReactNode;
	name?: string;
	value?: string | number | readonly string[];
	disableIcon?: boolean;
	overlay?: boolean;
	required?: boolean;
	readOnly?: boolean;
	autoFocus?: boolean;
	checkedIcon?: ReactNode;
	uncheckedIcon?: ReactNode;
	indeterminateIcon?: ReactNode;
	onChange?: (event: CheckboxChangeEvent) => void;
	onFocus?: (event: CheckboxFocusEvent) => void;
	onBlur?: (event: CheckboxFocusEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	className?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}

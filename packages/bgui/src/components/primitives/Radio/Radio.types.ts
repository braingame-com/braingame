import type { ReactNode } from "react";
import type {
	GestureResponderEvent,
	NativeSyntheticEvent,
	StyleProp,
	TargetedEvent,
	ViewStyle,
} from "react-native";

export type RadioColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type RadioVariant = "plain" | "outlined" | "soft" | "solid";
export type RadioSize = "sm" | "md" | "lg";

export type RadioChangeEvent =
	| React.ChangeEvent<HTMLInputElement>
	| GestureResponderEvent
	| { target: { value: string | number | undefined } };

export type RadioFocusEvent =
	| React.FocusEvent<HTMLInputElement>
	| GestureResponderEvent
	| NativeSyntheticEvent<TargetedEvent>;

export interface RadioProps {
	value?: string | number;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	color?: RadioColor;
	variant?: RadioVariant;
	size?: RadioSize;
	label?: ReactNode;
	children?: ReactNode;
	name?: string;
	disableIcon?: boolean;
	overlay?: boolean;
	required?: boolean;
	readOnly?: boolean;
	autoFocus?: boolean;
	checkedIcon?: ReactNode;
	uncheckedIcon?: ReactNode;
	onChange?: (event: RadioChangeEvent) => void;
	onFocus?: (event: RadioFocusEvent) => void;
	onBlur?: (event: RadioFocusEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	className?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}

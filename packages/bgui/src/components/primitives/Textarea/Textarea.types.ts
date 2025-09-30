import type { ReactNode } from "react";
import type {
	NativeSyntheticEvent,
	StyleProp,
	TextInputChangeEventData,
	TextInputFocusEventData,
	TextInputKeyPressEventData,
	TextStyle,
	ViewStyle,
} from "react-native";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaVariant = "plain" | "outlined" | "soft" | "solid";
export type TextareaColor = "primary" | "neutral" | "danger" | "success" | "warning";

export interface TextareaProps {
	value?: string | number;
	defaultValue?: string | number;
	disabled?: boolean;
	error?: boolean;
	color?: TextareaColor;
	variant?: TextareaVariant;
	size?: TextareaSize;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	fullWidth?: boolean;
	minRows?: number;
	maxRows?: number;
	placeholder?: string;
	name?: string;
	id?: string;
	required?: boolean;
	autoFocus?: boolean;
	readOnly?: boolean;
	maxLength?: number;
	minLength?: number;
	rows?: number;
	cols?: number;
	wrap?: "soft" | "hard" | "off";
	onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
	onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onKeyDown?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
	onKeyUp?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
	onValueChange?: (value: string) => void;
	style?: StyleProp<ViewStyle>;
	inputStyle?: StyleProp<TextStyle>;
	testID?: string;
	children?: ReactNode;
	className?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}

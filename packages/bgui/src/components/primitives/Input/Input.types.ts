import type { ReactNode } from "react";
import type {
	NativeSyntheticEvent,
	StyleProp,
	TextInputChangeEventData,
	TextInputFocusEventData,
	TextInputKeyPressEventData,
	ViewStyle,
} from "react-native";

export type InputType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "search"
	| "date"
	| "time"
	| "datetime-local";

export interface InputProps {
	value?: string | number;
	defaultValue?: string | number;
	disabled?: boolean;
	error?: boolean;
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	variant?: "plain" | "outlined" | "soft" | "solid";
	size?: "sm" | "md" | "lg";
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	fullWidth?: boolean;
	type?: InputType;
	placeholder?: string;
	name?: string;
	id?: string;
	required?: boolean;
	autoFocus?: boolean;
	readOnly?: boolean;
	autoComplete?: string;
	maxLength?: number;
	minLength?: number;
	max?: number | string;
	min?: number | string;
	step?: number | string;
	pattern?: string;
	onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
	onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onKeyDown?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
	onKeyUp?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
}

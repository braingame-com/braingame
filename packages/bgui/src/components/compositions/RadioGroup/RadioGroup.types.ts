import type { ReactNode } from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import type { RadioColor, RadioSize, RadioVariant } from "../../primitives/Radio";

export type RadioGroupChangeEvent =
	| React.ChangeEvent<HTMLInputElement>
	| GestureResponderEvent
	| { target: { value: string | number | undefined; name?: string } };

export interface RadioGroupContextValue {
	value?: string | number;
	name?: string;
	disabled?: boolean;
	color: RadioColor;
	variant: RadioVariant;
	size: RadioSize;
	required?: boolean;
	readOnly?: boolean;
	disableIcon?: boolean;
	overlay?: boolean;
	onSelect: (value: string | number | undefined, event?: RadioGroupChangeEvent) => void;
	register?: (value: string | number | undefined) => void;
}

export type RadioGroupOrientation = "horizontal" | "vertical";

export interface RadioGroupProps {
	children?: ReactNode;
	value?: string | number;
	defaultValue?: string | number;
	name?: string;
	disabled?: boolean;
	color?: RadioColor;
	variant?: RadioVariant;
	size?: RadioSize;
	orientation?: RadioGroupOrientation;
	required?: boolean;
	readOnly?: boolean;
	disableIcon?: boolean;
	overlay?: boolean;
	onChange?: (event: RadioGroupChangeEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	className?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}

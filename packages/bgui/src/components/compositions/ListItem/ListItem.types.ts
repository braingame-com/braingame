import type { ReactNode } from "react";
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from "react-native";
import type {
	ListColor,
	ListItemValue,
	ListOrientation,
	ListSize,
	ListVariant,
} from "../List/List.types";

export interface ListItemProps extends Omit<PressableProps, "onPress" | "style" | "children"> {
	children?: ReactNode;
	value?: ListItemValue;
	color?: ListColor;
	variant?: ListVariant;
	size?: ListSize;
	orientation?: ListOrientation;
	startAction?: ReactNode;
	endAction?: ReactNode;
	nested?: boolean;
	button?: boolean;
	disabled?: boolean;
	selected?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	onClick?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
	"aria-labelledby"?: string;
	"aria-describedby"?: string;
	"aria-selected"?: boolean;
	"aria-disabled"?: boolean;
}

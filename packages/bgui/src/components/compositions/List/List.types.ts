import type { ReactNode, RefObject } from "react";
import type { GestureResponderEvent, StyleProp, ViewProps, ViewStyle } from "react-native";

export type ListColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type ListVariant = "plain" | "outlined" | "soft" | "solid";
export type ListSize = "sm" | "md" | "lg";
export type ListOrientation = "vertical" | "horizontal";
export type ListMarker = "disc" | "circle" | "square" | "decimal" | "none";
export type ListSelectionMode = "none" | "single";
export type ListItemValue = string | number;

export interface ListProps extends Omit<ViewProps, "style" | "children"> {
	children?: ReactNode;
	color?: ListColor;
	variant?: ListVariant;
	size?: ListSize;
	orientation?: ListOrientation;
	marker?: ListMarker;
	wrap?: boolean;
	selectionMode?: ListSelectionMode;
	defaultSelectedValue?: ListItemValue | null;
	selectedValue?: ListItemValue | null;
	onSelectionChange?: (value: ListItemValue | null) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
	"aria-labelledby"?: string;
	"aria-describedby"?: string;
}

export interface ListContextValue {
	color: ListColor;
	variant: ListVariant;
	size: ListSize;
	orientation: ListOrientation;
	marker: ListMarker;
	gap: number;
	padding: number;
	registerItem: (key: string, ref: RefObject<unknown>, options: { disabled: boolean }) => void;
	unregisterItem: (key: string) => void;
	updateItemOptions: (key: string, options: { disabled: boolean }) => void;
	getItemIndex: (key: string) => number;
	activeIndex: number;
	setActiveIndex: (index: number) => void;
	focusItem: (index: number) => void;
	onItemPress: (value: ListItemValue | undefined, event: GestureResponderEvent) => void;
	isItemSelected: (value: ListItemValue | undefined) => boolean;
	selectionMode: ListSelectionMode;
}

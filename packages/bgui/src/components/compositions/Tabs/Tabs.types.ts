import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type TabsValue = string | number;
export type TabsOrientation = "horizontal" | "vertical";
export type TabsColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type TabsVariant = "plain" | "outlined" | "soft" | "solid";
export type TabsSize = "sm" | "md" | "lg";

export interface TabsProps {
	children?: ReactNode;
	value?: TabsValue | null;
	defaultValue?: TabsValue | null;
	onChange?: (value: TabsValue | null) => void;
	orientation?: TabsOrientation;
	size?: TabsSize;
	color?: TabsColor;
	variant?: TabsVariant;
	allowKeyboardFocus?: boolean;
	selectionFollowsFocus?: boolean;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	/**
	 * Accessibility label exposed to assistive technologies.
	 */
	accessibilityLabel?: string;
	/**
	 * Identifier of the element describing the tabs container.
	 */
	accessibilityHint?: string;
	/**
	 * Identifier of the element labelling the tabs container.
	 */
	accessibilityLabelledBy?: string;
}

export interface TabListProps {
	children?: ReactNode;
	orientation?: TabsOrientation;
	size?: TabsSize;
	color?: TabsColor;
	variant?: TabsVariant;
	disableUnderline?: boolean;
	underlinePlacement?: "top" | "bottom" | "left" | "right";
	style?: StyleProp<ViewStyle>;
	testID?: string;
	accessibilityLabel?: string;
	accessibilityHint?: string;
	accessibilityLabelledBy?: string;
}

export interface TabProps {
	children?: ReactNode;
	value?: TabsValue;
	disabled?: boolean;
	size?: TabsSize;
	color?: TabsColor;
	variant?: TabsVariant;
	indicatorPlacement?: "top" | "bottom" | "left" | "right";
	indicatorInset?: boolean;
	disableIndicator?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	accessibilityLabel?: string;
	accessibilityHint?: string;
	accessibilityLabelledBy?: string;
	"aria-controls"?: string;
	onPress?: () => void;
	onClick?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
}

export interface TabPanelProps {
	children?: ReactNode;
	value: TabsValue;
	keepMounted?: boolean;
	size?: TabsSize;
	color?: TabsColor;
	variant?: TabsVariant;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	accessibilityLabel?: string;
	accessibilityHint?: string;
	accessibilityLabelledBy?: string;
}

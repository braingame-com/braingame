import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../../icons";

export interface TabBarItem {
	value: string;
	label: string;
	icon?: IconName;
	notificationBadge?: ReactNode;
	disabled?: boolean;
}

export type TabBarSize = "sm" | "md" | "lg";
export type TabBarTone = "primary" | "neutral";

export interface TabBarProps {
	items: TabBarItem[];
	activeValue: string;
	onChange?: (value: string) => void;
	size?: TabBarSize;
	tone?: TabBarTone;
	showIndicators?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}

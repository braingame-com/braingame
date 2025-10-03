import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../../icons";

export interface SidebarNavigationItem {
	value: string;
	label: string;
	href?: string;
	icon?: IconName;
}

export interface SidebarNavigationSection {
	title: string;
	items: SidebarNavigationItem[];
}

export interface SidebarNavigationProps {
	sections: SidebarNavigationSection[];
	activeItem?: string;
	onItemPress?: (item: SidebarNavigationItem, event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	ariaLabel?: string;
}

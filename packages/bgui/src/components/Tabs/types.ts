import type { ReactNode } from "react";
import type { View } from "react-native";

export type TabsVariant = "line" | "enclosed" | "pills";

export interface TabsProps {
	children: ReactNode;
	activeTab: string;
	onValueChange: (value: string) => void;
	scrollable?: boolean;
	variant?: TabsVariant;
}

export interface TabsListProps {
	children: ReactNode;
	scrollable?: boolean;
}

export interface TabProps {
	children: ReactNode;
	value: string;
	disabled?: boolean;
	tabRef?: (node: View | null) => void;
}

export interface TabsPanelsProps {
	children: ReactNode;
}

export interface TabsPanelProps {
	children: ReactNode;
	value: string;
}

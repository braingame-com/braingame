import type { ReactNode } from "react";
import type { View } from "react-native";

/**
 * Visual style variants for tabs
 */
export type TabsVariant = "line" | "enclosed" | "pills";

/**
 * Props for the Tabs component
 */
export interface TabsProps {
	/**
	 * Tab components and content panels.
	 * Should include Tabs.List and Tabs.Panels.
	 */
	children: ReactNode;

	/**
	 * Currently active tab value.
	 * Must match one of the Tab value props.
	 */
	activeTab: string;

	/**
	 * Callback fired when a tab is selected.
	 * Receives the value of the selected tab.
	 */
	onValueChange: (value: string) => void;

	/**
	 * Whether tabs can scroll horizontally when overflowing.
	 * Useful for many tabs or small screens.
	 * @default false
	 */
	scrollable?: boolean;

	/**
	 * Visual style of the tabs.
	 * - "line": Underlined active tab
	 * - "enclosed": Bordered container style
	 * - "pills": Rounded pill-shaped tabs
	 * @default "line"
	 */
	variant?: TabsVariant;
}

/**
 * Props for the Tabs.List component
 */
export interface TabsListProps {
	/**
	 * Tab components to display.
	 * Should contain multiple Tabs.Tab components.
	 */
	children: ReactNode;

	/**
	 * Whether the tab list can scroll horizontally.
	 * Inherited from parent Tabs component if not specified.
	 */
	scrollable?: boolean;
}

/**
 * Props for the Tabs.Tab component
 */
export interface TabProps {
	/**
	 * Tab label content.
	 * Can be text or custom React elements.
	 */
	children: ReactNode;

	/**
	 * Unique identifier for this tab.
	 * Used to match with panel and track active state.
	 */
	value: string;

	/**
	 * Whether the tab is disabled.
	 * Disabled tabs cannot be selected.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Ref callback for the tab element.
	 * Used internally for measurements.
	 */
	tabRef?: (node: View | null) => void;
}

/**
 * Props for the Tabs.Panels component
 */
export interface TabsPanelsProps {
	/**
	 * Panel components to display.
	 * Should contain multiple Tabs.Panel components.
	 */
	children: ReactNode;
}

/**
 * Props for the Tabs.Panel component
 */
export interface TabsPanelProps {
	/**
	 * Content to display in this panel.
	 * Shown when tab with matching value is active.
	 */
	children: ReactNode;

	/**
	 * Unique identifier matching a Tab value.
	 * Panel shown when tab with this value is active.
	 */
	value: string;
}

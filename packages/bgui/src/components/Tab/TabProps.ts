import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Tab component
 *
 * Tab is a button that triggers the display of a TabPanel.
 */
export interface TabProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The value of the Tab. It must be unique within the Tabs component.
	 */
	value?: string | number;

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'plain'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The indicator to display when the tab is selected.
	 */
	indicator?: ReactNode;

	/**
	 * The component orientation.
	 * @default 'horizontal'
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * Callback invoked when the tab is clicked.
	 */
	onClick?: (event: any) => void;

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * The ARIA role attribute.
	 * @default 'tab'
	 */
	role?: string;

	/**
	 * If `true`, the Tab is selected.
	 */
	"aria-selected"?: boolean;

	/**
	 * The id of the TabPanel the Tab controls.
	 */
	"aria-controls"?: string;

	/**
	 * The id of the Tab.
	 */
	id?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the tab.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the tab.
	 */
	"aria-labelledby"?: string;
}

import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for TabPanel component
 *
 * TabPanel is a container for content that is displayed when its corresponding Tab is selected.
 */
export interface TabPanelProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
	 */
	value?: string | number;

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * If `true`, the TabPanel will be kept mounted when it's not selected.
	 * @default false
	 */
	keepMounted?: boolean;

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
	 * @default 'tabpanel'
	 */
	role?: string;

	/**
	 * If `true`, the TabPanel is hidden.
	 */
	hidden?: boolean;

	/**
	 * The id of the Tab that controls the TabPanel.
	 */
	"aria-labelledby"?: string;

	/**
	 * The id of the TabPanel.
	 */
	id?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the tab panel.
	 */
	"aria-describedby"?: string;
}

import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for TabPanel component
 *
 * TODO: Add description of what TabPanel is used for
 */
export interface TabPanelProps {
	/**
	 * The content of the component
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'primary'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'solid'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * If true, the component is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Click handler
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
	 * Accessibility label
	 */
	"aria-label"?: string;
}

import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Tabs component
 *
 * Tabs organize content into multiple sections and allow users to navigate between them.
 */
export interface TabsProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The value of the currently selected Tab.
	 * If you don't want any selected Tab, you can set this prop to `null`.
	 */
	value?: string | number | null;

	/**
	 * The default value. Use when the component is not controlled.
	 */
	defaultValue?: string | number | null;

	/**
	 * The component orientation.
	 * @default 'horizontal'
	 */
	orientation?: "horizontal" | "vertical";

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
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Callback invoked when new value is being set.
	 */
	onChange?: (event: any, value: string | number | null) => void;

	/**
	 * If `true`, will allow focus on disabled items.
	 * @default false
	 */
	allowKeyboardFocus?: boolean;

	/**
	 * If `true` (Default) will focus element when selected.
	 * @default true
	 */
	selectionFollowsFocus?: boolean;

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

	/**
	 * The id of the element describing the tabs.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the tabs.
	 */
	"aria-labelledby"?: string;
}

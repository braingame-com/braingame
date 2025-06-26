import type { ReactNode } from "react";

/**
 * Menu placement positions relative to trigger
 */
export type MenuPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

/**
 * Props for the Menu component
 */
export interface MenuProps {
	/**
	 * Trigger element that opens the menu.
	 * Typically a Button or other interactive element.
	 */
	trigger: ReactNode;

	/**
	 * Menu items to display.
	 * Should contain MenuItem components.
	 */
	children: ReactNode;

	/**
	 * Position of menu relative to trigger.
	 * @default "bottom-start"
	 */
	placement?: MenuPlacement;

	/**
	 * Menu activation style.
	 * - "dropdown": Opens on click/tap
	 * - "context": Opens on right-click (web only)
	 * @default "dropdown"
	 */
	variant?: "dropdown" | "context";

	/**
	 * Whether to close menu when an item is selected.
	 * @default true
	 */
	closeOnSelect?: boolean;

	/**
	 * Accessibility label for the menu.
	 * Describes the menu's purpose.
	 */
	"aria-label"?: string;
}

/**
 * Props for the MenuItem component
 */
export interface MenuItemProps {
	/**
	 * Menu item label or content.
	 * Can be text or custom React elements.
	 */
	children: ReactNode;

	/**
	 * Callback fired when item is selected.
	 * Menu closes after if closeOnSelect is true.
	 */
	onPress?: () => void;

	/**
	 * Whether the menu item is disabled.
	 * Disabled items cannot be selected.
	 * @default false
	 */
	disabled?: boolean;
}

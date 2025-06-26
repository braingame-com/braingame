import type { ReactNode } from "react";

/**
 * Props for the ActionList component
 */
export interface ActionListProps {
	/**
	 * ActionList items to display.
	 * Should contain ActionListItem and ActionListDivider components.
	 */
	children: ReactNode;

	/**
	 * Whether items can be selected.
	 * Enables multi-selection when true.
	 * @default false
	 */
	selectable?: boolean;

	/**
	 * Currently selected item values (controlled).
	 * Array of item value strings.
	 */
	selectedItems?: string[];

	/**
	 * Callback fired when selection changes.
	 * Receives array of selected item values.
	 */
	onSelectionChange?: (items: string[]) => void;

	/**
	 * Visual style variant.
	 * - "menu": Menu-style list with hover states
	 * - "list": Standard list appearance
	 * - "compact": Reduced padding for dense layouts
	 * @default "list"
	 */
	variant?: "menu" | "list" | "compact";

	/**
	 * Accessibility label for the list.
	 * Describes the list purpose.
	 */
	"aria-label"?: string;
}

/**
 * Props for the ActionListItem component
 */
export interface ActionListItemProps {
	/**
	 * Item label or content.
	 * Can be text or custom React elements.
	 */
	children: ReactNode;

	/**
	 * Unique value for this item.
	 * Used for selection tracking.
	 */
	value?: string;

	/**
	 * Icon name to display before label.
	 * Uses Icon component internally.
	 */
	icon?: string;

	/**
	 * Callback fired when item is pressed.
	 * Not called when selectable mode is active.
	 */
	onPress?: () => void;

	/**
	 * Whether the item is disabled.
	 * Disabled items have reduced opacity and ignore interactions.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether item supports selection.
	 * Inherited from parent ActionList.
	 * @internal
	 */
	selectable?: boolean;

	/**
	 * Whether item is currently selected.
	 * Managed by parent ActionList.
	 * @internal
	 */
	selected?: boolean;

	/**
	 * Selection handler.
	 * Managed by parent ActionList.
	 * @internal
	 */
	onSelect?: () => void;

	/**
	 * Navigate to next item.
	 * @internal
	 */
	onArrowNext?: () => void;

	/**
	 * Navigate to previous item.
	 * @internal
	 */
	onArrowPrev?: () => void;
}

/**
 * Props for the ActionListDivider component.
 * Empty object as dividers have no configurable props.
 */
export type ActionListDividerProps = Record<string, never>;

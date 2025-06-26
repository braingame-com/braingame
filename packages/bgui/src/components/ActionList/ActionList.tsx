import React, { Children, isValidElement, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { ActionListItem } from "./ActionListItem";
import type { ActionListItemProps, ActionListProps } from "./types";

/**
 * ActionList component for displaying lists of interactive items.
 * Supports selection, keyboard navigation, and multiple visual variants.
 *
 * @example
 * ```tsx
 * // Basic action list
 * <ActionList>
 *   <ActionListItem onPress={() => console.log('Edit')}>Edit</ActionListItem>
 *   <ActionListItem onPress={() => console.log('Delete')}>Delete</ActionListItem>
 *   <ActionListDivider />
 *   <ActionListItem onPress={() => console.log('Share')}>Share</ActionListItem>
 * </ActionList>
 *
 * // Selectable list
 * <ActionList
 *   selectable
 *   selectedItems={selected}
 *   onSelectionChange={setSelected}
 * >
 *   <ActionListItem value="1" icon="file">Document 1</ActionListItem>
 *   <ActionListItem value="2" icon="file">Document 2</ActionListItem>
 *   <ActionListItem value="3" icon="file">Document 3</ActionListItem>
 * </ActionList>
 *
 * // Menu variant with icons
 * <ActionList variant="menu" aria-label="File menu">
 *   <ActionListItem icon="file-plus" onPress={handleNew}>
 *     New File
 *   </ActionListItem>
 *   <ActionListItem icon="folder-open" onPress={handleOpen}>
 *     Open...
 *   </ActionListItem>
 *   <ActionListDivider />
 *   <ActionListItem icon="save" onPress={handleSave}>
 *     Save
 *   </ActionListItem>
 *   <ActionListItem icon="save" onPress={handleSaveAs} disabled>
 *     Save As...
 *   </ActionListItem>
 * </ActionList>
 *
 * // Compact variant for dense layouts
 * <ActionList variant="compact">
 *   <ActionListItem>Option A</ActionListItem>
 *   <ActionListItem>Option B</ActionListItem>
 *   <ActionListItem>Option C</ActionListItem>
 * </ActionList>
 * ```
 *
 * @component
 */
export const ActionList = ({
	children,
	selectable = false,
	selectedItems,
	onSelectionChange,
	variant = "list",
	"aria-label": ariaLabel,
}: ActionListProps) => {
	const [internalSelection, setInternalSelection] = useState<string[]>([]);
	const isControlled = selectedItems !== undefined;
	const selection = isControlled ? selectedItems || [] : internalSelection;
	const itemRefs = useRef<Array<{ focus?: () => void } | null>>([]);

	const handleSelect = (value: string) => {
		const newSelection = selection.includes(value)
			? selection.filter((v) => v !== value)
			: [...selection, value];
		if (!isControlled) {
			setInternalSelection(newSelection);
		}
		onSelectionChange?.(newSelection);
	};

	const focusItem = (index: number) => {
		const ref = itemRefs.current[index];
		if (ref && typeof ref.focus === "function") {
			ref.focus();
		}
	};

	const enhancedChildren = Children.map(children, (child, index) => {
		if (!isValidElement(child)) return child;
		const typeInfo = child.type as { displayName?: string };
		if (typeInfo.displayName === ActionListItem.displayName) {
			const childProps = child.props as { value?: string };
			const value = childProps.value ?? index.toString();
			const childElement = child as React.ReactElement<ActionListItemProps>;
			return React.cloneElement(childElement, {
				selectable,
				selected: selectable && selection.includes(value),
				onSelect: () => handleSelect(value),
				onArrowNext: () => focusItem((index + 1) % itemRefs.current.length),
				onArrowPrev: () =>
					focusItem((index - 1 + itemRefs.current.length) % itemRefs.current.length),
			});
		}
		return child;
	});

	const role = selectable ? "listbox" : variant === "menu" ? "menu" : "list";
	const accessibilityRole = role === "listbox" ? "list" : role === "menu" ? "menu" : "list";

	return (
		<View
			accessibilityRole={accessibilityRole as "list" | "menu"}
			{...(Platform.OS === "web" && role !== "listbox"
				? {
						role,
						"aria-label": ariaLabel,
						"aria-multiselectable": selectable,
						"aria-orientation": "vertical" as const,
					}
				: {})}
		>
			{enhancedChildren}
		</View>
	);
};

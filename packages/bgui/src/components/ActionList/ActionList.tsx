import React, { Children, cloneElement, isValidElement, useRef, useState } from "react";
import { View } from "react-native";
import { ActionListItem } from "./ActionListItem";
import type { ActionListItemProps, ActionListProps } from "./types";

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
			const value = child.props.value ?? index.toString();
			// TypeScript workaround: cast to any to allow ref prop
			// biome-ignore lint/suspicious/noExplicitAny: Required for ref prop in cloneElement
			return React.cloneElement(child as React.ReactElement<any>, {
				ref: (node: { focus?: () => void } | null) => {
					itemRefs.current[index] = node;
				},
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

	return (
		<View
			accessibilityRole={role}
			role={role}
			aria-label={ariaLabel}
			aria-multiselectable={selectable}
			aria-orientation="vertical"
		>
			{enhancedChildren}
		</View>
	);
};

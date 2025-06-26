import type { ReactNode } from "react";

export interface ActionListProps {
	children: ReactNode;
	selectable?: boolean;
	selectedItems?: string[];
	onSelectionChange?: (items: string[]) => void;
	variant?: "menu" | "list" | "compact";
	"aria-label"?: string;
}

export interface ActionListItemProps {
	children: ReactNode;
	value?: string;
	icon?: string;
	onPress?: () => void;
	disabled?: boolean;
	selectable?: boolean;
	selected?: boolean;
	onSelect?: () => void;
	onArrowNext?: () => void;
	onArrowPrev?: () => void;
}

export type ActionListDividerProps = Record<string, never>;

import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

/**
 * Props for the BreadcrumbItem component
 */
export interface BreadcrumbItemProps {
	/**
	 * Text or content for the breadcrumb item.
	 * Typically a page or section name.
	 */
	children: ReactNode;

	/**
	 * Link destination for the breadcrumb.
	 * If provided, item becomes clickable.
	 */
	href?: string;
}

/**
 * Props for the Breadcrumb component
 */
export interface BreadcrumbProps {
	/**
	 * BreadcrumbItem components to display.
	 * Represents the navigation hierarchy.
	 */
	children: ReactNode;

	/**
	 * Separator between breadcrumb items.
	 * Can be text or custom element.
	 * @default "/"
	 */
	separator?: ReactNode;

	/**
	 * Maximum items to display before truncation.
	 * Shows first and last with ellipsis in between.
	 */
	maxItems?: number;

	/**
	 * Visual style variant.
	 * - "standard": Normal spacing
	 * - "compact": Reduced spacing
	 * @default "standard"
	 */
	variant?: "standard" | "compact";

	/**
	 * Additional styles to apply to the container.
	 */
	style?: ViewStyle;
}

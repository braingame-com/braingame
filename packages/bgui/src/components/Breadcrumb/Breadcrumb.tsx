import React from "react";
import { Text, View } from "react-native";
import { Link } from "../Link";
import { styles } from "./styles";
import type { BreadcrumbItemProps, BreadcrumbProps } from "./types";

/**
 * Individual breadcrumb item within a Breadcrumb component.
 * Renders as a link if href is provided, otherwise as plain text.
 *
 * @component
 */
export function BreadcrumbItem({ children, href }: BreadcrumbItemProps) {
	return href ? <Link href={href}>{children}</Link> : <Text>{children}</Text>;
}

/**
 * Breadcrumb component for displaying navigation hierarchy.
 * Shows the current page's location within a site structure.
 *
 * @example
 * ```tsx
 * // Basic breadcrumb
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *   <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
 *   <BreadcrumbItem>Smartphones</BreadcrumbItem>
 * </Breadcrumb>
 *
 * // Custom separator
 * <Breadcrumb separator=">">
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
 *   <BreadcrumbItem>Getting Started</BreadcrumbItem>
 * </Breadcrumb>
 *
 * // With max items (truncation)
 * <Breadcrumb maxItems={3}>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/a">Category A</BreadcrumbItem>
 *   <BreadcrumbItem href="/a/b">Subcategory B</BreadcrumbItem>
 *   <BreadcrumbItem href="/a/b/c">Item C</BreadcrumbItem>
 *   <BreadcrumbItem>Details</BreadcrumbItem>
 * </Breadcrumb>
 *
 * // Compact variant
 * <Breadcrumb variant="compact">
 *   <BreadcrumbItem href="/account">Account</BreadcrumbItem>
 *   <BreadcrumbItem href="/account/settings">Settings</BreadcrumbItem>
 *   <BreadcrumbItem>Privacy</BreadcrumbItem>
 * </Breadcrumb>
 *
 * // Custom separator element
 * <Breadcrumb separator={<Icon name="chevron-right" size="sm" />}>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
 *   <BreadcrumbItem>Latest Posts</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 *
 * @component
 */
export function Breadcrumb({
	children,
	separator = "/",
	maxItems,
	variant = "standard",
	style,
}: BreadcrumbProps) {
	const items = React.Children.toArray(children);
	let displayItems = items;
	if (maxItems && items.length > maxItems) {
		displayItems = [items[0], "...", items[items.length - 1]];
	}

	return (
		<View style={[styles.container, style]}>
			{displayItems.map((child, index) => (
				<View
					key={child === "..." ? "ellipsis" : `breadcrumb-${index}`}
					style={[styles.item, variant === "compact" && styles.compactItem]}
				>
					{child}
					{index < displayItems.length - 1 && <Text>{separator}</Text>}
				</View>
			))}
		</View>
	);
}

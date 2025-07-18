import React from "react";
import { Text, View } from "react-native";
import { Link } from "../Link";
import { styles } from "./styles";
import type { BreadcrumbItemProps, BreadcrumbProps } from "./types";

export function BreadcrumbItem({ children, href }: BreadcrumbItemProps) {
	return href ? <Link href={href}>{children}</Link> : <Text>{children}</Text>;
}

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

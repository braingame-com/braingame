import { Children, type ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Tokens } from "../../../../utils/constants/Tokens";
import { Text } from "../../Text";
import type { BreadcrumbProps } from "./types";

export const Breadcrumb = ({
	children,
	separator = "/",
	maxItems,
	variant = "standard",
}: BreadcrumbProps) => {
	const itemsArray = Children.toArray(children);

	let displayItems = itemsArray;
	if (maxItems && itemsArray.length > maxItems) {
		const start = itemsArray.slice(0, 1);
		const end = itemsArray.slice(itemsArray.length - (maxItems - 1));
		displayItems = [...start, "...", ...end];
	}

	return (
		<View
			accessibilityRole="navigation"
			accessibilityLabel={`Breadcrumb with ${itemsArray.length} items`}
			style={[styles.container, variant === "compact" && styles.compact]}
		>
			{displayItems.map((item, index) => {
				const key = typeof item === "string" ? `text-${index}-${item}` : `item-${index}`;
				return (
					<View key={key} style={styles.itemContainer}>
						{typeof item === "string" ? <Text>{item}</Text> : (item as ReactElement)}
						{index < displayItems.length - 1 && <Text style={styles.separator}>{separator}</Text>}
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: Tokens.xs,
	},
	compact: {
		gap: Tokens.xxs,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	separator: {
		marginHorizontal: Tokens.xxs,
	},
});

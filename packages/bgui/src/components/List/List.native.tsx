import { createBox, useTheme } from "@shopify/restyle";
import React, { forwardRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import type { Theme } from "../../theme/theme";
import type { ListProps } from "./ListProps";

const _Box = createBox<Theme>();

/**
 * Native implementation of List component
 *
 * Lists are continuous, vertical indexes of text or images.
 * Container component that manages list items.
 */
export const List = forwardRef<View, ListProps>(
	(
		{
			children,
			color = "neutral",
			variant = "plain",
			size = "md",
			orientation = "vertical",
			marker = "none",
			wrap = false,
			style,
			testID,
			role = "list",
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedBy,
			"aria-labelledby": ariaLabelledBy,
			...props
		},
		ref,
	) => {
		const restyleTheme = useTheme<Theme>();

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.List.variants;
			const variantStyle = theme.components.List.variants[variantKey];

			if (!variantStyle) {
				// Fallback to plain-neutral
				return theme.components.List.variants["plain-neutral"];
			}

			return variantStyle;
		};

		// Get size-based padding
		const getSizePadding = () => {
			switch (size) {
				case "sm":
					return theme.spacing.xs;
				case "lg":
					return theme.spacing.lg;
				default:
					return theme.spacing.sm;
			}
		};

		const variantStyles = getVariantStyles();
		const padding = getSizePadding();

		// Build container styles
		const containerStyles = [
			styles.container,
			orientation === "horizontal" && styles.horizontal,
			{
				backgroundColor: variantStyles.backgroundColor
					? restyleTheme.colors[variantStyles.backgroundColor as keyof Theme["colors"]]
					: "transparent",
				borderWidth: variantStyles.borderWidth || 0,
				borderColor: variantStyles.borderColor
					? restyleTheme.colors[variantStyles.borderColor as keyof Theme["colors"]]
					: "transparent",
				padding,
			},
			style,
		];

		// Determine if we need a scrollable container for horizontal lists
		const content = React.Children.map(children, (child, index) =>
			React.isValidElement(child)
				? React.cloneElement(child as React.ReactElement<any>, {
						// Pass context props to children
						__listContext: {
							size,
							color,
							variant,
							marker,
							orientation,
							index,
						},
					})
				: child,
		);

		if (orientation === "horizontal" && wrap) {
			return (
				<ScrollView
					ref={ref as any}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={containerStyles}
					accessible
					accessibilityRole={role as any}
					accessibilityLabel={ariaLabel}
					accessibilityLabelledBy={ariaLabelledBy}
					accessibilityHint={ariaDescribedBy}
					testID={testID}
					{...props}
				>
					{content}
				</ScrollView>
			);
		}

		return (
			<View
				ref={ref}
				style={containerStyles}
				accessible
				accessibilityRole={role as any}
				accessibilityLabel={ariaLabel}
				accessibilityLabelledBy={ariaLabelledBy}
				accessibilityHint={ariaDescribedBy}
				testID={testID}
				{...props}
			>
				{content}
			</View>
		);
	},
);

List.displayName = "List";

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
	},
	horizontal: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
});

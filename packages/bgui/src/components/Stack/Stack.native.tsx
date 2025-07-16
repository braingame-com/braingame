import { createBox } from "@shopify/restyle";
import type React from "react";
import { Children, Fragment, isValidElement } from "react";
import { View } from "react-native";
import type { Theme } from "../../theme";
import { theme } from "../../theme";
import type { StackProps } from "./StackProps";

const RestyleBox = createBox<Theme>();

/**
 * Native implementation of Stack component
 *
 * Stack is a layout component that arranges its children with consistent spacing.
 * It uses flexbox for layout and supports both row and column directions.
 * This implementation matches Joy UI's Stack behavior for React Native.
 */
export const Stack: React.FC<StackProps> = ({
	children,
	direction = "column",
	spacing = 0,
	divider,
	useFlexGap = true,
	style,
	testID,
}) => {
	// Convert spacing prop to actual pixel value
	const getSpacingValue = (space: typeof spacing): number => {
		if (typeof space === "number") return space;
		return theme.spacing[space] || 0;
	};

	const spacingValue = getSpacingValue(spacing);
	const childrenArray = Children.toArray(children).filter(isValidElement);

	// Base style for the container
	const containerStyle = {
		flexDirection: direction,
		...(useFlexGap && spacingValue > 0 ? { gap: spacingValue } : {}),
		...style,
	} as const;

	// If we have a divider and no gap support, we need to render dividers between children
	if (divider && childrenArray.length > 1) {
		const childrenWithDividers: React.ReactNode[] = [];

		childrenArray.forEach((child, index) => {
			childrenWithDividers.push(child);

			// Add divider between children (not after the last one)
			if (index < childrenArray.length - 1) {
				childrenWithDividers.push(<Fragment key={`divider-${index}`}>{divider}</Fragment>);
			}
		});

		return (
			<RestyleBox testID={testID} style={containerStyle}>
				{childrenWithDividers}
			</RestyleBox>
		);
	}

	// If no gap support and we need spacing, add margins to children
	if (!useFlexGap && spacingValue > 0 && childrenArray.length > 1) {
		const isRow = direction === "row" || direction === "row-reverse";
		const marginProp = isRow ? "marginLeft" : "marginTop";
		const isReverse = direction === "row-reverse" || direction === "column-reverse";

		return (
			<RestyleBox testID={testID} style={containerStyle}>
				{childrenArray.map((child, index) => {
					const isFirst = isReverse ? index === childrenArray.length - 1 : index === 0;
					const marginStyle = !isFirst ? { [marginProp]: spacingValue } : {};

					return (
						<View key={child.key || index} style={marginStyle}>
							{child}
						</View>
					);
				})}
			</RestyleBox>
		);
	}

	// Simple case: just render children with gap
	return (
		<RestyleBox testID={testID} style={containerStyle}>
			{children}
		</RestyleBox>
	);
};

"use client";
import type React from "react";
import { Children, Fragment, isValidElement } from "react";
import { theme } from "../../theme";
import type { StackProps } from "./StackProps";

/**
 * Web implementation of Stack component
 *
 * This is adapted from Joy UI's Stack implementation but simplified
 * to work with our shared StackProps interface.
 * It provides the same layout behavior using CSS flexbox.
 */
export const Stack: React.FC<StackProps> = ({
	children,
	direction = "column",
	spacing = 0,
	divider,
	useFlexGap = true,
	style,
	testID,
	...rest
}) => {
	// Convert spacing prop to actual pixel value
	const getSpacingValue = (space: typeof spacing): string => {
		if (typeof space === "number") return `${space}px`;
		// @ts-ignore - we know theme.spacing exists
		return `${theme.spacing[space] || 0}px`;
	};

	const spacingValue = getSpacingValue(spacing);
	const childrenArray = Children.toArray(children).filter(isValidElement);

	// Base styles for the container
	const containerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: direction as any,
		...(useFlexGap && spacing ? { gap: spacingValue } : {}),
		...((style as React.CSSProperties) || {}),
	};

	// If we have a divider, insert it between children
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
			<div data-testid={testID} style={containerStyle} {...rest}>
				{childrenWithDividers}
			</div>
		);
	}

	// If no gap support requested and we need spacing, add margins to children
	if (!useFlexGap && spacing && childrenArray.length > 1) {
		const isRow = direction === "row" || direction === "row-reverse";
		const marginProp = isRow ? "marginLeft" : "marginTop";
		const isReverse = direction === "row-reverse" || direction === "column-reverse";

		return (
			<div data-testid={testID} style={containerStyle} {...rest}>
				{childrenArray.map((child, index) => {
					const isFirst = isReverse ? index === childrenArray.length - 1 : index === 0;
					const marginStyle = !isFirst ? { [marginProp]: spacingValue } : {};

					return (
						<div key={child.key || index} style={marginStyle}>
							{child}
						</div>
					);
				})}
			</div>
		);
	}

	// Simple case: just render children with gap
	return (
		<div data-testid={testID} style={containerStyle} {...rest}>
			{children}
		</div>
	);
};

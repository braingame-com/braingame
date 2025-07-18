"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { ListItemProps } from "./ListItemProps";

/**
 * Web implementation of ListItem component
 *
 * List items are used to represent items in a list.
 * Based on Joy UI's ListItem implementation.
 */

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
	(
		{ children, variant = "plain", className, style, testID, "aria-label": ariaLabel, ...props },
		ref,
	) => {
		// Get variant styles
		const variantStyles = restyleTheme.components.ListItem?.variants?.[variant] || {};

		// Build styles
		const listitemStyles: React.CSSProperties = {
			// Base styles
			fontFamily: restyleTheme.textVariants.body1.fontFamily,
			fontSize: "16px",

			// Variant styles
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			border: variantStyles.borderColor ? `1px solid ${variantStyles.borderColor}` : undefined,

			// Additional styles
			...style,
		};

		return (
			<li
				ref={ref}
				className={className}
				style={listitemStyles}
				data-testid={testID}
				aria-label={ariaLabel}
				{...props}
			>
				{children}
			</li>
		);
	},
);

ListItem.displayName = "ListItem";

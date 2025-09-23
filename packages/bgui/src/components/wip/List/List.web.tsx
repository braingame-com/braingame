// @ts-nocheck
"use client";
import React from "react";
import { theme as restyleTheme } from "../../../theme";
import type { ListProps } from "./ListProps";

/**
 * Web implementation of List component
 *
 * Lists are continuous, vertical indexes of text or images.
 * Based on Joy UI's List implementation.
 */

export const List = React.forwardRef<HTMLUListElement, ListProps>(
	(
		{
			children,
			size = "md",
			variant = "plain",
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		// Get variant styles
		const variantStyles = restyleTheme.components.List?.variants?.[variant] || {};

		// Build styles
		const listStyles: React.CSSProperties = {
			// Base styles
			fontFamily: restyleTheme.textVariants.body1.fontFamily,
			fontSize: size === "sm" ? "14px" : size === "lg" ? "18px" : "16px",

			// Variant styles
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			border: variantStyles.borderColor ? `1px solid ${variantStyles.borderColor}` : undefined,

			// Additional styles
			...style,
		};

		return (
			<ul
				ref={ref}
				className={className}
				style={listStyles}
				data-testid={testID}
				aria-label={ariaLabel}
				{...props}
			>
				{children}
			</ul>
		);
	},
);

List.displayName = "List";

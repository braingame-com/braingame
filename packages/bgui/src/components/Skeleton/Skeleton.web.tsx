"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { SkeletonProps } from "./SkeletonProps";

/**
 * Web implementation of Skeleton component
 *
 * Skeleton displays a placeholder preview of content before the data gets loaded.
 * Based on Joy UI's Skeleton implementation.
 */

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	(
		{
			children,
			variant = "text",
			animation = "pulse",
			level = "body-md",
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.Skeleton?.variants?.[variantKey] || {};

		// Build styles
		const skeletonStyles: React.CSSProperties = {
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
			<span
				ref={ref}
				className={className}
				style={skeletonStyles}
				data-testid={testID}
				aria-label={ariaLabel}
				{...props}
			>
				{children}
			</span>
		);
	},
);

Skeleton.displayName = "Skeleton";

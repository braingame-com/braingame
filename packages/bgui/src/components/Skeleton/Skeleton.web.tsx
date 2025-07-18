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
			width,
			height,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		// Get variant styles
		const _variantStyles = restyleTheme.components.Skeleton?.variants?.[variant] || {};

		// Build styles
		const baseStyles: React.CSSProperties = {
			display: "block",
			backgroundColor: "#e0e0e0",
			borderRadius: restyleTheme.radii.sm,
			position: "relative",
			overflow: "hidden",
		};

		// Apply variant-specific styles
		const variantSpecificStyles: React.CSSProperties =
			{
				text: {
					height: height || "1.2em",
					width: width || "100%",
				},
				rectangular: {
					height: height || 100,
					width: width || "100%",
				},
				circular: {
					height: height || 40,
					width: width || 40,
					borderRadius: "50%",
				},
				overlay: {
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					height: "100%",
					width: "100%",
				},
				inline: {
					display: "inline-block",
					height: height || "1em",
					width: width || "5em",
					verticalAlign: "middle",
				},
			}[variant] || {};

		// Animation styles
		const animationStyles: React.CSSProperties =
			animation === "pulse"
				? {
						animation: "skeleton-pulse 1.5s ease-in-out infinite",
					}
				: animation === "wave"
					? {
							animation: "skeleton-wave 1.5s linear infinite",
						}
					: {};

		const skeletonStyles: React.CSSProperties = {
			...baseStyles,
			...variantSpecificStyles,
			...animationStyles,
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

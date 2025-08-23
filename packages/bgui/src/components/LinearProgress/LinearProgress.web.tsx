"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { LinearProgressProps } from "./LinearProgressProps";

/**
 * Web implementation of LinearProgress component
 *
 * Linear progress indicators express an unspecified wait time or display the length of a process.
 * Based on Joy UI's LinearProgress implementation.
 */

export const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
	(
		{
			children,
			size = "md",
			variant = "soft",
			color = "primary",
			value = 0,
			determinate = false,
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
		const variantStyles = restyleTheme.components.LinearProgress?.variants?.[variantKey] || {};

		// Build styles
		const linearprogressStyles: React.CSSProperties = {
			// Base styles
			fontFamily: restyleTheme.textVariants.body1.fontFamily,
			fontSize: size === "sm" ? "14px" : size === "lg" ? "18px" : "16px",

			// Variant styles
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			border: variantStyles.borderColor ? `1px solid ${variantStyles.borderColor}` : undefined,

			// Additional styles
			...((style as React.CSSProperties) || {}),
		};

		return (
			<div
				className={className}
				style={{
					display: "inline-flex",
					alignItems: "center",
					position: "relative",
				}}
				data-testid={testID}
			>
				<div ref={ref} style={linearprogressStyles} role="progressbar" aria-label={ariaLabel} {...props}>
					{children}
				</div>
			</div>
		);
	},
);

LinearProgress.displayName = "LinearProgress";

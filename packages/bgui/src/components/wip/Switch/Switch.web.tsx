// @ts-nocheck
"use client";
import React from "react";
import { theme as restyleTheme } from "../../../theme";
import type { SwitchProps } from "./SwitchProps";

/**
 * Web implementation of Switch component
 *
 * Switches toggle the state of a single setting on or off.
 * Based on Joy UI's Switch implementation.
 */

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			children,
			size = "md",
			color = "neutral",
			variant = "solid",
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
		const variantStyles = restyleTheme.components.Switch?.variants?.[variantKey] || {};

		// Build styles
		const switchStyles: React.CSSProperties = {
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
			<div
				className={className}
				style={{
					display: "inline-flex",
					alignItems: "center",
					position: "relative",
				}}
				data-testid={testID}
			>
				<input ref={ref} type="checkbox" style={switchStyles} aria-label={ariaLabel} {...props} />
			</div>
		);
	},
);

Switch.displayName = "Switch";

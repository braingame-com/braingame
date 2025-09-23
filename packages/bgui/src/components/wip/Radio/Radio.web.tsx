// @ts-nocheck
"use client";
import React from "react";
import { theme as restyleTheme } from "../../../theme";
import type { RadioProps } from "./RadioProps";

/**
 * Web implementation of Radio component
 *
 * Radio buttons allow users to select a single option from a list.
 * Based on Joy UI's Radio implementation.
 */

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			children,
			size = "md",
			color = "neutral",
			variant = "outlined",
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
		const variantStyles = restyleTheme.components.Radio?.variants?.[variantKey] || {};

		// Build styles
		const radioStyles: React.CSSProperties = {
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
				<input ref={ref} type="radio" style={radioStyles} aria-label={ariaLabel} {...props} />
			</div>
		);
	},
);

Radio.displayName = "Radio";

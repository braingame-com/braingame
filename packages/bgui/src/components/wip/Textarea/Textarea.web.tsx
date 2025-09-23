// @ts-nocheck
"use client";
import React from "react";
import { theme as restyleTheme } from "../../../theme";
import type { TextareaProps } from "./TextareaProps";

/**
 * Web implementation of Textarea component
 *
 * Textarea allows users to enter and edit multi-line text.
 * Based on Joy UI's Textarea implementation.
 */

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			children,
			size = "md",
			variant = "outlined",
			color = "neutral",
			rows = 2,
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
		const variantStyles = restyleTheme.components.Textarea?.variants?.[variantKey] || {};

		// Build styles
		const textareaStyles: React.CSSProperties = {
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
				<textarea ref={ref} style={textareaStyles} aria-label={ariaLabel} {...props}>
					{children}
				</textarea>
			</div>
		);
	},
);

Textarea.displayName = "Textarea";

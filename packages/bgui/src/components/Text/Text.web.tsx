"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { TextProps } from "./TextProps";

/**
 * Web implementation of Text component
 *
 * Text component for consistent text rendering.
 * Based on Joy UI's Typography implementation.
 * Supports both Restyle variants and Joy UI levels for compatibility.
 */

// Context for nested text (for display: inline behavior)
export const TextNestedContext = React.createContext(false);

// Context for inherited text level
export const TextInheritContext = React.createContext(false);

// Map level to default HTML element
const levelToElement: Record<string, string> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	body1: "p",
	body2: "p",
	body3: "p",
	"body-sm": "p",
	"body-md": "p",
	"body-lg": "p",
	inherit: "span",
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
	(
		{
			children,
			level,
			color = "neutral",
			variant = "plain",
			component,
			gutterBottom = false,
			noWrap = false,
			textColor,
			startDecorator,
			endDecorator,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		const nesting = React.useContext(TextNestedContext);
		const inheriting = React.useContext(TextInheritContext);

		// Map Restyle variants to Joy UI levels if needed
		const effectiveLevel = (() => {
			if (level) return level;
			
			// Check if variant is a Restyle typography variant
			const restyleVariantMap: Record<string, string> = {
				h1: "h1",
				h2: "h2",
				h3: "h3",
				h4: "h4",
				h5: "title-lg",
				h6: "title-md",
				body1: "body-md",
				body2: "body-sm",
				button: "body-sm",
				caption: "body-xs",
				overline: "body-xs",
				subtitle1: "title-md",
				subtitle2: "title-sm",
			};
			
			if (variant && restyleVariantMap[variant]) {
				return restyleVariantMap[variant];
			}
			
			return "body-md";
		})();

		// Determine effective level considering nesting
		const finalLevel = nesting || inheriting ? "inherit" : effectiveLevel;

		// Determine element type
		const elementType = component || levelToElement[finalLevel] || "span";

		// Get typography styles from theme
		const typographyStyles =
			finalLevel !== "inherit"
				? restyleTheme.textVariants[finalLevel as keyof typeof restyleTheme.textVariants] || {}
				: { font: "inherit" };

		// Check if variant is a style variant (not a typography variant)
		const isStyleVariant = (v: string): boolean => {
			return ["plain", "outlined", "soft", "solid"].includes(v);
		};

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = isStyleVariant(variant || "plain") 
			? restyleTheme.components.Typography?.variants?.[variantKey] || {}
			: {};

		// Build styles
		const elementStyles: React.CSSProperties = {
			// Base styles
			margin: 0,
			padding: 0,
			...typographyStyles,

			// Display based on nesting and decorators
			display: nesting ? "inline" : startDecorator || endDecorator ? "flex" : "block",

			// Alignment for decorators
			...(startDecorator ||
				(endDecorator && {
					alignItems: "center",
					gap: "clamp(4px, 0.375em, 0.75rem)",
				})),

			// Wrap behavior
			...(noWrap && {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			}),

			// Bottom margin for gutterBottom
			...(gutterBottom && {
				marginBottom: finalLevel.startsWith("h") ? "0.35em" : "0.5em",
			}),

			// Color based on variant
			...(isStyleVariant(variant || "plain") && variant === "plain"
				? {
						color: textColor || restyleTheme.colors[color] || restyleTheme.colors.onSurface,
					}
				: isStyleVariant(variant || "plain")
				? {
						...variantStyles,
						paddingBlock: "min(0.1em, 4px)",
						paddingInline: "0.25em",
						marginInline: "-0.25em",
						borderRadius: restyleTheme.radii.xs,
					}
				: {
						color: textColor || restyleTheme.colors[color] || restyleTheme.colors.onSurface,
					}),

			// Additional styles
			...style,
		};

		const Element = elementType as any;

		return (
			<TextNestedContext.Provider value={true}>
				<Element
					ref={ref}
					className={className}
					style={elementStyles}
					data-testid={testID}
					aria-label={ariaLabel}
					{...props}
				>
					{startDecorator && (
						<span
							style={{
								display: "inline-flex",
								marginInlineEnd: "clamp(4px, 0.375em, 0.75rem)",
							}}
						>
							{startDecorator}
						</span>
					)}
					{children}
					{endDecorator && (
						<span
							style={{
								display: "inline-flex",
								marginInlineStart: "clamp(4px, 0.375em, 0.75rem)",
							}}
						>
							{endDecorator}
						</span>
					)}
				</Element>
			</TextNestedContext.Provider>
		);
	},
);

Text.displayName = "Text";

"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { TypographyProps } from "./TypographyProps";

/**
 * Web implementation of Typography component
 *
 * Typography component for consistent text rendering.
 * Based on Joy UI's Typography implementation.
 */

// Context for nested typography (for display: inline behavior)
export const TypographyNestedContext = React.createContext(false);

// Context for inherited typography level
export const TypographyInheritContext = React.createContext(false);

// Map level to default HTML element
const levelToElement: Record<string, string> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	"title-lg": "p",
	"title-md": "p",
	"title-sm": "p",
	"body-lg": "p",
	"body-md": "p",
	"body-sm": "p",
	"body-xs": "span",
	inherit: "span",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	(
		{
			children,
			level = "body-md",
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
		const nesting = React.useContext(TypographyNestedContext);
		const inheriting = React.useContext(TypographyInheritContext);

		// Determine effective level
		const effectiveLevel = nesting || inheriting ? "inherit" : level;

		// Determine element type
		const elementType = component || levelToElement[effectiveLevel] || "span";

		// Get typography styles from theme
		const typographyStyles =
			effectiveLevel !== "inherit"
				? restyleTheme.textVariants[effectiveLevel as keyof typeof restyleTheme.textVariants] || {}
				: { font: "inherit" };

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.Typography?.variants?.[variantKey] || {};

		// Build styles
		const elementStyles: React.CSSProperties = {
			// Base styles
			margin: 0,
			padding: 0,
			...typographyStyles,

			// Display based on nesting and decorators
			display: nesting ? "inline" : startDecorator || endDecorator ? "flex" : "block",

			// Alignment for decorators
			...(startDecorator || endDecorator
				? {
						alignItems: "center",
						gap: "clamp(4px, 0.375em, 0.75rem)",
					}
				: {}),

			// Wrap behavior
			...(noWrap && {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			}),

			// Bottom margin for gutterBottom
			...(gutterBottom && {
				marginBottom: effectiveLevel.startsWith("h") ? "0.35em" : "0.5em",
			}),

			// Color based on variant
			...(variant === "plain"
				? {
						color: textColor || restyleTheme.colors[color] || restyleTheme.colors.onSurface,
					}
				: {
						...variantStyles,
						paddingBlock: "min(0.1em, 4px)",
						paddingInline: "0.25em",
						marginInline: "-0.25em",
						borderRadius: restyleTheme.radii.xs,
					}),

			// Additional styles
			...style,
		};

		const Element = elementType as any;

		return (
			<TypographyNestedContext.Provider value={true}>
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
			</TypographyNestedContext.Provider>
		);
	},
);

Typography.displayName = "Typography";

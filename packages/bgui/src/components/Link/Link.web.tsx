"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { LinkProps } from "./LinkProps";

/**
 * Web implementation of Link component
 *
 * Links allow users to navigate to different locations.
 * Based on Joy UI's Link implementation.
 */

// Helper to check if event target has focus visible
const isFocusVisible = (element: Element): boolean => {
	try {
		return element.matches(":focus-visible");
	} catch (_error) {
		// Fallback for browsers that don't support :focus-visible
		return element === document.activeElement;
	}
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			children,
			color = "primary",
			variant = "plain",
			level = "body-md",
			underline = "hover",
			disabled = false,
			overlay = false,
			startDecorator,
			endDecorator,
			component,
			href,
			onClick,
			onFocus,
			onBlur,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		const [focusVisible, setFocusVisible] = React.useState(false);

		const handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
			if (isFocusVisible(event.target)) {
				setFocusVisible(true);
			}
			onFocus?.(event);
		};

		const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
			setFocusVisible(false);
			onBlur?.(event);
		};

		const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
			if (disabled) {
				event.preventDefault();
				return;
			}
			onClick?.(event);
		};

		// Determine the component to render
		const Component = component || (href ? "a" : "button");
		const isButton = Component === "button" || (!href && !component);

		// Get typography styles from theme
		const typographyStyles =
			level !== "inherit"
				? restyleTheme.textVariants[level as keyof typeof restyleTheme.textVariants] || {}
				: { font: "inherit" };

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.Link?.variants?.[variantKey] || {};

		// Build underline styles
		const underlineStyles: React.CSSProperties = {};
		if (underline === "none") {
			underlineStyles.textDecoration = "none";
		} else if (underline === "always") {
			underlineStyles.textDecoration = "underline";
		} else if (underline === "hover") {
			underlineStyles.textDecoration = "none";
		}

		// Main color for plain variant
		const mainColor =
			variant === "plain"
				? restyleTheme.colors[color] || restyleTheme.colors.primary
				: variantStyles.color;

		// Build styles
		const linkStyles: React.CSSProperties = {
			// Typography
			...typographyStyles,

			// Layout
			display: "inline-flex",
			alignItems: "center",
			gap: startDecorator || endDecorator ? "0.375em" : undefined,

			// Appearance
			...underlineStyles,
			textDecorationThickness: "max(0.08em, 1px)",
			textUnderlineOffset: "0.15em",
			textDecorationColor: disabled
				? "rgba(0, 0, 0, 0.38)"
				: `rgba(${hexToRgb(mainColor || "#1976d2")}, 0.72)`,

			// Color based on variant
			...(variant === "plain"
				? {
						color: disabled ? `rgba(${hexToRgb(mainColor || "#1976d2")}, 0.6)` : mainColor,
					}
				: {
						...variantStyles,
						...(variant && {
							paddingBlock: "min(0.1em, 4px)",
							paddingInline: "0.25em",
							marginInline: "-0.25em",
						}),
					}),

			// Interaction
			cursor: disabled ? "default" : "pointer",
			userSelect: isButton ? "none" : undefined,
			pointerEvents: disabled ? "none" : undefined,

			// Reset button styles
			...(isButton && {
				backgroundColor: "transparent",
				border: 0,
				font: "inherit",
				textAlign: "inherit",
			}),

			// Focus styles
			outline: 0,
			borderRadius: restyleTheme.radii.xs,
			position: overlay ? "initial" : "relative",

			// Transitions
			transition: "color 0.2s, text-decoration-color 0.2s",

			// Custom styles
			...style,

			// Hover state (only applied via JS for better control)
			...(underline === "hover" &&
				!disabled &&
				focusVisible && {
					textDecoration: "underline",
				}),
		};

		// Overlay styles
		const overlayStyles: React.CSSProperties | undefined = overlay
			? {
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					borderRadius: "inherit",
					content: '""',
					pointerEvents: "none",
				}
			: undefined;

		// Focus outline
		if (focusVisible && !overlay) {
			linkStyles.outline = `2px solid ${restyleTheme.colors.primary}`;
			linkStyles.outlineOffset = "2px";
		}

		const elementProps = {
			ref,
			className,
			style: linkStyles,
			onClick: handleClick,
			onFocus: handleFocus,
			onBlur: handleBlur,
			"data-testid": testID,
			"aria-label": ariaLabel,
			"aria-disabled": disabled || undefined,
			...(Component === "a" && { href: disabled ? undefined : href }),
			...(isButton && {
				type: "button" as const,
				disabled,
				role: "link",
			}),
			...props,
		};

		return (
			<Component {...elementProps}>
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
							marginInlineStart: "clamp(4px, 0.25em, 0.5rem)",
						}}
					>
						{endDecorator}
					</span>
				)}
				{overlay && focusVisible && <span style={overlayStyles} />}
			</Component>
		);
	},
);

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		const r = Number.parseInt(result[1], 16);
		const g = Number.parseInt(result[2], 16);
		const b = Number.parseInt(result[3], 16);
		return `${r}, ${g}, ${b}`;
	}
	return "0, 0, 0";
}

Link.displayName = "Link";

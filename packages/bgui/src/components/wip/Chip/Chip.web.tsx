// @ts-nocheck
"use client";
import * as React from "react";
import type { ChipProps } from "./ChipProps";

/**
 * Web implementation of Chip
 *
 * Chips represent complex entities in small blocks, such as a contact.
 * Based on Joy UI Chip implementation
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(function Chip(
	{
		children,
		color = "neutral",
		variant = "soft",
		size = "md",
		disabled = false,
		onClick,
		startDecorator,
		endDecorator,
		style,
		"aria-label": ariaLabel,
		testID,
		...other
	},
	ref,
) {
	const clickable = !!onClick;
	const [focusVisible, setFocusVisible] = React.useState(false);

	// Size configurations
	const sizeConfig = {
		sm: {
			paddingInline: "0.375rem",
			minHeight: "1.25rem",
			fontSize: "0.75rem",
			gap: "3px",
		},
		md: {
			paddingInline: "0.5rem",
			minHeight: "1.5rem",
			fontSize: "0.875rem",
			gap: "0.25rem",
		},
		lg: {
			paddingInline: "0.75rem",
			minHeight: "1.75rem",
			fontSize: "1rem",
			gap: "0.375rem",
		},
	};

	const config = sizeConfig[size];

	// Color and variant styles
	const getVariantStyles = () => {
		const baseStyles = {
			primary: {
				solid: { backgroundColor: "#0f172a", color: "#ffffff" },
				soft: { backgroundColor: "#dbeafe", color: "#1e40af" },
				outlined: { backgroundColor: "transparent", color: "#1e40af", border: "1px solid #1e40af" },
				plain: { backgroundColor: "transparent", color: "#1e40af" },
			},
			neutral: {
				solid: { backgroundColor: "#71717a", color: "#ffffff" },
				soft: { backgroundColor: "#f4f4f5", color: "#3f3f46" },
				outlined: { backgroundColor: "transparent", color: "#3f3f46", border: "1px solid #d4d4d8" },
				plain: { backgroundColor: "transparent", color: "#3f3f46" },
			},
			danger: {
				solid: { backgroundColor: "#dc2626", color: "#ffffff" },
				soft: { backgroundColor: "#fee2e2", color: "#dc2626" },
				outlined: { backgroundColor: "transparent", color: "#dc2626", border: "1px solid #dc2626" },
				plain: { backgroundColor: "transparent", color: "#dc2626" },
			},
			success: {
				solid: { backgroundColor: "#16a34a", color: "#ffffff" },
				soft: { backgroundColor: "#dcfce7", color: "#16a34a" },
				outlined: { backgroundColor: "transparent", color: "#16a34a", border: "1px solid #16a34a" },
				plain: { backgroundColor: "transparent", color: "#16a34a" },
			},
			warning: {
				solid: { backgroundColor: "#ea580c", color: "#ffffff" },
				soft: { backgroundColor: "#fed7aa", color: "#ea580c" },
				outlined: { backgroundColor: "transparent", color: "#ea580c", border: "1px solid #ea580c" },
				plain: { backgroundColor: "transparent", color: "#ea580c" },
			},
		};

		return baseStyles[color][variant];
	};

	const variantStyles = getVariantStyles();

	const rootStyles: React.CSSProperties = {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: config.gap,
		minHeight: config.minHeight,
		paddingLeft: config.paddingInline,
		paddingRight: config.paddingInline,
		borderRadius: "1.5rem",
		fontSize: config.fontSize,
		lineHeight: 1,
		fontWeight: 500,
		maxWidth: "max-content",
		whiteSpace: "nowrap",
		textDecoration: "none",
		verticalAlign: "middle",
		boxSizing: "border-box",
		cursor: clickable && !disabled ? "pointer" : "default",
		opacity: disabled ? 0.6 : 1,
		transition: "all 0.2s ease-in-out",
		...(variantStyles || {}),
		...((style as React.CSSProperties) || {}),
	};

	const _actionStyles: React.CSSProperties = {
		position: "absolute",
		inset: 0,
		zIndex: 0,
		width: "100%",
		height: "100%",
		border: "none",
		cursor: "inherit",
		padding: 0,
		margin: 0,
		backgroundColor: "transparent",
		borderRadius: "inherit",
		outline: focusVisible ? "2px solid #1e40af" : "none",
		outlineOffset: 2,
	};

	const contentStyles: React.CSSProperties = {
		position: "relative",
		zIndex: 1,
		display: "inherit",
		alignItems: "inherit",
		gap: "inherit",
		pointerEvents: "none",
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (!disabled && onClick) {
			onClick(e as React.MouseEvent<HTMLDivElement>);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// For button elements, native key handling is sufficient
		// Only add custom behavior if needed
		if (e.key === "Enter" || e.key === " ") {
			// Let the button handle this naturally
		}
	};

	const handleFocus = () => setFocusVisible(true);
	const handleBlur = () => setFocusVisible(false);
	const handleMouseDown = () => setFocusVisible(false);

	// Use semantic button element when clickable for better accessibility
	if (clickable) {
		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				type="button"
				disabled={disabled}
				aria-label={ariaLabel}
				data-testid={testID}
				style={rootStyles}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onMouseDown={handleMouseDown}
				{...other}
			>
				<span style={contentStyles}>
					{startDecorator && <span>{startDecorator}</span>}
					<span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span>
					{endDecorator && <span>{endDecorator}</span>}
				</span>
			</button>
		);
	}

	// Use semantic span for non-interactive chips
	return (
		<span
			ref={ref as React.Ref<HTMLSpanElement>}
			data-testid={testID}
			style={rootStyles}
			{...other}
		>
			<span style={contentStyles}>
				{startDecorator && <span>{startDecorator}</span>}
				<span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span>
				{endDecorator && <span>{endDecorator}</span>}
			</span>
		</span>
	);
});

"use client";
import * as React from "react";
import type { BadgeProps } from "./BadgeProps";

/**
 * Web implementation of Badge
 *
 * Based on Joy UI Badge implementation with our shared BadgeProps interface
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
	{
		children,
		color = "primary",
		variant = "solid",
		size = "md",
		dot = false,
		max = 99,
		badgeContent,
		invisible = false,
		style,
		"aria-label": ariaLabel,
		testID,
		...other
	},
	ref,
) {
	// Logic for determining visibility
	let isInvisible = invisible;

	if (invisible === false && badgeContent != null) {
		if ((badgeContent === 0 && !dot) || badgeContent === "") {
			isInvisible = true;
		}
	}

	// Logic for display value
	let displayValue = badgeContent;
	if (badgeContent && typeof badgeContent === "number" && badgeContent > max) {
		displayValue = `${max}+`;
	}

	if (dot) {
		displayValue = "";
	}

	// Size configurations
	const sizeConfig = {
		sm: {
			minHeight: dot ? "0.5rem" : "1rem",
			paddingX: "0.25rem",
			fontSize: "0.75rem",
			lineHeight: "1rem",
		},
		md: {
			minHeight: dot ? "0.75rem" : "1.25rem",
			paddingX: "0.375rem",
			fontSize: "0.875rem",
			lineHeight: "1.25rem",
		},
		lg: {
			minHeight: dot ? "1rem" : "1.5rem",
			paddingX: "0.5rem",
			fontSize: "1rem",
			lineHeight: "1.5rem",
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

	const badgeStyles: React.CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 0,
		right: 0,
		minHeight: config.minHeight,
		minWidth: config.minHeight,
		padding: dot ? "0" : `0 ${config.paddingX}`,
		fontSize: config.fontSize,
		lineHeight: config.lineHeight,
		fontWeight: 500,
		borderRadius: config.minHeight,
		boxShadow: "0 0 0 2px white",
		transform: isInvisible ? "scale(0)" : "scale(1)",
		transformOrigin: "top right",
		transition: "transform 0.2s ease-in-out",
		zIndex: 1,
		...getVariantStyles(),
		...style,
	};

	const rootStyles: React.CSSProperties = {
		position: "relative",
		display: "inline-flex",
		verticalAlign: "middle",
		flexShrink: 0,
	};

	return (
		<span ref={ref} style={rootStyles} data-testid={testID} {...other}>
			{children}
			<span
				style={badgeStyles}
				aria-live={badgeContent ? "polite" : undefined}
				aria-hidden={isInvisible || !badgeContent ? "true" : undefined}
				title={badgeContent && ariaLabel ? ariaLabel : undefined}
			>
				{displayValue}
			</span>
		</span>
	);
});

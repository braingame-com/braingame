// @ts-nocheck
"use client";
import type React from "react";
import type { ContainerProps } from "./ContainerProps";

/**
 * Web implementation of Container component
 *
 * Provides responsive max-width constraints and horizontal centering.
 * Based on Material-UI's Container implementation pattern.
 */

// Breakpoint values matching Joy UI defaults
const BREAKPOINTS = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

// Max-width values for each breakpoint
const MAX_WIDTHS = {
	xs: 444,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

// Fixed mode widths (matches min-width of breakpoint)
const FIXED_WIDTHS = {
	xs: BREAKPOINTS.xs,
	sm: BREAKPOINTS.sm,
	md: BREAKPOINTS.md,
	lg: BREAKPOINTS.lg,
	xl: BREAKPOINTS.xl,
};

export const Container: React.FC<ContainerProps> = ({
	children,
	disableGutters = false,
	fixed = false,
	maxWidth = "lg",
	style,
	testID,
}) => {
	const getMaxWidth = () => {
		if (maxWidth === false) {
			return undefined;
		}

		if (fixed) {
			return FIXED_WIDTHS[maxWidth as keyof typeof FIXED_WIDTHS];
		}

		return MAX_WIDTHS[maxWidth as keyof typeof MAX_WIDTHS];
	};

	// Get appropriate padding based on screen size
	// This would ideally use a media query but for simplicity we use a default
	const getPadding = () => {
		if (disableGutters) return 0;

		// In a real implementation, this would be responsive
		// For now, we'll use the larger padding as default
		return 24;
	};

	const containerStyles: React.CSSProperties = {
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		display: "block",
		boxSizing: "border-box",
		maxWidth: getMaxWidth(),
		paddingLeft: getPadding(),
		paddingRight: getPadding(),
		...style,
	};

	return (
		<div data-testid={testID} style={containerStyles}>
			{children}
		</div>
	);
};

// @ts-nocheck
import type React from "react";
import { Dimensions } from "react-native";
import { Box } from "../Box";
import type { ContainerProps } from "./ContainerProps";

/**
 * Native implementation of Container component
 *
 * Provides responsive max-width constraints and horizontal centering
 * for React Native applications.
 */

// Get screen dimensions for responsive behavior
const { width: screenWidth } = Dimensions.get("window");

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
			return Math.min(FIXED_WIDTHS[maxWidth as keyof typeof FIXED_WIDTHS], screenWidth);
		}

		return Math.min(MAX_WIDTHS[maxWidth as keyof typeof MAX_WIDTHS], screenWidth);
	};

	// Get appropriate padding based on screen size
	const getPadding = () => {
		if (disableGutters) return undefined;

		// Responsive padding based on screen width
		if (screenWidth >= BREAKPOINTS.sm) {
			return "lg"; // 24px
		}
		return "md"; // 16px
	};

	const containerMaxWidth = getMaxWidth();
	const horizontalPadding = getPadding();

	return (
		<Box
			testID={testID}
			width="100%"
			maxWidth={containerMaxWidth}
			alignSelf="center"
			paddingHorizontal={horizontalPadding}
			style={style}
		>
			{children}
		</Box>
	);
};

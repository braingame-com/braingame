// @ts-nocheck
"use client";
import React from "react";
import type { GridProps } from "./GridProps";

/**
 * Web implementation of Grid component
 *
 * A responsive layout grid adapts to screen size and orientation.
 * Based on Joy UI's Grid implementation (CSS Grid based).
 */

type ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T };

const resolveResponsiveValue = <T,>(
	value: ResponsiveValue<T> | undefined,
	breakpoint: string,
	defaultValue?: T,
): T | undefined => {
	if (value === undefined) return defaultValue;
	if (typeof value === "object" && value !== null) {
		// Check exact breakpoint first, then fall back to smaller breakpoints
		const breakpoints = ["xs", "sm", "md", "lg", "xl"];
		const currentIndex = breakpoints.indexOf(breakpoint);

		for (let i = currentIndex; i >= 0; i--) {
			const bp = breakpoints[i] as keyof typeof value;
			if (value[bp] !== undefined) {
				return value[bp] as T;
			}
		}
		return defaultValue;
	}
	return value as T;
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
	(
		{
			children,
			container = false,
			xs,
			sm,
			md,
			lg,
			xl,
			columns = 12,
			spacing = 0,
			direction = "row",
			wrap = "wrap",
			columnSpacing,
			rowSpacing,
			alignItems,
			justifyContent,
			component: Component = "div",
			className,
			style,
			testID,
			...props
		},
		ref,
	) => {
		// Get current breakpoint (simplified - in production would use resize observer)
		const [currentBreakpoint, setCurrentBreakpoint] = React.useState("md");

		React.useEffect(() => {
			const updateBreakpoint = () => {
				const width = window.innerWidth;
				if (width < 600) setCurrentBreakpoint("xs");
				else if (width < 900) setCurrentBreakpoint("sm");
				else if (width < 1200) setCurrentBreakpoint("md");
				else if (width < 1536) setCurrentBreakpoint("lg");
				else setCurrentBreakpoint("xl");
			};

			updateBreakpoint();
			window.addEventListener("resize", updateBreakpoint);
			return () => window.removeEventListener("resize", updateBreakpoint);
		}, []);

		// Resolve responsive values
		const resolvedColumns = resolveResponsiveValue(columns, currentBreakpoint, 12);
		const resolvedSpacing = resolveResponsiveValue(spacing, currentBreakpoint, 0);
		const resolvedColumnSpacing = resolveResponsiveValue(
			columnSpacing ?? spacing,
			currentBreakpoint,
			resolvedSpacing,
		);
		const resolvedRowSpacing = resolveResponsiveValue(
			rowSpacing ?? spacing,
			currentBreakpoint,
			resolvedSpacing,
		);
		// Get the size value for the current breakpoint
		const getCurrentSize = () => {
			const breakpointOrder = ["xl", "lg", "md", "sm", "xs"];
			const breakpointValues = { xs, sm, md, lg, xl };

			const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

			// Find the first defined breakpoint value
			for (let i = currentIndex; i >= 0; i--) {
				const bp = breakpointOrder[i] as keyof typeof breakpointValues;
				if (breakpointValues[bp] !== undefined) {
					return breakpointValues[bp];
				}
			}
			return undefined;
		};

		const resolvedSize = getCurrentSize();

		// Calculate spacing in pixels (theme spacing is in px)
		const columnGap = typeof resolvedColumnSpacing === "number" ? resolvedColumnSpacing * 8 : 0;
		const rowGap = typeof resolvedRowSpacing === "number" ? resolvedRowSpacing * 8 : 0;

		// Build styles
		const gridStyles: React.CSSProperties = {
			...((style as React.CSSProperties) || {}),
		};

		if (container) {
			// Container styles
			Object.assign(gridStyles, {
				display: "grid",
				gridTemplateColumns: `repeat(${resolvedColumns}, 1fr)`,
				gap: `${rowGap}px ${columnGap}px`,
				flexDirection: direction,
				flexWrap: wrap,
				alignItems,
				justifyContent,
			});
		} else if (resolvedSize) {
			// Item styles
			const span = resolvedSize === true ? "auto" : resolvedSize;
			Object.assign(gridStyles, {
				gridColumn: span === "auto" ? "auto" : `span ${span}`,
			});
		}

		// Type assertion to handle the component prop properly
		const ElementType = Component as React.ElementType;

		return (
			<ElementType
				ref={ref}
				className={className}
				style={gridStyles}
				data-testid={testID}
				{...props}
			>
				{children}
			</ElementType>
		);
	},
);

Grid.displayName = "Grid";

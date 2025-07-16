import React, { Children, forwardRef, useImperativeHandle, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { GridProps } from "./GridProps";

/**
 * Native implementation of Grid component
 *
 * The Grid component helps manage layout and create responsive designs.
 * This implementation provides a 12-column grid system with breakpoint support.
 */

const GRID_SIZE = 12;

export const Grid = forwardRef<View, GridProps>(
	(
		{
			children,
			container = false,
			item = false,
			xs,
			sm,
			md,
			lg,
			xl,
			spacing = 0,
			columnSpacing,
			rowSpacing,
			direction = "row",
			justifyContent = "flex-start",
			alignItems = "stretch",
			wrap = "wrap",
			style,
			testID,
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const gridRef = useRef<View>(null);

		// Merge refs
		useImperativeHandle(ref, () => gridRef.current!);

		// Get current screen width for responsive behavior
		const screenWidth = Dimensions.get("window").width;

		// Determine current breakpoint
		const getCurrentBreakpoint = () => {
			if (screenWidth < 600) return "xs";
			if (screenWidth < 960) return "sm";
			if (screenWidth < 1280) return "md";
			if (screenWidth < 1920) return "lg";
			return "xl";
		};

		const currentBreakpoint = getCurrentBreakpoint();

		// Get the column span for current breakpoint
		const getColumnSpan = () => {
			const breakpointOrder = ["xl", "lg", "md", "sm", "xs"];
			const breakpointValues = { xs, sm, md, lg, xl };
			
			let span: boolean | "auto" | number = false;
			
			// Find the first defined breakpoint value
			for (const bp of breakpointOrder) {
				if (breakpointValues[bp as keyof typeof breakpointValues] !== undefined) {
					const index = breakpointOrder.indexOf(bp);
					const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
					
					// Use this value if it's for current or larger breakpoint
					if (currentIndex >= index) {
						span = breakpointValues[bp as keyof typeof breakpointValues] as any;
						break;
					}
				}
			}

			return span;
		};

		// Calculate flex basis for grid items
		const getFlexBasis = () => {
			if (!item) return undefined;

			const span = getColumnSpan();
			
			if (span === false) return undefined;
			if (span === "auto") return "auto";
			if (span === true) return "100%";
			if (typeof span === "number") {
				return `${(span / GRID_SIZE) * 100}%`;
			}
			
			return undefined;
		};

		// Parse spacing value
		const parseSpacing = (value: number | string): number => {
			if (typeof value === "number") {
				return value * theme.spacing.xs; // Default spacing unit
			}
			return 0;
		};

		// Get spacing values
		const horizontalSpacing = parseSpacing(columnSpacing ?? spacing);
		const verticalSpacing = parseSpacing(rowSpacing ?? spacing);

		// Container styles
		const containerStyles = container ? [
			styles.container,
			{
				flexDirection: direction,
				justifyContent,
				alignItems,
				flexWrap: wrap,
				marginHorizontal: horizontalSpacing ? -horizontalSpacing / 2 : 0,
				marginVertical: verticalSpacing ? -verticalSpacing / 2 : 0,
			},
			style,
		] : undefined;

		// Item styles
		const itemStyles = item ? [
			styles.item,
			{
				flexBasis: getFlexBasis(),
				flexGrow: getColumnSpan() === true ? 1 : 0,
				flexShrink: 0,
				paddingHorizontal: horizontalSpacing ? horizontalSpacing / 2 : 0,
				paddingVertical: verticalSpacing ? verticalSpacing / 2 : 0,
			},
			style,
		] : undefined;

		// Final styles
		const finalStyles = container ? containerStyles : itemStyles || [style];

		// If container, wrap children with spacing context
		if (container && (horizontalSpacing || verticalSpacing)) {
			const childrenWithSpacing = Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === Grid) {
					// Pass spacing to child Grid items
					return React.cloneElement(child as React.ReactElement<any>, {
						__gridSpacing: { horizontal: horizontalSpacing, vertical: verticalSpacing },
					});
				}
				return child;
			});

			return (
				<Box
					ref={gridRef}
					style={finalStyles}
					testID={testID}
					accessibilityLabel={ariaLabel}
				>
					{childrenWithSpacing}
				</Box>
			);
		}

		// Apply inherited spacing if this is an item
		const inheritedSpacing = (props as any).__gridSpacing;
		if (item && inheritedSpacing && !style) {
			finalStyles.push({
				paddingHorizontal: inheritedSpacing.horizontal / 2,
				paddingVertical: inheritedSpacing.vertical / 2,
			});
		}

		return (
			<Box
				ref={gridRef}
				style={finalStyles}
				testID={testID}
				accessibilityLabel={ariaLabel}
			>
				{children}
			</Box>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
	},
	item: {
		display: "flex",
	},
});

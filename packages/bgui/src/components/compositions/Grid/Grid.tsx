import type React from "react";
import { createContext, forwardRef, useContext, useMemo } from "react";
import { type DimensionValue, StyleSheet, useWindowDimensions, type ViewStyle } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import type { SpacingValue } from "../../primitives/Stack";
import type { GridBreakpoint, GridItemSize, GridProps, ResponsiveProp } from "./Grid.types";

const BREAKPOINT_ORDER: GridBreakpoint[] = ["xs", "sm", "md", "lg", "xl"];

interface GridContextValue {
	horizontal: number;
	vertical: number;
	columns: number;
}

const GridContext = createContext<GridContextValue | null>(null);

const resolveSpacing = (theme: Theme, value: SpacingValue | undefined) => {
	if (typeof value === "number") return value;
	if (!value) return 0;
	return theme.spacing[value as keyof Theme["spacing"]] ?? 0;
};

const resolveResponsiveValue = <T,>(
	value: ResponsiveProp<T> | undefined,
	current: GridBreakpoint,
	fallback?: T,
): T | undefined => {
	if (value === undefined || value === null) {
		return fallback;
	}

	if (typeof value !== "object" || Array.isArray(value)) {
		return value as T;
	}

	const mapped = value as Partial<Record<GridBreakpoint, T>>;
	const currentIndex = BREAKPOINT_ORDER.indexOf(current);

	for (let index = currentIndex; index >= 0; index -= 1) {
		const breakpoint = BREAKPOINT_ORDER[index];
		if (mapped[breakpoint] !== undefined) {
			return mapped[breakpoint];
		}
	}

	return fallback;
};

const resolveBreakpoint = (theme: Theme, width: number): GridBreakpoint => {
	let active: GridBreakpoint = "xs";
	BREAKPOINT_ORDER.forEach((breakpoint) => {
		if (width >= theme.breakpoints[breakpoint]) {
			active = breakpoint;
		}
	});
	return active;
};

const resolveItemSpan = (
	sizes: Partial<Record<GridBreakpoint, GridItemSize>>,
	current: GridBreakpoint,
): GridItemSize | undefined => {
	const currentIndex = BREAKPOINT_ORDER.indexOf(current);

	for (let index = currentIndex; index >= 0; index -= 1) {
		const breakpoint = BREAKPOINT_ORDER[index];
		if (sizes[breakpoint] !== undefined) {
			return sizes[breakpoint];
		}
	}

	return undefined;
};

export const Grid = forwardRef<React.ComponentRef<typeof Box>, GridProps>(
	({ children, ...props }, ref) => {
		const {
			container = false,
			item = false,
			columns,
			spacing,
			columnSpacing,
			rowSpacing,
			direction = "row",
			wrap = "wrap",
			justifyContent = "flex-start",
			alignItems = "stretch",
			xs,
			sm,
			md,
			lg,
			xl,
			style,
			testID,
			...rest
		} = props;

		const theme = useTheme();
		const { width } = useWindowDimensions();
		const currentBreakpoint = resolveBreakpoint(theme, width || 0);
		const parentContext = useContext(GridContext);

		const fallbackColumns = parentContext?.columns ?? 12;
		const resolvedColumns =
			resolveResponsiveValue<number>(columns, currentBreakpoint, fallbackColumns) ??
			fallbackColumns;

		const baseSpacingToken =
			resolveResponsiveValue<SpacingValue>(spacing, currentBreakpoint, 0 as SpacingValue) ?? 0;
		const horizontalSpacingToken = resolveResponsiveValue<SpacingValue>(
			columnSpacing,
			currentBreakpoint,
			baseSpacingToken,
		);
		const verticalSpacingToken = resolveResponsiveValue<SpacingValue>(
			rowSpacing,
			currentBreakpoint,
			baseSpacingToken,
		);

		const horizontalSpacing = resolveSpacing(theme, horizontalSpacingToken);
		const verticalSpacing = resolveSpacing(theme, verticalSpacingToken);

		const sizes: Partial<Record<GridBreakpoint, GridItemSize>> = { xs, sm, md, lg, xl };
		const span = resolveItemSpan(sizes, currentBreakpoint);
		const effectiveColumns = container
			? resolvedColumns
			: (parentContext?.columns ?? resolvedColumns);

		const itemSizingStyle: ViewStyle | undefined = (() => {
			if (!item) return undefined;
			if (span === undefined || span === false) {
				return { minWidth: 0 };
			}

			if (span === true) {
				return {
					flexGrow: 1,
					flexBasis: 0,
					minWidth: 0,
					maxWidth: "100%" as DimensionValue,
				};
			}

			if (span === "auto") {
				return {
					flexBasis: "auto" as DimensionValue,
					flexGrow: 0,
					minWidth: 0,
				};
			}

			const safeSpan = Math.max(0, Math.min(span, effectiveColumns));
			const percentage = `${(safeSpan / effectiveColumns) * 100}%` as DimensionValue;
			return {
				flexBasis: percentage,
				maxWidth: percentage,
				width: percentage,
				flexGrow: 0,
				flexShrink: 0,
				minWidth: 0,
			};
		})();

		const itemSpacingStyle: ViewStyle | undefined = item
			? {
					paddingHorizontal: parentContext?.horizontal ? parentContext.horizontal / 2 : undefined,
					paddingVertical: parentContext?.vertical ? parentContext.vertical / 2 : undefined,
				}
			: undefined;

		const containerLayoutStyle: ViewStyle | undefined = container
			? {
					flexDirection: direction,
					flexWrap: wrap,
					justifyContent,
					alignItems,
					marginHorizontal: horizontalSpacing ? -horizontalSpacing / 2 : undefined,
					marginVertical: verticalSpacing ? -verticalSpacing / 2 : undefined,
				}
			: undefined;

		const computedStyle = StyleSheet.flatten<ViewStyle>([
			containerLayoutStyle,
			itemSpacingStyle,
			itemSizingStyle,
		]);

		const composedStyle = StyleSheet.flatten<ViewStyle>([computedStyle, style]);

		const contextValue = useMemo(
			() => ({
				horizontal: horizontalSpacing,
				vertical: verticalSpacing,
				columns: resolvedColumns,
			}),
			[horizontalSpacing, verticalSpacing, resolvedColumns],
		);

		const content = container ? (
			<GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
		) : (
			children
		);

		return (
			<Box ref={ref} testID={testID} style={composedStyle} {...rest}>
				{content}
			</Box>
		);
	},
);

Grid.displayName = "Grid";

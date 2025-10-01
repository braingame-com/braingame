import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { Theme } from "../../../theme";
import type { BoxProps } from "../../primitives/Box";
import type { FlexDirection, SpacingValue } from "../../primitives/Stack";

export type GridBreakpoint = keyof Theme["breakpoints"];
export type ResponsiveProp<T> = T | Partial<Record<GridBreakpoint, T>>;
export type GridItemSize = boolean | "auto" | number;

export interface GridProps extends Omit<BoxProps, "style"> {
	children?: ReactNode;
	container?: boolean;
	item?: boolean;
	columns?: ResponsiveProp<number>;
	spacing?: ResponsiveProp<SpacingValue>;
	columnSpacing?: ResponsiveProp<SpacingValue>;
	rowSpacing?: ResponsiveProp<SpacingValue>;
	direction?: FlexDirection;
	wrap?: "nowrap" | "wrap" | "wrap-reverse";
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
	xs?: GridItemSize;
	sm?: GridItemSize;
	md?: GridItemSize;
	lg?: GridItemSize;
	xl?: GridItemSize;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}

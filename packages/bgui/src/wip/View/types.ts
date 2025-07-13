import type { ViewProps as RNViewProps } from "react-native";

/**
 * Props for the theme-aware {@link View} container.
 */
export interface ViewProps extends RNViewProps {
	/** Which theme surface this view represents. */
	type?: "background" | "card" | "surface" | "mini-card";
	/** Render with a transparent background. */
	transparent?: boolean;
	/** Apply a medium border radius. */
	rounded?: boolean;
	/** Display a 1px border using the theme color. */
	border?: boolean;
	/** Adds hover styles when used on web. */
	hoverable?: boolean;
	/** Set pointer cursor to indicate draggable content. */
	grabbable?: boolean;
}

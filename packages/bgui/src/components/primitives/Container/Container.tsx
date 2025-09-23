import { useMemo } from "react";
import { StyleSheet, useWindowDimensions, type ViewStyle } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import type { ContainerProps, ContainerWidth } from "./Container.types";

const BREAKPOINTS: Record<Exclude<ContainerWidth, false>, number> = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

const MAX_WIDTHS: Record<Exclude<ContainerWidth, false>, number> = {
	xs: 444,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

const FIXED_WIDTHS: Record<Exclude<ContainerWidth, false>, number> = {
	xs: BREAKPOINTS.xs,
	sm: BREAKPOINTS.sm,
	md: BREAKPOINTS.md,
	lg: BREAKPOINTS.lg,
	xl: BREAKPOINTS.xl,
};

const resolveMaxWidth = (width: ContainerWidth, screenWidth: number, fixed: boolean) => {
	if (width === false) return undefined;
	const key = width ?? "lg";
	const limits = fixed ? FIXED_WIDTHS : MAX_WIDTHS;
	return Math.min(limits[key], screenWidth);
};

const resolvePadding = (disableGutters: boolean, screenWidth: number) => {
	if (disableGutters) return undefined;
	return screenWidth >= BREAKPOINTS.sm ? theme.spacing.lg : theme.spacing.md;
};

export const Container: React.FC<ContainerProps> = ({
	children,
	disableGutters = false,
	fixed = false,
	maxWidth = "lg",
	style,
	testID,
}) => {
	const { width: screenWidth } = useWindowDimensions();

	const computedStyle = useMemo(
		() =>
			StyleSheet.flatten<ViewStyle>([
				{
					width: "100%",
					alignSelf: "center" as const,
					maxWidth: resolveMaxWidth(maxWidth, screenWidth, fixed),
					paddingHorizontal: resolvePadding(disableGutters, screenWidth),
				},
				style,
			]),
		[disableGutters, fixed, maxWidth, screenWidth, style],
	);

	return (
		<Box testID={testID} style={computedStyle}>
			{children}
		</Box>
	);
};

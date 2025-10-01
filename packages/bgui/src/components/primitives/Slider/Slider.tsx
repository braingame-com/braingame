import CommunitySlider from "@react-native-community/slider";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import type { SliderProps } from "./Slider.types";

const resolveColorToken = (theme: Theme, token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof Theme["colors"]] ?? token;
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		base: {
			width: "100%",
			marginVertical: theme.spacing.sm,
		},
	});

export function Slider({
	color = "primary",
	trackColor,
	thumbColor,
	style,
	minimumValue = 0,
	maximumValue = 100,
	step,
	...rest
}: SliderProps) {
	const theme = useTheme();
	const styles = useMemo(() => createStyles(theme), [theme]);
	const resolvedColor = resolveColorToken(theme, typeof color === "string" ? color : String(color));
	const activeTrack =
		resolveColorToken(theme, trackColor?.active) ?? resolvedColor ?? theme.colors.primary;
	const inactiveTrack =
		resolveColorToken(theme, trackColor?.inactive) ?? theme.colors.outlineVariant;
	const resolvedThumb =
		resolveColorToken(theme, thumbColor) ?? resolvedColor ?? theme.colors.primary;

	return (
		<CommunitySlider
			minimumTrackTintColor={activeTrack}
			maximumTrackTintColor={inactiveTrack}
			thumbTintColor={resolvedThumb}
			minimumValue={minimumValue}
			maximumValue={maximumValue}
			step={step}
			style={[styles.base, style]}
			{...rest}
		/>
	);
}

Slider.displayName = "Slider";

export type { SliderProps } from "./Slider.types";

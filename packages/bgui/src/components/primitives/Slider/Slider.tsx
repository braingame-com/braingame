import CommunitySlider from "@react-native-community/slider";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import type { SliderProps } from "./Slider.types";

const resolveColorToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

export const Slider: React.FC<SliderProps> = ({
	color = "primary",
	trackColor,
	thumbColor,
	style,
	minimumValue = 0,
	maximumValue = 100,
	step,
	...rest
}) => {
	const resolvedColor = resolveColorToken(typeof color === "string" ? color : String(color));
	const activeTrack =
		resolveColorToken(trackColor?.active) ?? resolvedColor ?? theme.colors.primary;
	const inactiveTrack = resolveColorToken(trackColor?.inactive) ?? theme.colors.outlineVariant;
	const resolvedThumb = resolveColorToken(thumbColor) ?? resolvedColor ?? theme.colors.primary;

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
};

const styles = StyleSheet.create({
	base: {
		width: "100%",
		marginVertical: theme.spacing.sm,
	},
});

Slider.displayName = "Slider";

export type { SliderProps } from "./Slider.types";

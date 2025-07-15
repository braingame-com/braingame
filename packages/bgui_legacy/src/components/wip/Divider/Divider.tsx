import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme";
import { getDividerStyle } from "./styles";
import type { DividerProps } from "./types";

export const Divider = ({
	orientation = "horizontal",
	color,
	thickness = StyleSheet.hairlineWidth,
	variant = "solid",
	style,
}: DividerProps) => {
	const { colors } = useTheme();
	const themeBorderColor = colors.outlineVariant;
	const themeColor = color ?? themeBorderColor;
	const dividerStyle = getDividerStyle(orientation, themeColor, thickness, variant);

	return <View accessibilityRole="none" style={[dividerStyle, style]} />;
};

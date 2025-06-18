import { useThemeColor } from "@braingame/utils";
import { StyleSheet, View } from "react-native";
import { getDividerStyle } from "./styles";
import type { DividerProps } from "./types";

export const Divider = ({
	orientation = "horizontal",
	color,
	thickness = StyleSheet.hairlineWidth,
	variant = "solid",
	style,
}: DividerProps) => {
	const themeColor = color ?? useThemeColor("border");
	const dividerStyle = getDividerStyle(orientation, themeColor, thickness, variant);

	return <View accessibilityRole="none" style={[dividerStyle, style]} />;
};

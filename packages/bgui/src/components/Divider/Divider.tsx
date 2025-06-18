import { useThemeColor } from "@braingame/utils";
import { StyleSheet, View } from "react-native";
import type { DividerProps } from "./types";

export const Divider = ({
	orientation = "horizontal",
	color,
	thickness = StyleSheet.hairlineWidth,
	variant = "solid",
	style,
}: DividerProps) => {
	const themeColor = color ?? useThemeColor("border");

	const dividerStyle =
		orientation === "horizontal"
			? {
					borderBottomColor: themeColor,
					borderBottomWidth: thickness,
					borderStyle: variant,
					width: "100%" as const,
				}
			: {
					borderRightColor: themeColor,
					borderRightWidth: thickness,
					borderStyle: variant,
					height: "100%" as const,
				};

	return <View accessibilityRole="none" style={[dividerStyle, style]} />;
};

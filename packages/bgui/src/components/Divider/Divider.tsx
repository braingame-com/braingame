import { StyleSheet, View } from "react-native";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
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
					width: "100%",
				}
			: {
					borderRightColor: themeColor,
					borderRightWidth: thickness,
					borderStyle: variant,
					height: "100%",
				};

	return <View accessibilityRole="separator" style={[dividerStyle, style]} />;
};

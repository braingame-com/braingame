import { forwardRef } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { iconRegistry } from "../../../icons/iconRegistry";
import { theme } from "../../../theme";
import type { IconProps } from "./Icon.types";

const VIEWBOX = "0 -960 960 960";

const resolveColor = (color?: string) => {
	if (!color) return theme.colors.onSurface;
	return theme.colors[color as keyof typeof theme.colors] ?? color;
};

export const Icon = forwardRef<View, IconProps>(
	({ name, size = 24, color, testID, accessibilityLabel, style }, ref) => {
		const pathData = iconRegistry[name];

		if (!pathData) {
			if (process.env.NODE_ENV === "development") {
				console.warn(`Icon "${name}" not found in registry.`);
			}
			return null;
		}

		const resolvedColor = resolveColor(color);
		const containerStyle = StyleSheet.flatten<ViewStyle>([
			styles.container,
			{ width: size, height: size },
			style as ViewStyle,
		]);

		return (
			<View
				ref={ref}
				style={containerStyle}
				testID={testID}
				accessible={Boolean(accessibilityLabel)}
				accessibilityRole="image"
				accessibilityLabel={accessibilityLabel}
			>
				<Svg width="100%" height="100%" viewBox={VIEWBOX}>
					<Path d={pathData} fill={resolvedColor} />
				</Svg>
			</View>
		);
	},
);

Icon.displayName = "Icon";

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
});

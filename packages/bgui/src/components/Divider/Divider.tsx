import { useThemeColor } from "@braingame/utils";
import { StyleSheet, View } from "react-native";
import { getDividerStyle } from "./styles";
import type { DividerProps } from "./types";

/**
 * Divider component for visual separation of content sections.
 * Supports horizontal and vertical orientations with customizable styling.
 *
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 *
 * // Vertical divider with custom height
 * <View style={{ height: 50, flexDirection: 'row' }}>
 *   <Text>Left</Text>
 *   <Divider orientation="vertical" />
 *   <Text>Right</Text>
 * </View>
 *
 * // Dashed divider with custom color
 * <Divider
 *   variant="dashed"
 *   color="#FF0000"
 *   thickness={2}
 * />
 *
 * // Divider with custom spacing
 * <Divider style={{ marginVertical: 20 }} />
 *
 * // Section separator example
 * <View>
 *   <Text>Section 1</Text>
 *   <Divider />
 *   <Text>Section 2</Text>
 *   <Divider variant="dashed" />
 *   <Text>Section 3</Text>
 * </View>
 * ```
 *
 * @component
 */
export const Divider = ({
	orientation = "horizontal",
	color,
	thickness = StyleSheet.hairlineWidth,
	variant = "solid",
	style,
}: DividerProps) => {
	const themeBorderColor = useThemeColor("border");
	const themeColor = color ?? themeBorderColor;
	const dividerStyle = getDividerStyle(orientation, themeColor, thickness, variant);

	return <View accessibilityRole="none" style={[dividerStyle, style]} />;
};

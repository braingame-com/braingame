import { FontAwesome6 } from "@expo/vector-icons";
import { getIconSize } from "../../utils/helpers/getIconSize";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
import type { IconProps } from "./types";

/**
 * Generic icon component used throughout the app.
 *
 * Colors fall back to the theme and sizes are resolved via {@link getIconSize}.
 */
export const Icon = ({ name, size = "secondary", color, type = "fas", style }: IconProps) => {
	const iconSize = getIconSize(size);
	const iconColor = color ?? useThemeColor("icon");

	return (
		<FontAwesome6
			name={name}
			size={iconSize}
			color={iconColor}
			style={[{ fontFamily: type }, style]}
		/>
	);
};

import { FontAwesome6 } from "@expo/vector-icons";
import { getIconSize } from "../../utils/helpers/getIconSize";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
import type { IconProps } from "./types";

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

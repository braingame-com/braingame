import { useThemeColor } from "@braingame/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { sizeMap } from "./styles";
import type { IconProps, ThemeColor } from "./types";

export function Icon({
	name,
	variant: _variant = "regular",
	size = "md",
	color,
	decorative = false,
	"aria-label": ariaLabel,
	style,
}: IconProps) {
	const iconSize = typeof size === "number" ? size : sizeMap[size];
	const defaultColor = useThemeColor("icon");
	// Always call useThemeColor with a safe value
	const isThemeColor = color && typeof color === "string" && !color.startsWith("#");
	const colorKey = isThemeColor ? color : "icon";
	const themeColor = useThemeColor(colorKey as ThemeColor);
	const iconColor = isThemeColor ? themeColor : color || defaultColor;
	// Material Icons Rounded - using rounded variants by default

	return (
		<MaterialIcons
			// @ts-expect-error - MaterialIcons name prop types are incomplete
			name={name}
			size={iconSize}
			color={iconColor}
			accessibilityElementsHidden={decorative}
			accessibilityRole="image"
			accessibilityLabel={decorative ? undefined : ariaLabel}
			style={[{ fontFamily: "Material Icons Rounded" }, style]}
		/>
	);
}

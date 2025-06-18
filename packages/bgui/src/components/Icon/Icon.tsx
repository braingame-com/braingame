import { useThemeColor } from "@braingame/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import { sizeMap } from "./styles";
import type { IconProps } from "./types";

export function Icon({
	name,
	variant = "regular",
	size = "md",
	color,
	decorative = false,
	"aria-label": ariaLabel,
	style,
}: IconProps) {
	const iconSize = typeof size === "number" ? size : sizeMap[size];
	const iconColor = useThemeColor(color ?? "icon");
	// FontAwesome6 handles variants internally via the 'name' prop
	// No need to set fontFamily manually

	return (
		<FontAwesome6
			name={name}
			size={iconSize}
			color={iconColor}
			accessibilityElementsHidden={decorative}
			accessibilityRole="image"
			accessibilityLabel={decorative ? undefined : ariaLabel}
			style={style}
		/>
	);
}

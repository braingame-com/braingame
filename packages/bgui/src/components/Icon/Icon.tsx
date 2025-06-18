import { Tokens } from "@braingame/utils/constants/Tokens";
import { useThemeColor } from "@braingame/utils/hooks/useThemeColor";
import { FA6Style, FontAwesome6 } from "@expo/vector-icons";
import type { IconProps } from "./types";

const sizeMap = {
	sm: Tokens.s,
	md: Tokens.l,
	lg: Tokens.xl,
} as const;

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
	const fontFamily =
		variant === "solid" ? FA6Style.solid : variant === "brand" ? FA6Style.brand : FA6Style.regular;

	return (
		<FontAwesome6
			name={name}
			size={iconSize}
			color={iconColor}
			accessibilityElementsHidden={decorative}
			accessibilityRole="image"
			accessibilityLabel={decorative ? undefined : ariaLabel}
			style={[{ fontFamily }, style]}
		/>
	);
}

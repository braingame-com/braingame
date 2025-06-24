import { useThemeColor } from "@braingame/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faXmark,
	faHome,
	faArrowRight,
	faGear,
	faUser,
	faStar,
	faHeart,
	faCheck,
	faX,
	faBars,
	faSearch,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
	faUser as faUserRegular,
	faStar as faStarRegular,
	faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { sizeMap } from "./styles";
import type { IconProps } from "./types";

// Map icon names to Font Awesome icon objects
const iconMap = {
	// Solid icons
	xmark: faXmark,
	x: faX,
	home: faHome,
	"arrow-right": faArrowRight,
	settings: faGear,
	gear: faGear,
	user: faUser,
	star: faStar,
	heart: faHeart,
	check: faCheck,
	close: faX,
	menu: faBars,
	search: faSearch,
	eye: faEye,
	// Regular icons
	"user-regular": faUserRegular,
	"star-regular": faStarRegular,
	"heart-regular": faHeartRegular,
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

	// Handle variant by appending to name if regular variant is requested
	const iconKey = variant === "regular" && `${name}-regular` in iconMap 
		? `${name}-regular` as keyof typeof iconMap
		: name as keyof typeof iconMap;

	const icon = iconMap[iconKey] || iconMap.xmark; // Fallback to xmark if not found

	return (
		<FontAwesomeIcon
			icon={icon}
			size={iconSize}
			color={iconColor}
			style={[
				style,
				// Font Awesome icons need explicit width/height for React Native
				{ width: iconSize, height: iconSize },
			]}
			// Accessibility props
			{...(decorative ? {} : {
				accessibilityRole: "image",
				accessibilityLabel: ariaLabel,
			})}
		/>
	);
}

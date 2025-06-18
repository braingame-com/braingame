import { Colors } from "@braingame/utils";

/**
 * Color mapping for Text component
 */
export const getTextColor = (
	color: string | undefined,
	baseColor: string,
	secondaryColor: string,
) => {
	switch (color) {
		case "primary":
			return Colors.universal.primary;
		case "secondary":
			return secondaryColor;
		case "danger":
			return Colors.universal.negative;
		case "success":
			return Colors.universal.positive;
		case "warning":
			return Colors.universal.warn;
		default:
			return baseColor;
	}
};

/**
 * Base text styles
 */
export const baseTextStyle = {
	fontFamily: "SohneBook",
};

import { Tokens } from "@braingame/utils";

/**
 * Size mapping for Avatar component - using proper tokens
 */
export const SIZE_MAP = {
	small: Tokens.xl, // 24
	medium: Tokens.xxxl, // 48
	large: Tokens.xxxxl, // 72
};

/**
 * Get avatar styles based on size and variant
 */
export const getAvatarStyles = (size: keyof typeof SIZE_MAP, variant: "circle" | "square") => {
	const dimension = SIZE_MAP[size];
	const borderRadius = variant === "circle" ? dimension / 2 : Tokens.s;

	return {
		dimension,
		borderRadius,
		containerStyle: {
			width: dimension,
			height: dimension,
			borderRadius,
			alignItems: "center" as const,
			justifyContent: "center" as const,
		},
		imageStyle: {
			width: dimension,
			height: dimension,
			borderRadius,
		},
	};
};

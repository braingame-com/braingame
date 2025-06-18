import type { Tokens } from "@braingame/utils";

/**
 * Size mapping for Avatar component
 */
export const SIZE_MAP = {
	small: 24, // Tokens.l
	medium: 48, // Tokens.xxl
	large: 72, // Tokens.xxxl
};

/**
 * Get avatar styles based on size and variant
 */
export const getAvatarStyles = (size: keyof typeof SIZE_MAP, variant: "circle" | "square") => {
	const dimension = SIZE_MAP[size];
	const borderRadius = variant === "circle" ? dimension / 2 : 8; // Tokens.s

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

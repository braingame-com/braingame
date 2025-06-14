import { Tokens } from "../constants/Tokens";
import type { IconSizeProps } from "../constants/types";

export const getIconSize = (size: IconSizeProps | number) => {
	if (typeof size === "number") return size;

	const sizeMatrix = {
		primary: Tokens.xl,
		secondary: Tokens.l,
		small: Tokens.s,
	};

	return sizeMatrix[size];
};

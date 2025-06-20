import { Tokens } from "../constants/Tokens";
import type { IconSizeProps } from "../constants/types";

const sizeMatrix = {
	primary: Tokens.xl,
	secondary: Tokens.l,
	small: Tokens.s,
};

export const getIconSize = (size: IconSizeProps | number) => {
	if (typeof size === "number") return size;

	return sizeMatrix[size];
};

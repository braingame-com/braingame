import type { ColorScheme, Theme } from "../types";
import { baseAnimation, baseSizes } from "../constants";
import { lightColorSchemes } from "../colorSchemes/light";
import { darkColorSchemes } from "../colorSchemes/dark";
import { createComponentStyles } from "./componentStyles";

export const createTheme = (isDark: boolean, colorScheme: ColorScheme): Theme => {
	const colors = isDark ? darkColorSchemes[colorScheme] : lightColorSchemes[colorScheme];

	return {
		name: `${colorScheme}-${isDark ? "dark" : "light"}`,
		isDark,
		colors,
		sizes: baseSizes,
		animation: baseAnimation,
		components: createComponentStyles(colors),
	};
};
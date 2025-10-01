import { createContext, useContext } from "react";
import type { Theme } from "./types";

export const ThemeContext = createContext<Theme | null>(null);

export function useTheme() {
	const theme = useContext(ThemeContext);
	if (!theme) {
		throw new Error(
			"BGUI theme context is not available. Wrap your component tree in BGUIThemeProvider.",
		);
	}
	return theme;
}

import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./types";

interface ThemeProviderProps {
	theme: Theme;
}

export function ThemeProvider({ theme, children }: PropsWithChildren<ThemeProviderProps>) {
	const value = useMemo(() => theme, [theme]);
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

"use client";

import { useColorScheme } from "@braingame/utils";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
// Import the M3 theme configuration
import themeConfig from "../constants/bgui-theme.json";
import { ThemeContext } from "./ThemeContext";
import type { ColorMode, ContrastMode, M3ColorScheme, ThemeContextValue } from "./types";

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultMode?: ColorMode | "system";
	defaultContrast?: ContrastMode;
}

export function ThemeProvider({
	children,
	defaultMode = "system",
	defaultContrast = "standard",
}: ThemeProviderProps) {
	const systemColorScheme = useColorScheme();
	const [userMode, setUserMode] = useState<ColorMode | "system">(defaultMode);
	const [contrast, setContrast] = useState<ContrastMode>(defaultContrast);

	// Determine the actual color mode
	const mode = useMemo((): ColorMode => {
		if (userMode === "system") {
			return systemColorScheme ?? "light";
		}
		return userMode;
	}, [userMode, systemColorScheme]);

	// Get the color scheme based on mode and contrast
	const colors = useMemo((): M3ColorScheme => {
		const schemeKey = contrast === "standard" ? mode : `${mode}-${contrast}-contrast`;
		const scheme = themeConfig.schemes[schemeKey as keyof typeof themeConfig.schemes];

		if (!scheme) {
			console.warn(`Theme scheme "${schemeKey}" not found, falling back to light mode`);
			return themeConfig.schemes.light as M3ColorScheme;
		}

		return scheme as M3ColorScheme;
	}, [mode, contrast]);

	const setMode = useCallback((newMode: ColorMode | "system") => {
		setUserMode(newMode);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			colors,
			mode,
			setMode,
			contrast,
			setContrast,
		}),
		[colors, mode, setMode, contrast],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.displayName = "BGUI.ThemeProvider";

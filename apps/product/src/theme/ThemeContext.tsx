import { useMountedState } from "@braingame/bgui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import {
	interpolateColor,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { createTheme } from "./themes";
import type { ColorScheme, Theme, ThemeMode } from "./types";

interface ThemeContextType {
	theme: Theme;
	themeMode: ThemeMode;
	colorScheme: ColorScheme;
	setThemeMode: (mode: ThemeMode) => void;
	setColorScheme: (scheme: ColorScheme) => void;
	toggleTheme: () => void;
	isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@braingame/theme";
const COLOR_SCHEME_STORAGE_KEY = "@braingame/colorScheme";

const ThemeProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
	const systemColorScheme = useColorScheme();
	const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
	const [colorScheme, setColorSchemeState] = useState<ColorScheme>("default");
	const [isTransitioning, setIsTransitioning] = useState(false);
	const isMounted = useMountedState();

	// Animation values
	const transitionProgress = useSharedValue(0);

	// Determine actual theme based on mode
	const isDark = themeMode === "dark" || (themeMode === "system" && systemColorScheme === "dark");
	const theme = createTheme(isDark, colorScheme);

	const loadSavedPreferences = useCallback(async () => {
		try {
			const [savedThemeMode, savedColorScheme] = await Promise.all([
				AsyncStorage.getItem(THEME_STORAGE_KEY),
				AsyncStorage.getItem(COLOR_SCHEME_STORAGE_KEY),
			]);

			if (!isMounted()) return;

			if (savedThemeMode) {
				setThemeModeState(savedThemeMode as ThemeMode);
			}
			if (savedColorScheme) {
				setColorSchemeState(savedColorScheme as ColorScheme);
			}
		} catch (error) {
			console.error("Error loading theme preferences:", error);
		}
	}, [isMounted]);

	// Load saved preferences
	useEffect(() => {
		loadSavedPreferences();
	}, [loadSavedPreferences]);

	// Save preferences when they change
	useEffect(() => {
		AsyncStorage.setItem(THEME_STORAGE_KEY, themeMode);
	}, [themeMode]);

	useEffect(() => {
		AsyncStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme);
	}, [colorScheme]);

	// Update theme when system color scheme changes
	useEffect(() => {
		if (themeMode === "system") {
			// Trigger re-render when system theme changes
		}
	}, [themeMode]);

	const setThemeMode = (mode: ThemeMode) => {
		setIsTransitioning(true);
		transitionProgress.value = withTiming(1, { duration: 300 }, () => {
			runOnJS(() => {
				setThemeModeState(mode);
				transitionProgress.value = withTiming(0, { duration: 300 }, () => {
					runOnJS(() => setIsTransitioning(false))();
				});
			})();
		});
	};

	const setColorScheme = (scheme: ColorScheme) => {
		setIsTransitioning(true);
		transitionProgress.value = withTiming(1, { duration: 300 }, () => {
			runOnJS(() => {
				setColorSchemeState(scheme);
				transitionProgress.value = withTiming(0, { duration: 300 }, () => {
					runOnJS(() => setIsTransitioning(false))();
				});
			})();
		});
	};

	const toggleTheme = () => {
		const newMode = isDark ? "light" : "dark";
		setThemeMode(newMode);
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				themeMode,
				colorScheme,
				setThemeMode,
				setColorScheme,
				toggleTheme,
				isTransitioning,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <ThemeProviderInner>{children}</ThemeProviderInner>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

// Animated theme hook for smooth transitions
export const useAnimatedTheme = () => {
	const { theme, isTransitioning } = useTheme();
	const animationProgress = useSharedValue(0);

	useEffect(() => {
		animationProgress.value = withTiming(isTransitioning ? 1 : 0, {
			duration: theme.animation.durationNormal,
		});
	}, [isTransitioning, theme.animation.durationNormal, animationProgress]);

	const animatedBackgroundStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animationProgress.value,
				[0, 1],
				[theme.colors.background, theme.colors.surface],
			),
		};
	});

	const animatedSurfaceStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animationProgress.value,
				[0, 1],
				[theme.colors.surface, theme.colors.surfaceVariant],
			),
		};
	});

	const animatedTextStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				animationProgress.value,
				[0, 1],
				[theme.colors.text, theme.colors.textSecondary],
			),
		};
	});

	return {
		theme,
		animatedBackgroundStyle,
		animatedSurfaceStyle,
		animatedTextStyle,
		animationProgress,
	};
};

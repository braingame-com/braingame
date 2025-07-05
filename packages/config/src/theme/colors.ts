// Import the base Material Design 3 theme
import bguiTheme from "../../../../assets/bgui-theme.json";
import type { ColorPalette, ExtendedColorScheme } from "./types";

// Define additional color palettes for semantic colors
export const successPalette: ColorPalette = {
	0: "#000000",
	5: "#001106",
	10: "#002110",
	15: "#003019",
	20: "#004023",
	25: "#00502E",
	30: "#00603A",
	35: "#007046",
	40: "#008052",
	50: "#00A16B",
	60: "#14C485",
	70: "#3DE79F",
	80: "#5FFFB9",
	90: "#B6FFD9",
	95: "#DAFFEC",
	98: "#F0FFF6",
	99: "#F7FFFB",
	100: "#FFFFFF",
};

export const warningPalette: ColorPalette = {
	0: "#000000",
	5: "#1C0E00",
	10: "#2E1A00",
	15: "#3F2500",
	20: "#513100",
	25: "#643C00",
	30: "#774800",
	35: "#8A5400",
	40: "#9E6000",
	50: "#C77900",
	60: "#F19300",
	70: "#FFAD29",
	80: "#FFC651",
	90: "#FFDF9E",
	95: "#FFEFCE",
	98: "#FFF8F0",
	99: "#FFFBF7",
	100: "#FFFFFF",
};

export const infoPalette: ColorPalette = {
	0: "#000000",
	5: "#00131F",
	10: "#001E30",
	15: "#002A41",
	20: "#003653",
	25: "#004266",
	30: "#004E7A",
	35: "#005B8E",
	40: "#0068A3",
	50: "#0082CE",
	60: "#299DFA",
	70: "#55B7FF",
	80: "#7FD1FF",
	90: "#C1E8FF",
	95: "#E0F3FF",
	98: "#F4FAFF",
	99: "#FAFCFF",
	100: "#FFFFFF",
};

// Helper function to extend a base color scheme with additional semantic colors
function extendColorScheme(
	baseScheme: typeof bguiTheme.schemes.light,
	isDark = false,
): ExtendedColorScheme {
	const extended: ExtendedColorScheme = {
		...baseScheme,
		// Success colors (green)
		success: isDark ? successPalette[80] : successPalette[40],
		onSuccess: isDark ? successPalette[20] : successPalette[100],
		successContainer: isDark ? successPalette[30] : successPalette[90],
		onSuccessContainer: isDark ? successPalette[90] : successPalette[10],

		// Warning colors (amber/orange)
		warning: isDark ? warningPalette[80] : warningPalette[40],
		onWarning: isDark ? warningPalette[20] : warningPalette[100],
		warningContainer: isDark ? warningPalette[30] : warningPalette[90],
		onWarningContainer: isDark ? warningPalette[90] : warningPalette[10],

		// Info colors (blue)
		info: isDark ? infoPalette[80] : infoPalette[40],
		onInfo: isDark ? infoPalette[20] : infoPalette[100],
		infoContainer: isDark ? infoPalette[30] : infoPalette[90],
		onInfoContainer: isDark ? infoPalette[90] : infoPalette[10],

		// Interactive states
		hover: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
		pressed: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
		focus: baseScheme.primary,
		disabled: isDark ? "rgba(255, 255, 255, 0.38)" : "rgba(0, 0, 0, 0.38)",
		disabledContainer: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
		onDisabled: isDark ? "rgba(255, 255, 255, 0.38)" : "rgba(0, 0, 0, 0.38)",

		// Special UI colors
		link: isDark ? "#8AB4FF" : "#1976D2",
		linkVisited: isDark ? "#C58AF8" : "#6B3AA7",
		linkHover: isDark ? "#ADD8FF" : "#42A5F5",
		linkActive: isDark ? "#6B9EFF" : "#1565C0",
		divider: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
		backdrop: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.5)",
		skeleton: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
		skeletonHighlight: isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.16)",
		tooltip: isDark ? "#E1E2EC" : "#616161",
		onTooltip: isDark ? "#000000" : "#FFFFFF",

		// Chart colors (vibrant, accessible palette)
		chart1: "#4285F4", // Blue
		chart2: "#34A853", // Green
		chart3: "#FBBC04", // Yellow
		chart4: "#EA4335", // Red
		chart5: "#9C27B0", // Purple
		chart6: "#00ACC1", // Cyan
		chart7: "#FF6D00", // Orange
		chart8: "#795548", // Brown
	};

	return extended;
}

// Export the complete theme configuration
export const theme = {
	seed: bguiTheme.seed,
	coreColors: bguiTheme.coreColors,
	schemes: {
		light: extendColorScheme(bguiTheme.schemes.light),
		"light-medium-contrast": extendColorScheme(bguiTheme.schemes["light-medium-contrast"]),
		"light-high-contrast": extendColorScheme(bguiTheme.schemes["light-high-contrast"]),
		dark: extendColorScheme(bguiTheme.schemes.dark, true),
		"dark-medium-contrast": extendColorScheme(bguiTheme.schemes["dark-medium-contrast"], true),
		"dark-high-contrast": extendColorScheme(bguiTheme.schemes["dark-high-contrast"], true),
	},
	palettes: {
		...bguiTheme.palettes,
		success: successPalette,
		warning: warningPalette,
		info: infoPalette,
	},
};

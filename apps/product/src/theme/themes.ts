import type { ColorScheme, Theme } from "./types";

const baseAnimation = {
	durationFast: 150,
	durationNormal: 300,
	durationSlow: 500,
	easeIn: "cubic-bezier(0.4, 0, 1, 1)",
	easeOut: "cubic-bezier(0, 0, 0.2, 1)",
	easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	easeBounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

const baseSizes = {
	// Font sizes
	fontSizeXS: 10,
	fontSizeSM: 12,
	fontSizeMD: 14,
	fontSizeLG: 16,
	fontSizeXL: 18,
	fontSize2XL: 24,
	fontSize3XL: 32,
	fontSize4XL: 40,

	// Spacing
	spacingXS: 4,
	spacingSM: 8,
	spacingMD: 16,
	spacingLG: 24,
	spacingXL: 32,
	spacing2XL: 48,
	spacing3XL: 64,

	// Border radius
	radiusXS: 2,
	radiusSM: 4,
	radiusMD: 8,
	radiusLG: 12,
	radiusXL: 16,
	radiusFull: 9999,

	// Icon sizes
	iconSM: 16,
	iconMD: 24,
	iconLG: 32,
	iconXL: 48,
};

// Light theme color schemes
const lightColorSchemes: Record<ColorScheme, Theme["colors"]> = {
	default: {
		primary: "#007fff",
		primaryLight: "#4da3ff",
		primaryDark: "#0059b3",
		onPrimary: "#ffffff",

		secondary: "#6c757d",
		secondaryLight: "#868e96",
		secondaryDark: "#495057",
		onSecondary: "#ffffff",

		accent: "#ff6b6b",
		accentLight: "#ff9999",
		accentDark: "#cc5555",
		onAccent: "#ffffff",

		background: "#ffffff",
		surface: "#f8f9fa",
		surfaceVariant: "#e9ecef",

		text: "#212529",
		textSecondary: "#6c757d",
		textDisabled: "#adb5bd",

		border: "#dee2e6",
		borderLight: "#e9ecef",
		divider: "#e9ecef",

		success: "#28a745",
		warning: "#ffc107",
		error: "#dc3545",
		info: "#17a2b8",

		onBackground: "#212529",
		onSurface: "#212529",
		onError: "#ffffff",

		shadow: "#000000",
		shadowLight: "#00000008",
	},
	ocean: {
		primary: "#006994",
		primaryLight: "#4d95b8",
		primaryDark: "#004d6d",
		onPrimary: "#ffffff",

		secondary: "#00838f",
		secondaryLight: "#4db6ac",
		secondaryDark: "#005662",
		onSecondary: "#ffffff",

		accent: "#00acc1",
		accentLight: "#4dd0e1",
		accentDark: "#007c91",
		onAccent: "#ffffff",

		background: "#f0f4f7",
		surface: "#ffffff",
		surfaceVariant: "#e1f5fe",

		text: "#263238",
		textSecondary: "#546e7a",
		textDisabled: "#90a4ae",

		border: "#cfd8dc",
		borderLight: "#eceff1",
		divider: "#b0bec5",

		success: "#00c853",
		warning: "#ffab00",
		error: "#d50000",
		info: "#0091ea",

		onBackground: "#263238",
		onSurface: "#263238",
		onError: "#ffffff",

		shadow: "#000000",
		shadowLight: "#00000008",
	},
	forest: {
		primary: "#2e7d32",
		primaryLight: "#60ad5e",
		primaryDark: "#005005",
		onPrimary: "#ffffff",

		secondary: "#558b2f",
		secondaryLight: "#85bb5c",
		secondaryDark: "#255d00",
		onSecondary: "#ffffff",

		accent: "#8bc34a",
		accentLight: "#bef67a",
		accentDark: "#5a9216",
		onAccent: "#000000",

		background: "#f1f8e9",
		surface: "#ffffff",
		surfaceVariant: "#e8f5e9",

		text: "#1b5e20",
		textSecondary: "#33691e",
		textDisabled: "#81c784",

		border: "#c8e6c9",
		borderLight: "#dcedc8",
		divider: "#a5d6a7",

		success: "#1b5e20",
		warning: "#f57c00",
		error: "#c62828",
		info: "#01579b",

		onBackground: "#1b5e20",
		onSurface: "#1b5e20",
		onError: "#ffffff",

		shadow: "#000000",
		shadowLight: "#00000008",
	},
	sunset: {
		primary: "#ff6f00",
		primaryLight: "#ff9e40",
		primaryDark: "#c43e00",
		onPrimary: "#000000",

		secondary: "#f57c00",
		secondaryLight: "#ffad42",
		secondaryDark: "#bb4d00",
		onSecondary: "#000000",

		accent: "#ff5722",
		accentLight: "#ff8a50",
		accentDark: "#c41c00",
		onAccent: "#ffffff",

		background: "#fff3e0",
		surface: "#ffffff",
		surfaceVariant: "#ffe0b2",

		text: "#e65100",
		textSecondary: "#bf360c",
		textDisabled: "#ffab91",

		border: "#ffccbc",
		borderLight: "#fbe9e7",
		divider: "#ffab91",

		success: "#558b2f",
		warning: "#e65100",
		error: "#b71c1c",
		info: "#0277bd",

		onBackground: "#e65100",
		onSurface: "#e65100",
		onError: "#ffffff",

		shadow: "#000000",
		shadowLight: "#00000008",
	},
	midnight: {
		primary: "#3f51b5",
		primaryLight: "#757de8",
		primaryDark: "#002984",
		onPrimary: "#ffffff",

		secondary: "#7c4dff",
		secondaryLight: "#b47cff",
		secondaryDark: "#3f1dcb",
		onSecondary: "#ffffff",

		accent: "#536dfe",
		accentLight: "#8f9bff",
		accentDark: "#0043ca",
		onAccent: "#ffffff",

		background: "#e8eaf6",
		surface: "#ffffff",
		surfaceVariant: "#c5cae9",

		text: "#1a237e",
		textSecondary: "#283593",
		textDisabled: "#9fa8da",

		border: "#9fa8da",
		borderLight: "#c5cae9",
		divider: "#7986cb",

		success: "#4caf50",
		warning: "#ff9800",
		error: "#f44336",
		info: "#2196f3",

		onBackground: "#1a237e",
		onSurface: "#1a237e",
		onError: "#ffffff",

		shadow: "#000000",
		shadowLight: "#00000008",
	},
};

// Dark theme color schemes
const darkColorSchemes: Record<ColorScheme, Theme["colors"]> = {
	default: {
		primary: "#4da3ff",
		primaryLight: "#80c1ff",
		primaryDark: "#0073e6",
		onPrimary: "#000000",

		secondary: "#868e96",
		secondaryLight: "#adb5bd",
		secondaryDark: "#495057",
		onSecondary: "#000000",

		accent: "#ff9999",
		accentLight: "#ffcccc",
		accentDark: "#ff6666",
		onAccent: "#000000",

		background: "#121212",
		surface: "#1e1e1e",
		surfaceVariant: "#2d2d2d",

		text: "#ffffff",
		textSecondary: "#adb5bd",
		textDisabled: "#6c757d",

		border: "#343a40",
		borderLight: "#495057",
		divider: "#495057",

		success: "#52c41a",
		warning: "#faad14",
		error: "#ff4d4f",
		info: "#1890ff",

		onBackground: "#ffffff",
		onSurface: "#ffffff",
		onError: "#000000",

		shadow: "#000000",
		shadowLight: "#00000033",
	},
	ocean: {
		primary: "#4dd0e1",
		primaryLight: "#88ffff",
		primaryDark: "#009faf",
		onPrimary: "#000000",

		secondary: "#4db6ac",
		secondaryLight: "#82e9de",
		secondaryDark: "#00867d",
		onSecondary: "#000000",

		accent: "#80deea",
		accentLight: "#b4ffff",
		accentDark: "#4bacb8",
		onAccent: "#000000",

		background: "#0a1929",
		surface: "#001e3c",
		surfaceVariant: "#0a2744",

		text: "#ffffff",
		textSecondary: "#90caf9",
		textDisabled: "#546e7a",

		border: "#132f4c",
		borderLight: "#1e4976",
		divider: "#1e4976",

		success: "#66bb6a",
		warning: "#ffa726",
		error: "#f44336",
		info: "#29b6f6",

		onBackground: "#ffffff",
		onSurface: "#ffffff",
		onError: "#000000",

		shadow: "#000000",
		shadowLight: "#00000033",
	},
	forest: {
		primary: "#81c784",
		primaryLight: "#b2fab4",
		primaryDark: "#519657",
		onPrimary: "#000000",

		secondary: "#a5d6a7",
		secondaryLight: "#d7ffd9",
		secondaryDark: "#75a478",
		onSecondary: "#000000",

		accent: "#aed581",
		accentLight: "#e1ffb1",
		accentDark: "#7da453",
		onAccent: "#000000",

		background: "#0d1f0f",
		surface: "#1b3a1d",
		surfaceVariant: "#2e5431",

		text: "#ffffff",
		textSecondary: "#c8e6c9",
		textDisabled: "#689f38",

		border: "#2e5431",
		borderLight: "#43734a",
		divider: "#43734a",

		success: "#8bc34a",
		warning: "#ff9800",
		error: "#e91e63",
		info: "#03a9f4",

		onBackground: "#ffffff",
		onSurface: "#ffffff",
		onError: "#000000",

		shadow: "#000000",
		shadowLight: "#00000033",
	},
	sunset: {
		primary: "#ffab40",
		primaryLight: "#ffdd71",
		primaryDark: "#c77c02",
		onPrimary: "#000000",

		secondary: "#ffcc80",
		secondaryLight: "#ffffb0",
		secondaryDark: "#ca9b52",
		onSecondary: "#000000",

		accent: "#ff7043",
		accentLight: "#ffa270",
		accentDark: "#c63f17",
		onAccent: "#000000",

		background: "#1a0f05",
		surface: "#3e2723",
		surfaceVariant: "#5d4037",

		text: "#ffffff",
		textSecondary: "#ffccbc",
		textDisabled: "#a1887f",

		border: "#5d4037",
		borderLight: "#795548",
		divider: "#795548",

		success: "#7cb342",
		warning: "#ffb300",
		error: "#e53935",
		info: "#039be5",

		onBackground: "#ffffff",
		onSurface: "#ffffff",
		onError: "#000000",

		shadow: "#000000",
		shadowLight: "#00000033",
	},
	midnight: {
		primary: "#7986cb",
		primaryLight: "#aab6fe",
		primaryDark: "#49599a",
		onPrimary: "#000000",

		secondary: "#b39ddb",
		secondaryLight: "#e6ceff",
		secondaryDark: "#836fa9",
		onSecondary: "#000000",

		accent: "#9fa8da",
		accentLight: "#d1d9ff",
		accentDark: "#6f79a8",
		onAccent: "#000000",

		background: "#0f0f1e",
		surface: "#1a1a2e",
		surfaceVariant: "#252542",

		text: "#ffffff",
		textSecondary: "#c5cae9",
		textDisabled: "#5c6bc0",

		border: "#252542",
		borderLight: "#3f3f5c",
		divider: "#3f3f5c",

		success: "#81c784",
		warning: "#ffb74d",
		error: "#e57373",
		info: "#64b5f6",

		onBackground: "#ffffff",
		onSurface: "#ffffff",
		onError: "#000000",

		shadow: "#000000",
		shadowLight: "#00000033",
	},
};

export const createTheme = (isDark: boolean, colorScheme: ColorScheme): Theme => {
	const colors = isDark ? darkColorSchemes[colorScheme] : lightColorSchemes[colorScheme];

	return {
		name: `${colorScheme}-${isDark ? "dark" : "light"}`,
		isDark,
		colors,
		sizes: baseSizes,
		animation: baseAnimation,
		components: {
			button: {
				primary: {
					background: colors.primary,
					text: colors.onPrimary,
				},
				secondary: {
					background: colors.secondary,
					text: colors.onSecondary,
				},
				outline: {
					background: "transparent",
					text: colors.primary,
					border: colors.primary,
				},
				ghost: {
					background: "transparent",
					text: colors.primary,
				},
			},
			card: {
				background: colors.surface,
				border: colors.border,
				shadow: colors.shadow,
			},
			input: {
				background: colors.surface,
				border: colors.border,
				borderFocus: colors.primary,
				text: colors.text,
				placeholder: colors.textDisabled,
			},
			navigation: {
				background: colors.surface,
				active: colors.primary,
				inactive: colors.textSecondary,
				border: colors.border,
			},
		},
	};
};

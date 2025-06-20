export interface ThemeColors {
	// Primary colors
	primary: string;
	primaryLight: string;
	primaryDark: string;
	onPrimary: string;

	// Secondary colors
	secondary: string;
	secondaryLight: string;
	secondaryDark: string;
	onSecondary: string;

	// Accent colors
	accent: string;
	accentLight: string;
	accentDark: string;
	onAccent: string;

	// Background colors
	background: string;
	surface: string;
	surfaceVariant: string;
	
	// Text colors
	text: string;
	textSecondary: string;
	textDisabled: string;
	
	// UI colors
	border: string;
	borderLight: string;
	divider: string;
	
	// Status colors
	success: string;
	warning: string;
	error: string;
	info: string;
	
	// Semantic colors
	onBackground: string;
	onSurface: string;
	onError: string;
	
	// Shadow colors
	shadow: string;
	shadowLight: string;
}

export interface ThemeSizes {
	// Font sizes
	fontSizeXS: number;
	fontSizeSM: number;
	fontSizeMD: number;
	fontSizeLG: number;
	fontSizeXL: number;
	fontSize2XL: number;
	fontSize3XL: number;
	fontSize4XL: number;
	
	// Spacing
	spacingXS: number;
	spacingSM: number;
	spacingMD: number;
	spacingLG: number;
	spacingXL: number;
	spacing2XL: number;
	spacing3XL: number;
	
	// Border radius
	radiusXS: number;
	radiusSM: number;
	radiusMD: number;
	radiusLG: number;
	radiusXL: number;
	radiusFull: number;
	
	// Icon sizes
	iconSM: number;
	iconMD: number;
	iconLG: number;
	iconXL: number;
}

export interface ThemeAnimation {
	// Durations
	durationFast: number;
	durationNormal: number;
	durationSlow: number;
	
	// Easing
	easeIn: string;
	easeOut: string;
	easeInOut: string;
	easeBounce: string;
}

export interface Theme {
	name: string;
	isDark: boolean;
	colors: ThemeColors;
	sizes: ThemeSizes;
	animation: ThemeAnimation;
	
	// Component specific theming
	components: {
		button: {
			primary: {
				background: string;
				text: string;
				border?: string;
			};
			secondary: {
				background: string;
				text: string;
				border?: string;
			};
			outline: {
				background: string;
				text: string;
				border: string;
			};
			ghost: {
				background: string;
				text: string;
				border?: string;
			};
		};
		card: {
			background: string;
			border: string;
			shadow: string;
		};
		input: {
			background: string;
			border: string;
			borderFocus: string;
			text: string;
			placeholder: string;
		};
		navigation: {
			background: string;
			active: string;
			inactive: string;
			border: string;
		};
	};
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'default' | 'ocean' | 'forest' | 'sunset' | 'midnight';
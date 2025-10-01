import type m3ThemeTokens from "../m3-theme.json";

export interface ThemeColorScale {
	[key: string]: string;
}

export interface ThemeSpacingScale {
	[key: string]: number;
}

export interface ThemeRadiiScale {
	[key: string]: number;
}

export interface ThemeTypographyVariant {
	fontFamily: string;
	fontSize: number;
	lineHeight: number;
	fontWeight?: string;
	color: string;
	letterSpacing?: number;
	textTransform?: string;
}

export interface ThemeTypographyScale {
	[key: string]: ThemeTypographyVariant;
}

export interface ThemeFontSizeScale {
	[key: string]: number;
}

export interface ThemeFontWeightScale {
	[key: string]: string;
}

export interface ThemeLineHeightScale {
	[key: string]: number;
}

export interface ThemeShadowScale {
	[key: string]: string;
}

export interface ThemeBreakpointScale {
	[key: string]: number;
}

// biome-ignore lint/suspicious/noExplicitAny: component config variants have dynamic shapes
export type ThemeComponentConfigEntry = Record<string, any>;

export interface ThemeComponentConfig {
	[key: string]: ThemeComponentConfigEntry;
}

export interface Theme {
	colors: ThemeColorScale;
	spacing: ThemeSpacingScale;
	borderRadii: ThemeRadiiScale;
	radii: ThemeRadiiScale;
	textVariants: ThemeTypographyScale;
	fontSizes: ThemeFontSizeScale;
	fontWeights: ThemeFontWeightScale;
	lineHeights: ThemeLineHeightScale;
	shadows: ThemeShadowScale;
	breakpoints: ThemeBreakpointScale;
	components: ThemeComponentConfig;
}

export interface ThemeTokens extends Theme {
	source?: typeof m3ThemeTokens;
}

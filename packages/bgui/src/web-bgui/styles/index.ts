// reexports from system for module augmentation
export type { BreakpointOverrides } from "@mui/system";
export { CssVarsProvider, getInitColorSchemeScript, useColorScheme } from "./CssVarsProvider";
export type { Components, StyleOverrides } from "./components";
export type { CssVarsThemeOptions } from "./extendTheme";
export { createGetCssVar, default as extendTheme } from "./extendTheme";
export { default as THEME_ID } from "./identifier";
export { default as StyledEngineProvider } from "./StyledEngineProvider";
export { default as shouldSkipGeneratingVar } from "./shouldSkipGeneratingVar";
export { default as styled } from "./styled";
export * from "./ThemeProvider";
export { default as ThemeProvider } from "./ThemeProvider";
// Joy typings
export type { ColorSchemeOverrides, SupportedColorScheme } from "./types/colorScheme";
export type {
	ColorPaletteProp,
	ColorPalettePropOverrides,
	ColorSystem,
	Palette,
	PaletteBackground,
	PaletteBackgroundOverrides,
	PaletteCommon,
	PaletteCommonOverrides,
	PaletteDanger,
	PaletteDangerOverrides,
	PaletteNeutral,
	PaletteNeutralOverrides,
	PaletteOverrides,
	PalettePrimary,
	PalettePrimaryOverrides,
	PaletteRange,
	PaletteRangeOverrides,
	PaletteSuccess,
	PaletteSuccessOverrides,
	PaletteText,
	PaletteTextOverrides,
	PaletteVariant,
	PaletteWarning,
	PaletteWarningOverrides,
} from "./types/colorSystem";
export type { Focus } from "./types/focus";
export type { Radius, RadiusOverrides } from "./types/radius";
export type { Shadow, ShadowOverrides } from "./types/shadow";
export type {
	Theme,
	ThemeCssVar,
	ThemeCssVarOverrides,
	ThemeScales,
	ThemeVars,
} from "./types/theme";
export type {
	FontFamily,
	FontFamilyOverrides,
	FontSize,
	FontSizeOverrides,
	FontWeight,
	FontWeightOverrides,
	LineHeight,
	LineHeightOverrides,
	TypographySystem,
	TypographySystemOverrides,
} from "./types/typography";
export type {
	VariantOutlined,
	VariantOutlinedActive,
	VariantOutlinedDisabled,
	VariantOutlinedHover,
	VariantPlain,
	VariantPlainActive,
	VariantPlainDisabled,
	VariantPlainHover,
	VariantProp,
	VariantPropOverrides,
	VariantSoft,
	VariantSoftActive,
	VariantSoftDisabled,
	VariantSoftHover,
	VariantSolid,
	VariantSolidActive,
	VariantSolidDisabled,
	VariantSolidHover,
	Variants,
} from "./types/variants";
export type { ZIndex, ZIndexOverrides } from "./types/zIndex";
export { default as useThemeProps } from "./useThemeProps";

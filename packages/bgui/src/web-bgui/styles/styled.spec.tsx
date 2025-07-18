import { type ColorPaletteProp, styled, type VariantProp } from "@mui/joy/styles";
import type * as React from "react";

const _Basic = styled("button")({
	fontWeight: "var(--fontSize-md)" as React.CSSProperties["fontWeight"],
	backgroundColor: "var(--palette-background-body)",
	lineHeight: 1,
});

const _ObjectStyle = styled("button")(({ theme }) => ({
	fontWeight: theme.vars.fontWeight.md,
	backgroundColor: theme.vars.palette.background.body,
	...theme.typography["body-md"],
}));

const _ArrayStyle = styled("button")(({ theme }) => [
	{
		fontWeight: theme.vars.fontWeight.md,
		backgroundColor: theme.vars.palette.background.body,
	},
	theme.typography["body-md"],
]);

const _FocusStyle = styled("button")(({ theme }) => [
	{
		fontWeight: theme.vars.fontWeight.md,
		backgroundColor: theme.vars.palette.background.body,
		[theme.focus.selector]: theme.focus.default,
	},
]);

const _Variants = styled("button")(({ theme }) => [
	{
		width: "auto",
	},
	theme.variants.solid.primary,
]);

const _DynamicVariants = styled("button")<{ variant?: VariantProp; color?: ColorPaletteProp }>(
	({ theme, variant = "solid", color = "primary" }) => [
		{
			width: "auto",
		},
		theme.variants[variant][color],
		theme.variants[`${variant}Hover`][color],
		theme.variants[`${variant}Active`][color],
		theme.variants[`${variant}Disabled`][color],
	],
);

"use client";
import { type GlobalStylesProps, GlobalStyles as SystemGlobalStyles } from "@mui/system";
import defaultTheme from "../styles/defaultTheme";
import THEME_ID from "../styles/identifier";
import type { Theme } from "../styles/types";

function GlobalStyles(props: GlobalStylesProps<Theme>) {
	return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} themeId={THEME_ID} />;
}

export default GlobalStyles;

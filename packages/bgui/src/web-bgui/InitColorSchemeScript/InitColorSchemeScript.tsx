import SystemInitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import * as React from "react";

export const defaultConfig = {
	attribute: "data-joy-color-scheme",
	colorSchemeStorageKey: "joy-color-scheme",
	defaultLightColorScheme: "light",
	defaultDarkColorScheme: "dark",
	modeStorageKey: "joy-mode",
} as const;

export default (function InitColorSchemeScript(props) {
	return <SystemInitColorSchemeScript {...defaultConfig} {...props} />;
} as typeof SystemInitColorSchemeScript);

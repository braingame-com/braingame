import type { ColorPalette, ExtendedColorScheme } from "../theme/types";

interface BguiThemeConfig {
	seed: Record<string, unknown>;
	coreColors: Record<string, unknown>;
	schemes: Record<string, ExtendedColorScheme>;
	palettes: Record<string, ColorPalette>;
}

declare module "@braingame/bgui" {
	export const bguiThemeConfig: BguiThemeConfig;
}

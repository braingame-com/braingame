import type { ColorScheme, Theme } from "../../types";
import { defaultLight } from "./default";
import { forestLight } from "./forest";
import { midnightLight } from "./midnight";
import { oceanLight } from "./ocean";
import { sunsetLight } from "./sunset";

export const lightColorSchemes: Record<ColorScheme, Theme["colors"]> = {
	default: defaultLight,
	ocean: oceanLight,
	forest: forestLight,
	sunset: sunsetLight,
	midnight: midnightLight,
};

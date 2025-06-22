import type { ColorScheme, Theme } from "../../types";
import { defaultLight } from "./default";
import { oceanLight } from "./ocean";
import { forestLight } from "./forest";
import { sunsetLight } from "./sunset";
import { midnightLight } from "./midnight";

export const lightColorSchemes: Record<ColorScheme, Theme["colors"]> = {
	default: defaultLight,
	ocean: oceanLight,
	forest: forestLight,
	sunset: sunsetLight,
	midnight: midnightLight,
};
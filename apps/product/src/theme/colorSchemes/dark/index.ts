import type { ColorScheme, Theme } from "../../types";
import { defaultDark } from "./default";
import { oceanDark } from "./ocean";
import { forestDark } from "./forest";
import { sunsetDark } from "./sunset";
import { midnightDark } from "./midnight";

export const darkColorSchemes: Record<ColorScheme, Theme["colors"]> = {
	default: defaultDark,
	ocean: oceanDark,
	forest: forestDark,
	sunset: sunsetDark,
	midnight: midnightDark,
};
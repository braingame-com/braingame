import type { ColorScheme, Theme } from "../../types";
import { defaultDark } from "./default";
import { forestDark } from "./forest";
import { midnightDark } from "./midnight";
import { oceanDark } from "./ocean";
import { sunsetDark } from "./sunset";

export const darkColorSchemes: Record<ColorScheme, Theme["colors"]> = {
	default: defaultDark,
	ocean: oceanDark,
	forest: forestDark,
	sunset: sunsetDark,
	midnight: midnightDark,
};

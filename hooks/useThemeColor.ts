import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor(
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
	const theme = useColorScheme() ?? "dark";

	return Colors[theme][colorName];
}

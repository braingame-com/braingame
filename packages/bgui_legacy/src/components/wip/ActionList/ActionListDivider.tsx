import { View } from "react-native";
import { useTheme } from "../../theme";
import type { ActionListDividerProps } from "./types";

export const ActionListDivider = (_props: ActionListDividerProps) => {
	const { colors } = useTheme();
	const color = colors.outlineVariant;
	return (
		<View
			accessibilityRole="none"
			style={{ height: 1, backgroundColor: color, marginVertical: 4 }}
		/>
	);
};
ActionListDivider.displayName = "ActionListDivider";

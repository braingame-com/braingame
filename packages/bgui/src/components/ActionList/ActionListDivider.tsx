import { View } from "react-native";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import type { ActionListDividerProps } from "./types";

export const ActionListDivider = (_props: ActionListDividerProps) => {
	const color = useThemeColor("border");
	return (
		<View
			accessibilityRole="none"
			style={{ height: 1, backgroundColor: color, marginVertical: 4 }}
		/>
	);
};
ActionListDivider.displayName = "ActionListDivider";

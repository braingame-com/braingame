import { View } from "react-native";
import { useTheme } from "../../theme";
import { useTabsContext } from "./context";
import { getTabStyles } from "./styles";
import type { TabsPanelProps } from "./types";

export const Panel = ({ children, value }: TabsPanelProps) => {
	const { colors } = useTheme();
	const { activeTab } = useTabsContext();
	const styles = getTabStyles(colors);
	if (activeTab !== value) {
		return null;
	}
	return (
		<View nativeID={`panel-${value}`} aria-labelledby={`tab-${value}`} style={styles.panel}>
			{children}
		</View>
	);
};

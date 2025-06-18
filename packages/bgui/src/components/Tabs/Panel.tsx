import { View } from "react-native";
import { useTabsContext } from "./context";
import { styles } from "./styles";
import type { TabsPanelProps } from "./types";

export const Panel = ({ children, value }: TabsPanelProps) => {
	const { activeTab } = useTabsContext();
	if (activeTab !== value) {
		return null;
	}
	return (
		<View nativeID={`panel-${value}`} aria-labelledby={`tab-${value}`} style={styles.panel}>
			{children}
		</View>
	);
};

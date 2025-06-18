import { View } from "react-native";
import type { TabsPanelsProps } from "./types";

export const Panels = ({ children }: TabsPanelsProps) => {
	return <View>{children}</View>;
};

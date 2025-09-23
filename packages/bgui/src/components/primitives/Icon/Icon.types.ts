import type { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../../icons";

export interface IconProps {
	name: IconName;
	size?: number;
	color?: string;
	testID?: string;
	accessibilityLabel?: string;
	style?: StyleProp<ViewStyle>;
}

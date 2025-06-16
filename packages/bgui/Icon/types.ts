import type { StyleProp, ViewStyle } from "react-native";
import type { IconSizeProps } from "../../utils/constants/types";

// Enterprise-grade TypeScript interfaces
export interface IconProps {
	name: string;
	size?: IconSizeProps | number;
	color?: string;
	type?: string;
	style?: StyleProp<ViewStyle>;
}

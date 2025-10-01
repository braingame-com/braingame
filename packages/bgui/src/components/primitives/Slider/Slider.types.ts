import type { SliderProps as CommunitySliderProps } from "@react-native-community/slider";
import type { StyleProp, ViewStyle } from "react-native";
import type { Theme } from "../../../theme";

export interface SliderProps
	extends Omit<
		CommunitySliderProps,
		"minimumTrackTintColor" | "maximumTrackTintColor" | "thumbTintColor"
	> {
	color?: keyof Theme["colors"] | string;
	trackColor?: {
		active?: string;
		inactive?: string;
	};
	thumbColor?: string;
	style?: StyleProp<ViewStyle>;
}

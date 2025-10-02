import type { NativeSyntheticEvent, StyleProp, ViewProps, ViewStyle } from "react-native";
import type { Theme } from "../../../theme";

export interface SliderTrackColor {
	active?: string;
	inactive?: string;
}

export interface SliderProps extends Omit<ViewProps, "style"> {
	value?: number;
	defaultValue?: number;
	minimumValue?: number;
	maximumValue?: number;
	step?: number;
	disabled?: boolean;
	color?: keyof Theme["colors"] | string;
	trackColor?: SliderTrackColor;
	thumbColor?: string;
	style?: StyleProp<ViewStyle>;
	thumbStyle?: StyleProp<ViewStyle>;
	onValueChange?: (value: number) => void;
	onSlidingStart?: (value: number) => void;
	onSlidingComplete?: (value: number) => void;
	onKeyDown?: (event: NativeSyntheticEvent<{ key?: string }>) => void;
}

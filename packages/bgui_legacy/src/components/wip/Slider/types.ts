import type { StyleProp, ViewStyle } from "react-native";

export interface SliderProps {
	value: number | [number, number];
	onValueChange: (value: number | [number, number]) => void;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	error?: boolean;
	errorMessage?: string;
	helperText?: string;
	style?: StyleProp<ViewStyle>;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-invalid"?: boolean;
}

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed";

export interface DividerProps {
	orientation?: DividerOrientation;
	color?: string;
	thickness?: number;
	variant?: DividerVariant;
	style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}

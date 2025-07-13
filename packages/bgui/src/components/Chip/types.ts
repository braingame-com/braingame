import type { StyleProp, ViewStyle } from "react-native";

export type ChipVariant = "filled" | "outlined";
export type ChipSize = "sm" | "md";
export type ChipColor = "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";

export interface ChipProps {
	/** Text content of the chip */
	label: string;
	/** Visual variant of the chip */
	variant?: ChipVariant;
	/** Size of the chip */
	size?: ChipSize;
	/** Color theme of the chip */
	color?: ChipColor;
	/** Icon to display on the left */
	icon?: string;
	/** Whether the chip can be removed */
	onRemove?: () => void;
	/** Whether the chip is selected/active */
	selected?: boolean;
	/** Callback when chip is pressed */
	onPress?: () => void;
	/** Whether the chip is disabled */
	disabled?: boolean;
	/** Custom style overrides */
	style?: StyleProp<ViewStyle>;
}

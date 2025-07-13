import { Colors } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { ChipColor, ChipSize, ChipVariant } from "./types";

export const styles = StyleSheet.create({
	base: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 16,
		borderWidth: 1,
	},
	pressable: {
		opacity: 1,
	},
	pressed: {
		opacity: 0.8,
	},
	disabled: {
		opacity: 0.5,
	},
	selected: {
		borderWidth: 2,
	},
	label: {
		fontFamily: "Lexend-Regular",
	},
	icon: {
		marginRight: 4,
	},
	removeButton: {
		marginLeft: 4,
		padding: 2,
	},
});

// Size configurations
export const sizeConfig: Record<
	ChipSize,
	{ paddingHorizontal: number; paddingVertical: number; fontSize: number }
> = {
	sm: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		fontSize: 12,
	},
	md: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		fontSize: 14,
	},
};

// Color configurations for different variants
export const colorConfig: Record<
	ChipVariant,
	Record<ChipColor, { backgroundColor: string; borderColor: string; textColor: string }>
> = {
	filled: {
		primary: {
			backgroundColor: Colors.universal.primary,
			borderColor: Colors.universal.primary,
			textColor: "#fff",
		},
		secondary: {
			backgroundColor: Colors.light.tint,
			borderColor: Colors.light.tint,
			textColor: "#fff",
		},
		success: {
			backgroundColor: Colors.universal.positive,
			borderColor: Colors.universal.positive,
			textColor: "#fff",
		},
		warning: {
			backgroundColor: Colors.universal.warn,
			borderColor: Colors.universal.warn,
			textColor: "#000",
		},
		danger: {
			backgroundColor: Colors.universal.negative,
			borderColor: Colors.universal.negative,
			textColor: "#fff",
		},
		neutral: {
			backgroundColor: Colors.light.button,
			borderColor: Colors.light.border,
			textColor: Colors.light.text,
		},
	},
	outlined: {
		primary: {
			backgroundColor: "transparent",
			borderColor: Colors.universal.primary,
			textColor: Colors.universal.primary,
		},
		secondary: {
			backgroundColor: "transparent",
			borderColor: Colors.light.tint,
			textColor: Colors.light.tint,
		},
		success: {
			backgroundColor: "transparent",
			borderColor: Colors.universal.positive,
			textColor: Colors.universal.positive,
		},
		warning: {
			backgroundColor: "transparent",
			borderColor: Colors.universal.warn,
			textColor: Colors.universal.warn,
		},
		danger: {
			backgroundColor: "transparent",
			borderColor: Colors.universal.negative,
			textColor: Colors.universal.negative,
		},
		neutral: {
			backgroundColor: "transparent",
			borderColor: Colors.light.border,
			textColor: Colors.light.text,
		},
	},
};

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "#11181C",
		textSecondary: "#5B656B",
		background: "#f5f5f5",
		card: "#fff",
		border: "rgb(239, 243, 244)",
		button: "#F0F0F0",
		buttonHovered: "#E6E6E6",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#ECEDEE",
		textSecondary: "#A9ADB0",
		background: "#151718",
		card: "#202020",
		border: "rgb(47, 51, 54)",
		button: "#3A3A3A",
		buttonHovered: "#444444",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
	universal: {
		primary: "rgb(59, 115, 245)",
		primaryHalfFaded: "rgba(59, 115, 245, .4)",
		primaryFaded: "rgba(59, 115, 245, .2)",
		positive: "rgb(39, 173, 117)",
		positiveHalfFaded: "rgba(39, 173, 117, .4)",
		positiveFaded: "rgba(39, 173, 117, .2)",
		warn: "rgb(233, 179, 0)",
		warnHalfFaded: "rgba(233, 179, 0, .4)",
		warnFaded: "rgba(233, 179, 0, .2)",
		negative: "rgb(240, 97, 109)",
		negativeHalfFaded: "rgba(240, 97, 109, .4)",
		negativeFaded: "rgba(240, 97, 109, .2)",
	},
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

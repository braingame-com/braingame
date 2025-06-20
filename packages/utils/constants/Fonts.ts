/**
 * Font loading configuration for Expo
 * Lexend variable font (primary): supports weights 100-900
 * Roboto Mono (monospace): Google's excellent monospace font
 */
export const Fonts = {
	// Lexend variable font - primary font family (weights 100-900)
	LexendLight: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendRegular: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendMedium: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendSemiBold: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendBold: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	
	// Roboto Mono - monospace font family
	RobotoMonoRegular: "Roboto Mono", // Using system font
	RobotoMonoBold: "Roboto Mono",    // Bold variant handled via fontWeight
};

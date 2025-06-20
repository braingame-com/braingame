/**
 * Font loading configuration for Expo
 * Lexend variable font supports weights 100-900
 * TestSöhne fonts kept for backward compatibility during migration
 */
export const Fonts = {
	// Lexend variable font - primary font family (weights 100-900)
	LexendLight: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendRegular: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendMedium: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendSemiBold: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	LexendBold: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
	
	// TestSöhne fonts - legacy support (will be phased out)
	SohneHalfFat: require("../assets/fonts/TestSohne/TestSohne-Halbfett.otf"),
	SohneStrong: require("../assets/fonts/TestSohne/TestSohne-Kraftig.otf"),
	SohneBook: require("../assets/fonts/TestSohne/TestSohne-Buch.otf"),
	SohneLight: require("../assets/fonts/TestSohne/TestSohne-Leicht.otf"),
	SohneMonoHalfFat: require("../assets/fonts/TestSohneMono/TestSohneMono-Halbfett.otf"),
	SohneMonoStrong: require("../assets/fonts/TestSohneMono/TestSohneMono-Kraftig.otf"),
	SohneMonoBook: require("../assets/fonts/TestSohneMono/TestSohneMono-Buch.otf"),
	SohneMonoLight: require("../assets/fonts/TestSohneMono/TestSohneMono-Leicht.otf"),
};

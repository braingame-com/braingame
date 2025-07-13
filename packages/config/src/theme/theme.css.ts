import { generateAllCSSThemes } from "./utils";

// Generate and export CSS as a string that can be imported
export const themeCSS = generateAllCSSThemes();

// Also export a function to generate CSS for a specific mode
export { generateCSSTheme } from "./utils";

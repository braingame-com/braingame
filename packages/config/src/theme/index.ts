export * from "./colors";
// Re-export the main theme object for convenience
export { theme as BrainGameTheme } from "./colors";
export * from "./types";
export * from "./utils";

// Export a default theme configuration
export const defaultTheme = {
	mode: "light" as const,
	highContrast: false,
};

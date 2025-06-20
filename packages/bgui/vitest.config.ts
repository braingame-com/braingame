import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
		// Vitest doesn't transform node_modules by default.
		// We need to explicitly tell it to transform the React Native libraries.
		deps: {
			inline: [/react-native/, /@react-native/, /@expo/, /expo-/, /expo-asset/, /expo-font/],
		},
		alias: {
			"@braingame/utils": new URL("../utils/index.ts", import.meta.url).pathname,
		},
	},
	optimizeDeps: {
		include: [
			"react-native-web",
			"react-native-svg-web",
			"@braingame/utils",
			"react-native-reanimated",
			"@expo/vector-icons",
		],
	},
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
		alias: [
			{ find: "@braingame/utils", replacement: path.resolve(__dirname, "../utils/index.ts") },
			{ find: /^react-native$/, replacement: "react-native-web" },
			{ find: /^react-native\/(.*)/, replacement: "react-native-web/$1" }
		],
	},
	resolve: {
		extensions: [".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx", ".json"],
		alias: {
			"react-native": "react-native-web",
			"react-native-svg": "react-native-svg-web"
		}
	},
	optimizeDeps: {
		include: [
			"react-native-web",
			"react-native-svg-web",
			"@braingame/utils",
			"react-native-reanimated",
			"@expo/vector-icons"
		],
		esbuildOptions: {
			loader: {
				".js": "jsx"
			}
		}
	}
});
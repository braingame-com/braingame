import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
		coverage: {
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"dist/",
				"**/*.d.ts",
				"**/*.config.*",
				"**/mockData.ts",
			],
		},
		deps: {
			optimizer: {
				web: {
					include: ["react-native", "@react-native", "react-native-web"]
				}
			}
		}
	},
	resolve: {
		alias: {
			"@braingame/utils": new URL("./index.ts", import.meta.url).pathname,
			"react-native": "react-native-web"
		},
	},
});
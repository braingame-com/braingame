import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		setupFiles: [],
		include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
		coverage: {
			reporter: ["text", "json", "html"],
			include: ["src/**/*.ts"],
			exclude: ["src/**/*.test.ts", "src/**/*.d.ts", "src/types/**"],
		},
	},
});

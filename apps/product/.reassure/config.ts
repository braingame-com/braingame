import { configure } from "reassure";

configure({
	testCommand:
		'pnpm test --testMatch="**/*.perf.test.tsx" --testRunner "apps/product/jest-perf.config.js"',
	// Run performance tests in a more isolated environment
	verbose: true,
	// Increase the number of measurements for more accurate results
	measurements: {
		render: {
			runs: 20, // Number of test runs
			warmupRuns: 5, // Warm up runs before actual measurements
		},
	},
});

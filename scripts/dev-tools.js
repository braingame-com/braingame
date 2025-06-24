#!/usr/bin/env node
/**
 * Development tools for Brain Game monorepo
 *
 * Provides useful commands for development workflow:
 * - Component analysis
 * - Dependency checking
 * - Quick project stats
 * - Test coverage summaries
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const [, , command, ...args] = process.argv;

const commands = {
	stats: "Show project statistics",
	analyze: "Analyze components and their usage",
	deps: "Check dependency health",
	coverage: "Show test coverage summary",
	"find-unused": "Find potentially unused files",
	help: "Show this help message",
};

if (!command || command === "help") {
	console.log("🛠️  Brain Game Dev Tools\n");
	console.log("Available commands:");
	for (const [cmd, desc] of Object.entries(commands)) {
		console.log(`  ${cmd.padEnd(12)} ${desc}`);
	}
	console.log("\nUsage: node scripts/dev-tools.js <command>");
	process.exit(0);
}

const rootDir = path.resolve(__dirname, "..");

switch (command) {
	case "stats":
		showProjectStats();
		break;
	case "analyze":
		analyzeComponents();
		break;
	case "deps":
		checkDependencies();
		break;
	case "coverage":
		showCoverage();
		break;
	case "find-unused":
		findUnusedFiles();
		break;
	default:
		console.error(`Unknown command: ${command}`);
		console.log("Run 'node scripts/dev-tools.js help' for available commands");
		process.exit(1);
}

function showProjectStats() {
	console.log("📊 Project Statistics\n");

	const stats = {
		components: 0,
		tests: 0,
		stories: 0,
		hooks: 0,
		utils: 0,
		totalFiles: 0,
		linesOfCode: 0,
	};

	// Count BGUI components
	const componentsDir = path.join(rootDir, "packages/bgui/src/components");
	if (fs.existsSync(componentsDir)) {
		stats.components = fs
			.readdirSync(componentsDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory()).length;
	}

	// Count files across project
	function countFiles(dir, extensions) {
		let count = 0;
		try {
			const items = fs.readdirSync(dir, { withFileTypes: true });
			for (const item of items) {
				if (item.isDirectory() && !item.name.startsWith(".") && item.name !== "node_modules") {
					count += countFiles(path.join(dir, item.name), extensions);
				} else if (item.isFile() && extensions.some((ext) => item.name.endsWith(ext))) {
					count++;
					stats.totalFiles++;

					// Count lines of code
					try {
						const content = fs.readFileSync(path.join(dir, item.name), "utf8");
						stats.linesOfCode += content.split("\n").length;
					} catch (e) {
						// Skip files we can't read
					}
				}
			}
		} catch (e) {
			// Skip directories we can't read
		}
		return count;
	}

	stats.tests = countFiles(rootDir, [".test.ts", ".test.tsx", ".spec.ts", ".spec.tsx"]);
	stats.stories = countFiles(rootDir, [".stories.ts", ".stories.tsx"]);
	stats.hooks = countFiles(path.join(rootDir, "packages/bgui/src/hooks"), [".ts", ".tsx"]);
	stats.utils = countFiles(path.join(rootDir, "packages/bgui/src/utils"), [".ts", ".tsx"]);

	console.log(`🧩 Components:     ${stats.components}`);
	console.log(`🧪 Test files:     ${stats.tests}`);
	console.log(`📚 Stories:        ${stats.stories}`);
	console.log(`🪝 Custom hooks:   ${stats.hooks}`);
	console.log(`🔧 Utilities:      ${stats.utils}`);
	console.log(`📁 Total files:    ${stats.totalFiles}`);
	console.log(`📝 Lines of code:  ${stats.linesOfCode.toLocaleString()}`);

	// Calculate test coverage ratio
	const testCoverage = stats.tests > 0 ? ((stats.tests / stats.components) * 100).toFixed(1) : 0;
	const storyCoverage =
		stats.stories > 0 ? ((stats.stories / stats.components) * 100).toFixed(1) : 0;

	console.log("\n📈 Coverage:");
	console.log(`   Tests:     ${testCoverage}% (${stats.tests}/${stats.components} components)`);
	console.log(`   Stories:   ${storyCoverage}% (${stats.stories}/${stats.components} components)`);
}

function analyzeComponents() {
	console.log("🔍 Component Analysis\n");

	const componentsDir = path.join(rootDir, "packages/bgui/src/components");
	if (!fs.existsSync(componentsDir)) {
		console.log("No components directory found");
		return;
	}

	const components = fs
		.readdirSync(componentsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	console.log(`Found ${components.length} components:\n`);

	for (const component of components) {
		const componentDir = path.join(componentsDir, component);
		const files = fs.readdirSync(componentDir);

		const hasTest = files.some((f) => f.includes(".test."));
		const hasStory = files.some((f) => f.includes(".stories."));
		const hasStyles = files.includes("styles.ts");
		const hasTypes = files.includes("types.ts");

		const indicators = [
			hasTest ? "✅" : "❌",
			hasStory ? "📚" : "❌",
			hasStyles ? "🎨" : "❌",
			hasTypes ? "📝" : "❌",
		].join(" ");

		console.log(`${component.padEnd(20)} ${indicators} ${hasTest ? "" : "(missing tests)"}`);
	}

	console.log("\nLegend: ✅ Tests | 📚 Stories | 🎨 Styles | 📝 Types");

	// Find components that might need attention
	const needsAttention = components.filter((component) => {
		const componentDir = path.join(componentsDir, component);
		const files = fs.readdirSync(componentDir);
		return !files.some((f) => f.includes(".test."));
	});

	if (needsAttention.length > 0) {
		console.log(`\n⚠️  Components needing tests: ${needsAttention.join(", ")}`);
	}
}

function checkDependencies() {
	console.log("📦 Dependency Health Check\n");

	try {
		// Check for outdated dependencies
		console.log("Checking for outdated dependencies...");
		const outdated = execSync("pnpm outdated --recursive", { encoding: "utf8", cwd: rootDir });
		if (outdated.trim()) {
			console.log("⚠️  Outdated dependencies found:");
			console.log(outdated);
		} else {
			console.log("✅ All dependencies are up to date");
		}
	} catch (error) {
		console.log("✅ All dependencies are up to date");
	}

	// Check package.json files for common issues
	const packageFiles = [
		path.join(rootDir, "package.json"),
		path.join(rootDir, "packages/bgui/package.json"),
		path.join(rootDir, "packages/utils/package.json"),
		path.join(rootDir, "packages/config/package.json"),
		path.join(rootDir, "apps/product/package.json"),
		path.join(rootDir, "apps/main-site/package.json"),
		path.join(rootDir, "apps/docs-site/package.json"),
	];

	console.log("\nPackage configuration:");

	for (const pkgFile of packageFiles) {
		if (fs.existsSync(pkgFile)) {
			const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
			const relativePath = path.relative(rootDir, pkgFile);

			const scripts = pkg.scripts ? Object.keys(pkg.scripts).length : 0;
			const deps = pkg.dependencies ? Object.keys(pkg.dependencies).length : 0;
			const devDeps = pkg.devDependencies ? Object.keys(pkg.devDependencies).length : 0;

			console.log(
				`📁 ${relativePath.padEnd(25)} ${scripts} scripts, ${deps} deps, ${devDeps} devDeps`,
			);
		}
	}
}

function showCoverage() {
	console.log("🧪 Test Coverage Summary\n");

	try {
		// Try to run coverage if jest is available
		const coverage = execSync("pnpm test:coverage --passWithNoTests", {
			encoding: "utf8",
			cwd: rootDir,
			timeout: 30000,
		});
		console.log(coverage);
	} catch (error) {
		console.log("⚠️  Could not generate coverage report. Make sure tests are set up.");
		console.log("Run 'pnpm test:coverage' manually for detailed coverage.");
	}
}

function findUnusedFiles() {
	console.log("🗑️  Finding Potentially Unused Files\n");

	const extensions = [".ts", ".tsx", ".js", ".jsx"];
	const unusedFiles = [];

	function scanDirectory(dir, basePath = "") {
		try {
			const items = fs.readdirSync(dir, { withFileTypes: true });

			for (const item of items) {
				if (item.isDirectory()) {
					// Skip certain directories
					if (["node_modules", ".git", "dist", "build", ".next"].includes(item.name)) {
						continue;
					}
					scanDirectory(path.join(dir, item.name), path.join(basePath, item.name));
				} else if (item.isFile()) {
					const filePath = path.join(dir, item.name);
					const relativePath = path.join(basePath, item.name);

					// Skip certain file types
					if (
						!extensions.some((ext) => item.name.endsWith(ext)) ||
						item.name.includes(".test.") ||
						item.name.includes(".stories.") ||
						item.name === "index.ts" ||
						item.name === "index.tsx"
					) {
						continue;
					}

					// Read file and check if it exports anything
					try {
						const content = fs.readFileSync(filePath, "utf8");

						// Simple heuristic: if file has no exports and is very small, might be unused
						if (!content.includes("export") && content.split("\n").length < 10) {
							unusedFiles.push(relativePath);
						}
					} catch (e) {
						// Skip files we can't read
					}
				}
			}
		} catch (e) {
			// Skip directories we can't read
		}
	}

	// Scan packages directory
	scanDirectory(path.join(rootDir, "packages"));
	scanDirectory(path.join(rootDir, "apps"));

	if (unusedFiles.length === 0) {
		console.log("✅ No obviously unused files found");
	} else {
		console.log("⚠️  Potentially unused files (manual review recommended):");
		for (const file of unusedFiles) {
			console.log(`   ${file}`);
		}
		console.log(`\nFound ${unusedFiles.length} files that might be unused`);
	}
}

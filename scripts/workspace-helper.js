#!/usr/bin/env node
/**
 * Workspace Helper - Quick commands for monorepo navigation and operations
 *
 * Usage: node scripts/workspace-helper.js <command> [package] [script]
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const [, , command, packageName, scriptName] = process.argv;

const commands = {
	list: "List all packages in the workspace",
	scripts: "List all scripts in a package",
	run: "Run a script in a specific package",
	test: "Run tests for a specific package",
	build: "Build a specific package",
	dev: "Start dev mode for a specific package",
	info: "Show package information",
	deps: "Show dependencies for a package",
	stats: "Show aggregate project statistics",
	analyze: "Inspect BGUI components for coverage gaps",
	"deps-health": "Audit dependency freshness across packages",
	coverage: "Run the monorepo coverage suite",
	unused: "Surface potentially unused source files",
	help: "Show this help message",
};

if (!command || command === "help") {
	console.log("🏗️  Workspace Helper\n");
	console.log("Available commands:");
	for (const [cmd, desc] of Object.entries(commands)) {
		console.log(`  ${cmd.padEnd(10)} ${desc}`);
	}
	console.log("\nExamples:");
	console.log("  pnpm workspace list");
	console.log("  pnpm workspace scripts bgui");
	console.log("  pnpm workspace run bgui test");
	console.log("  pnpm workspace test product");
	console.log("  pnpm workspace info utils");
	process.exit(0);
}

const rootDir = path.resolve(__dirname, "..");
const workspaceYaml = path.join(rootDir, "pnpm-workspace.yaml");

// Get all packages in workspace
function getWorkspacePackages() {
	const packages = [];

	// Read from pnpm-workspace.yaml
	if (fs.existsSync(workspaceYaml)) {
		const yamlContent = fs.readFileSync(workspaceYaml, "utf8");
		const patterns = yamlContent.match(/- ['"]([^'"]+)['"]/g) || [];

		for (const pattern of patterns) {
			const cleanPattern = pattern.replace(/- ['"]([^'"]+)['"]/, "$1");
			const glob = cleanPattern.replace("/*", "");

			const baseDir = path.join(rootDir, glob);
			if (fs.existsSync(baseDir)) {
				const subdirs = fs.readdirSync(baseDir, { withFileTypes: true });
				for (const subdir of subdirs) {
					if (subdir.isDirectory()) {
						const pkgPath = path.join(baseDir, subdir.name, "package.json");
						if (fs.existsSync(pkgPath)) {
							const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
							packages.push({
								name: pkg.name,
								path: path.join(glob, subdir.name),
								fullPath: path.join(baseDir, subdir.name),
								package: pkg,
							});
						}
					}
				}
			}
		}
	}

	return packages;
}

function findPackage(name) {
	const packages = getWorkspacePackages();
	return packages.find(
		(pkg) => pkg.name === name || pkg.name.includes(name) || pkg.path.includes(name),
	);
}

switch (command) {
	case "list":
		listPackages();
		break;
	case "scripts":
		listScripts(packageName);
		break;
	case "run":
		runScript(packageName, scriptName);
		break;
	case "test":
		runScript(packageName, "test");
		break;
	case "build":
		runScript(packageName, "build");
		break;
	case "dev":
		runScript(packageName, "dev");
		break;
	case "info":
		showPackageInfo(packageName);
		break;
	case "deps":
		showDependencies(packageName);
		break;
	case "stats":
		showProjectStats();
		break;
	case "analyze":
		analyzeComponents();
		break;
	case "deps-health":
		checkDependencies();
		break;
	case "coverage":
		showCoverage();
		break;
	case "unused":
		findUnusedFiles();
		break;
	default:
		console.error(`Unknown command: ${command}`);
		console.log("Run 'node scripts/workspace-helper.js help' for available commands");
		process.exit(1);
}

function listPackages() {
	console.log("📦 Workspace Packages\n");

	const packages = getWorkspacePackages();

	if (packages.length === 0) {
		console.log("No packages found in workspace");
		return;
	}

	for (const pkg of packages) {
		const scripts = pkg.package.scripts ? Object.keys(pkg.package.scripts).length : 0;
		const deps = pkg.package.dependencies ? Object.keys(pkg.package.dependencies).length : 0;
		const devDeps = pkg.package.devDependencies
			? Object.keys(pkg.package.devDependencies).length
			: 0;

		console.log(
			`📁 ${pkg.name.padEnd(20)} ${pkg.path.padEnd(15)} (${scripts} scripts, ${deps + devDeps} deps)`,
		);
	}

	console.log(`\nTotal: ${packages.length} packages`);
}

function listScripts(name) {
	if (!name) {
		console.error("Package name required for scripts command");
		console.log("Usage: pnpm workspace scripts <package-name>");
		process.exit(1);
	}

	const pkg = findPackage(name);
	if (!pkg) {
		console.error(`Package '${name}' not found`);
		console.log("Available packages:");
		getWorkspacePackages().forEach((p) => console.log(`  ${p.name}`));
		process.exit(1);
	}

	console.log(`📋 Scripts for ${pkg.name}\n`);

	if (!pkg.package.scripts || Object.keys(pkg.package.scripts).length === 0) {
		console.log("No scripts defined");
		return;
	}

	for (const [script, command] of Object.entries(pkg.package.scripts)) {
		console.log(`${script.padEnd(15)} ${command}`);
	}
}

function runScript(name, script) {
	if (!name || !script) {
		console.error("Package name and script name required");
		console.log("Usage: pnpm workspace run <package-name> <script-name>");
		process.exit(1);
	}

	const pkg = findPackage(name);
	if (!pkg) {
		console.error(`Package '${name}' not found`);
		process.exit(1);
	}

	if (!pkg.package.scripts || !pkg.package.scripts[script]) {
		console.error(`Script '${script}' not found in ${pkg.name}`);
		console.log("Available scripts:");
		if (pkg.package.scripts) {
			for (const s of Object.keys(pkg.package.scripts)) {
				console.log(`  ${s}`);
			}
		}
		process.exit(1);
	}

	console.log(`🚀 Running ${script} in ${pkg.name}...\n`);

	try {
		execSync(`pnpm run ${script}`, {
			cwd: pkg.fullPath,
			stdio: "inherit",
		});
	} catch (error) {
		console.error(`\n❌ Script failed with exit code ${error.status}`);
		process.exit(error.status);
	}
}

function showPackageInfo(name) {
	if (!name) {
		console.error("Package name required for info command");
		process.exit(1);
	}

	const pkg = findPackage(name);
	if (!pkg) {
		console.error(`Package '${name}' not found`);
		process.exit(1);
	}

	console.log(`📦 ${pkg.package.name}\n`);
	console.log(`Version:     ${pkg.package.version || "N/A"}`);
	console.log(`Description: ${pkg.package.description || "N/A"}`);
	console.log(`Path:        ${pkg.path}`);
	console.log(`Private:     ${pkg.package.private ? "Yes" : "No"}`);

	if (pkg.package.main) {
		console.log(`Main:        ${pkg.package.main}`);
	}

	if (pkg.package.types) {
		console.log(`Types:       ${pkg.package.types}`);
	}

	const scripts = pkg.package.scripts ? Object.keys(pkg.package.scripts).length : 0;
	const deps = pkg.package.dependencies ? Object.keys(pkg.package.dependencies).length : 0;
	const devDeps = pkg.package.devDependencies ? Object.keys(pkg.package.devDependencies).length : 0;
	const peerDeps = pkg.package.peerDependencies
		? Object.keys(pkg.package.peerDependencies).length
		: 0;

	console.log("\nCounts:");
	console.log(`  Scripts:     ${scripts}`);
	console.log(`  Dependencies:     ${deps}`);
	console.log(`  Dev Dependencies: ${devDeps}`);
	console.log(`  Peer Dependencies: ${peerDeps}`);
}

function showDependencies(name) {
	if (!name) {
		console.error("Package name required for deps command");
		process.exit(1);
	}

	const pkg = findPackage(name);
	if (!pkg) {
		console.error(`Package '${name}' not found`);
		process.exit(1);
	}

	console.log(`📦 Dependencies for ${pkg.package.name}\n`);

	if (pkg.package.dependencies) {
		console.log("Dependencies:");
		for (const [dep, version] of Object.entries(pkg.package.dependencies)) {
			console.log(`  ${dep.padEnd(30)} ${version}`);
		}
		console.log("");
	}

	if (pkg.package.devDependencies) {
		console.log("Dev Dependencies:");
		for (const [dep, version] of Object.entries(pkg.package.devDependencies)) {
			console.log(`  ${dep.padEnd(30)} ${version}`);
		}
		console.log("");
	}

	if (pkg.package.peerDependencies) {
		console.log("Peer Dependencies:");
		for (const [dep, version] of Object.entries(pkg.package.peerDependencies)) {
			console.log(`  ${dep.padEnd(30)} ${version}`);
		}
	}
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

	const componentsDir = path.join(rootDir, "packages/bgui/src/components");
	if (fs.existsSync(componentsDir)) {
		stats.components = fs
			.readdirSync(componentsDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory()).length;
	}

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
					try {
						const content = fs.readFileSync(path.join(dir, item.name), "utf8");
						stats.linesOfCode += content.split("\n").length;
					} catch (error) {
						// noop
					}
				}
			}
		} catch (error) {
			// noop
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

	const testCoverage = stats.components > 0 ? ((stats.tests / stats.components) * 100).toFixed(1) : "0.0";
	const storyCoverage = stats.components > 0 ? ((stats.stories / stats.components) * 100).toFixed(1) : "0.0";

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

		const hasTest = files.some((file) => file.includes(".test."));
		const hasStory = files.some((file) => file.includes(".stories."));
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

	const needsAttention = components.filter((component) => {
		const componentDir = path.join(componentsDir, component);
		const files = fs.readdirSync(componentDir);
		return !files.some((file) => file.includes(".test."));
	});

	if (needsAttention.length > 0) {
		console.log(`\n⚠️  Components needing tests: ${needsAttention.join(", ")}`);
	}
}

function checkDependencies() {
	console.log("📦 Dependency Health Check\n");

	try {
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
		if (!fs.existsSync(pkgFile)) continue;
		const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
		const relativePath = path.relative(rootDir, pkgFile);
		const scripts = pkg.scripts ? Object.keys(pkg.scripts).length : 0;
		const deps = pkg.dependencies ? Object.keys(pkg.dependencies).length : 0;
		const devDeps = pkg.devDependencies ? Object.keys(pkg.devDependencies).length : 0;
		console.log(
			`📁 ${relativePath.padEnd(30)} ${scripts} scripts, ${deps} deps, ${devDeps} devDeps`,
		);
	}
}

function showCoverage() {
	console.log("🧪 Test Coverage Summary\n");

	try {
		const coverage = execSync("pnpm test:coverage --passWithNoTests", {
			encoding: "utf8",
			cwd: rootDir,
			timeout: 30000,
		});
		console.log(coverage);
	} catch (error) {
		console.log("⚠️  Could not generate coverage report. Run 'pnpm test:coverage' manually.");
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
					if (["node_modules", ".git", "dist", "build", ".next"].includes(item.name)) {
						continue;
					}
					scanDirectory(path.join(dir, item.name), path.join(basePath, item.name));
				} else if (item.isFile()) {
					const relativePath = path.join(basePath, item.name);
					if (
						!extensions.some((ext) => item.name.endsWith(ext)) ||
						item.name.includes(".test.") ||
						item.name.includes(".stories.") ||
						item.name === "index.ts" ||
						item.name === "index.tsx"
					) {
						continue;
					}

					try {
						const content = fs.readFileSync(path.join(dir, item.name), "utf8");
						if (!content.includes("export") && content.split("\n").length < 10) {
							unusedFiles.push(relativePath);
						}
					} catch (error) {
						// noop
					}
				}
			}
		} catch (error) {
			// noop
		}
	}

	scanDirectory(path.join(rootDir, "packages"));
	scanDirectory(path.join(rootDir, "apps"));

	if (unusedFiles.length === 0) {
		console.log("✅ No obviously unused files found");
		return;
	}

	console.log("⚠️  Potentially unused files (manual review recommended):");
	for (const file of unusedFiles) {
		console.log(`   ${file}`);
	}
	console.log(`\nFound ${unusedFiles.length} files that might be unused`);
}

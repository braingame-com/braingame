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
			const cleanPattern = pattern.replace(/- ['"]([^'"]+)['"]/, '$1');
			const glob = cleanPattern.replace('/*', '');
			
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
	return packages.find(pkg => 
		pkg.name === name || 
		pkg.name.includes(name) || 
		pkg.path.includes(name)
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
		const devDeps = pkg.package.devDependencies ? Object.keys(pkg.package.devDependencies).length : 0;
		
		console.log(`📁 ${pkg.name.padEnd(20)} ${pkg.path.padEnd(15)} (${scripts} scripts, ${deps + devDeps} deps)`);
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
		getWorkspacePackages().forEach(p => console.log(`  ${p.name}`));
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
	console.log(`Version:     ${pkg.package.version || 'N/A'}`);
	console.log(`Description: ${pkg.package.description || 'N/A'}`);
	console.log(`Path:        ${pkg.path}`);
	console.log(`Private:     ${pkg.package.private ? 'Yes' : 'No'}`);
	
	if (pkg.package.main) {
		console.log(`Main:        ${pkg.package.main}`);
	}
	
	if (pkg.package.types) {
		console.log(`Types:       ${pkg.package.types}`);
	}
	
	const scripts = pkg.package.scripts ? Object.keys(pkg.package.scripts).length : 0;
	const deps = pkg.package.dependencies ? Object.keys(pkg.package.dependencies).length : 0;
	const devDeps = pkg.package.devDependencies ? Object.keys(pkg.package.devDependencies).length : 0;
	const peerDeps = pkg.package.peerDependencies ? Object.keys(pkg.package.peerDependencies).length : 0;
	
	console.log(`\nCounts:`);
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
import fs from "node:fs";
import path from "node:path";
import { info, success, warning } from "./utils/console";

// Patterns for common secret formats
const patterns: Record<string, RegExp> = {
	awsAccessKey: /AKIA[0-9A-Z]{16}/,
	awsSecretKey: /(?:aws_secret_access_key|AWS_SECRET_ACCESS_KEY)=[0-9a-zA-Z/+=]{40}/,
	githubToken: /ghp_[0-9A-Za-z]{36}/,
	gcpServiceAccount: /"type":\s*"service_account"/,
	genericToken: /(?<![A-Za-z0-9])[A-Za-z0-9]{32}(?![A-Za-z0-9])/,
};

const ignoredDirs = ["node_modules", ".git", ".turbo"];

function scanFile(filePath: string) {
	const content = fs.readFileSync(filePath, "utf8");
	const lines = content.split(/\r?\n/);
	lines.forEach((line, index) => {
		for (const [name, regex] of Object.entries(patterns)) {
			if (regex.test(line)) {
				warning(`Potential secret (${name}) in ${filePath}:${index + 1}`);
			}
		}
	});
}

function walk(dir: string) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (ignoredDirs.includes(entry.name)) continue;
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(fullPath);
		} else if (entry.isFile()) {
			scanFile(fullPath);
		}
	}
}

info("Scanning for secrets...");
walk(process.cwd());
success("Secret scan complete");

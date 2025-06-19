#!/usr/bin/env ts-node

import path from "node:path";
import { globSync } from "glob";
import { Node, Project } from "ts-morph";

function run() {
	const patterns = process.argv.slice(2);
	if (patterns.length === 0) {
		patterns.push("**/*.{ts,tsx}");
	}

	const files = patterns.flatMap((pattern) =>
		globSync(pattern, {
			absolute: true,
			ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
		}),
	);

	if (files.length === 0) {
		console.log("No files matched.");
		return;
	}

	const project = new Project({ tsConfigFilePath: path.join(process.cwd(), "tsconfig.json") });

	for (const file of files) {
		project.addSourceFileAtPath(file);
	}

	for (const sourceFile of project.getSourceFiles()) {
		let modified = false;

		// update imports
		for (const decl of sourceFile.getImportDeclarations()) {
			for (const named of decl.getNamedImports()) {
				if (named.getName() === "PrimaryButton") {
					named.setName("Button");
					modified = true;
				}
			}
		}

		const handleOpening = (
			el: import("ts-morph").JsxOpeningElement | import("ts-morph").JsxSelfClosingElement,
		) => {
			const tagNameNode = el.getTagNameNode();
			if (tagNameNode.getText() === "PrimaryButton") {
				tagNameNode.replaceWithText("Button");
				const attr = el.getAttribute("variant");
				if (!attr) {
					el.addAttribute({ name: "variant", initializer: `'primary'` });
				}
				modified = true;
			}
		};

		const handleClosing = (el: import("ts-morph").JsxClosingElement) => {
			const tagNameNode = el.getTagNameNode();
			if (tagNameNode.getText() === "PrimaryButton") {
				tagNameNode.replaceWithText("Button");
				modified = true;
			}
		};

		sourceFile.forEachDescendant((node) => {
			if (Node.isJsxSelfClosingElement(node)) {
				handleOpening(node);
			} else if (Node.isJsxOpeningElement(node)) {
				handleOpening(node);
			} else if (Node.isJsxClosingElement(node)) {
				handleClosing(node);
			}
		});

		if (modified) {
			sourceFile.saveSync();
			console.log(`Updated ${sourceFile.getFilePath()}`);
		}
	}
}

run();

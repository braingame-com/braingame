#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const components = [
	"Avatar",
	"Badge",
	"Box",
	"Button",
	"Card",
	"Checkbox",
	"Chip",
	"CircularProgress",
	"Container",
	"Divider",
	"Grid",
	"IconButton",
	"Input",
	"LinearProgress",
	"Link",
	"List",
	"ListItem",
	"Modal",
	"Radio",
	"RadioGroup",
	"Select",
	"Skeleton",
	"Stack",
	"Switch",
	"Tab",
	"TabList",
	"TabPanel",
	"Tabs",
	"Textarea",
	"Tooltip",
];

const componentsDir = path.join(__dirname, "../src/components");

components.forEach((componentName) => {
	const componentDir = path.join(componentsDir, componentName);
	const barrelFile = path.join(componentDir, `${componentName}.tsx`);

	const content = `// This file exists to help module resolution
// The actual implementation is in ${componentName}.web.tsx and ${componentName}.native.tsx
export { ${componentName} } from "./${componentName}.web";`;

	fs.writeFileSync(barrelFile, content);
	console.log(`Created barrel file for ${componentName}`);
});

console.log(`\nCreated ${components.length} barrel files.`);

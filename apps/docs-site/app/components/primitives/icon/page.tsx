// @ts-nocheck
"use client";

import { Icon, Stack, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { PropsTable } from "../../../../src/components/PropsTable";

const iconProps = [
	{ name: "name", type: "string", description: "Material icon name." },
	{ name: "size", type: '"sm" | "md" | "lg"', description: "Preset size token." },
	{ name: "color", type: "string", description: "Override color token." },
];

export default function IconDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Icon
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Icons use the Material Symbols font to keep bundle size tiny while matching Brain Game UI spacing.
			</Typography>

			<Stack direction="row" spacing="lg" className="mb-8" style={{ alignItems: "center" }}>
				<Icon name="menu" size="sm" />
				<Icon name="menu" size="md" />
				<Icon name="menu" size="lg" />
			</Stack>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={iconProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Icon } from "@braingame/bgui";

<Icon name="check_circle" size="sm" color="var(--color-success)" />;`}
				/>
			</section>
		</div>
	);
}

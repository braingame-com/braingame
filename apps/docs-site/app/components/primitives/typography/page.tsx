// @ts-nocheck
"use client";

import { Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { PropsTable } from "../../../../src/components/PropsTable";

const typographyProps = [
	{
		name: "level",
		type: '"display" | "h1" | "h2" | "h3" | "title" | "body" | "caption"',
		description: "Semantic and stylistic preset.",
	},
	{ name: "component", type: "React.ElementType", description: "Override the rendered element." },
	{ name: "textColor", type: "string", description: "Override the default color token." },
];

export default function TypographyDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Typography
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Use typography levels to communicate hierarchy. Levels map to tokens defined in the design
				system reference.
			</Typography>

			<div className="flex flex--column flex--gap-3 mb-8">
				<Typography level="display">Display</Typography>
				<Typography level="h1">Heading 1</Typography>
				<Typography level="h2">Heading 2</Typography>
				<Typography level="title">Title</Typography>
				<Typography level="body">Body text</Typography>
				<Typography level="caption" textColor="var(--color-text-secondary)">
					Caption text
				</Typography>
			</div>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={typographyProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Typography } from "@braingame/bgui";

<Typography level="title">Section Title</Typography>;`}
				/>
			</section>
		</div>
	);
}

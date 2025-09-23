// @ts-nocheck
"use client";

import { Box, Stack, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { PropsTable } from "../../../../src/components/PropsTable";

const boxProps = [
	{ name: "padding", type: "number | string", description: "Inline style padding helper." },
	{ name: "style", type: "React.CSSProperties", description: "Additional inline styles." },
	{ name: "children", type: "React.ReactNode", description: "Content rendered inside the box." },
];

export default function BoxDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Box
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Box is the low-level layout primitive for spacing, borders, and backgrounds. It is a thin wrapper
				on a styled div.
			</Typography>

			<Stack direction="row" spacing="md" className="mb-8">
				<Box style={{ background: "#101827", padding: 16, borderRadius: 12 }}>Default box</Box>
				<Box style={{ background: "#1f2937", padding: 24, borderRadius: 12, color: "white" }}>
					Custom padding
				</Box>
			</Stack>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={boxProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Box } from "@braingame/bgui";

<Box style={{ padding: 24, borderRadius: 16, background: "var(--color-surface-strong)" }}>
  Content here
</Box>;`}
				/>
			</section>
		</div>
	);
}

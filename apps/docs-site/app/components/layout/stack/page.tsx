// @ts-nocheck
"use client";

import { Box, Stack, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { PropsTable } from "../../../../src/components/PropsTable";

const stackProps = [
	{ name: "direction", type: '"column" | "row"', description: "Flex direction." },
	{ name: "spacing", type: '"none" | "sm" | "md" | "lg"', description: "Gap between children." },
	{ name: "align", type: '"start" | "center" | "end" | "stretch"', description: "Cross-axis alignment." },
];

export default function StackDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Stack
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Stack composes flex layouts with consistent gaps. Use it for vertical or horizontal grouping.
			</Typography>

			<Stack spacing="md" className="mb-8">
				<Stack direction="row" spacing="sm">
					{["One", "Two", "Three"].map((label) => (
						<Box key={label} style={{ padding: 12, borderRadius: 12, background: "#1f2937", color: "white" }}>
							{label}
						</Box>
					))}
				</Stack>
				<Stack spacing="sm">
					{["Alpha", "Beta", "Gamma"].map((label) => (
						<Box key={label} style={{ padding: 12, borderRadius: 12, background: "#111827", color: "white" }}>
							{label}
						</Box>
					))}
				</Stack>
			</Stack>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={stackProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Stack } from "@braingame/bgui";

<Stack direction="row" spacing="md" align="center">
  <Avatar />
  <Stack spacing="xs">
    <Typography level="title">Jordan Crow-Stewart</Typography>
    <Typography level="body" textColor="var(--color-text-secondary)">
      Founder, Brain Game
    </Typography>
  </Stack>
</Stack>;`}
				/>
			</section>
		</div>
	);
}

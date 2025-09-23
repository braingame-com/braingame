// @ts-nocheck
"use client";

import { Container, Stack, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { PropsTable } from "../../../../src/components/PropsTable";

const containerProps = [
	{ name: "maxWidth", type: 'number | "sm" | "md" | "lg" | "xl"', description: "Maximum content width." },
	{ name: "paddingX", type: '"none" | "sm" | "md" | "lg"', description: "Horizontal padding preset." },
	{ name: "style", type: "React.CSSProperties", description: "Additional inline styles." },
];

export default function ContainerDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Container
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Container constrains content width and adds responsive padding to match the layout grid.
			</Typography>

			<Stack spacing="lg" className="mb-8">
				<Container style={{ background: "#111827", borderRadius: 16, color: "white" }}>
					Default container with medium padding.
				</Container>
				<Container maxWidth="lg" style={{ background: "#0f172a", borderRadius: 16, color: "white" }}>
					Large container for marketing sections.
				</Container>
			</Stack>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={containerProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Container } from "@braingame/bgui";

<Container maxWidth="lg" paddingX="lg">
  <HeroSection />
</Container>;`}
				/>
			</section>
		</div>
	);
}

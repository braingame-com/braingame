// @ts-nocheck
"use client";

import { Button, Stack, Typography } from "@braingame/bgui";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const buttonProps = [
	{ name: "variant", type: '"solid" | "soft" | "outlined" | "plain"', description: "Visual treatment." },
	{ name: "color", type: '"primary" | "neutral" | "danger" | "success" | "warning"', description: "Tone of the button." },
	{ name: "size", type: '"sm" | "md" | "lg"', description: "Height and spacing preset." },
	{ name: "loading", type: "boolean", description: "Render a spinner and disable interactions." },
];

export default function ButtonDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Button
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Buttons trigger actions across Brain Game surfaces. Variants map directly to our design tokens and
				work in both dark and light themes.
			</Typography>

			<LiveExample
				title="Variants"
				code={`<Stack direction="row" spacing="md">
  <Button variant="solid">Solid</Button>
  <Button variant="soft">Soft</Button>
  <Button variant="outlined">Outlined</Button>
  <Button variant="plain">Plain</Button>
</Stack>`}
			>
				<Stack direction="row" spacing="md">
					<Button variant="solid">Solid</Button>
					<Button variant="soft">Soft</Button>
					<Button variant="outlined">Outlined</Button>
					<Button variant="plain">Plain</Button>
				</Stack>
			</LiveExample>

			<LiveExample
				title="Loading"
				code={`<Button loading>Saving</Button>`}
			>
				<Button loading>Saving</Button>
			</LiveExample>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={buttonProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Button } from "@braingame/bgui";

function SaveButton() {
  return (
    <Button variant="solid" onClick={handleSave}>
      Save changes
    </Button>
  );
}`}
				/>
			</section>
		</div>
	);
}

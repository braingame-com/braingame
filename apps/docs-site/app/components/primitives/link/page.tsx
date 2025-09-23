// @ts-nocheck
"use client";

import { Link as BguiLink, Stack, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const linkProps = [
	{ name: "href", type: "string", description: "Destination URL." },
	{ name: "variant", type: '"primary" | "neutral" | "subtle"', description: "Visual treatment." },
	{ name: "underline", type: '"always" | "hover" | "none"', description: "Underline behaviour." },
];

export default function LinkDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Link
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Links expose navigation affordances with typography that matches our design language.
			</Typography>

			<LiveExample
				title="Variants"
				code={`<Stack spacing="md">
  <Link href="/">Primary link</Link>
  <Link href="/" variant="neutral">Neutral link</Link>
  <Link href="/" underline="hover">Underline on hover</Link>
</Stack>`}
			>
				<Stack spacing="md">
					<BguiLink href="/">Primary link</BguiLink>
					<BguiLink href="/" variant="neutral">
						Neutral link
					</BguiLink>
					<BguiLink href="/" underline="hover">
						Underline on hover
					</BguiLink>
				</Stack>
			</LiveExample>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={linkProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Link } from "@braingame/bgui";

<Link href="/docs" variant="neutral">
  Visit documentation
</Link>;`}
				/>
			</section>
		</div>
	);
}

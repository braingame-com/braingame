// @ts-nocheck
"use client";

import { Button, Header, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const headerProps = [
	{ name: "brand", type: "React.ReactNode", description: "Brand element rendered on the left." },
	{ name: "links", type: "Array<{ label: string; href: string }>", description: "Primary navigation links." },
	{ name: "cta", type: "{ label: string; onClick: () => void; variant?: string }", description: "Optional call-to-action button." },
];

export default function HeaderDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Header
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				The Header composition bundles brand, navigation, and a call-to-action into a responsive bar for
				docs and marketing pages.
			</Typography>

			<LiveExample
				title="Default"
				code={`<Header
  brand={<Typography level="title-sm">Brain Game</Typography>}
  links={[
    { label: "Docs", href: "/components" },
    { label: "Components", href: "/components" },
  ]}
  cta={{ label: "Contact", onClick: () => alert('Contact us') }}
/>`}
			>
				<Header
					brand={<Typography level="title-sm">Brain Game</Typography>}
					links={[
						{ label: "Docs", href: "/components" },
						{ label: "Components", href: "/components" },
					]}
					cta={{ label: "Contact", onClick: () => undefined }}
				/>
			</LiveExample>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={headerProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Header, Typography } from "@braingame/bgui";

<Header
  brand={<Typography level="title-sm">Brain Game</Typography>}
  links={[{ label: "Components", href: "/components" }]}
  cta={{ label: "Join Waitlist", onClick: handleJoin }}
/>;`}
				/>
			</section>
		</div>
	);
}

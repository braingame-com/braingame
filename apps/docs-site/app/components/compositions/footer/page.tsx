// @ts-nocheck
"use client";

import { Footer, Typography } from "../../../../src/components/BGUIDemo";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { PropsTable } from "../../../../src/components/PropsTable";

const footerProps = [
	{ name: "brand", type: "{ label: string; href: string }", description: "Primary brand link." },
	{ name: "links", type: "Array<Array<{ label: string; href: string }>>", description: "Grouped navigation links." },
	{ name: "socialLinks", type: "Array<{ icon: string; label: string; href: string }>", description: "Social link metadata." },
];

export default function FooterDocs() {
	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Footer
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				Footer surfaces global navigation, legal links, and social icons. All content is configurable via
				plain objects.
			</Typography>

			<Footer
				brand={{ label: "Brain Game", href: "/" }}
				links={[
					[
						{ label: "Docs", href: "/components" },
						{ label: "Components", href: "/components" },
					],
					[
						{ label: "Privacy", href: "/privacy" },
						{ label: "Terms", href: "/terms" },
					],
				]}
				socialLinks={[
					{ icon: "github", label: "GitHub", href: "https://github.com/jordancrow-stewart/braingame" },
					{ icon: "x", label: "Twitter", href: "https://twitter.com/braingame" },
				]}
			/>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={footerProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Footer } from "@braingame/bgui";

<Footer
  brand={{ label: "Brain Game", href: "/" }}
  links={[[{ label: "Docs", href: "/components" }]]}
  socialLinks={[{ icon: "github", label: "GitHub", href: "https://github.com/jordancrow-stewart/braingame" }]}
/>;`}
				/>
			</section>
		</div>
	);
}

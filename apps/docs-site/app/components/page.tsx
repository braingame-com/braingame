// @ts-nocheck
"use client";

import Link from "next/link";

const sections = [
	{
		title: "Primitives",
		items: [
			{ label: "Button", href: "/components/primitives/button" },
			{ label: "Input", href: "/components/primitives/input" },
			{ label: "Link", href: "/components/primitives/link" },
			{ label: "Typography", href: "/components/primitives/typography" },
			{ label: "Icon", href: "/components/primitives/icon" },
		],
	},
	{
		title: "Layout",
		items: [
			{ label: "Box", href: "/components/layout/box" },
			{ label: "Container", href: "/components/layout/container" },
			{ label: "Stack", href: "/components/layout/stack" },
		],
	},
	{
		title: "Compositions",
		items: [
			{ label: "Header", href: "/components/compositions/header" },
			{ label: "Footer", href: "/components/compositions/footer" },
		],
	},
];

export default function ComponentsIndexPage() {
	return (
		<div className="docs-grid">
			<header className="docs-header">
				<h1>Component Catalog</h1>
				<p>
					Explore the Brain Game UI surfaces that are production-ready today. Each page includes a live
					sample and the essential props you need to start building.
				</p>
			</header>

			<section className="docs-section">
				{sections.map((section) => (
					<div key={section.title} className="docs-section__group">
						<h2>{section.title}</h2>
						<ul className="docs-section__list">
							{section.items.map((item) => (
								<li key={item.href}>
									<Link href={item.href}>{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</div>
	);
}

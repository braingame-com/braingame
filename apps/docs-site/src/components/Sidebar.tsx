"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
	title: string;
	href: string;
}

interface NavSection {
	title: string;
	items: NavItem[];
}

const navigation: NavSection[] = [
	{
		title: "Primitives",
		items: [
			{ title: "Button", href: "/components/primitives/button" },
			{ title: "Input", href: "/components/primitives/input" },
			{ title: "Link", href: "/components/primitives/link" },
			{ title: "Typography", href: "/components/primitives/typography" },
			{ title: "Icon", href: "/components/primitives/icon" },
		],
	},
	{
		title: "Layout",
		items: [
			{ title: "Box", href: "/components/layout/box" },
			{ title: "Container", href: "/components/layout/container" },
			{ title: "Stack", href: "/components/layout/stack" },
		],
	},
	{
		title: "Compositions",
		items: [
			{ title: "Header", href: "/components/compositions/header" },
			{ title: "Footer", href: "/components/compositions/footer" },
		],
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="layout__sidebar">
			<nav className="sidebar">
				{navigation.map((section) => (
					<div key={section.title} className="sidebar__section">
						<h3 className="sidebar__title">{section.title}</h3>
						<div className="sidebar__nav">
							{section.items.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`sidebar__link ${
										pathname === item.href ? "sidebar__link--active" : ""
									}`}
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>
				))}
			</nav>
		</aside>
	);
}

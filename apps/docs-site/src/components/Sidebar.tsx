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
	// {
	// 	title: "Getting Started",
	// 	items: [
	// 		{ title: "Introduction", href: "/" },
	// 		{ title: "Installation", href: "/installation" },
	// 		{ title: "Usage", href: "/usage" },
	// 		{ title: "Showcase", href: "/showcase" },
	// 	],
	// },
	// {
	// 	title: "Design",
	// 	items: [
	// 		{ title: "Colors", href: "/design/colors" },
	// 		{ title: "Typography", href: "/design/typography" },
	// 	],
	// },
	{
		title: "Primitives",
		items: [
			{ title: "Button", href: "/components/primitives/button" },
			{ title: "IconButton", href: "/components/primitives/iconbutton" },
			{ title: "Typography", href: "/components/primitives/typography" },
			{ title: "Avatar", href: "/components/primitives/avatar" },
			{ title: "Badge", href: "/components/primitives/badge" },
			{ title: "Chip", href: "/components/primitives/chip" },
			{ title: "Link", href: "/components/primitives/link" },
		],
	},
	{
		title: "Inputs",
		items: [
			{ title: "Input", href: "/components/inputs/input" },
			{ title: "Textarea", href: "/components/inputs/textarea" },
			{ title: "Select", href: "/components/inputs/select" },
			{ title: "Checkbox", href: "/components/inputs/checkbox" },
			{ title: "Radio", href: "/components/inputs/radio" },
			{ title: "RadioGroup", href: "/components/inputs/radiogroup" },
			{ title: "Switch", href: "/components/inputs/switch" },
		],
	},
	{
		title: "Layout",
		items: [
			{ title: "Box", href: "/components/layout/box" },
			{ title: "Container", href: "/components/layout/container" },
			{ title: "Stack", href: "/components/layout/stack" },
			{ title: "Grid", href: "/components/layout/grid" },
			{ title: "Card", href: "/components/layout/card" },
			{ title: "Divider", href: "/components/layout/divider" },
			{ title: "Modal", href: "/components/layout/modal" },
		],
	},
	{
		title: "Feedback",
		items: [
			{ title: "Alert", href: "/components/feedback/alert" },
			{ title: "CircularProgress", href: "/components/feedback/circularprogress" },
			{ title: "LinearProgress", href: "/components/feedback/linearprogress" },
			{ title: "Skeleton", href: "/components/feedback/skeleton" },
			{ title: "Tooltip", href: "/components/feedback/tooltip" },
		],
	},
	{
		title: "Navigation",
		items: [
			{ title: "List", href: "/components/navigation/list" },
			{ title: "ListItem", href: "/components/navigation/listitem" },
			{ title: "Tabs", href: "/components/navigation/tabs" },
			{ title: "Tab", href: "/components/navigation/tab" },
			{ title: "TabList", href: "/components/navigation/tablist" },
			{ title: "TabPanel", href: "/components/navigation/tabpanel" },
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

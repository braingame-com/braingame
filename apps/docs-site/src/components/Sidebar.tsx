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
		title: "Getting Started",
		items: [
			{ title: "Introduction", href: "/" },
			{ title: "Installation", href: "/installation" },
			{ title: "Usage", href: "/usage" },
		],
	},
	{
		title: "Design",
		items: [
			{ title: "Colors", href: "/design/colors" },
			{ title: "Typography", href: "/design/typography" },
			{ title: "Motion", href: "/design/motion" },
		],
	},
	{
		title: "Primitives",
		items: [
			{ title: "Button", href: "/components/primitives/button" },
			{ title: "Text", href: "/components/primitives/text" },
			{ title: "Icon", href: "/components/primitives/icon" },
			{ title: "Badge", href: "/components/primitives/badge" },
			{ title: "Chip", href: "/components/primitives/chip" },
		],
	},
	{
		title: "Inputs",
		items: [
			{ title: "TextInput", href: "/components/inputs/textinput" },
			{ title: "Checkbox", href: "/components/inputs/checkbox" },
			{ title: "Switch", href: "/components/inputs/switch" },
			{ title: "Select", href: "/components/inputs/select" },
		],
	},
	{
		title: "Layout",
		items: [
			{ title: "View", href: "/components/layout/view" },
			{ title: "Card", href: "/components/layout/card" },
			{ title: "Modal", href: "/components/layout/modal" },
			{ title: "Divider", href: "/components/layout/divider" },
		],
	},
	{
		title: "Feedback",
		items: [
			{ title: "Alert", href: "/components/feedback/alert" },
			{ title: "Toast", href: "/components/feedback/toast" },
			{ title: "Spinner", href: "/components/feedback/spinner" },
			{ title: "ProgressBar", href: "/components/feedback/progressbar" },
			{ title: "Tooltip", href: "/components/feedback/tooltip" },
		],
	},
	{
		title: "Specialized",
		items: [
			{ title: "VisionCard", href: "/components/specialized/vision-card" },
			{ title: "OnboardingSlide", href: "/components/specialized/onboarding-slide" },
			{ title: "EmptyState", href: "/components/specialized/empty-state" },
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MaterialIcon } from "./MaterialIcon";

export function Header() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		// Check for saved theme preference or default to light
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

		setTheme(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<header className="layout__header">
			<div className="header">
				<Link href="/" className="header__logo">
					<svg
						viewBox="0 0 24 24"
						fill="currentColor"
						width="24"
						height="24"
						role="graphics-symbol"
					>
						<path d="m20.88,7.56l1.56-.78,1.56-.78v-2.88c0-.57-.15-1.1-.42-1.56-.27-.47-.67-.87-1.14-1.14C21.98.15,21.45,0,20.88,0H3.12C2.55,0,2.02.15,1.56.42c-.47.27-.87.67-1.14,1.14-.27.46-.42.99-.42,1.56v17.76c0,.57.15,1.1.42,1.56.27.47.67.87,1.14,1.14.46.27.99.42,1.56.42h17.76c.57,0,1.1-.15,1.56-.42.47-.27.87-.67,1.14-1.14.27-.46.42-.99.42-1.56v-10.44h-8.88l-3.12,1.56,3.12,1.56h5.76v5.76c0,.19-.03.38-.1.55l-2.2-1.1-.58-.29-12.95-6.48,12.95-6.48.58-.29,2.2-1.1c.06.17.1.35.1.55v2.88Zm-5.05,13.32H4.68c-.86,0-1.56-.7-1.56-1.56v-4.79l12.71,6.35ZM3.12,9.47v-4.79c0-.86.7-1.56,1.56-1.56h11.14L3.12,9.47Z" />
					</svg>
					<span>Docs</span>
				</Link>

				<nav className="header__nav">
					<Link href="/components" className="button button--ghost">
						Components
					</Link>
					<Link href="/hooks" className="button button--ghost">
						Hooks
					</Link>
					<Link href="/utils" className="button button--ghost">
						Utils
					</Link>
					<a
						href="https://github.com/braingame/bgui"
						target="_blank"
						rel="noopener noreferrer"
						className="button button--ghost"
					>
						GitHub
					</a>
					<button
						type="button"
						onClick={toggleTheme}
						className="button button--ghost"
						aria-label="Toggle theme"
					>
						<MaterialIcon
							name={theme === "light" ? "dark_mode" : "light_mode"}
							size="small"
							color="var(--color-on-surface)"
						/>
					</button>
				</nav>
			</div>
		</header>
	);
}

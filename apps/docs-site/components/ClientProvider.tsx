"use client";

import { BGUIThemeProvider } from "@braingame/bgui";
import { useEffect, useState } from "react";
import { Header } from "../src/components/Header";
import { Sidebar } from "../src/components/Sidebar";

export function ClientProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Check for saved theme preference or default to light
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);

	if (!mounted) {
		return null; // Prevent hydration mismatch
	}

	return (
		<BGUIThemeProvider>
			<div className="layout">
				<Header />
				<Sidebar />
				<main className="layout__main">
					<div className="layout__content">{children}</div>
				</main>
			</div>
		</BGUIThemeProvider>
	);
}

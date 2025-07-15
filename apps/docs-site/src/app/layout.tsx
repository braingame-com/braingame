import { ThemeProvider } from "@braingame/bgui";
import type { Metadata } from "next";
import { Lexend, Roboto_Mono } from "next/font/google";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import "./globals.css";

const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
	weight: ["300", "400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto-mono",
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Brain Game UI Documentation",
	description: "Enterprise-grade component library documentation for Brain Game",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${lexend.variable} ${robotoMono.variable}`}>
			<head>
			</head>
			<body className={lexend.className}>
				<ThemeProvider>
					<div className="layout">
						<Header />
						<Sidebar />
						<main className="layout__main">
							<div className="layout__content">{children}</div>
						</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

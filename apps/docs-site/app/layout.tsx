import type { Metadata } from "next";
import { Lexend, Roboto_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ClientProvider } from "../components/ClientProvider";
import "./globals.css";

const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
	title: "Brain Game UI Documentation",
	description: "Enterprise-grade component library documentation for Brain Game",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" className={`${lexend.variable} ${robotoMono.variable}`}>
			<body className={lexend.className}>
				<ClientProvider>{children}</ClientProvider>
			</body>
		</html>
	);
}

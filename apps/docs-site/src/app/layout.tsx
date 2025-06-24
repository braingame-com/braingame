import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "BrainGame Documentation",
	description: "Documentation for BrainGame components and APIs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

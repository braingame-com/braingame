import type { Metadata } from "next";
import faviconPng from "@braingame/assets/favicon.png";

export const metadata: Metadata = {
	title: "Brain Game UI Documentation",
	description: "Enterprise-grade component library documentation for Brain Game",
	icons: {
		icon: [
			{
				url: faviconPng.src,
				type: "image/png",
				sizes: "32x32",
			},
		],
		shortcut: [
			{
				url: faviconPng.src,
				type: "image/png",
				sizes: "32x32",
			},
		],
	},
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

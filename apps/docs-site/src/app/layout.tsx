import type { Metadata } from "next";

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
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

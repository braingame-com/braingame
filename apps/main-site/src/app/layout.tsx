import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieConsent } from "../components/CookieConsent";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { ResourceHints } from "../components/ResourceHints";
import { WebVitals } from "../components/WebVitals";
import { ToastProvider } from "../contexts/ToastContext";
import { AnalyticsProvider } from "../providers/AnalyticsProvider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
	preload: true,
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
	preload: true,
	fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
});

export const metadata: Metadata = {
	title: {
		default: "Brain Game - The Future of Personal Development",
		template: "%s | Brain Game",
	},
	description:
		"Brain Game revolutionizes personal development through cutting-edge technology. Join the waitlist for early access to our transformative platform.",
	keywords: [
		"personal development",
		"brain training",
		"cognitive enhancement",
		"mental fitness",
		"self improvement",
		"brain game",
		"productivity",
		"mindfulness",
	],
	authors: [{ name: "Brain Game Team" }],
	creator: "Brain Game",
	publisher: "Brain Game",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "Brain Game - The Future of Personal Development",
		description:
			"Brain Game revolutionizes personal development through cutting-edge technology. Join the waitlist for early access.",
		url: "https://braingame.dev",
		siteName: "Brain Game",
		images: [
			{
				url: "https://braingame.dev/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Brain Game - Personal Development Platform",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Brain Game - The Future of Personal Development",
		description: "Join the waitlist for early access to our transformative platform.",
		images: ["https://braingame.dev/twitter-image"],
		creator: "@braingame",
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png" },
			{ url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
		],
		other: [
			{
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg",
				color: "#000000",
			},
		],
	},
	manifest: "/manifest.json",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5,
	},
	verification: {
		google: "google-site-verification-code",
		other: {
			me: ["info@braingame.dev"],
		},
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" dir="ltr">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ResourceHints />
				<AnalyticsProvider>
					<GoogleAnalytics />
					<WebVitals />
					<ErrorBoundary>
						<ToastProvider>
							<main>{children}</main>
						</ToastProvider>
					</ErrorBoundary>
					<CookieConsent />
				</AnalyticsProvider>
			</body>
		</html>
	);
}

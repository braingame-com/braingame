import Head from "next/head";

/**
 * Component to add resource hints for better performance
 */
export function ResourceHints() {
	return (
		<Head>
			{/* DNS Prefetch for external domains */}
			<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
			<link rel="dns-prefetch" href="https://fonts.gstatic.com" />

			{/* Preconnect for critical third-party origins */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

			{/* Preload critical fonts */}
			<link
				rel="preload"
				href="/fonts/geist-sans.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
			<link
				rel="preload"
				href="/fonts/geist-mono.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>

			{/* Preload critical CSS */}
			<link rel="preload" href="/_next/static/css/app.css" as="style" />

			{/* Resource hints for performance */}
			<meta httpEquiv="x-dns-prefetch-control" content="on" />
			<meta httpEquiv="preconnect" content="on" />
		</Head>
	);
}

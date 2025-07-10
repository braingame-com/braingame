"use client";

import { Link, Text, View } from "@braingame/bgui";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";
import { useServiceWorker } from "../hooks/useServiceWorker";

// Lazy load the email capture form
const EmailCaptureForm = dynamic(
	() => import("../components/EmailCaptureForm").then((mod) => mod.EmailCaptureForm),
	{
		loading: () => (
			<View style={{ height: 150, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ color: "#666" }}>Loading...</Text>
			</View>
		),
		ssr: true,
	},
);

export default function HomePage() {
	// Register service worker for offline support
	useServiceWorker();

	// Monitor performance metrics
	usePerformanceMonitor((metrics) => {
		if (process.env.NODE_ENV === "development") {
			console.log("Performance metrics:", metrics);
		}
	});

	// Preload critical resources
	useEffect(() => {
		// Preconnect to email service domain if different
		const link = document.createElement("link");
		link.rel = "preconnect";
		link.href = "https://api.braingame.dev";
		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link);
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				height: "100%",
				backgroundColor: "#000",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
			}}
		>
			{/* Logo placeholder */}

			{/* Title */}
			<Text
				variant="displayTitle"
				style={{
					color: "#fff",
					marginTop: 40,
					marginBottom: 16,
					textAlign: "center",
				}}
			>
				Brain Game
			</Text>

			{/* Subtitle */}
			<Text
				variant="subtitle"
				style={{
					color: "#999",
					marginBottom: 48,
					textAlign: "center",
					maxWidth: 600,
				}}
			>
				A new era of personal development technology is coming soon.
			</Text>

			{/* Email Capture Form - Lazy loaded */}
			<Suspense
				fallback={
					<View style={{ height: 150, justifyContent: "center", alignItems: "center" }}>
						<Text style={{ color: "#666" }}>Loading...</Text>
					</View>
				}
			>
				<EmailCaptureForm />
			</Suspense>

			{/* GitHub Link */}
			<Link
				href="https://github.com/braingame-com/braingame"
				style={{
					marginTop: 32,
				}}
			>
				<Text
					variant="body"
					style={{
						color: "#666",
						textDecorationLine: "underline",
					}}
				>
					View on GitHub
				</Text>
			</Link>
		</View>
	);
}

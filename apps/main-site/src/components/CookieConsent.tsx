"use client";

import { Button, Link, Text, View } from "@braingame/bgui";
import { useEffect, useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";

const COOKIE_CONSENT_KEY = "braingame_cookie_consent";

export function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false);
	const { trackEvent } = useAnalytics();

	useEffect(() => {
		// Check if user has already consented
		const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
		if (!consent) {
			// Show banner after a short delay for better UX
			const timer = setTimeout(() => setShowBanner(true), 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem(
			COOKIE_CONSENT_KEY,
			JSON.stringify({
				accepted: true,
				timestamp: new Date().toISOString(),
				version: "1.0",
			}),
		);

		trackEvent("cookie_consent", { action: "accept" });
		setShowBanner(false);

		// Enable analytics and other cookies
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics
			window.gtag("consent", "update", {
				analytics_storage: "granted",
				ad_storage: "granted",
			});
		}
	};

	const handleDecline = () => {
		localStorage.setItem(
			COOKIE_CONSENT_KEY,
			JSON.stringify({
				accepted: false,
				timestamp: new Date().toISOString(),
				version: "1.0",
			}),
		);

		trackEvent("cookie_consent", { action: "decline" });
		setShowBanner(false);

		// Disable analytics and other cookies
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics
			window.gtag("consent", "update", {
				analytics_storage: "denied",
				ad_storage: "denied",
			});
		}
	};

	if (!showBanner) return null;

	return (
		<View
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: "#111",
				borderTopWidth: 1,
				borderTopColor: "#333",
				padding: 20,
				zIndex: 1000,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: -2 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
				elevation: 5,
			}}
		>
			<View
				style={{
					maxWidth: 1200,
					marginHorizontal: "auto",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					gap: 20,
				}}
			>
				<View style={{ flex: 1, minWidth: 300 }}>
					<Text
						variant="bold"
						style={{
							color: "#fff",
							marginBottom: 8,
							fontSize: 16,
						}}
					>
						🍪 Cookie Consent
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 20,
						}}
					>
						We use cookies to enhance your experience, analyze site traffic, and for marketing
						purposes. By clicking "Accept", you consent to our use of cookies. Read our{" "}
						<Link href="/privacy">
							<Text style={{ color: "#0074D9", textDecorationLine: "underline" }}>
								Privacy Policy
							</Text>
						</Link>{" "}
						to learn more.
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						gap: 12,
						alignItems: "center",
					}}
				>
					<Button onPress={handleDecline} variant="ghost" size="sm">
						<Text style={{ color: "#999" }}>Decline</Text>
					</Button>

					<Button onPress={handleAccept} variant="primary" size="sm">
						<Text style={{ color: "#000", fontWeight: "bold" }}>Accept</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}

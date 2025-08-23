"use client";

import { Button, Text, View } from "@braingame/bgui";
import { useState } from "react";

interface GDPRSettings {
	necessary: boolean;
	analytics: boolean;
	marketing: boolean;
	preferences: boolean;
}

export function GDPRBanner() {
	const [showSettings, setShowSettings] = useState(false);
	const [settings, setSettings] = useState<GDPRSettings>({
		necessary: true,
		analytics: true,
		marketing: false,
		preferences: true,
	});

	const handleAcceptAll = () => {
		const allAccepted: GDPRSettings = {
			necessary: true,
			analytics: true,
			marketing: true,
			preferences: true,
		};

		localStorage.setItem(
			"gdpr_consent",
			JSON.stringify({
				settings: allAccepted,
				timestamp: new Date().toISOString(),
				version: "1.0",
			}),
		);

		// Apply settings
		applyGDPRSettings(allAccepted);
	};

	const handleSaveSettings = () => {
		localStorage.setItem(
			"gdpr_consent",
			JSON.stringify({
				settings,
				timestamp: new Date().toISOString(),
				version: "1.0",
			}),
		);

		// Apply settings
		applyGDPRSettings(settings);
		setShowSettings(false);
	};

	const applyGDPRSettings = (gdprSettings: GDPRSettings) => {
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics
			window.gtag("consent", "update", {
				analytics_storage: gdprSettings.analytics ? "granted" : "denied",
				ad_storage: gdprSettings.marketing ? "granted" : "denied",
				functionality_storage: gdprSettings.preferences ? "granted" : "denied",
				personalization_storage: gdprSettings.preferences ? "granted" : "denied",
			});
		}
	};

	if (!showSettings) return null;

	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				zIndex: 2000,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
			}}
		>
			<View
				style={{
					backgroundColor: "#111",
					borderRadius: 12,
					padding: 32,
					maxWidth: 600,
					width: "100%",
					borderWidth: 1,
					borderColor: "#333",
				}}
			>
				<Text
					variant="title"
					style={{
						color: "#fff",
						marginBottom: 16,
					}}
				>
					Privacy Settings
				</Text>

				<Text
					variant="body"
					style={{
						color: "#ccc",
						marginBottom: 24,
						lineHeight: 22,
					}}
				>
					We use cookies and similar technologies to enhance your experience. You can customize your
					privacy settings below.
				</Text>

				{/* Cookie Categories */}
				<View style={{ marginBottom: 24 }}>
					{/* Necessary */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingVertical: 12,
							borderBottomWidth: 1,
							borderBottomColor: "#333",
						}}
					>
						<View style={{ flex: 1 }}>
							<Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>
								Necessary Cookies
							</Text>
							<Text variant="small" style={{ color: "#999" }}>
								Required for the website to function properly
							</Text>
						</View>
						<Text style={{ color: "#666" }}>Always Active</Text>
					</View>

					{/* Analytics */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingVertical: 12,
							borderBottomWidth: 1,
							borderBottomColor: "#333",
						}}
					>
						<View style={{ flex: 1 }}>
							<Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>
								Analytics Cookies
							</Text>
							<Text variant="small" style={{ color: "#999" }}>
								Help us understand how you use our website
							</Text>
						</View>
						<Button
							onClick={() => setSettings({ ...settings, analytics: !settings.analytics })}
							variant={settings.analytics ? "primary" : "ghost"}
							size="sm"
						>
							<Text style={{ color: settings.analytics ? "#000" : "#fff" }}>
								{settings.analytics ? "On" : "Off"}
							</Text>
						</Button>
					</View>

					{/* Marketing */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingVertical: 12,
							borderBottomWidth: 1,
							borderBottomColor: "#333",
						}}
					>
						<View style={{ flex: 1 }}>
							<Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>
								Marketing Cookies
							</Text>
							<Text variant="small" style={{ color: "#999" }}>
								Used to deliver personalized advertisements
							</Text>
						</View>
						<Button
							onClick={() => setSettings({ ...settings, marketing: !settings.marketing })}
							variant={settings.marketing ? "primary" : "ghost"}
							size="sm"
						>
							<Text style={{ color: settings.marketing ? "#000" : "#fff" }}>
								{settings.marketing ? "On" : "Off"}
							</Text>
						</Button>
					</View>

					{/* Preferences */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingVertical: 12,
						}}
					>
						<View style={{ flex: 1 }}>
							<Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>
								Preference Cookies
							</Text>
							<Text variant="small" style={{ color: "#999" }}>
								Remember your settings and preferences
							</Text>
						</View>
						<Button
							onClick={() => setSettings({ ...settings, preferences: !settings.preferences })}
							variant={settings.preferences ? "primary" : "ghost"}
							size="sm"
						>
							<Text style={{ color: settings.preferences ? "#000" : "#fff" }}>
								{settings.preferences ? "On" : "Off"}
							</Text>
						</Button>
					</View>
				</View>

				{/* Actions */}
				<View
					style={{
						flexDirection: "row",
						gap: 12,
						justifyContent: "flex-end",
					}}
				>
					<Button onClick={handleAcceptAll} variant="plain">
						<Text style={{ color: "#999" }}>Accept All</Text>
					</Button>

					<Button onClick={handleSaveSettings} variant="solid">
						<Text style={{ color: "#000", fontWeight: "bold" }}>Save Settings</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}

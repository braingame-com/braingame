"use client";

import {
	AnimatedGradientBackground,
	Button,
	GlowingLogo,
	Link,
	Text,
	TextInput,
	View,
} from "@braingame/bgui";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { StructuredData } from "../components/StructuredData";
import { useAnalytics } from "../hooks/useAnalytics";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";
import { useServiceWorker } from "../hooks/useServiceWorker";
import { emailService } from "../lib/email-service";
import { validateEmail } from "../lib/email-validation";
import { generateStructuredData, generateWaitlistStructuredData } from "./metadata";

// Lazy load components for better performance
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

	const [email, setEmail] = useState("");
	const [honeypot, setHoneypot] = useState(""); // Bot trap
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [validationError, setValidationError] = useState("");

	// Validate email as user types
	const handleEmailChange = useCallback((value: string) => {
		setEmail(value);
		if (value?.includes("@")) {
			const validation = validateEmail(value);
			setValidationError(!validation.isValid && validation.reason ? validation.reason : "");
		} else {
			setValidationError("");
		}
	}, []);

	const { trackEvent, trackFormSubmit, trackClick, trackException } = useAnalytics();
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [suggestedEmail, setSuggestedEmail] = useState("");

	const handleSubmit = async () => {
		// Check honeypot (if filled, it's likely a bot)
		if (honeypot) {
			// Silently fail for bots
			setSubmitMessage("Thanks! We'll notify you when we launch.");
			setIsSuccess(true);
			return;
		}

		if (!email.trim()) {
			setSubmitMessage("Please enter your email address");
			setIsSuccess(false);
			return;
		}

		// Validate email
		const validation = validateEmail(email);
		if (!validation.isValid) {
			setSubmitMessage(validation.reason || "Please enter a valid email address");
			setIsSuccess(false);
			return;
		}

		// Show suggestion if available
		if (validation.suggestions && validation.suggestions.length > 0) {
			setSuggestedEmail(validation.suggestions[0]);
			setShowSuggestion(true);
			setSubmitMessage(`Did you mean ${validation.suggestions[0]}?`);
			setIsSuccess(false);
			return;
		}

		// Check risk score
		if (validation.riskScore > 70) {
			trackEvent("high_risk_email_attempt", {
				email_domain: email.split("@")[1],
				risk_score: validation.riskScore,
			});
		}

		setIsSubmitting(true);
		setSubmitMessage("");
		setShowSuggestion(false);

		try {
			const startTime = performance.now();
			const result = await emailService.subscribe(email, "landing_page");
			const duration = performance.now() - startTime;

			trackEvent("email_subscription_attempt", {
				success: result.success,
				requires_confirmation: result.requiresConfirmation,
				duration,
			});

			// Track form submission
			trackFormSubmit("waitlist_email", result.success, {
				duration,
				email_domain: email.split("@")[1],
				requires_confirmation: result.requiresConfirmation,
			});

			if (result.success) {
				if (result.requiresConfirmation) {
					setSubmitMessage(
						"Almost there! Please check your email to confirm your subscription.",
					);
				} else {
					setSubmitMessage("Welcome aboard! 🚀 We'll notify you when we launch.");
				}
				setIsSuccess(true);
				setEmail("");

				// Track successful submission
				trackEvent("email_subscription_success", {
					source: "landing_page",
					requires_confirmation: result.requiresConfirmation,
				});
			} else {
				setSubmitMessage(result.message || "Something went wrong. Please try again.");
				setIsSuccess(false);

				// Track failure
				trackEvent("email_subscription_failure", {
					reason: result.reason,
					message: result.message,
				});
			}
		} catch (error) {
			console.error("Email submission error:", error);
			setSubmitMessage("Unable to connect. Please check your connection and try again.");
			setIsSuccess(false);

			// Track error
			trackException(error instanceof Error ? error : new Error("Email submission failed"));
			trackEvent("email_subscription_error", {
				error: error instanceof Error ? error.message : "Unknown error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

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

	const handleSuggestionClick = () => {
		setEmail(suggestedEmail);
		setShowSuggestion(false);
		setSubmitMessage("");
		handleEmailChange(suggestedEmail);
		trackClick("email_suggestion", { suggested_email: suggestedEmail });
	};

	return (
		<>
			<StructuredData data={generateStructuredData()} />
			<StructuredData data={generateWaitlistStructuredData()} />
			<View
				style={{
					flex: 1,
					position: "relative",
					minHeight: "100vh",
				}}
			>
				<AnimatedGradientBackground />

				{/* Content Container */}
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						padding: 20,
						position: "relative",
						zIndex: 1,
					}}
				>
					{/* Glowing Logo */}
					<GlowingLogo size={120} glowColor="#007fff" glowIntensity="medium" animate={true} />

					{/* Main Content Card */}
					<View
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.6)",
							backdropFilter: "blur(10px)",
							borderRadius: 24,
							padding: 40,
							maxWidth: 480,
							width: "100%",
							alignItems: "center",
							boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
						}}
					>
						<Text
							variant="h1"
							style={{
								color: "#fff",
								fontSize: 48,
								marginBottom: 16,
								textAlign: "center",
								fontWeight: "700",
							}}
						>
							Brain Game
						</Text>

						<Text
							variant="body"
							style={{
								color: "rgba(255, 255, 255, 0.8)",
								fontSize: 18,
								marginBottom: 32,
								textAlign: "center",
								lineHeight: 1.6,
							}}
						>
							The future of personal development is here. Join the revolution.
						</Text>

						{/* Email Input Section */}
						<View style={{ width: "100%", marginBottom: 24 }}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									backgroundColor: "rgba(255, 255, 255, 0.1)",
									borderRadius: 12,
									padding: 4,
								}}
							>
								<TextInput
									placeholder="Enter your email"
									value={email}
									onChangeText={handleEmailChange}
									keyboardType="email-address"
									autoCapitalize="none"
									style={{
										flex: 1,
										paddingHorizontal: 20,
										paddingVertical: 16,
										color: "#fff",
										fontSize: 16,
									}}
									placeholderTextColor="rgba(255, 255, 255, 0.5)"
								/>
								<Button
									onPress={handleSubmit}
									disabled={isSubmitting || !email.trim() || !!validationError}
									variant="primary"
									loading={isSubmitting}
									style={{
										paddingHorizontal: 32,
										paddingVertical: 16,
										backgroundColor: "#007fff",
										borderRadius: 8,
									}}
								>
									<Text variant="bold" style={{ color: "#fff", fontSize: 16 }}>
										{isSubmitting ? "..." : "Join"}
									</Text>
								</Button>
							</View>

							{/* Validation Error */}
							{validationError && (
								<Text
									variant="small"
									style={{
										color: "#ef4444",
										marginTop: 8,
										textAlign: "center",
									}}
								>
									{validationError}
								</Text>
							)}

							{/* Honeypot field (hidden) */}
							<input
								type="text"
								name="website"
								value={honeypot}
								onChange={(e) => setHoneypot(e.target.value)}
								style={{
									position: "absolute",
									left: "-9999px",
									width: "1px",
									height: "1px",
								}}
								tabIndex={-1}
								autoComplete="off"
							/>
						</View>

						{/* Submit Message */}
						{submitMessage && (
							<View style={{ marginBottom: 16 }}>
								<Text
									variant="small"
									style={{
										color: isSuccess ? "#22c55e" : "#ef4444",
										textAlign: "center",
									}}
								>
									{submitMessage}
								</Text>
								{showSuggestion && (
									<Button
										onPress={handleSuggestionClick}
										variant="ghost"
										size="sm"
										style={{ marginTop: 8 }}
									>
										<Text variant="small" style={{ color: "#007fff" }}>
											Use suggested email
										</Text>
									</Button>
								)}
							</View>
						)}

						{/* Stats */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								width: "100%",
								marginTop: 32,
								paddingTop: 32,
								borderTopWidth: 1,
								borderTopColor: "rgba(255, 255, 255, 0.1)",
							}}
						>
							<View style={{ alignItems: "center" }}>
								<Text
									variant="h2"
									style={{ color: "#007fff", fontSize: 32, fontWeight: "700" }}
								>
									10K+
								</Text>
								<Text
									variant="small"
									style={{ color: "rgba(255, 255, 255, 0.6)", marginTop: 4 }}
								>
									Early Adopters
								</Text>
							</View>
							<View style={{ alignItems: "center" }}>
								<Text
									variant="h2"
									style={{ color: "#007fff", fontSize: 32, fontWeight: "700" }}
								>
									2025
								</Text>
								<Text
									variant="small"
									style={{ color: "rgba(255, 255, 255, 0.6)", marginTop: 4 }}
								>
									Launch Year
								</Text>
							</View>
							<View style={{ alignItems: "center" }}>
								<Text
									variant="h2"
									style={{ color: "#007fff", fontSize: 32, fontWeight: "700" }}
								>
									∞
								</Text>
								<Text
									variant="small"
									style={{ color: "rgba(255, 255, 255, 0.6)", marginTop: 4 }}
								>
									Possibilities
								</Text>
							</View>
						</View>
					</View>

					{/* Footer Links */}
					<View
						style={{
							flexDirection: "row",
							gap: 24,
							marginTop: 40,
						}}
					>
						<Link 
							href="/privacy" 
							style={{ color: "rgba(255, 255, 255, 0.6)" }}
							onPress={() => trackClick("footer_link", { destination: "privacy" })}
						>
							<Text variant="small">Privacy</Text>
						</Link>
						<Link 
							href="/terms" 
							style={{ color: "rgba(255, 255, 255, 0.6)" }}
							onPress={() => trackClick("footer_link", { destination: "terms" })}
						>
							<Text variant="small">Terms</Text>
						</Link>
						<Link 
							href="/cookies" 
							style={{ color: "rgba(255, 255, 255, 0.6)" }}
							onPress={() => trackClick("footer_link", { destination: "cookies" })}
						>
							<Text variant="small">Cookies</Text>
						</Link>
						<Link
							href="https://github.com/braingame-com/braingame"
							style={{ color: "rgba(255, 255, 255, 0.6)" }}
							onPress={() => trackClick("github_link", { destination: "repository" })}
						>
							<Text variant="small">GitHub</Text>
						</Link>
					</View>

					{/* Copyright */}
					<Text
						variant="small"
						style={{
							color: "rgba(255, 255, 255, 0.4)",
							marginTop: 16,
							textAlign: "center",
						}}
					>
						© 2025 Brain Game. All rights reserved.
					</Text>
				</View>
			</View>
		</>
	);
}
"use client";

import { Button, Link, Text, TextInput, View } from "@braingame/bgui";
import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { emailService } from "../lib/email-service";
import { validateEmail } from "../lib/email-validation";

export default function HomePage() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const { trackEvent } = useAnalytics();
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [suggestedEmail, setSuggestedEmail] = useState("");

	const handleSubmit = async () => {
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
				email_domain: email.split("@")[1],
				risk_score: validation.riskScore,
			});

			setSubmitMessage(result.message);
			setIsSuccess(result.success);

			if (result.success) {
				setEmail("");
			}
		} catch (error) {
			console.error("Subscription error:", error);
			setSubmitMessage("Something went wrong. Please try again.");
			setIsSuccess(false);
			trackEvent("email_subscription_error", {
				error: error instanceof Error ? error.message : "Unknown error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUseSuggestion = () => {
		setEmail(suggestedEmail);
		setShowSuggestion(false);
		setSubmitMessage("");
		trackEvent("email_suggestion_accepted", {
			original: email,
			suggested: suggestedEmail,
		});
	};

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

			{/* Email Capture Form */}
			<View
				style={{
					width: "100%",
					maxWidth: 400,
					marginBottom: 16,
				}}
			>
				<Text
					variant="body"
					style={{
						color: "#ccc",
						marginBottom: 12,
						textAlign: "center",
					}}
				>
					Subscribe to be alerted when we go live
				</Text>

				<View
					style={{
						flexDirection: "row",
						gap: 12,
					}}
				>
					<TextInput
						value={email}
						onValueChange={setEmail}
						placeholder="Enter your email"
						style={{
							flex: 1,
							backgroundColor: "#111",
							borderColor: "#333",
							borderWidth: 1,
							borderRadius: 8,
							padding: 12,
							color: "#fff",
							fontSize: 16,
						}}
						placeholderTextColor="#666"
						keyboardType="email-address"
						autoCapitalize="none"
						editable={!isSubmitting}
						autoComplete="email"
					/>

					<Button
						onPress={handleSubmit}
						disabled={isSubmitting || !email.trim()}
						variant="primary"
						loading={isSubmitting}
					>
						<Text variant="bold" style={{ color: "#fff" }}>
							{isSubmitting ? "..." : "Join"}
						</Text>
					</Button>
				</View>

				{submitMessage && (
					<View style={{ marginTop: 12 }}>
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
							<View style={{ marginTop: 8, alignSelf: "center" }}>
								<Button onPress={handleUseSuggestion} variant="ghost" size="sm">
									<Text style={{ color: "#0074D9", textDecorationLine: "underline" }}>
										Use suggested email
									</Text>
								</Button>
							</View>
						)}
					</View>
				)}
			</View>

			{/* Footer Links */}
			<View
				style={{
					marginTop: 48,
					alignItems: "center",
				}}
			>
				{/* GitHub Link */}
				<Link
					href="https://github.com/braingame-com/braingame"
					style={{
						marginBottom: 24,
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

				{/* Legal Links */}
				<View
					style={{
						flexDirection: "row",
						gap: 16,
						flexWrap: "wrap",
						justifyContent: "center",
					}}
				>
					<Link href="/privacy">
						<Text
							variant="small"
							style={{
								color: "#666",
								textDecorationLine: "underline",
							}}
						>
							Privacy Policy
						</Text>
					</Link>
					<Text variant="small" style={{ color: "#333" }}>
						•
					</Text>
					<Link href="/terms">
						<Text
							variant="small"
							style={{
								color: "#666",
								textDecorationLine: "underline",
							}}
						>
							Terms of Service
						</Text>
					</Link>
					<Text variant="small" style={{ color: "#333" }}>
						•
					</Text>
					<Link href="/cookies">
						<Text
							variant="small"
							style={{
								color: "#666",
								textDecorationLine: "underline",
							}}
						>
							Cookie Policy
						</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}

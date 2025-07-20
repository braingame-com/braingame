"use client";

import { AnimatedGradientBackground, Box, GlowingLogo, Link, Typography } from "@braingame/bgui";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { StructuredData } from "../components/StructuredData";
import { useToast } from "../contexts/ToastContext";
import { useAnalytics } from "../hooks/useAnalytics";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";
import { useServiceWorker } from "../hooks/useServiceWorker";
import { emailService } from "../lib/email-service";
import { validateEmail } from "../lib/email-validation";
import { getErrorMessage, retryWithBackoff } from "../lib/networkStatus";
import { generateStructuredData, generateWaitlistStructuredData } from "./metadata";

// Lazy load components for better performance
const EmailCaptureForm = dynamic(
	() => import("../components/EmailCaptureForm").then((mod) => mod.EmailCaptureForm),
	{
		loading: () => (
			<Box
				sx={{
					height: 150,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography level="body-md" style={{ color: "#666" }}>
					Loading...
				</Typography>
			</Box>
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

	const networkStatus = useNetworkStatus();
	const { showToast } = useToast();

	// Show offline notification
	useEffect(() => {
		if (!networkStatus.isOnline) {
			showToast({
				message: "You're offline. Changes will be saved when you reconnect.",
				type: "warning",
				duration: 5000,
			});
		}
	}, [networkStatus.isOnline, showToast]);

	const handleSubmit = async () => {
		// Check network status first
		if (!networkStatus.isOnline) {
			showToast({
				message: "You're offline. Please check your connection.",
				type: "error",
			});
			return;
		}

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
			const result = await retryWithBackoff(() => emailService.subscribe(email, "landing_page"), {
				maxAttempts: 3,
				initialDelay: 1000,
			});
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
					setSubmitMessage("Almost there! Please check your email to confirm your subscription.");
				} else {
					setSubmitMessage("Welcome aboard! 🚀 We'll notify you when we launch.");
				}
				setIsSuccess(true);
				setEmail("");

				showToast({
					message: "Successfully subscribed! 🎉",
					type: "success",
				});

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
					// @ts-ignore
					reason: result.reason,
					message: result.message,
				});
			}
		} catch (error) {
			const errorMessage = getErrorMessage(error);
			setSubmitMessage(errorMessage);
			setIsSuccess(false);

			// Show toast for better visibility
			showToast({
				message: errorMessage,
				type: "error",
				duration: 5000,
			});

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

	const handleSuggestionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
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
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					position: "relative",
					minHeight: "100vh",
				}}
			>
				<AnimatedGradientBackground />

				{/* Offline indicator */}
				{!networkStatus.isOnline && (
					<Box
						sx={{
							position: "absolute",
							top: 20,
							left: 20,
							right: 20,
							backgroundColor: "rgba(0, 0, 0, 0.7)",
							padding: "10px",
							borderRadius: "8px",
						}}
					>
						<Typography level="body-md" textAlign="center" style={{ color: "white" }}>
							You are offline. Some features may be unavailable.
						</Typography>
					</Box>
				)}

				<Box
					sx={{
						display: "flex",
						flex: 1,
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						padding: "0 20px",
					}}
				>
					<GlowingLogo />

					<Typography
						level="h1"
						textAlign="center"
						style={{
							color: "white",
							marginTop: "20px",
						}}
					>
						Your OS for Personal Development
					</Typography>

					<Typography
						level="title-lg"
						textAlign="center"
						style={{
							color: "rgba(255, 255, 255, 0.8)",
							marginTop: "10px",
							marginBottom: "30px",
							maxWidth: 600,
						}}
					>
						The world's most effective personal development company. Unlock your full potential with
						our integrated system of tools and training.
					</Typography>

					<Suspense
						fallback={
							<Box
								sx={{
									height: 150,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography level="body-md" style={{ color: "#666" }}>
									Loading form...
								</Typography>
							</Box>
						}
					>
						<EmailCaptureForm
							email={email}
							onEmailChange={handleEmailChange}
							honeypot={honeypot}
							onHoneypotChange={setHoneypot}
							isSubmitting={isSubmitting}
							onSubmit={handleSubmit}
							submitMessage={submitMessage}
							isSuccess={isSuccess}
							validationError={validationError}
						/>
					</Suspense>

					{showSuggestion && (
						<Box
							sx={{
								marginTop: "10px",
								display: "flex",
								alignItems: "center",
							}}
						>
							<Typography level="body-sm" style={{ color: "white" }}>
								Did you mean {suggestedEmail}?{" "}
							</Typography>
							<Link href="#" onClick={handleSuggestionClick}>
								<Typography level="body-sm" style={{ color: "#87CEEB" }}>
									Yes
								</Typography>
							</Link>
						</Box>
					)}

					<Box sx={{ marginTop: "40px" }}>
						<Link href="/privacy">
							<Typography level="body-xs" style={{ color: "#aaa" }}>
								Privacy Policy
							</Typography>
						</Link>
					</Box>
				</Box>
			</Box>
		</>
	);
}

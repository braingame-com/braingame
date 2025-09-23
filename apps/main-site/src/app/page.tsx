"use client";

import {
	Box,
	Button,
	Container,
	Footer,
	Header,
	Input,
	Link,
	Stack,
	Typography,
} from "@braingame/bgui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
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

	const navLinks = useMemo(
		() => [
			{ label: "Components", href: "#components" },
			{ label: "Privacy", href: "/privacy" },
			{ label: "Cookies", href: "/cookies" },
		],
		[],
	);

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
			<Box style={styles.page}>
				<Header
					brand={<Typography level="title-sm">Brain Game</Typography>}
					links={navLinks}
					cta={{
						label: "Join Waitlist",
						onClick: () => {
							document
								.getElementById("waitlist-email")
								?.scrollIntoView({ behavior: "smooth", block: "center" });
						},
						variant: "soft",
					}}
					backgroundColor="#050505"
					border={false}
					paddingY="sm"
				/>
				{!networkStatus.isOnline && (
					<Box style={styles.offlineBanner}>
						<Typography level="body-sm" textAlign="center" style={{ color: "white" }}>
							You are offline. Some features may be unavailable.
						</Typography>
					</Box>
				)}
				<Container style={styles.heroContainer}>
					<Stack spacing="xl" style={styles.heroStack}>
						<Stack spacing="sm" style={styles.heroCopy}>
							<Typography level="body-sm" style={{ color: "#38bdf8", letterSpacing: 1.5 }}>
								THE BRAIN GAME WAITLIST
							</Typography>
							<Typography level="h1" textAlign="center" style={styles.heroTitle}>
								Your OS for Personal Development
							</Typography>
							<Typography level="title-md" textAlign="center" style={styles.heroSubtitle}>
								Unlock your potential with focused routines, AI-assisted coaching, and tools that
								keep you on track every day.
							</Typography>
						</Stack>
						<Stack spacing="sm" style={styles.formStack}>
							<Stack direction="row" spacing="sm" useFlexGap={false} style={styles.formRow}>
								<Input
									id="waitlist-email"
									value={email}
									onChange={(event) => handleEmailChange(event.nativeEvent.text)}
									placeholder="Enter your work email"
									type="email"
									autoComplete="email"
									fullWidth
									disabled={isSubmitting}
								/>
								<Button onClick={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
									Join
								</Button>
							</Stack>
							<input
								type="text"
								value={honeypot}
								onChange={(event) => setHoneypot(event.target.value)}
								aria-hidden="true"
								tabIndex={-1}
								style={styles.honeypot}
								name="company"
								autoComplete="off"
							/>
							{validationError ? (
								<Typography level="body-sm" textAlign="center" style={styles.errorText}>
									{validationError}
								</Typography>
							) : null}
							{submitMessage ? (
								<Typography
									level="body-sm"
									textAlign="center"
									style={isSuccess ? styles.successText : styles.errorText}
								>
									{submitMessage}
								</Typography>
							) : null}
						</Stack>
						{showSuggestion ? (
							<Stack direction="row" spacing="xs" useFlexGap={false} style={styles.suggestionRow}>
								<Typography level="body-sm" style={{ color: "white" }}>
									Did you mean {suggestedEmail}?{" "}
								</Typography>
								<Link href="#" onClick={handleSuggestionClick}>
									<Typography level="body-sm" style={{ color: "#38bdf8" }}>
										Yes
									</Typography>
								</Link>
							</Stack>
						) : null}
						<Box style={styles.bottomLinks}>
							<Link href="/privacy">
								<Typography level="body-xs" style={{ color: "#94a3b8" }}>
									Privacy Policy
								</Typography>
							</Link>
						</Box>
					</Stack>
				</Container>
				<Footer
					brand={
						<Typography level="title-sm" style={{ color: "#e2e8f0" }}>
							Brain Game
						</Typography>
					}
					description="Signal-first tooling and guidance for ambitious humans."
					links={navLinks}
					legalLinks={[
						{ label: "Privacy", href: "/privacy" },
						{ label: "Terms", href: "/terms" },
					]}
					socialLinks={[{ label: "Twitter", href: "https://x.com", icon: "share" }]}
					copyright="© 2025 Brain Game"
					backgroundColor="#050505"
					border={false}
				/>
			</Box>
		</>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		minHeight: "100vh",
		backgroundColor: "#050505",
	},
	heroContainer: {
		paddingTop: 96,
		paddingBottom: 120,
	},
	heroStack: {
		alignItems: "center",
	},
	heroCopy: {
		maxWidth: 720,
		alignItems: "center",
		textAlign: "center" as const,
	},
	heroTitle: {
		color: "#f8fafc",
	},
	heroSubtitle: {
		color: "rgba(255,255,255,0.72)",
	},
	formStack: {
		width: "100%",
		maxWidth: 520,
		alignItems: "center",
	},
	formRow: {
		width: "100%",
		alignItems: "center",
	},
	honeypot: {
		display: "none",
	},
	errorText: {
		color: "#f87171",
	},
	successText: {
		color: "#22c55e",
	},
	suggestionRow: {
		marginTop: 12,
		alignItems: "center",
	},
	bottomLinks: {
		marginTop: 40,
	},
	offlineBanner: {
		marginHorizontal: 16,
		marginTop: 16,
		backgroundColor: "rgba(15,23,42,0.9)",
		padding: 12,
		borderRadius: 12,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "rgba(148, 163, 184, 0.4)",
	},
});

"use client";

import { Button, Link, Text, TextInput, View } from "@braingame/bgui";
import { useEffect, useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { submitEmail } from "../lib/emailService";
import { getErrorMessage, retryWithBackoff } from "../lib/networkStatus";

export default function HomePage() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

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

		if (!email.trim()) {
			setSubmitMessage("Please enter your email address");
			setIsSuccess(false);
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const result = await retryWithBackoff(() => submitEmail(email), {
				maxAttempts: 3,
				initialDelay: 1000,
			});

			setSubmitMessage(result.message);
			setIsSuccess(result.success);

			if (result.success) {
				setEmail("");
				showToast({
					message: "Successfully subscribed! 🎉",
					type: "success",
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

			// Log to error tracking
			console.error("Email submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
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
			{/* Offline indicator */}
			{!networkStatus.isOnline && (
				<View
					style={{
						position: "absolute",
						top: 20,
						left: 20,
						right: 20,
						backgroundColor: "#dc2626",
						paddingVertical: 8,
						paddingHorizontal: 16,
						borderRadius: 8,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={{ color: "#fff", marginRight: 8 }}>⚠</Text>
					<Text variant="body" style={{ color: "#fff" }}>
						You're offline
					</Text>
				</View>
			)}

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

					<View
						style={{
							opacity: !networkStatus.isOnline ? 0.5 : 1,
						}}
					>
						<Button
							onPress={handleSubmit}
							disabled={isSubmitting || !email.trim() || !networkStatus.isOnline}
							variant="primary"
							loading={isSubmitting}
						>
							<Text variant="bold" style={{ color: "#fff" }}>
								{isSubmitting ? "Joining..." : "Join"}
							</Text>
						</Button>
					</View>
				</View>

				{submitMessage && (
					<Text
						variant="small"
						style={{
							color: isSuccess ? "#22c55e" : "#ef4444",
							marginTop: 12,
							textAlign: "center",
						}}
					>
						{submitMessage}
					</Text>
				)}
			</View>

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

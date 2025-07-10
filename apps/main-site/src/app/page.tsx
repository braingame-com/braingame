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
import { useCallback, useState } from "react";
import { getEmailValidationError, submitEmail } from "../lib/emailService";

export default function HomePage() {
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
			const error = getEmailValidationError(value);
			setValidationError(error || "");
		} else {
			setValidationError("");
		}
	}, []);

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

		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const result = await submitEmail(email);
			setSubmitMessage(result.message);
			setIsSuccess(result.success);

			if (result.success) {
				setEmail("");
			}
		} catch (_error) {
			setSubmitMessage("Something went wrong. Please try again.");
			setIsSuccess(false);
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
			}}
		>
			{/* Animated gradient background */}
			<AnimatedGradientBackground
				colors={["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"]}
				animate={true}
				blobCount={6}
				blobOpacity={0.3}
				blurRadius={100}
			/>

			{/* Content container with subtle overlay */}
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					padding: 20,
					backgroundColor: "rgba(0, 0, 0, 0.4)",
				}}
			>
				{/* Glowing Logo */}
				<GlowingLogo size={120} glowColor="#007fff" glowIntensity="medium" animate={true} />

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
							onValueChange={handleEmailChange}
							placeholder="Enter your email"
							style={{
								flex: 1,
								backgroundColor: "#111",
								borderColor: validationError ? "#ef4444" : "#333",
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

					{/* Honeypot field - hidden from users */}
					<TextInput
						value={honeypot}
						onValueChange={setHoneypot}
						placeholder="Leave this field empty"
						style={{
							position: "absolute",
							left: -9999,
							width: 1,
							height: 1,
							opacity: 0,
						}}
						tabIndex={-1}
						autoComplete="off"
					/>

					{/* Validation error */}
					{validationError && !submitMessage && (
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
		</View>
	);
}

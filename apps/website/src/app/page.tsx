"use client";

import { Button, Link, Text, TextInput, View } from "@braingame/bgui";
import { useState } from "react";
import { submitEmail } from "../lib/emailService";

export default function HomePage() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async () => {
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

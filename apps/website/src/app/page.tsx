"use client";

import { useState } from "react";
<<<<<<< HEAD
import styles from "./page.module.css";
import { submitEmail, validateEmail } from "../lib/emailService";
=======
import { View, Text, TextInput, Button, GlowingLogo, Link } from "@braingame/bgui";
>>>>>>> origin/main

export default function HomePage() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
<<<<<<< HEAD
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!email.trim()) {
			setSubmitMessage("Please enter your email address");
			setIsSuccess(false);
			return;
		}

		if (!validateEmail(email)) {
			setSubmitMessage("Please enter a valid email address");
			setIsSuccess(false);
=======

	const handleSubmit = async () => {
		if (!email || !email.includes("@")) {
			setSubmitMessage("Please enter a valid email address");
>>>>>>> origin/main
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("");

		try {
<<<<<<< HEAD
			const result = await submitEmail(email);
			setSubmitMessage(result.message);
			setIsSuccess(result.success);
			
			if (result.success) {
				setEmail("");
			}
		} catch (error) {
			setSubmitMessage("Something went wrong. Please try again.");
			setIsSuccess(false);
=======
			// TODO: Implement Firebase integration
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			setSubmitMessage("Thanks! We'll notify you when we launch.");
			setEmail("");
		} catch (error) {
			setSubmitMessage("Something went wrong. Please try again.");
>>>>>>> origin/main
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				minHeight: "100vh",
				backgroundColor: "#000",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
			}}
		>
			{/* Glowing Logo */}
			<GlowingLogo size={150} glowIntensity="high" animate />

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

<<<<<<< HEAD
					{/* Email Signup Form */}
					<form onSubmit={handleSubmit} className={styles.emailForm}>
						<p className={styles.emailFormTitle}>
							Subscribe to be alerted when we go live
						</p>
						
						<div className={styles.emailInputContainer}>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className={styles.emailInput}
								disabled={isSubmitting}
								autoComplete="email"
							/>
							<button
								type="submit"
								className={styles.emailSubmitButton}
								disabled={isSubmitting || !email.trim()}
							>
								{isSubmitting ? "..." : "Join"}
							</button>
						</div>

						{submitMessage && (
							<p className={`${styles.submitMessage} ${isSuccess ? styles.success : styles.error}`}>
								{submitMessage}
							</p>
						)}
					</form>

					<div className={styles.buttonContainer}>
						<a
							href="https://github.com/braingame-com/braingame"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.secondaryButton}
						>
							GitHub
						</a>
					</div>
				</div>
			</main>
		</div>
=======
				<View
					style={{
						flexDirection: "row",
						gap: 12,
					}}
				>
					<TextInput
						value={email}
						onChangeText={setEmail}
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
					/>

					<Button
						onPress={handleSubmit}
						disabled={isSubmitting}
						style={{
							backgroundColor: "#7c3aed",
							paddingHorizontal: 24,
							paddingVertical: 12,
							borderRadius: 8,
							opacity: isSubmitting ? 0.5 : 1,
						}}
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
							color: submitMessage.includes("Thanks") ? "#22c55e" : "#ef4444",
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
>>>>>>> origin/main
	);
}
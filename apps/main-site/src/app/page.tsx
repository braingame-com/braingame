"use client";

import { Link, Text, TextInput, View } from "@braingame/bgui";
import { useState } from "react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { AnimatedButton } from "../components/AnimatedButton";
import { FeatureCard } from "../components/FeatureCard";
import { Logo } from "../components/Logo";
import { StructuredData } from "../components/StructuredData";
import { AnimatedText, GradientText } from "../components/Typography";
import { submitEmail } from "../lib/emailService";
import { generateStructuredData, generateWaitlistStructuredData } from "./metadata";

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
		<>
			<StructuredData data={generateStructuredData()} />
			<StructuredData data={generateWaitlistStructuredData()} />
			<View style={{ flex: 1, backgroundColor: "#000" }}>
				{/* Animated Background */}
				<AnimatedBackground />

				{/* Scrollable Content */}
				<View
					style={{
						flex: 1,
						zIndex: 1,
					}}
				>
					{/* Hero Section */}
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							padding: 20,
							paddingBottom: 80,
						}}
					>
						{/* Logo */}
						<Logo size={120} animated={true} />

						{/* Title */}
						<GradientText
							variant="displayTitle"
							style={{
								marginTop: 40,
								marginBottom: 16,
								textAlign: "center",
								fontSize: 56,
							}}
							gradient={["#0074D9", "#00C9FF"]}
						>
							Brain Game
						</GradientText>

						{/* Subtitle */}
						<AnimatedText
							variant="subtitle"
							style={{
								color: "#ccc",
								marginBottom: 48,
								textAlign: "center",
								maxWidth: 600,
								fontSize: 20,
							}}
							fadeIn={true}
							slideUp={true}
							delay={300}
						>
							Unlock your mind's full potential with AI-powered cognitive training
						</AnimatedText>

						{/* Email Capture Form */}
						<View
							style={{
								width: "100%",
								maxWidth: 400,
								marginBottom: 16,
							}}
						>
							<AnimatedText
								variant="body"
								style={{
									color: "#aaa",
									marginBottom: 20,
									textAlign: "center",
									fontSize: 18,
								}}
								fadeIn={true}
								delay={600}
							>
								Join the waitlist for early access
							</AnimatedText>

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
									accessibilityLabel="Email address"
									accessibilityHint="Enter your email to join the waitlist"
								/>

								<AnimatedButton
									onPress={handleSubmit}
									disabled={isSubmitting || !email.trim()}
									variant="primary"
									loading={isSubmitting}
									ripple={true}
									aria-label="Join waitlist"
								>
									<Text variant="bold" style={{ color: "#fff" }}>
										{isSubmitting ? "..." : "Join Waitlist"}
									</Text>
								</AnimatedButton>
							</View>

							{submitMessage && (
								<AnimatedText
									variant="small"
									style={{
										color: isSuccess ? "#22c55e" : "#ef4444",
										marginTop: 12,
										textAlign: "center",
									}}
									fadeIn={true}
									duration={300}
								>
									{submitMessage}
								</AnimatedText>
							)}
						</View>

						{/* Footer Links */}
						<View
							style={{
								flexDirection: "row",
								gap: 24,
								marginTop: 48,
								alignItems: "center",
							}}
						>
							<Link href="/privacy" accessibilityRole="link">
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

							<Text variant="small" style={{ color: "#444" }}>
								•
							</Text>

							<Link href="/terms" accessibilityRole="link">
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

							<Text variant="small" style={{ color: "#444" }}>
								•
							</Text>

							<Link
								href="https://github.com/braingame-com/braingame"
								accessibilityLabel="View Brain Game on GitHub"
								accessibilityRole="link"
							>
								<Text
									variant="small"
									style={{
										color: "#666",
										textDecorationLine: "underline",
									}}
								>
									GitHub
								</Text>
							</Link>
						</View>
					</View>

					{/* Features Section */}
					<View
						style={{
							padding: 40,
							paddingTop: 80,
							paddingBottom: 80,
							backgroundColor: "rgba(0, 0, 0, 0.5)",
						}}
					>
						<AnimatedText
							variant="h2"
							style={{
								color: "#fff",
								fontSize: 36,
								textAlign: "center",
								marginBottom: 16,
							}}
							fadeIn={true}
							slideUp={true}
						>
							Elevate Your Mind
						</AnimatedText>

						<AnimatedText
							variant="body"
							style={{
								color: "#999",
								fontSize: 18,
								textAlign: "center",
								marginBottom: 48,
								maxWidth: 600,
								alignSelf: "center",
							}}
							fadeIn={true}
							delay={200}
						>
							Discover the power of AI-driven cognitive enhancement
						</AnimatedText>

						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 24,
								justifyContent: "center",
								maxWidth: 1200,
								alignSelf: "center",
							}}
						>
							<View style={{ width: 300 }}>
								<FeatureCard
									icon="🧠"
									title="Adaptive Learning"
									description="Personalized training that evolves with your cognitive patterns and learning style"
									delay={400}
								/>
							</View>
							<View style={{ width: 300 }}>
								<FeatureCard
									icon="📊"
									title="Progress Analytics"
									description="Track your improvement with detailed insights and performance metrics"
									delay={600}
								/>
							</View>
							<View style={{ width: 300 }}>
								<FeatureCard
									icon="🎯"
									title="Goal-Oriented"
									description="Set personal objectives and achieve them with structured training programs"
									delay={800}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		</>
	);
}

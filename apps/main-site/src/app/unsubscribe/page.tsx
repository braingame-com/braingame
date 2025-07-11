"use client";

import { Button, Link, Text, TextInput, View } from "@braingame/bgui";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { emailService } from "../../lib/email-service";

export default function UnsubscribePage() {
	const searchParams = useSearchParams();
	const emailParam = searchParams.get("email");
	const [email, setEmail] = useState(emailParam || "");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [message, setMessage] = useState("");

	const handleUnsubscribe = async () => {
		if (!email.trim()) {
			setStatus("error");
			setMessage("Please enter your email address.");
			return;
		}

		setStatus("loading");
		const result = await emailService.unsubscribe(email);

		if (result.success) {
			setStatus("success");
			setMessage(result.message);
		} else {
			setStatus("error");
			setMessage(result.message);
		}
	};

	useEffect(() => {
		// If email is provided in URL, auto-unsubscribe
		if (emailParam) {
			handleUnsubscribe();
		}
		// biome-ignore lint/correctness/useExhaustiveDependencies: handleUnsubscribe is stable
	}, [emailParam]);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#000",
				padding: 20,
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View
				style={{
					maxWidth: 500,
					width: "100%",
					alignItems: "center",
				}}
			>
				{status !== "success" ? (
					<>
						<Text
							variant="displayTitle"
							style={{
								color: "#fff",
								marginBottom: 16,
							}}
						>
							Unsubscribe
						</Text>
						<Text
							variant="body"
							style={{
								color: "#999",
								marginBottom: 32,
								lineHeight: 24,
							}}
						>
							We're sorry to see you go. Enter your email address below to unsubscribe from Brain
							Game updates.
						</Text>

						{!emailParam && (
							<View style={{ width: "100%", marginBottom: 24 }}>
								<TextInput
									value={email}
									onValueChange={setEmail}
									placeholder="Enter your email"
									keyboardType="email-address"
									autoCapitalize="none"
									style={{
										backgroundColor: "#111",
										borderColor: "#333",
										borderWidth: 1,
										borderRadius: 8,
										padding: 16,
										color: "#fff",
										fontSize: 16,
										marginBottom: 16,
									}}
									placeholderTextColor="#666"
								/>
							</View>
						)}

						{status === "error" && (
							<Text
								variant="body"
								style={{
									color: "#FF4136",
									marginBottom: 16,
								}}
							>
								{message}
							</Text>
						)}

						<View style={{ flexDirection: "row", gap: 12 }}>
							<Link href="/">
								<View>
									<Button onPress={() => {}} variant="ghost" size="lg">
										<Text style={{ color: "#999" }}>Cancel</Text>
									</Button>
								</View>
							</Link>

							<Button
								onPress={handleUnsubscribe}
								variant="primary"
								size="lg"
								disabled={status === "loading"}
							>
								<Text style={{ color: "#000", fontWeight: "bold" }}>
									{status === "loading" ? "Processing..." : "Unsubscribe"}
								</Text>
							</Button>
						</View>

						<Text
							variant="small"
							style={{
								color: "#666",
								marginTop: 40,
								lineHeight: 20,
							}}
						>
							You can always resubscribe later from our homepage.
						</Text>
					</>
				) : (
					<>
						<Text
							variant="displayTitle"
							style={{
								color: "#0074D9",
								marginBottom: 16,
								fontSize: 48,
							}}
						>
							✓
						</Text>
						<Text
							variant="displayTitle"
							style={{
								color: "#fff",
								marginBottom: 16,
							}}
						>
							Unsubscribed
						</Text>
						<Text
							variant="body"
							style={{
								color: "#ccc",
								marginBottom: 32,
								lineHeight: 24,
							}}
						>
							{message}
						</Text>
						<Text
							variant="body"
							style={{
								color: "#999",
								marginBottom: 40,
							}}
						>
							We hope to see you again in the future!
						</Text>

						<Link href="/">
							<View>
								<Button onPress={() => {}} variant="primary" size="lg">
									<Text style={{ color: "#000", fontWeight: "bold" }}>Back to Home</Text>
								</Button>
							</View>
						</Link>
					</>
				)}
			</View>
		</View>
	);
}

"use client";

import Link from "next/link";
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
	}, [emailParam, handleUnsubscribe]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				backgroundColor: "#000",
				padding: 20,
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					maxWidth: 500,
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{status !== "success" ? (
					<>
						<h1
							style={{
								color: "#fff",
								marginBottom: 16,
								fontSize: "2rem",
								fontWeight: "bold",
								margin: "0 0 16px 0",
							}}
						>
							Unsubscribe
						</h1>
						<p
							style={{
								color: "#999",
								marginBottom: 32,
								lineHeight: 1.5,
								margin: "0 0 32px 0",
							}}
						>
							We're sorry to see you go. Enter your email address below to unsubscribe from Brain
							Game updates.
						</p>

						{!emailParam && (
							<div style={{ width: "100%", marginBottom: 24 }}>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									style={{
										backgroundColor: "#111",
										borderColor: "#333",
										borderWidth: 1,
										borderStyle: "solid",
										borderRadius: 8,
										padding: 16,
										color: "#fff",
										fontSize: 16,
										marginBottom: 16,
										width: "100%",
										boxSizing: "border-box",
									}}
								/>
							</div>
						)}

						{status === "error" && (
							<p
								style={{
									color: "#FF4136",
									marginBottom: 16,
									margin: "0 0 16px 0",
								}}
							>
								{message}
							</p>
						)}

						<div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
							<Link href="/">
								<View>
									<Button onClick={() => {}} variant="plain" size="lg">
										<Text style={{ color: "#999" }}>Cancel</Text>
									</Button>
								</View>
							</Link>

							<Button
								onClick={handleUnsubscribe}
								variant="solid"
								size="lg"
								disabled={status === "loading"}
							>
								<Text style={{ color: "#000", fontWeight: "bold" }}>
									{status === "loading" ? "Processing..." : "Unsubscribe"}
								</Text>
							</Button>
						</View>

						<Text
							level="body-sm"
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
							level="h1"
							style={{
								color: "#0074D9",
								marginBottom: 16,
								fontSize: 48,
							}}
						>
							✓
						</Text>
						<Text
							level="h1"
							style={{
								color: "#fff",
								marginBottom: 16,
							}}
						>
							Unsubscribed
						</Text>
						<Text
							level="body-md"
							style={{
								color: "#ccc",
								marginBottom: 32,
								lineHeight: 24,
							}}
						>
							{message}
						</Text>
						<Text
							level="body-md"
							style={{
								color: "#999",
								marginBottom: 40,
							}}
						>
							We hope to see you again in the future!
						</Text>

						<Link href="/">
							<View>
								<Button onClick={() => {}} variant="solid" size="lg">
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

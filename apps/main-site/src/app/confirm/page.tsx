"use client";

import { Button, Link, Text, View } from "@braingame/bgui";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { emailService } from "../../lib/email-service";

export default function ConfirmPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			setMessage("No confirmation token provided.");
			return;
		}

		// Confirm the subscription
		emailService.confirmSubscription(token).then((result) => {
			if (result.success) {
				setStatus("success");
				setMessage(result.message);
			} else {
				setStatus("error");
				setMessage(result.message);
			}
		});
	}, [token]);

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
				{status === "loading" && (
					<>
						<Text
							variant="displayTitle"
							style={{
								color: "#fff",
								marginBottom: 16,
							}}
						>
							Confirming...
						</Text>
						<Text
							variant="body"
							style={{
								color: "#999",
								marginBottom: 32,
							}}
						>
							Please wait while we confirm your subscription.
						</Text>
					</>
				)}

				{status === "success" && (
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
							Confirmed!
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
							We'll keep you updated on Brain Game's progress and notify you as soon as we launch.
						</Text>
					</>
				)}

				{status === "error" && (
					<>
						<Text
							variant="displayTitle"
							style={{
								color: "#FF4136",
								marginBottom: 16,
								fontSize: 48,
							}}
						>
							✗
						</Text>
						<Text
							variant="displayTitle"
							style={{
								color: "#fff",
								marginBottom: 16,
							}}
						>
							Oops!
						</Text>
						<Text
							variant="body"
							style={{
								color: "#ccc",
								marginBottom: 40,
								lineHeight: 24,
							}}
						>
							{message}
						</Text>
					</>
				)}

				<Link href="/">
					<View>
						<Button onPress={() => {}} variant="primary" size="lg">
							<Text style={{ color: "#000", fontWeight: "bold" }}>Back to Home</Text>
						</Button>
					</View>
				</Link>
			</View>
		</View>
	);
}

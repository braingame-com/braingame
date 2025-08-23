"use client";

import Link from "next/link";
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
				{status === "loading" && (
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
							Confirming...
						</h1>
						<p
							style={{
								color: "#999",
								marginBottom: 32,
								margin: "0 0 32px 0",
							}}
						>
							Please wait while we confirm your subscription.
						</p>
					</>
				)}

				{status === "success" && (
					<>
						<div
							style={{
								color: "#0074D9",
								marginBottom: 16,
								fontSize: 48,
							}}
						>
							✓
						</div>
						<h1
							style={{
								color: "#fff",
								marginBottom: 16,
								fontSize: "2rem",
								fontWeight: "bold",
								margin: "0 0 16px 0",
							}}
						>
							Confirmed!
						</h1>
						<p
							style={{
								color: "#ccc",
								marginBottom: 32,
								lineHeight: 1.5,
								margin: "0 0 32px 0",
							}}
						>
							{message}
						</p>
						<p
							style={{
								color: "#999",
								marginBottom: 40,
								margin: "0 0 40px 0",
							}}
						>
							We'll keep you updated on Brain Game's progress and notify you as soon as we launch.
						</p>
					</>
				)}

				{status === "error" && (
					<>
						<div
							style={{
								color: "#FF4136",
								marginBottom: 16,
								fontSize: 48,
							}}
						>
							✗
						</div>
						<h1
							style={{
								color: "#fff",
								marginBottom: 16,
								fontSize: "2rem",
								fontWeight: "bold",
								margin: "0 0 16px 0",
							}}
						>
							Oops!
						</h1>
						<p
							style={{
								color: "#ccc",
								marginBottom: 40,
								lineHeight: 1.5,
								margin: "0 0 40px 0",
							}}
						>
							{message}
						</p>
					</>
				)}

				<Link href="/">
					<button
						style={{
							backgroundColor: "#0074D9",
							color: "#000",
							fontWeight: "bold",
							padding: "16px 32px",
							borderRadius: 8,
							border: "none",
							cursor: "pointer",
							fontSize: "16px",
						}}
					>
						Back to Home
					</button>
				</Link>
			</div>
		</div>
	);
}

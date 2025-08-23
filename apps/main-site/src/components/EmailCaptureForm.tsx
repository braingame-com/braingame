"use client";

import { memo, useCallback, useState } from "react";
import { submitEmail } from "../lib/emailService";

interface EmailCaptureFormProps {
	onSuccess?: () => void;
}

export const EmailCaptureForm = memo(function EmailCaptureForm({
	onSuccess,
}: EmailCaptureFormProps) {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = useCallback(async () => {
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
				onSuccess?.();
			}
		} catch (_error) {
			setSubmitMessage("Something went wrong. Please try again.");
			setIsSuccess(false);
		} finally {
			setIsSubmitting(false);
		}
	}, [email, onSuccess]);

	return (
		<div
			style={{
				width: "100%",
				maxWidth: 400,
				marginBottom: 16,
			}}
		>
			<p
				style={{
					color: "#ccc",
					marginBottom: 12,
					textAlign: "center",
				}}
			>
				Subscribe to be alerted when we go live
			</p>

			<div
				style={{
					display: "flex",
					gap: 12,
				}}
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
					disabled={isSubmitting}
					autoComplete="email"
				/>

				<button
					onClick={handleSubmit}
					disabled={isSubmitting || !email.trim()}
					aria-label="Join waitlist"
					style={{
						backgroundColor: "#007bff",
						color: "#fff",
						border: "none",
						borderRadius: 8,
						padding: "12px 24px",
						fontSize: 16,
						fontWeight: "bold",
						cursor: isSubmitting || !email.trim() ? "not-allowed" : "pointer",
						opacity: isSubmitting || !email.trim() ? 0.6 : 1,
					}}
				>
					{isSubmitting ? "..." : "Join"}
				</button>
			</div>

			{submitMessage && (
				<p
					style={{
						color: isSuccess ? "#22c55e" : "#ef4444",
						marginTop: 12,
						textAlign: "center",
						fontSize: 14,
					}}
				>
					{submitMessage}
				</p>
			)}
		</div>
	);
});

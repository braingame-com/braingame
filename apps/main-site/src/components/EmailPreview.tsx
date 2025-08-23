"use client";

import { Button, Text, View } from "@braingame/bgui";
import { useState } from "react";
import { EMAIL_TEMPLATES, emailService } from "../lib/email-service";

interface EmailPreviewProps {
	templateName: keyof typeof EMAIL_TEMPLATES;
	variables?: Record<string, string>;
}

export function EmailPreview({ templateName, variables = {} }: EmailPreviewProps) {
	const [viewMode, setViewMode] = useState<"html" | "text">("html");
	const template = EMAIL_TEMPLATES[templateName];

	// Default variables
	const defaultVars = {
		email: "user@example.com",
		confirmationLink: "https://braingame.dev/confirm?token=sample-token",
		unsubscribeLink: "https://braingame.dev/unsubscribe?email=user@example.com",
		updateTitle: "Exciting News!",
		updatePreview: "We have some exciting updates to share...",
		updateContent: "<p>This is the update content...</p>",
		...variables,
	};

	const htmlContent = emailService.generateEmailPreview(template.html, defaultVars);
	const textContent = emailService.generateEmailPreview(template.text, defaultVars);
	const subject = emailService.generateEmailPreview(template.subject, defaultVars);
	const previewText = emailService.generateEmailPreview(template.previewText, defaultVars);

	return (
		<View
			style={{
				backgroundColor: "#111",
				borderRadius: 12,
				borderWidth: 1,
				borderColor: "#333",
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<View
				style={{
					backgroundColor: "#1a1a1a",
					padding: 16,
					borderBottomWidth: 1,
					borderBottomColor: "#333",
				}}
			>
				<Text
					variant="bold"
					style={{
						color: "#fff",
						marginBottom: 8,
					}}
				>
					Email Preview: {templateName}
				</Text>
				<View style={{ marginBottom: 8 }}>
					<Text
						variant="small"
						style={{
							color: "#999",
							marginBottom: 4,
						}}
					>
						Subject:
					</Text>
					<Text
						style={{
							color: "#ccc",
							fontSize: 14,
						}}
					>
						{subject}
					</Text>
				</View>
				<View>
					<Text
						variant="small"
						style={{
							color: "#999",
							marginBottom: 4,
						}}
					>
						Preview Text:
					</Text>
					<Text
						style={{
							color: "#ccc",
							fontSize: 14,
						}}
					>
						{previewText}
					</Text>
				</View>
			</View>

			{/* View Mode Toggle */}
			<View
				style={{
					flexDirection: "row",
					padding: 12,
					backgroundColor: "#0a0a0a",
					borderBottomWidth: 1,
					borderBottomColor: "#333",
				}}
			>
				<View style={{ marginRight: 8 }}>
					<Button
						onClick={() => setViewMode("html")}
						variant={viewMode === "html" ? "primary" : "ghost"}
						size="sm"
					>
						<Text style={{ color: viewMode === "html" ? "#000" : "#999" }}>HTML</Text>
					</Button>
				</View>
				<Button
					onClick={() => setViewMode("text")}
					variant={viewMode === "text" ? "primary" : "ghost"}
					size="sm"
				>
					<Text style={{ color: viewMode === "text" ? "#000" : "#999" }}>Plain Text</Text>
				</Button>
			</View>

			{/* Content */}
			<View
				style={{
					padding: 20,
					backgroundColor: viewMode === "html" ? "#fff" : "#0a0a0a",
					minHeight: 300,
				}}
			>
				{viewMode === "html" ? (
					<View>
						<Text
							style={{
								color: "#000",
								fontSize: 14,
							}}
						>
							{htmlContent}
						</Text>
					</View>
				) : (
					<Text
						style={{
							color: "#ccc",
							fontFamily: "monospace",
							fontSize: 14,
							lineHeight: 20,
						}}
					>
						{textContent}
					</Text>
				)}
			</View>

			{/* Variables Info */}
			<View
				style={{
					backgroundColor: "#0a0a0a",
					padding: 16,
					borderTopWidth: 1,
					borderTopColor: "#333",
				}}
			>
				<Text
					variant="small"
					style={{
						color: "#999",
						marginBottom: 8,
					}}
				>
					Template Variables:
				</Text>
				<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
					{Object.keys(defaultVars).map((key) => (
						<View
							key={key}
							style={{
								backgroundColor: "#1a1a1a",
								paddingHorizontal: 8,
								paddingVertical: 4,
								borderRadius: 4,
								borderWidth: 1,
								borderColor: "#333",
							}}
						>
							<Text
								style={{
									color: "#0074D9",
									fontSize: 12,
									fontFamily: "monospace",
								}}
							>
								{`{{${key}}}`}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
}

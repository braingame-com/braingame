"use client";

import { Text, View } from "@braingame/bgui";
import { EmailPreview } from "../../../components/EmailPreview";
import { EMAIL_TEMPLATES } from "../../../lib/email-service";

export default function EmailPreviewPage() {
	// Only show in development
	if (process.env.NODE_ENV !== "development") {
		return null;
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#000",
				padding: 20,
			}}
		>
			<View
				style={{
					width: "100%",
					maxWidth: 1200,
					alignSelf: "center",
					paddingVertical: 40,
				}}
			>
				<Text
					level="h1"
					style={{
						color: "#fff",
						marginBottom: 16,
					}}
				>
					Email Templates Preview
				</Text>

				<Text
					level="body-md"
					style={{
						color: "#999",
						marginBottom: 40,
					}}
				>
					Development-only page for previewing email templates
				</Text>

				<View style={{ gap: 32 }}>
					{Object.keys(EMAIL_TEMPLATES).map((templateName) => (
						<EmailPreview
							key={templateName}
							templateName={templateName as keyof typeof EMAIL_TEMPLATES}
						/>
					))}
				</View>
			</View>
		</View>
	);
}

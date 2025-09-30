import { Link, Text, View } from "@braingame/bgui";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service | Brain Game",
	description: "Terms and conditions for using Brain Game services.",
};

export default function TermsPage() {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#000",
				padding: 20,
				height: "100%",
			}}
		>
			<View
				style={{
					maxWidth: 800,
					marginHorizontal: "auto",
					paddingVertical: 40,
				}}
			>
				{/* Header */}
				<Link
					href="/"
					style={{
						marginBottom: 40,
						alignSelf: "flex-start",
					}}
				>
					<Text style={{ color: "#666", fontSize: 16 }}>← Back to home</Text>
				</Link>

				<Text
					level="h1"
					style={{
						color: "#fff",
						marginBottom: 16,
					}}
				>
					Terms of Service
				</Text>

				<Text
					level="body-md"
					style={{
						color: "#999",
						marginBottom: 40,
					}}
				>
					Last updated: July 12, 2025
				</Text>

				{/* Agreement */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						1. Agreement to Terms
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						By accessing or using Brain Game's website and services, you agree to be bound by these
						Terms of Service. If you do not agree to these terms, please do not use our services.
					</Text>
				</View>

				{/* Use of Services */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						2. Use of Services
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						You may use our services only in compliance with these Terms and all applicable laws.
						You agree not to:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Use our services for any unlawful purpose
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Attempt to gain unauthorized access to our systems
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Interfere with or disrupt our services
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Transmit any harmful code or malware
						</Text>
					</View>
				</View>

				{/* Intellectual Property */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						3. Intellectual Property
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						All content, features, and functionality of Brain Game are owned by us and are protected
						by international copyright, trademark, and other intellectual property laws. You may not
						copy, modify, distribute, or create derivative works without our express written
						permission.
					</Text>
				</View>

				{/* User Content */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						4. User Content
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						By submitting content to Brain Game, you grant us a worldwide, non-exclusive,
						royalty-free license to use, reproduce, and distribute your content in connection with
						our services. You represent that you have the rights to grant this license.
					</Text>
				</View>

				{/* Privacy */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						5. Privacy
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						Your use of our services is also governed by our Privacy Policy. Please review our{" "}
						<Link href="/privacy">
							<Text style={{ color: "#0074D9", textDecorationLine: "underline" }}>
								Privacy Policy
							</Text>
						</Link>{" "}
						to understand how we collect and use your information.
					</Text>
				</View>

				{/* Disclaimers */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						6. Disclaimers
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						BRAIN GAME IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL
						WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
						PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
					</Text>
				</View>

				{/* Limitation of Liability */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						7. Limitation of Liability
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						TO THE MAXIMUM EXTENT PERMITTED BY LAW, BRAIN GAME SHALL NOT BE LIABLE FOR ANY INDIRECT,
						INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OUR
						SERVICES.
					</Text>
				</View>

				{/* Indemnification */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						8. Indemnification
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						You agree to indemnify and hold Brain Game harmless from any claims, damages, or
						expenses arising from your use of our services or violation of these Terms.
					</Text>
				</View>

				{/* Governing Law */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						9. Governing Law
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						These Terms shall be governed by and construed in accordance with the laws of the United
						States, without regard to its conflict of law provisions.
					</Text>
				</View>

				{/* Changes */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						10. Changes to Terms
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						We reserve the right to modify these Terms at any time. We will notify you of any
						changes by posting the new Terms on this page.
					</Text>
				</View>

				{/* Contact */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						11. Contact Information
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						If you have any questions about these Terms, please contact us at:
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#0074D9",
							textDecorationLine: "underline",
						}}
					>
						legal@braingame.dev
					</Text>
				</View>
			</View>
		</View>
	);
}

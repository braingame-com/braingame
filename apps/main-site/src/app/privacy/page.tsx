import { Link, Text, View } from "@braingame/bgui";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy | Brain Game",
	description: "Learn how Brain Game collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
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
					variant="displayTitle"
					style={{
						color: "#fff",
						marginBottom: 16,
					}}
				>
					Privacy Policy
				</Text>

				<Text
					variant="body"
					style={{
						color: "#999",
						marginBottom: 40,
					}}
				>
					Last updated: July 12, 2025
				</Text>

				{/* Introduction */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Introduction
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						Brain Game ("we," "our," or "us") is committed to protecting your privacy. This Privacy
						Policy explains how we collect, use, disclose, and safeguard your information when you
						use our website and services.
					</Text>
				</View>

				{/* Information We Collect */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Information We Collect
					</Text>

					<Text
						variant="subtitle"
						style={{
							color: "#fff",
							marginBottom: 12,
							marginTop: 20,
						}}
					>
						Personal Information
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						We collect information you provide directly to us, such as:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Email address (when you join our waitlist)
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>• Name (if provided)</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Any other information you choose to provide
						</Text>
					</View>

					<Text
						variant="subtitle"
						style={{
							color: "#fff",
							marginBottom: 12,
							marginTop: 20,
						}}
					>
						Automatically Collected Information
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						When you visit our website, we automatically collect:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Device information (browser type, operating system)
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Log information (IP address, access times, pages viewed)
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Usage data through cookies and similar technologies
						</Text>
					</View>
				</View>

				{/* How We Use Your Information */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						How We Use Your Information
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						We use the information we collect to:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Send you updates about Brain Game's launch
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Respond to your inquiries and provide customer support
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Improve and optimize our website and services
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>• Comply with legal obligations</Text>
					</View>
				</View>

				{/* Data Sharing */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Information Sharing
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						We do not sell, trade, or rent your personal information. We may share your information
						only in the following circumstances:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• With service providers who assist in our operations
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• To comply with legal obligations or protect our rights
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• With your consent or at your direction
						</Text>
					</View>
				</View>

				{/* Data Security */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Data Security
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						We implement appropriate technical and organizational measures to protect your personal
						information against unauthorized access, alteration, disclosure, or destruction.
					</Text>
				</View>

				{/* Your Rights */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Your Rights
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						You have the right to:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Access and receive a copy of your personal data
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Correct inaccurate personal data
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Request deletion of your personal data
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Opt-out of marketing communications
						</Text>
					</View>
				</View>

				{/* Contact */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Contact Us
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						If you have questions about this Privacy Policy or our privacy practices, please contact
						us at:
					</Text>
					<Text
						variant="body"
						style={{
							color: "#0074D9",
							textDecorationLine: "underline",
						}}
					>
						privacy@braingame.dev
					</Text>
				</View>

				{/* Updates */}
				<View style={{ marginBottom: 32 }}>
					<Text
						variant="title"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Changes to This Policy
					</Text>
					<Text
						variant="body"
						style={{
							color: "#ccc",
							lineHeight: 24,
						}}
					>
						We may update this Privacy Policy from time to time. We will notify you of any changes
						by posting the new Privacy Policy on this page and updating the "Last updated" date.
					</Text>
				</View>
			</View>
		</View>
	);
}

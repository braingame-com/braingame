import { Link, Text, View } from "@braingame/bgui";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cookie Policy | Brain Game",
	description: "Learn about how Brain Game uses cookies and similar technologies.",
};

export default function CookiesPage() {
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
					width: "100%",
					maxWidth: 800,
					alignSelf: "center",
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
					Cookie Policy
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

				{/* What Are Cookies */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						What Are Cookies?
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						Cookies are small text files that are placed on your device when you visit our website.
						They help us provide you with a better experience by remembering your preferences and
						understanding how you use our site.
					</Text>
				</View>

				{/* Types of Cookies */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Types of Cookies We Use
					</Text>

					<Text
						level="title-sm"
						style={{
							color: "#fff",
							marginBottom: 12,
							marginTop: 20,
						}}
					>
						Essential Cookies
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						These cookies are necessary for the website to function properly. They enable basic
						functions like page navigation and access to secure areas.
					</Text>

					<Text
						level="title-sm"
						style={{
							color: "#fff",
							marginBottom: 12,
							marginTop: 20,
						}}
					>
						Analytics Cookies
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						We use Google Analytics to understand how visitors interact with our website. These
						cookies collect information in an anonymous form, including:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>• Number of visitors to the site</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>• Pages visited and time spent</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>• How visitors found our site</Text>
					</View>

					<Text
						level="title-sm"
						style={{
							color: "#fff",
							marginBottom: 12,
							marginTop: 20,
						}}
					>
						Performance Cookies
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						These cookies help us understand the performance of our website and identify areas for
						improvement. They collect information about error messages and loading times.
					</Text>
				</View>

				{/* Cookie Table */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Cookies We Use
					</Text>

					<View
						style={{ borderWidth: 1, borderColor: "#333", borderRadius: 8, overflow: "hidden" }}
					>
						{/* Header */}
						<View style={{ flexDirection: "row", backgroundColor: "#1a1a1a", padding: 12 }}>
							<Text style={{ color: "#fff", flex: 1, fontWeight: "bold" }}>Cookie Name</Text>
							<Text style={{ color: "#fff", flex: 1, fontWeight: "bold" }}>Purpose</Text>
							<Text style={{ color: "#fff", flex: 1, fontWeight: "bold" }}>Duration</Text>
						</View>

						{/* Rows */}
						<View
							style={{
								flexDirection: "row",
								padding: 12,
								borderTopWidth: 1,
								borderTopColor: "#333",
							}}
						>
							<Text style={{ color: "#ccc", flex: 1 }}>_ga</Text>
							<Text style={{ color: "#ccc", flex: 1 }}>Google Analytics</Text>
							<Text style={{ color: "#ccc", flex: 1 }}>2 years</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								padding: 12,
								borderTopWidth: 1,
								borderTopColor: "#333",
							}}
						>
							<Text style={{ color: "#ccc", flex: 1 }}>_gid</Text>
							<Text style={{ color: "#ccc", flex: 1 }}>Google Analytics</Text>
							<Text style={{ color: "#ccc", flex: 1 }}>24 hours</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								padding: 12,
								borderTopWidth: 1,
								borderTopColor: "#333",
							}}
						>
							<Text style={{ color: "#ccc", flex: 1 }}>braingame_cookie_consent</Text>
							<Text style={{ color: "#ccc", flex: 1 }}>Cookie consent</Text>
							<Text style={{ color: "#ccc", flex: 1 }}>1 year</Text>
						</View>
					</View>
				</View>

				{/* Managing Cookies */}
				<View style={{ marginBottom: 32 }}>
					<Text
						level="title-md"
						style={{
							color: "#fff",
							marginBottom: 16,
						}}
					>
						Managing Cookies
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						You can control and manage cookies in various ways:
					</Text>
					<View style={{ paddingLeft: 20, marginBottom: 16 }}>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Browser settings: Most browsers allow you to refuse cookies
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Google Analytics opt-out: Install the Google Analytics opt-out browser add-on
						</Text>
						<Text style={{ color: "#ccc", marginBottom: 8 }}>
							• Cookie consent: Use our cookie consent banner to accept or decline cookies
						</Text>
					</View>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						Note that refusing cookies may impact your experience on our website.
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
						Questions?
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#ccc",
							lineHeight: 24,
							marginBottom: 16,
						}}
					>
						If you have questions about our use of cookies, please contact us at:
					</Text>
					<Text
						level="body-md"
						style={{
							color: "#0074D9",
							textDecorationLine: "underline",
						}}
					>
						privacy@braingame.dev
					</Text>
				</View>
			</View>
		</View>
	);
}

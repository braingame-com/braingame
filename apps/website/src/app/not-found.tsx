"use client";

import { Link, Text, View } from "@braingame/bgui";
import { useEffect, useState } from "react";

const ASCII_FACES = [
	"¯\\_(ツ)_/¯",
	"(╯°□°)╯︵ ┻━┻",
	"ಠ_ಠ",
	"(ノಠ益ಠ)ノ彡┻━┻",
	"(⊙＿⊙')",
	"(╯︵╰,)",
	"ლ(ಠ益ಠლ)",
	"(ಥ﹏ಥ)",
	"(◕‿◕)",
	"ʕ•ᴥ•ʔ",
	"(っ˘̩╭╮˘̩)っ",
	"¯\\(°_o)/¯",
	"(╥﹏╥)",
	"(っ◕‿◕)っ",
	"┐(´～｀)┌",
	"(｡◕‿◕｡)",
	"(╯°□°)╯",
	"(ノ￣ー￣)ノ",
	"¯\\_(⊙_ʖ⊙)_/¯",
	"(´･_･`)",
];

const MESSAGES = [
	"Oops, you found the void!",
	"404: Brain cells not found",
	"This page took a wrong turn at Albuquerque",
	"Error 404: Page went for a coffee break",
	"The page you seek does not exist... yet",
	"Lost in the digital wilderness",
	"This page is having an existential crisis",
	"404: Page.exe has stopped working",
	"You've reached the edge of our universe",
	"This page is in another castle",
	"404: Page abducted by aliens",
	"The hamsters powering this page are on strike",
	"This page is still loading... from 1995",
	"404: This page is practicing social distancing",
	"Page not found, but your determination is admirable",
	"This page went to buy milk and never came back",
	"404: Page lost in the metaverse",
	"The page you're looking for is on vacation",
	"This page is hiding behind the couch",
	"404: Page.notFound() === true",
];

export default function NotFound() {
	const [face, setFace] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		// Pick random face and message on mount
		setFace(ASCII_FACES[Math.floor(Math.random() * ASCII_FACES.length)]);
		setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				height: "100%",
				backgroundColor: "#000",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
			}}
		>
			{/* ASCII Face */}
			<Text
				variant="displayTitle"
				style={{
					color: "#7c3aed",
					fontSize: 72,
					marginBottom: 32,
					fontFamily: "monospace",
					textAlign: "center",
				}}
			>
				{face}
			</Text>

			{/* 404 Text */}
			<Text
				variant="title"
				style={{
					color: "#fff",
					marginBottom: 16,
					textAlign: "center",
				}}
			>
				404
			</Text>

			{/* Random Message */}
			<Text
				variant="subtitle"
				style={{
					color: "#999",
					marginBottom: 48,
					textAlign: "center",
					maxWidth: 600,
				}}
			>
				{message}
			</Text>

			{/* Link back home */}
			<Link href="/">
				<View
					style={{
						backgroundColor: "#7c3aed",
						paddingHorizontal: 32,
						paddingVertical: 16,
						borderRadius: 8,
					}}
				>
					<Text variant="bold" style={{ color: "#fff" }}>
						Take me home
					</Text>
				</View>
			</Link>

			{/* Small refresh hint */}
			<Text
				variant="small"
				style={{
					color: "#666",
					marginTop: 48,
					textAlign: "center",
				}}
			>
				psst... refresh for a different message
			</Text>
		</View>
	);
}

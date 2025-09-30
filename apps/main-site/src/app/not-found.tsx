"use client";

import Link from "next/link";
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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				height: "100%",
				backgroundColor: "#000",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
			}}
		>
			{/* ASCII Face */}
			<div
				style={{
					color: "#7c3aed",
					fontSize: 72,
					marginBottom: 32,
					fontFamily: "monospace",
					textAlign: "center",
				}}
			>
				{face}
			</div>

			{/* 404 Text */}
			<h1
				style={{
					color: "#fff",
					marginBottom: 16,
					textAlign: "center",
					fontSize: "3rem",
					fontWeight: "bold",
					margin: "0 0 16px 0",
				}}
			>
				404
			</h1>

			{/* Random Message */}
			<p
				style={{
					color: "#999",
					marginBottom: 48,
					textAlign: "center",
					maxWidth: 600,
					fontSize: "1.25rem",
					margin: "0 0 48px 0",
				}}
			>
				{message}
			</p>

			{/* Link back home */}
			<Link href="/">
				<button
					type="button"
					style={{
						backgroundColor: "#7c3aed",
						padding: "16px 32px",
						borderRadius: 8,
						color: "#fff",
						fontWeight: "bold",
						border: "none",
						cursor: "pointer",
						fontSize: "16px",
					}}
				>
					Take me home
				</button>
			</Link>

			{/* Small refresh hint */}
			<small
				style={{
					color: "#666",
					marginTop: 48,
					textAlign: "center",
					fontSize: "0.8rem",
				}}
			>
				psst... refresh for a different message
			</small>
		</div>
	);
}

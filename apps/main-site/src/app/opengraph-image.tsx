import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Brain Game - The Future of Personal Development";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				fontSize: 128,
				background: "linear-gradient(to bottom right, #000000, #111111)",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
			}}
		>
			<div
				style={{
					fontSize: 96,
					fontWeight: "bold",
					background:
						"linear-gradient(to right, #FF4136, #FF851B, #FFDC00, #2ECC40, #0074D9, #B10DC9)",
					backgroundClip: "text",
					color: "transparent",
					marginBottom: 20,
				}}
			>
				Brain Game
			</div>
			<div
				style={{
					fontSize: 36,
					opacity: 0.8,
					textAlign: "center",
					maxWidth: 800,
				}}
			>
				The Future of Personal Development
			</div>
		</div>,
		{
			...size,
		},
	);
}

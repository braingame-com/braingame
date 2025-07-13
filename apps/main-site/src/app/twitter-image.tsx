import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const alt = "Brain Game - Join the Waitlist";
export const size = {
	width: 1200,
	height: 600,
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
					fontSize: 80,
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
					fontSize: 32,
					opacity: 0.9,
					marginBottom: 30,
				}}
			>
				Join the Waitlist
			</div>
			<div
				style={{
					fontSize: 24,
					opacity: 0.7,
					textAlign: "center",
					maxWidth: 700,
				}}
			>
				Be among the first to experience the future of personal development
			</div>
		</div>,
		{
			...size,
		},
	);
}

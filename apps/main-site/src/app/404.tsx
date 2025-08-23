import Link from "next/link";

export default function NotFound() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				backgroundColor: "#000",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
				height: "100%",
			}}
		>
			<div
				style={{
					maxWidth: 500,
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h1
					style={{
						color: "#0074D9",
						marginBottom: 16,
						fontSize: 120,
						fontWeight: "bold",
						margin: "0 0 16px 0",
					}}
				>
					404
				</h1>
				<h2
					style={{
						color: "#fff",
						marginBottom: 16,
						fontSize: "1.5rem",
						fontWeight: "bold",
						margin: "0 0 16px 0",
					}}
				>
					Page Not Found
				</h2>
				<p
					style={{
						color: "#999",
						marginBottom: 40,
						textAlign: "center",
						margin: "0 0 40px 0",
					}}
				>
					The page you're looking for doesn't exist or has been moved.
				</p>

				<Link href="/">
					<button
						style={{
							backgroundColor: "#0074D9",
							color: "#000",
							fontWeight: "bold",
							padding: "16px 32px",
							borderRadius: 8,
							border: "none",
							cursor: "pointer",
							fontSize: "16px",
						}}
					>
						Back to Home
					</button>
				</Link>
			</div>
		</div>
	);
}

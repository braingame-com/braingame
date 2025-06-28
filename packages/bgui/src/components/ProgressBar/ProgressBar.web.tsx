import { Colors, useThemeColor } from "@braingame/utils";
import { useEffect, useRef } from "react";
import type { ProgressBarProps } from "./types";

export const ProgressBar = ({
	value,
	color,
	backgroundColor,
	variant = "linear",
	animated = true,
	size = 40,
	style: _style,
}: ProgressBarProps) => {
	const progressColor = color ?? Colors.universal.primary;
	const themeBorderColor = useThemeColor("border");
	const trackColor = backgroundColor ?? themeBorderColor;
	const progressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (progressRef.current && animated) {
			progressRef.current.style.transition = "width 0.5s ease-in-out";
		}
	}, [animated]);

	if (variant === "circular") {
		const radius = (size - 4) / 2;
		const circumference = 2 * Math.PI * radius;
		const strokeDashoffset = circumference - (value / 100) * circumference;

		return (
			<svg
				width={size}
				height={size}
				style={{
					transform: "rotate(-90deg)",
				}}
				role="img"
				aria-label={`Progress: ${value}%`}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={trackColor}
					strokeWidth={2}
					fill="none"
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={progressColor}
					strokeWidth={2}
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					style={{
						transition: animated ? "stroke-dashoffset 0.5s ease-in-out" : "none",
					}}
				/>
			</svg>
		);
	}

	return (
		<div
			style={{
				width: "100%",
				height: 8,
				backgroundColor: trackColor,
				borderRadius: 4,
				overflow: "hidden",
			}}
		>
			<div
				ref={progressRef}
				style={{
					width: `${value}%`,
					height: "100%",
					backgroundColor: progressColor,
					borderRadius: 4,
					transition: animated ? "width 0.5s ease-in-out" : "none",
				}}
			/>
		</div>
	);
};

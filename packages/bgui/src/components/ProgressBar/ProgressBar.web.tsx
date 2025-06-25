import { Colors, useThemeColor } from "@braingame/utils";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import type { ProgressBarProps } from "./types";

export const ProgressBar = ({
	value,
	color,
	backgroundColor,
	variant = "linear",
	animated = true,
	size = 40,
	style,
}: ProgressBarProps) => {
	const progressColor = color ?? Colors.universal.primary;
	const themeBorderColor = useThemeColor("border");
	const trackColor = backgroundColor ?? themeBorderColor;
	const [animatedValue, setAnimatedValue] = useState(0);

	useEffect(() => {
		if (animated) {
			const timer = setTimeout(() => setAnimatedValue(value), 100);
			return () => clearTimeout(timer);
		}
		setAnimatedValue(value);
	}, [value, animated]);

	if (variant === "circular") {
		// Web-compatible circular progress using CSS
		const circumference = 2 * Math.PI * (size / 2 - 5);
		const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

		return (
			<View
				style={[
					{
						width: size,
						height: size,
						justifyContent: "center",
						alignItems: "center",
					},
					style,
				]}
				accessibilityRole="progressbar"
				// @ts-ignore - Web-specific props
				aria-label={`Progress: ${value} percent`}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={value}
				role="progressbar"
			>
				<svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={size / 2 - 5}
						stroke={trackColor}
						strokeWidth="4"
						fill="none"
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={size / 2 - 5}
						stroke={progressColor}
						strokeWidth="4"
						fill="none"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						style={{
							transition: animated ? "stroke-dashoffset 0.5s ease" : "none",
						}}
					/>
				</svg>
			</View>
		);
	}

	// Linear progress bar
	return (
		<View
			style={[styles.linearContainer, style]}
			accessibilityRole="progressbar"
			// @ts-ignore - Web-specific props
			aria-label={`Progress: ${value} percent`}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={value}
			role="progressbar"
		>
			<View style={[styles.linearTrack, { backgroundColor: trackColor }]}>
				<View
					style={[
						styles.linearProgress,
						{
							backgroundColor: progressColor,
							width: `${animatedValue}%`,
							transition: animated ? "width 0.5s ease" : "none",
						},
					]}
				/>
			</View>
		</View>
	);
};

import { Tokens } from "@braingame/utils";
import type React from "react";
import { Platform, Text as RNText, type TextStyle } from "react-native";
import type { LabelProps } from "./types";

const sizeMap: Record<NonNullable<LabelProps["size"]>, number> = {
	sm: Tokens.s,
	md: Tokens.m,
	lg: Tokens.l,
};

export const Label = ({
	children,
	htmlFor,
	required = false,
	size = "md",
	variant = "standard",
	style,
}: LabelProps) => {
	const baseStyle: TextStyle = {
		fontSize: sizeMap[size],
	};

	if (variant === "floating") {
		Object.assign(baseStyle, {
			position: "absolute" as const,
			top: -Tokens.s,
			left: Tokens.s,
			pointerEvents: "none" as const,
		});
	}

	if (Platform.OS === "web") {
		return (
			<label htmlFor={htmlFor} style={style as React.CSSProperties}>
				<RNText style={baseStyle}>
					{children}
					{required && (
						<RNText accessibilityElementsHidden accessibilityRole="none" style={{ color: "red" }}>
							*
						</RNText>
					)}
				</RNText>
			</label>
		);
	}

	return (
		<RNText style={[baseStyle, style]} nativeID={htmlFor ? `${htmlFor}-label` : undefined}>
			{children}
			{required && (
				<RNText accessibilityElementsHidden accessibilityRole="none" style={{ color: "red" }}>
					*
				</RNText>
			)}
		</RNText>
	);
};

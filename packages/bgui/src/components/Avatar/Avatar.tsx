import React from "react";
import { Image, Pressable, View } from "react-native";
import { Tokens } from "../../../../utils/constants/Tokens";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { Text } from "../../../Text";
import type { AvatarProps } from "./types";

const SIZE_MAP = {
	small: Tokens.l,
	medium: Tokens.xxl,
	large: Tokens.xxxl,
};

const getInitials = (name?: string) => {
	if (!name) return "";
	return name
		.split(" ")
		.map((part) => part.charAt(0))
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

export const Avatar = ({
	src,
	name,
	size = "medium",
	variant = "circle",
	onPress,
	style,
}: AvatarProps) => {
	const dimension = SIZE_MAP[size] ?? SIZE_MAP.medium;
	const borderRadius = variant === "circle" ? dimension / 2 : Tokens.s;
	const backgroundColor = useThemeColor("button");
	const content = src ? (
		<Image source={{ uri: src }} style={{ width: dimension, height: dimension, borderRadius }} />
	) : (
		<View
			style={{
				width: dimension,
				height: dimension,
				borderRadius,
				backgroundColor,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text>{getInitials(name)}</Text>
		</View>
	);

	return (
		<Pressable onPress={onPress} disabled={!onPress} style={style}>
			{content}
		</Pressable>
	);
};

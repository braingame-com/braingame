import { useState } from "react";
import { Image as RNImage, StyleSheet, View } from "react-native";
import type { ImageProps } from "./types";

export const Image = ({
	src,
	alt,
	placeholder,
	fallback,
	aspectRatio,
	objectFit = "cover",
	variant = "responsive",
	style,
	...rest
}: ImageProps) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	if (error) {
		return fallback ? <>{fallback}</> : null;
	}

	return (
		<View
			style={[
				variant === "responsive" && styles.responsive,
				aspectRatio !== undefined && { aspectRatio },
				style,
			]}
		>
			{!loaded && placeholder}
			<RNImage
				source={{ uri: src }}
				accessibilityLabel={alt}
				onLoad={() => setLoaded(true)}
				onError={() => setError(true)}
				style={[StyleSheet.absoluteFill, { objectFit }]}
				{...rest}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	responsive: {
		width: "100%",
	},
});

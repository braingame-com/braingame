import { useThemeColor } from "@braingame/utils";
import { useState } from "react";
import { Image as RNImage, StyleSheet, Text, View } from "react-native";
import { validateProps, validators } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { styles } from "./styles";
import type { ImageProps } from "./types";

const ImageComponent = ({
	src,
	alt,
	placeholder,
	fallback,
	aspectRatio,
	objectFit = "cover",
	variant = "responsive",
	style,
	onError,
	onLoad,
	...rest
}: ImageProps) => {
	// Validate props
	validateProps(
		{ src, alt },
		{
			src: validators.required,
			alt: validators.required,
		},
		"Image",
	);

	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const borderColor = useThemeColor("border");

	if (error) {
		if (fallback) {
			return <>{fallback}</>;
		}
		// Default error UI
		return (
			<View
				style={[
					variant === "responsive" && styles.responsive,
					aspectRatio !== undefined && { aspectRatio },
					styles.errorContainer,
					{ borderColor },
					style,
				]}
				accessibilityRole="image"
				accessibilityLabel={`Failed to load image: ${alt}`}
			>
				<Text style={{ color: borderColor, fontSize: 12 }}>Failed to load image</Text>
			</View>
		);
	}

	const handleLoad = () => {
		setLoaded(true);
		if (onLoad) onLoad({ nativeEvent: {} } as any);
	};

	const handleError = () => {
		setError(true);
		if (onError) onError({ nativeEvent: { error: "Failed to load image" } } as any);
	};

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
				onLoad={handleLoad}
				onError={handleError}
				style={[StyleSheet.absoluteFill, { objectFit }]}
				{...rest}
			/>
		</View>
	);
};

// Styles moved to styles.ts

// Export wrapped component
export const Image = withErrorBoundary(ImageComponent);

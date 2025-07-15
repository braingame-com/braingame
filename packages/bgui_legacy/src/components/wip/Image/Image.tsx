import { Typography } from "@braingame/utils";
import { useState } from "react";
import { Image as RNImage, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme";
import { validateProps, validators } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { getImageStyles } from "./styles";
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

	const { colors } = useTheme();
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const styles = getImageStyles(colors);
	const borderColor = colors.outlineVariant;

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
				<Text style={{ color: borderColor, fontSize: Typography.fontSize.xs }}>
					Failed to load image
				</Text>
			</View>
		);
	}

	const handleLoad: typeof onLoad = (e) => {
		setLoaded(true);
		if (onLoad) onLoad(e);
	};

	const handleError: typeof onError = (e) => {
		setError(true);
		if (onError) onError(e);
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

import { Typography, useThemeColor } from "@braingame/utils";
import { useState } from "react";
import { Image as RNImage, StyleSheet, Text, View } from "react-native";
import { validateProps, validators } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { styles } from "./styles";
import type { ImageProps } from "./types";

/**
 * Image component with loading states and error handling.
 * Provides accessible image display with placeholder and fallback support.
 *
 * @example
 * ```tsx
 * // Basic image
 * <Image
 *   src="https://example.com/photo.jpg"
 *   alt="Beautiful landscape"
 * />
 *
 * // Image with aspect ratio
 * <Image
 *   src={profileImageUrl}
 *   alt="User profile picture"
 *   aspectRatio={1}
 *   objectFit="cover"
 * />
 *
 * // Image with loading placeholder
 * <Image
 *   src={productImageUrl}
 *   alt={productName}
 *   placeholder={<Spinner />}
 *   aspectRatio={16/9}
 * />
 *
 * // Image with custom fallback
 * <Image
 *   src={thumbnailUrl}
 *   alt="Video thumbnail"
 *   fallback={
 *     <View style={styles.fallback}>
 *       <Icon name="image-off" />
 *       <Text>Image unavailable</Text>
 *     </View>
 *   }
 * />
 *
 * // Fixed size image
 * <Image
 *   src={iconUrl}
 *   alt="App icon"
 *   variant="fixed"
 *   style={{ width: 64, height: 64 }}
 * />
 * ```
 *
 * @component
 */
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

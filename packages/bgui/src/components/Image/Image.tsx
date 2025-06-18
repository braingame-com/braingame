import { useThemeColor } from "@braingame/utils";
import { useState } from "react";
import { Image as RNImage, StyleSheet, Text, View } from "react-native";
import { validateProps, validators } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
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
				accessibilityRole="img"
				accessibilityLabel={`Failed to load image: ${alt}`}
			>
				<Text style={{ color: borderColor, fontSize: 12 }}>Failed to load image</Text>
			</View>
		);
	}

	const handleLoad = () => {
		setLoaded(true);
		onLoad?.();
	};

	const handleError = () => {
		setError(true);
		onError?.();
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

const styles = StyleSheet.create({
	responsive: {
		width: "100%",
	},
	errorContainer: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f5f5f5",
		borderWidth: 1,
		borderStyle: "dashed",
		minHeight: 100,
	},
});

// Export wrapped component
export const Image = withErrorBoundary(ImageComponent);

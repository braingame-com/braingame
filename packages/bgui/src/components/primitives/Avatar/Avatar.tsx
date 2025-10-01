import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import {
	Image,
	type ImageErrorEventData,
	type NativeSyntheticEvent,
	Platform,
	Pressable,
	type StyleProp,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { AvatarProps, AvatarSize, AvatarVariant } from "./Avatar.types";

type VariantTokens = Record<string, string | number | undefined>;

type SizeTokens = {
	dimension: number;
	textLevel: "body-xs" | "body-sm" | "body-md";
};

const createSizeMap = (): Record<AvatarSize, SizeTokens> => ({
	sm: { dimension: 32, textLevel: "body-xs" },
	md: { dimension: 40, textLevel: "body-sm" },
	lg: { dimension: 48, textLevel: "body-md" },
});

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	initials: {
		fontWeight: "600",
		textTransform: "uppercase",
	},
	content: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});

const resolveThemeColor = (theme: Theme, value?: string) => {
	if (!value) return undefined;
	return theme.colors[value as keyof Theme["colors"]] ?? value;
};

const getVariantTokens = (
	theme: Theme,
	variant: AvatarVariant,
	color: NonNullable<AvatarProps["color"]>,
): VariantTokens => {
	const avatarVariants = theme.components.Avatar.variants as Record<string, VariantTokens>;
	const key = `${variant}-${color}`;
	return avatarVariants[key] ?? avatarVariants["soft-neutral"];
};

const computeInitials = (text?: string) => {
	if (!text) return "";
	const words = text.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return "";
	const [first, second] = words;
	if (!second) {
		return first.slice(0, 2).toUpperCase();
	}
	return `${first[0]}${second[0]}`.toUpperCase();
};

export const Avatar = forwardRef<View, AvatarProps>(
	(
		{
			alt,
			children,
			color = "neutral",
			onClick,
			onPressIn,
			onPressOut,
			size = "md",
			src,
			style,
			testID,
			variant = "soft",
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const internalRef = useRef<View>(null);
		useImperativeHandle(ref, () => internalRef.current as View);

		const [imageFailed, setImageFailed] = useState(false);
		const [imageLoaded, setImageLoaded] = useState(false);

		useEffect(() => {
			setImageFailed(false);
			setImageLoaded(false);
			void src;
		}, [src]);

		const theme = useTheme();
		const sizeMap = useMemo(() => createSizeMap(), []);
		const sizeTokens = sizeMap[size];

		const variantTokens = useMemo(
			() => getVariantTokens(theme, variant, color),
			[theme, variant, color],
		);

		const backgroundColor =
			resolveThemeColor(theme, variantTokens.backgroundColor as string | undefined) ??
			"transparent";
		const borderColor =
			typeof variantTokens.borderColor === "string"
				? resolveThemeColor(theme, variantTokens.borderColor)
				: undefined;
		const borderWidth =
			typeof variantTokens.borderWidth === "number" ? variantTokens.borderWidth : 0;
		const textColor =
			resolveThemeColor(theme, variantTokens.color as string | undefined) ?? theme.colors.onSurface;

		const containerStyle: ViewStyle = {
			width: sizeTokens.dimension,
			height: sizeTokens.dimension,
			borderRadius: sizeTokens.dimension / 2,
			backgroundColor,
			borderColor,
			borderWidth,
		};

		const combinedStyle = [styles.container, containerStyle, style].filter(
			Boolean,
		) as StyleProp<ViewStyle>;

		const shouldRenderImage = Boolean(src) && !imageFailed;

		const handleImageError = (_event: NativeSyntheticEvent<ImageErrorEventData>) => {
			setImageFailed(true);
		};

		const handleImageLoad = () => {
			setImageLoaded(true);
		};

		const fallbackLabel = ariaLabel ?? alt;

		const renderFallback = () => {
			if (typeof children === "string" || typeof children === "number") {
				return (
					<Typography level={sizeTokens.textLevel} style={[styles.initials, { color: textColor }]}>
						{`${children}`.toUpperCase()}
					</Typography>
				);
			}

			if (children) {
				return children;
			}

			const initials = computeInitials(fallbackLabel);

			if (initials) {
				return (
					<Typography level={sizeTokens.textLevel} style={[styles.initials, { color: textColor }]}>
						{initials}
					</Typography>
				);
			}

			return null;
		};

		const renderContent = () => {
			if (shouldRenderImage) {
				return (
					<>
						{!imageLoaded ? renderFallback() : null}
						<Image
							source={{ uri: src }}
							accessibilityLabel={alt}
							onError={handleImageError}
							onLoad={handleImageLoad}
							style={[
								styles.image,
								{
									opacity: imageLoaded ? 1 : 0,
									position: "absolute",
									top: 0,
									right: 0,
									bottom: 0,
									left: 0,
								},
							]}
						/>
					</>
				);
			}

			return renderFallback();
		};

		if (onClick) {
			return (
				<Pressable
					ref={internalRef}
					accessibilityLabel={ariaLabel ?? alt}
					accessibilityRole="button"
					android_ripple={
						Platform.OS === "android" ? { color: textColor, borderless: false } : undefined
					}
					onPress={onClick}
					onPressIn={onPressIn}
					onPressOut={onPressOut}
					style={({ pressed }) => [
						StyleSheet.flatten(combinedStyle),
						pressed
							? {
									opacity: 0.9,
									transform: [{ scale: 0.97 }],
								}
							: null,
					]}
					testID={testID}
				>
					<Box style={styles.content}>{renderContent()}</Box>
				</Pressable>
			);
		}

		return (
			<Box
				ref={internalRef}
				accessibilityLabel={ariaLabel ?? alt}
				accessibilityRole="image"
				style={combinedStyle}
				testID={testID}
			>
				<Box style={styles.content}>{renderContent()}</Box>
			</Box>
		);
	},
);

Avatar.displayName = "Avatar";

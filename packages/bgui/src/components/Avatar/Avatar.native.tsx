import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
	type GestureResponderEvent,
	Image,
	Pressable,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import { theme } from "../../theme";
import { Typography } from "../Typography";
import type { AvatarProps } from "./AvatarProps";

/**
 * Native implementation of Avatar component
 *
 * Avatars are used to represent people or entities.
 */

export const Avatar = forwardRef<View, AvatarProps>(
	(
		{
			children,
			color = "neutral",
			variant = "soft",
			size = "md",
			src,
			alt,
			onClick,
			onPressIn,
			onPressOut,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		const avatarRef = useRef<View>(null);
		const [imgError, setImgError] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => avatarRef.current || ({} as View));

		// Get avatar variant style from theme
		const getAvatarVariantStyle = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Avatar.variants;
			const variantStyle = theme.components.Avatar.variants[variantKey];

			if (!variantStyle) {
				// Fallback to soft neutral
				return theme.components.Avatar.variants["soft-neutral"];
			}

			return variantStyle;
		};

		// Get size styles
		const getSizeStyles = () => {
			const sizeMap = {
				sm: { width: 32, height: 32, borderRadius: 16 },
				md: { width: 40, height: 40, borderRadius: 20 },
				lg: { width: 48, height: 48, borderRadius: 24 },
			};
			return sizeMap[size];
		};

		// Get text size for initials
		const getTextSize = () => {
			const textSizeMap = {
				sm: "caption",
				md: "button",
				lg: "body2",
			};
			return textSizeMap[size] as keyof typeof theme.textVariants;
		};

		// Handle press events
		const handlePress = (event: GestureResponderEvent) => {
			if (onClick) {
				(onClick as (event: GestureResponderEvent) => void)(event);
			}
		};

		const handlePressIn = (event: GestureResponderEvent) => {
			onPressIn?.(event);
		};

		const handlePressOut = (event: GestureResponderEvent) => {
			onPressOut?.(event);
		};

		// Handle image error
		const handleImgError = () => {
			setImgError(true);
		};

		const avatarVariantStyle = getAvatarVariantStyle();
		const sizeStyles = getSizeStyles();
		const _textVariant = getTextSize();

		const avatarStyle = [
			styles.base,
			avatarVariantStyle,
			sizeStyles,
			...(style ? [style as ViewStyle] : []),
		] as ViewStyle[];

		// Render content
		const renderContent = () => {
			// If image is provided and hasn't errored, show image
			if (src && !imgError) {
				return (
					<Image
						source={{ uri: src }}
						style={[styles.image, sizeStyles]}
						onError={handleImgError}
						accessibilityLabel={alt}
					/>
				);
			}

			// Show children (initials, icon, etc.)
			if (children) {
				return (
					<Typography
						level={size === "sm" ? "body-xs" : size === "lg" ? "body-lg" : "body-md"}
						style={
							{
								...styles.text,
								color: variant === "solid" ? "#ffffff" : theme.colors[color],
								textTransform: "uppercase",
							} as React.CSSProperties
						}
					>
						{children}
					</Typography>
				);
			}

			return null;
		};

		// If clickable, use Pressable
		if (onClick) {
			return (
				<Pressable
					ref={avatarRef}
					onPress={handlePress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					testID={testID}
					accessibilityRole="button"
					accessibilityLabel={ariaLabel || alt}
					style={({ pressed }) =>
						[
							...(Array.isArray(avatarStyle) ? avatarStyle : [avatarStyle]),
							{
								opacity: pressed ? 0.8 : 1,
								transform: [{ scale: pressed ? 0.95 : 1 }],
							},
						] as import("react-native").StyleProp<import("react-native").ViewStyle>
					}
					{...props}
				>
					{renderContent()}
				</Pressable>
			);
		}

		// Non-clickable avatar
		return (
			<View
				ref={avatarRef}
				style={avatarStyle}
				testID={testID}
				accessibilityRole="image"
				accessibilityLabel={ariaLabel || alt}
				{...props}
			>
				{renderContent()}
			</View>
		);
	},
);

const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	text: {
		fontWeight: "500",
		textAlign: "center",
	},
});

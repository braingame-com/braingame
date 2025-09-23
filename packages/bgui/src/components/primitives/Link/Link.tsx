import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Linking, Platform, Pressable, StyleSheet, type View, type ViewStyle } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { LinkColor, LinkProps, LinkVariant } from "./Link.types";

const resolveColor = (color: LinkColor) => {
	switch (color) {
		case "neutral":
			return theme.colors.onSurface;
		case "danger":
			return theme.colors.error;
		case "success":
			return theme.colors.success;
		case "warning":
			return theme.colors.warning;
		default:
			return theme.colors.primary;
	}
};

const variantStyles = (variant: LinkVariant, color: LinkColor) => {
	const baseColor = resolveColor(color);

	switch (variant) {
		case "outlined":
			return {
				container: {
					borderWidth: 1,
					borderColor: baseColor,
					borderRadius: theme.radii.xs,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
				} as ViewStyle,
				text: { color: baseColor },
			};
		case "soft":
			return {
				container: {
					backgroundColor: `${baseColor}22`,
					borderRadius: theme.radii.xs,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
				} as ViewStyle,
				text: { color: baseColor },
			};
		case "solid":
			return {
				container: {
					backgroundColor: baseColor,
					borderRadius: theme.radii.xs,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
				} as ViewStyle,
				text: { color: theme.colors.onPrimary },
			};
		default:
			return {
				container: {} as ViewStyle,
				text: { color: baseColor },
			};
	}
};

export const Link = forwardRef<View, LinkProps>(
	(
		{
			children,
			href,
			disabled = false,
			color = "primary",
			variant = "plain",
			underline = "hover",
			startDecorator,
			endDecorator,
			level = "body-md",
			overlay = false,
			target = "_self",
			onClick,
			onFocus,
			onBlur,
			style,
			testID,
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const pressableRef = useRef<View>(null);
		const [hovered, setHovered] = useState(false);
		const [pressed, setPressed] = useState(false);

		useImperativeHandle(ref, () => pressableRef.current || ({} as View));

		const handleOpenLink = useCallback(async () => {
			if (!href) return;

			if (Platform.OS === "web") {
				if (typeof window !== "undefined") {
					const targetWindow = target ?? "_self";
					window.open(href, targetWindow);
				}
				return;
			}

			const supported = await Linking.canOpenURL(href);
			if (supported) {
				await Linking.openURL(href);
			}
		}, [href, target]);

		const handlePress = useCallback(
			async (event: unknown) => {
				if (disabled) return;

				onClick?.(event);
				await handleOpenLink();
			},
			[disabled, onClick, handleOpenLink],
		);

		const stylesForVariant = variantStyles(variant, color);
		const showUnderline = underline === "always" || (underline === "hover" && (hovered || pressed));

		const textDecoration = showUnderline ? { textDecorationLine: "underline" as const } : null;

		return (
			<Pressable
				ref={pressableRef}
				disabled={disabled}
				onPress={handlePress}
				onHoverIn={() => setHovered(true)}
				onHoverOut={() => setHovered(false)}
				onPressIn={() => setPressed(true)}
				onPressOut={() => setPressed(false)}
				onFocus={onFocus}
				onBlur={onBlur}
				style={({ pressed: isPressed }) =>
					StyleSheet.flatten([
						styles.root,
						stylesForVariant.container,
						overlay ? styles.overlay : null,
						{ opacity: disabled ? 0.4 : isPressed ? 0.8 : 1 },
						style as ViewStyle,
					])
				}
				testID={testID}
				accessibilityLabel={ariaLabel}
				accessibilityState={{ disabled }}
				accessibilityRole="link"
			>
				{startDecorator ? <Box style={styles.decorator}>{startDecorator}</Box> : null}
				<Typography level={level} style={[stylesForVariant.text, textDecoration]}>
					{children}
				</Typography>
				{endDecorator ? <Box style={styles.decorator}>{endDecorator}</Box> : null}
			</Pressable>
		);
	},
);

Link.displayName = "Link";

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	overlay: {
		position: "relative",
	},
	decorator: {
		marginHorizontal: theme.spacing.xs / 2,
	},
});

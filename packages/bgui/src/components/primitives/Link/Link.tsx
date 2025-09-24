import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { Linking, Platform, Pressable, StyleSheet, type View, type ViewStyle } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { LinkProps } from "./Link.types";

const resolveToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const getVariantStyles = (variant: LinkProps["variant"], color: LinkProps["color"]) => {
	const variantKey = `${variant}-${color}` as const;
	const variantTokens =
		theme.components.Link.variants[variantKey] ?? theme.components.Link.variants["plain-primary"];

	const container: ViewStyle = {
		borderRadius: theme.radii.xs,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: variant === "plain" ? undefined : theme.spacing.sm,
		paddingVertical: variant === "plain" ? undefined : theme.spacing.xs,
		backgroundColor: resolveToken(variantTokens.backgroundColor),
		borderColor: resolveToken(variantTokens.borderColor),
		borderWidth: variantTokens.borderWidth ?? (variant === "outlined" ? 1 : 0),
	};

	return {
		container,
		textColor: resolveToken(variantTokens.color) ?? theme.colors.primary,
	};
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
		const [focused, setFocused] = useState(false);

		useImperativeHandle(ref, () => pressableRef.current || ({} as View));

		const variantStyles = useMemo(() => getVariantStyles(variant, color), [variant, color]);

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

		const handleFocus = useCallback(() => {
			if (!disabled) {
				setFocused(true);
			}
			onFocus?.();
		}, [disabled, onFocus]);

		const handleBlur = useCallback(() => {
			setFocused(false);
			onBlur?.();
		}, [onBlur]);

		useEffect(() => {
			if (focused) {
				setHovered(true);
			} else if (!pressed) {
				setHovered(false);
			}
		}, [focused, pressed]);

		useEffect(() => {
			if (disabled) {
				setHovered(false);
				setPressed(false);
				setFocused(false);
			}
		}, [disabled]);

		const showUnderline =
			underline === "always" || (underline === "hover" && (hovered || pressed || focused));

		const textDecoration = showUnderline ? { textDecorationLine: "underline" as const } : null;

		const content =
			typeof children === "string" || typeof children === "number" ? (
				<Typography level={level} style={[{ color: variantStyles.textColor }, textDecoration]}>
					{children}
				</Typography>
			) : (
				<Box style={styles.customContent}>{children}</Box>
			);

		return (
			<Pressable
				ref={pressableRef}
				disabled={disabled}
				onPress={handlePress}
				onHoverIn={() => (!disabled ? setHovered(true) : undefined)}
				onHoverOut={() => (!disabled ? setHovered(false) : undefined)}
				onPressIn={() => setPressed(true)}
				onPressOut={() => setPressed(false)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={({ pressed: isPressed }) =>
					StyleSheet.flatten([
						styles.root,
						variantStyles.container,
						overlay ? styles.overlay : null,
						{ opacity: disabled ? 0.4 : isPressed ? 0.8 : 1 },
						style,
					])
				}
				testID={testID}
				accessibilityLabel={ariaLabel}
				accessibilityState={{ disabled }}
				accessibilityRole="link"
				accessibilityHint={href ? `Opens ${href}` : undefined}
			>
				{startDecorator ? <Box style={styles.startDecorator}>{startDecorator}</Box> : null}
				{content}
				{endDecorator ? <Box style={styles.endDecorator}>{endDecorator}</Box> : null}
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
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	startDecorator: {
		marginRight: theme.spacing.xs,
	},
	endDecorator: {
		marginLeft: theme.spacing.xs,
	},
	customContent: {
		justifyContent: "center",
		alignItems: "center",
	},
});

import { memo, useMemo } from "react";
import { Platform, StyleSheet, type ViewStyle } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { Icon } from "../../primitives/Icon";
import { Link } from "../../primitives/Link";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import type { HeaderProps } from "./Header.types";

const paddingResolvers = {
	sm: (theme: Theme) => theme.spacing.sm,
	md: (theme: Theme) => theme.spacing.md,
	lg: (theme: Theme) => theme.spacing.lg,
} as const;

export const Header = memo(function Header({
	brand,
	links = [],
	cta,
	backgroundColor,
	border = true,
	fixed = false,
	paddingY = "md",
}: HeaderProps) {
	const theme = useTheme();
	const resolvedBackgroundColor = backgroundColor ?? theme.colors.surface;
	const ctaIconColor =
		cta?.iconColor ??
		(cta?.variant === "solid" || !cta?.variant ? theme.colors.onPrimary : theme.colors.primary);
	const headerStyle = StyleSheet.flatten([
		{
			backgroundColor: resolvedBackgroundColor,
			borderBottomWidth: border ? StyleSheet.hairlineWidth : 0,
			borderBottomColor: border ? theme.colors.outlineVariant : "transparent",
			paddingVertical: paddingResolvers[paddingY](theme),
		},
		fixed
			? Platform.OS === "web"
				? ({ position: "sticky", top: 0, zIndex: 100 } as unknown as ViewStyle)
				: ({ position: "relative", top: 0, zIndex: 100 } as ViewStyle)
			: null,
	]);

	const ctaAreaStyle = useMemo(() => ({ marginLeft: theme.spacing.md }), [theme]);

	return (
		<Box style={headerStyle}>
			<Container>
				<Stack direction="row" spacing="md" useFlexGap={false} style={styles.row}>
					<Box style={styles.brandArea}>
						{typeof brand === "string" ? <Typography level="title-md">{brand}</Typography> : brand}
					</Box>
					{links.length > 0 ? (
						<Stack direction="row" spacing="md" useFlexGap={false} style={styles.linkRow}>
							{links.map((link) => (
								<Link key={link.href + link.label} href={link.href} target={link.target}>
									<Stack direction="row" spacing="xs" useFlexGap={false} style={styles.inlineStack}>
										{link.icon ? (
											<Icon name={link.icon} size={18} color={theme.colors.onSurface} />
										) : null}
										<Typography level="body-sm">{link.label}</Typography>
									</Stack>
								</Link>
							))}
						</Stack>
					) : null}
					{cta ? (
						<Box style={ctaAreaStyle}>
							{cta.href ? (
								<Link href={cta.href} target="_self">
									<Button variant={cta.variant ?? "solid"} onClick={cta.onClick}>
										<Stack
											direction="row"
											spacing="xs"
											useFlexGap={false}
											style={styles.inlineStack}
										>
											{cta.icon ? <Icon name={cta.icon} size={18} color={ctaIconColor} /> : null}
											{cta.label}
										</Stack>
									</Button>
								</Link>
							) : (
								<Button variant={cta.variant ?? "solid"} onClick={cta.onClick}>
									<Stack direction="row" spacing="xs" useFlexGap={false} style={styles.inlineStack}>
										{cta.icon ? <Icon name={cta.icon} size={18} color={ctaIconColor} /> : null}
										{cta.label}
									</Stack>
								</Button>
							)}
						</Box>
					) : null}
				</Stack>
			</Container>
		</Box>
	);
});

const styles = StyleSheet.create({
	row: {
		alignItems: "center",
		justifyContent: "space-between",
	},
	brandArea: {
		flexShrink: 0,
	},
	linkRow: {
		flex: 1,
		justifyContent: "flex-end",
		flexWrap: "wrap",
	},
	inlineStack: {
		alignItems: "center",
	},
});

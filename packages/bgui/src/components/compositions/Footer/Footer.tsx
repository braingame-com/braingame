import { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Container } from "../../primitives/Container";
import { Icon } from "../../primitives/Icon";
import { Link } from "../../primitives/Link";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import type { FooterProps } from "./Footer.types";

const paddingResolvers = {
	sm: (theme: Theme) => theme.spacing.sm,
	md: (theme: Theme) => theme.spacing.md,
	lg: (theme: Theme) => theme.spacing.lg,
} as const;

export const Footer = memo(function Footer({
	brand,
	description,
	links = [],
	legalLinks = [],
	socialLinks = [],
	copyright,
	backgroundColor,
	border = true,
	paddingY = "md",
}: FooterProps) {
	const theme = useTheme();
	const resolvedBackgroundColor = backgroundColor ?? theme.colors.surface;
	const paddingYValue = paddingResolvers[paddingY](theme);
	const brandSpacing = theme.spacing.xs;
	const brandStyle = useMemo(() => ({ marginBottom: brandSpacing }), [brandSpacing]);
	return (
		<Box
			style={StyleSheet.flatten([
				styles.wrapper,
				{
					backgroundColor: resolvedBackgroundColor,
					borderTopWidth: border ? StyleSheet.hairlineWidth : 0,
					borderTopColor: border ? theme.colors.outlineVariant : "transparent",
					paddingVertical: paddingYValue,
				},
			])}
		>
			<Container>
				<Stack spacing="lg">
					<Stack spacing="sm" style={styles.topRow}>
						{brand ? <Box style={brandStyle}>{brand}</Box> : null}
						{description ? (
							<Typography level="body-sm" style={styles.description}>
								{description}
							</Typography>
						) : null}
						{links.length > 0 ? (
							<Stack direction="row" spacing="md" useFlexGap={false} style={styles.linkRow}>
								{links.map((link) => (
									<Link key={link.href + link.label} href={link.href} target={link.target}>
										<Typography level="body-sm" style={styles.linkText}>
											{link.label}
										</Typography>
									</Link>
								))}
							</Stack>
						) : null}
					</Stack>

					{socialLinks.length > 0 ? (
						<Stack direction="row" spacing="sm" useFlexGap={false} style={styles.socialRow}>
							{socialLinks.map((social) => (
								<Link
									key={social.href + social.label}
									href={social.href}
									target={social.target ?? "_blank"}
									aria-label={social.ariaLabel ?? social.label}
								>
									<Box style={styles.socialIcon}>
										<Icon name={social.icon} size={20} color="#e2e8f0" />
									</Box>
								</Link>
							))}
						</Stack>
					) : null}

					<Box style={styles.bottomRow}>
						{legalLinks.length > 0 ? (
							<Stack direction="row" spacing="sm" useFlexGap={false} style={styles.legalRow}>
								{legalLinks.map((link) => (
									<Link key={link.href + link.label} href={link.href} target={link.target}>
										<Typography level="body-xs" style={styles.legalText}>
											{link.label}
										</Typography>
									</Link>
								))}
							</Stack>
						) : null}
						{copyright ? (
							<Typography level="body-xs" style={styles.legalText}>
								{copyright}
							</Typography>
						) : null}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
});

const styles = StyleSheet.create({
	wrapper: {
		marginTop: "auto",
	},
	topRow: {
		alignItems: "flex-start",
	},
	description: {
		color: "#94a3b8",
		maxWidth: 640,
	},
	linkRow: {
		flexWrap: "wrap",
	},
	linkText: {
		color: "#e2e8f0",
	},
	socialRow: {
		flexWrap: "wrap",
	},
	socialIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "rgba(148, 163, 184, 0.12)",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 12,
		alignItems: "center",
	},
	legalRow: {
		flexWrap: "wrap",
	},
	legalText: {
		color: "#94a3b8",
	},
});

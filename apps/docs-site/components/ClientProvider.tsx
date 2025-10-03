"use client";

import type { SidebarNavigationSection } from "@braingame/bgui";
import {
	BGUIThemeProvider,
	Box,
	Header,
	type HeaderLink,
	IconButton,
	Modal,
	SidebarNavigation,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

interface ClientProviderProps {
	children: React.ReactNode;
}

const HEADER_LINKS: HeaderLink[] = [
	{ label: "Components", href: "/components" },
	{ label: "Hooks", href: "/hooks" },
	{ label: "Utils", href: "/utils" },
	{ label: "GitHub", href: "https://github.com/braingame/bgui", target: "_blank" },
];

const SIDEBAR_SECTIONS: SidebarNavigationSection[] = [
	{
		title: "Primitives",
		items: [
			{ label: "Button", value: "/components/primitives/button" },
			{ label: "Input", value: "/components/primitives/input" },
			{ label: "Link", value: "/components/primitives/link" },
			{ label: "Typography", value: "/components/primitives/typography" },
			{ label: "Icon", value: "/components/primitives/icon" },
		],
	},
	{
		title: "Layout",
		items: [
			{ label: "Box", value: "/components/layout/box" },
			{ label: "Container", value: "/components/layout/container" },
			{ label: "Stack", value: "/components/layout/stack" },
		],
	},
	{
		title: "Compositions",
		items: [
			{ label: "Header", value: "/components/compositions/header" },
			{ label: "Footer", value: "/components/compositions/footer" },
		],
	},
];

export function ClientProvider({ children }: ClientProviderProps) {
	const router = useRouter();
	const pathname = usePathname() ?? "/";
	const [mounted, setMounted] = useState(false);
	const [themePreference, setThemePreference] = useState<"light" | "dark">("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
		setThemePreference(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;
		localStorage.setItem("theme", themePreference);
		document.documentElement.setAttribute("data-theme", themePreference);
	}, [mounted, themePreference]);

	const toggleTheme = useCallback(() => {
		setThemePreference((current) => (current === "light" ? "dark" : "light"));
	}, []);

	const navigateTo = useCallback(
		(target: string | undefined) => {
			if (!target || target === pathname) return;
			router.push(target);
		},
		[pathname, router],
	);

	if (!mounted) {
		return null;
	}

	return (
		<BGUIThemeProvider forceTheme={themePreference}>
			<DocsLayoutFrame
				themePreference={themePreference}
				onToggleTheme={toggleTheme}
				onNavigate={navigateTo}
				pathname={pathname}
			>
				{children}
			</DocsLayoutFrame>
		</BGUIThemeProvider>
	);
}

interface DocsLayoutFrameProps {
	children: React.ReactNode;
	themePreference: "light" | "dark";
	onToggleTheme: () => void;
	onNavigate: (target: string | undefined) => void;
	pathname: string;
}

function DocsLayoutFrame({
	children,
	themePreference,
	onToggleTheme,
	onNavigate,
	pathname,
}: DocsLayoutFrameProps) {
	const { width } = useWindowDimensions();
	const theme = useTheme();
	const isDesktop = width >= 1024;
	const [navOpen, setNavOpen] = useState(false);

	const openNavigation = useCallback(() => setNavOpen(true), []);
	const closeNavigation = useCallback(() => setNavOpen(false), []);

	useEffect(() => {
		if (isDesktop && navOpen) {
			setNavOpen(false);
		}
	}, [isDesktop, navOpen]);

	const handleNavigate = useCallback(
		(item: SidebarNavigationSection["items"][number]) => {
			onNavigate(item.value);
			if (!isDesktop) {
				closeNavigation();
			}
		},
		[closeNavigation, onNavigate, isDesktop],
	);

	const headerBrand = useMemo(
		() => (
			<Stack direction="row" spacing="sm" style={brandStyles.brandRow}>
				<Box
					accessibilityRole="image"
					accessibilityLabel="Brain Game Docs mark"
					style={brandStyles.brandMark}
				>
					<Typography level="title-sm">BG</Typography>
				</Box>
				<Typography level="title-md">Docs</Typography>
			</Stack>
		),
		[],
	);

	const headerActions = useMemo(
		() => (
			<Stack direction="row" spacing="sm" style={layoutStyles.headerActionRow}>
				<IconButton
					iconName={themePreference === "light" ? "dark_mode" : "light_mode"}
					variant="plain"
					size="md"
					aria-label="Toggle theme"
					onClick={onToggleTheme}
				/>
				{!isDesktop ? (
					<IconButton
						iconName="menu"
						variant="plain"
						size="md"
						aria-label="Open navigation"
						onClick={openNavigation}
					/>
				) : null}
			</Stack>
		),
		[isDesktop, onToggleTheme, themePreference, openNavigation],
	);

	const sidebarStyle = useMemo(
		() =>
			StyleSheet.flatten([
				layoutStyles.sidebar,
				{
					borderRightWidth: StyleSheet.hairlineWidth,
					borderRightColor: theme.colors.outlineVariant,
				},
			]),
		[theme.colors.outlineVariant],
	);

	const modalSurfaceStyle = useMemo(
		() =>
			StyleSheet.flatten([
				layoutStyles.modalContent,
				{
					backgroundColor: theme.colors.surface,
					borderRadius: theme.radii.lg,
				},
			]),
		[theme.colors.surface, theme.radii.lg],
	);

	const headerLinks = isDesktop ? HEADER_LINKS : [];

	return (
		<Box style={layoutStyles.root} backgroundColor="background">
			<Box style={layoutStyles.headerWrapper} testID="docs-header">
				<Header
					brand={headerBrand}
					links={headerLinks}
					actions={headerActions}
					fixed
					paddingY="sm"
				/>
			</Box>
			<Stack direction="row" style={layoutStyles.body} spacing={0}>
				{isDesktop ? (
					<Box
						style={sidebarStyle}
						backgroundColor="surfaceContainerLow"
						accessibilityLabel="Docs navigation"
						testID="docs-navigation"
					>
						<SidebarNavigation
							sections={SIDEBAR_SECTIONS}
							activeItem={pathname}
							onItemPress={handleNavigate}
							ariaLabel="Docs navigation"
							testID="docs-navigation-list"
						/>
					</Box>
				) : null}
				<Box style={layoutStyles.main} backgroundColor="surface" testID="docs-main">
					<Box style={layoutStyles.content}>{children}</Box>
				</Box>
			</Stack>
			<Modal open={navOpen} onClose={closeNavigation} aria-label="Docs navigation menu">
				<Box style={modalSurfaceStyle} testID="docs-navigation-modal">
					<Stack direction="row" spacing="sm" style={layoutStyles.modalHeaderRow}>
						<Typography level="title-sm">Navigation</Typography>
						<IconButton
							iconName="close"
							variant="plain"
							size="md"
							aria-label="Close navigation"
							onClick={closeNavigation}
						/>
					</Stack>
					<SidebarNavigation
						sections={SIDEBAR_SECTIONS}
						activeItem={pathname}
						onItemPress={handleNavigate}
						ariaLabel="Docs navigation"
						testID="docs-navigation-modal-list"
					/>
				</Box>
			</Modal>
		</Box>
	);
}

const layoutStyles = StyleSheet.create({
	root: {
		flex: 1,
		width: "100%",
	},
	headerWrapper: {
		width: "100%",
	},
	body: {
		flex: 1,
		width: "100%",
	},
	sidebar: {
		width: 280,
		paddingHorizontal: 24,
		paddingVertical: 24,
	},
	main: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 32,
	},
	content: {
		width: "100%",
		maxWidth: 960,
		alignSelf: "center",
	},
	headerActionRow: {
		alignItems: "center",
	},
	modalContent: {
		width: "90%",
		maxWidth: 360,
		padding: 24,
	},
	modalHeaderRow: {
		marginBottom: 16,
		alignItems: "center",
		justifyContent: "space-between",
	},
});

const brandStyles = StyleSheet.create({
	brandRow: {
		alignItems: "center",
	},
	brandMark: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(98, 0, 238, 0.15)",
		alignItems: "center",
		justifyContent: "center",
	},
});

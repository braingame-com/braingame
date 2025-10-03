"use client";

import {
	AudioPlayer,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Icon,
	IconButton,
	Input,
	Stack,
	Switch,
	TabBar,
	type TabBarItem,
	Toast,
	Typography,
	useTheme,
} from "@braingame/bgui";
import { useState } from "react";

const tabItems: TabBarItem[] = [
	{ label: "Overview", value: "overview", icon: "dashboard" },
	{ label: "Components", value: "components", icon: "code" },
	{ label: "Docs", value: "docs", icon: "info" },
];

export default function ShowcasePage() {
	const theme = useTheme();
	const [activeTab, setActiveTab] = useState<string>(tabItems[0]?.value ?? "overview");
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [audioPlaying, setAudioPlaying] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [toastVisible, setToastVisible] = useState(true);

	const cards = [
		{
			title: "Interactive primitives",
			subtitle: "Buttons, inputs, and toggles share the same universal theme tokens.",
			preview: (
				<Stack spacing="md">
					<Stack direction="row" spacing="sm" useFlexGap style={{ flexWrap: "wrap" }}>
						<Button
							variant="solid"
							color="primary"
							startDecorator={<Icon name="play_arrow" size={18} color={theme.colors.onPrimary} />}
						>
							Primary
						</Button>
						<Button variant="soft" color="neutral">
							Secondary
						</Button>
						<Button variant="outlined" color="danger">
							Destructive
						</Button>
						<Button
							variant="plain"
							color="neutral"
							startDecorator={<Icon name="link" size={18} color={theme.colors.primary} />}
						>
							Docs
						</Button>
					</Stack>
					<Stack
						direction="row"
						spacing="md"
						useFlexGap
						style={{ flexWrap: "wrap", alignItems: "center" }}
					>
						<Input placeholder="Email address" style={{ flex: 1, minWidth: 240 }} />
						<Stack direction="row" spacing="sm" style={{ alignItems: "center" }}>
							<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
								Notifications
							</Typography>
							<Switch
								size="md"
								checked={notificationsEnabled}
								onValueChange={setNotificationsEnabled}
							/>
						</Stack>
					</Stack>
				</Stack>
			),
		},
		{
			title: "Navigation patterns",
			subtitle: "Dogfood TabBar + icon actions to frame app-level navigation.",
			preview: (
				<Stack spacing="md">
					<TabBar items={tabItems} activeValue={activeTab} onChange={setActiveTab} tone="primary" />
					<Stack direction="row" spacing="sm" style={{ justifyContent: "flex-end" }}>
						<IconButton iconName="search" variant="plain" aria-label="Search" />
						<IconButton iconName="notifications" variant="plain" aria-label="Notifications" />
						<IconButton iconName="settings" variant="plain" aria-label="Settings" />
					</Stack>
					<Box backgroundColor="surfaceContainerLow" borderRadius="lg" padding="lg">
						<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
							Active tab:{" "}
							{activeTab === "overview"
								? "Overview"
								: activeTab === "components"
									? "Components"
									: "Docs"}
						</Typography>
					</Box>
				</Stack>
			),
		},
		{
			title: "Feedback & media",
			subtitle: "Toasts and audio controls share consistent motion + theming.",
			preview: (
				<Stack spacing="md">
					<AudioPlayer
						source="https://braingame.app/audio/focus.mp3"
						metadata={{ title: "Guided focus", subtitle: "11 min • Brain Game" }}
						progress={42}
						duration={240}
						isPlaying={audioPlaying}
						onPlayPause={() => setAudioPlaying((prev) => !prev)}
						onRateChange={setPlaybackRate}
						playbackRate={playbackRate}
					/>
					<Stack spacing="sm">
						{toastVisible ? (
							<Toast
								title="Success"
								message="Theme synced across apps."
								tone="success"
								icon="check_circle"
								onDismiss={() => setToastVisible(false)}
							/>
						) : (
							<Button variant="soft" color="neutral" onClick={() => setToastVisible(true)}>
								Show toast again
							</Button>
						)}
					</Stack>
				</Stack>
			),
		},
	];

	return (
		<Box backgroundColor="background">
			<Container maxWidth="xl" style={{ paddingVertical: theme.spacing.xl3 }}>
				<Stack spacing="xl3">
					<Stack spacing="sm">
						<Typography level="h2">Component Showcase</Typography>
						<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
							Every example below renders the same universal components you import from
							<Typography level="body-lg" component="span">
								{" "}
								@braingame/bgui
							</Typography>
							—no forks, no theme drift.
						</Typography>
					</Stack>

					<Stack spacing="lg">
						{cards.map((card) => (
							<Card key={card.title} variant="outlined" color="neutral">
								<CardHeader title={card.title} subtitle={card.subtitle} />
								<CardContent>{card.preview}</CardContent>
							</Card>
						))}
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}

import { memo, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Slider } from "../../primitives/Slider";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { IconButton } from "../IconButton";
import type { AudioPlayerProps } from "./AudioPlayer.types";

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		width: "100%",
	},
	thumbnail: {
		width: 64,
		height: 64,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "rgba(0,0,0,0.08)",
	},
	metadata: {
		flex: 1,
	},
	controlsRow: {
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	timeRow: {
		alignItems: "center",
		justifyContent: "space-between",
	},
	progressContainer: {
		flex: 1,
	},
	rateButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 9999,
	},
});

const formatTime = (value: number | undefined) => {
	if (value == null || Number.isNaN(value)) return "0:00";
	const totalSeconds = Math.max(0, Math.floor(value));
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const AudioPlayer = memo(function AudioPlayer({
	source,
	progress = 0,
	duration = 0,
	buffered,
	isPlaying = false,
	onPlayPause,
	onSeek,
	onSkipForward,
	onSkipBackward,
	onRateChange,
	availableRates = [1, 1.25, 1.5, 2],
	playbackRate,
	metadata,
	disableControls = false,
	style,
	testID,
}: AudioPlayerProps) {
	const theme = useTheme();

	const orderedRates = useMemo(
		() => (availableRates.length ? availableRates : [1]),
		[availableRates],
	);
	const currentRate = useMemo(() => {
		if (playbackRate && orderedRates.includes(playbackRate)) {
			return playbackRate;
		}
		return orderedRates[0];
	}, [orderedRates, playbackRate]);

	const handleRatePress = () => {
		if (!onRateChange || disableControls) return;
		const currentIndex = orderedRates.indexOf(currentRate);
		const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % orderedRates.length : 0;
		onRateChange(orderedRates[nextIndex]);
	};

	return (
		<Box
			style={StyleSheet.flatten([
				styles.container,
				{
					backgroundColor: theme.colors.surfaceContainer,
					padding: theme.spacing.lg,
					borderColor: theme.colors.outlineVariant,
					borderWidth: StyleSheet.hairlineWidth,
					gap: theme.spacing.md,
				},
				style,
			])}
			testID={testID}
		>
			<Stack direction="row" spacing="md" style={{ alignItems: "center" }}>
				{metadata?.thumbnail ? <Box style={styles.thumbnail}>{metadata.thumbnail}</Box> : null}
				<Stack spacing="xs" style={styles.metadata}>
					{metadata?.title ? (
						<Typography level="title-sm" numberOfLines={1}>
							{metadata.title}
						</Typography>
					) : null}
					{metadata?.subtitle ? (
						<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant} numberOfLines={1}>
							{metadata.subtitle}
						</Typography>
					) : null}
					<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant} numberOfLines={1}>
						{source}
					</Typography>
				</Stack>
			</Stack>

			<Stack direction="row" style={styles.controlsRow}>
				<IconButton
					iconName="skip_previous"
					variant="plain"
					size="md"
					aria-label="Skip backward"
					onClick={onSkipBackward}
					disabled={disableControls}
				/>
				<IconButton
					iconName={isPlaying ? "pause" : "play_arrow"}
					variant="solid"
					size="lg"
					aria-label={isPlaying ? "Pause" : "Play"}
					onClick={onPlayPause}
					disabled={disableControls}
				/>
				<IconButton
					iconName="skip_next"
					variant="plain"
					size="md"
					aria-label="Skip forward"
					onClick={onSkipForward}
					disabled={disableControls}
				/>
				{onRateChange ? (
					<Pressable
						onPress={handleRatePress}
						disabled={disableControls}
						accessibilityRole="button"
						accessibilityLabel="Change playback rate"
						style={StyleSheet.flatten([
							styles.rateButton,
							{
								backgroundColor: theme.colors.surfaceVariant,
								borderRadius: theme.radii.md,
							},
						])}
					>
						<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
							{`${currentRate}x`}
						</Typography>
					</Pressable>
				) : null}
			</Stack>

			<Stack spacing="xs">
				<Box style={styles.progressContainer}>
					<Slider
						value={progress}
						minimumValue={0}
						maximumValue={duration > 0 ? duration : 1}
						onValueChange={onSeek}
						disabled={disableControls || !onSeek}
					/>
				</Box>
				<Stack direction="row" spacing="sm" style={styles.timeRow}>
					<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
						{formatTime(progress)}
					</Typography>
					{buffered !== undefined ? (
						<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
							{`Buffered ${formatTime(buffered)}`}
						</Typography>
					) : null}
					<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
						{formatTime(duration)}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
});

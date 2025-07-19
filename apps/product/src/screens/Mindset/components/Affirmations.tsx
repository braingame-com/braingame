import { Typography, useMountedState } from "@braingame/bgui";

// Audio playback uses expo-av. Ensure the dependency is installed in the Expo project
// import { Audio, type AVPlaybackStatus } from "expo-av";
type AVPlaybackStatus = {
	isLoaded: boolean;
	isPlaying?: boolean;
	didJustFinish?: boolean;
	positionMillis?: number;
	durationMillis?: number;
};
type AudioSound = {
	loadAsync: (source: { uri: string }) => Promise<void>;
	playAsync: () => Promise<void>;
	pauseAsync: () => Promise<void>;
	unloadAsync: () => Promise<void>;
	setOnPlaybackStatusUpdate: (callback: (status: AVPlaybackStatus) => void) => void;
	getStatusAsync: () => Promise<AVPlaybackStatus>;
};
const Audio = {
	Sound: {
		createAsync: () =>
			Promise.resolve({
				sound: {
					loadAsync: async (_source: { uri: string }) => {},
					unloadAsync: async () => {},
					playAsync: async () => {},
					pauseAsync: async () => {},
					setOnPlaybackStatusUpdate: (_callback: (status: AVPlaybackStatus) => void) => {},
					getStatusAsync: async () => ({ isLoaded: true, isPlaying: false }) as AVPlaybackStatus,
				} as AudioSound,
			}),
	},
};

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
	AFFIRMATIONS_ATTRIBUTION,
	PERSONAL_AFFIRMATIONS,
	PERSONAL_SIGNATURE,
	SAM_OVENS_AFFIRMATIONS,
} from "../constants/affirmations";
import { mindsetStyles } from "../styles";

interface AffirmationsProps {
	onComplete: () => void;
	completed: boolean;
}

/**
 * Affirmations Component
 * Sam Ovens success affirmations with audio/text toggle
 * Ported from dev-dil React to React Native with Expo Audio
 */
export const Affirmations: React.FC<AffirmationsProps> = ({ onComplete, completed }) => {
	const [showAudio, setShowAudio] = useState(true);
	const [sound, setSound] = useState<AudioSound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const isMounted = useMountedState();

	/**
	 * Load the affirmations audio file
	 */
	const loadAudio = useCallback(async () => {
		try {
			if (isMounted()) {
				setIsLoading(true);
			}
			const { sound: audioSound } = await Audio.Sound.createAsync();

			if (!isMounted()) return;

			setSound(audioSound);

			// Set up playback status listener
			if (!audioSound || !audioSound.setOnPlaybackStatusUpdate) {
				throw new Error("Audio playback listener API not available - check expo-av setup");
			}

			audioSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
				if (!isMounted()) return;
				if (status.isLoaded) {
					setIsPlaying(status.isPlaying || false);

					// Mark as complete when audio finishes
					if (status.didJustFinish) {
						onComplete();
					}
				}
			});
		} catch (error) {
			console.error("Error loading audio:", error);
		} finally {
			if (isMounted()) {
				setIsLoading(false);
			}
		}
	}, [onComplete, isMounted]);

	/**
	 * Load audio file on component mount
	 */
	useEffect(() => {
		loadAudio();

		// Cleanup on unmount
		return () => {
			if (sound) {
				sound.unloadAsync();
			}
		};
	}, [loadAudio, sound]);

	/**
	 * Toggle audio playback
	 */
	const togglePlayback = async () => {
		if (!sound) return;

		try {
			// Validate audio API availability
			if (!sound.getStatusAsync) {
				throw new Error("Audio status API not available - check expo-av setup");
			}

			const status = await sound.getStatusAsync();
			if (!status || !status.isLoaded) {
				console.error("Audio not loaded properly");
				return;
			}

			if (status.isPlaying) {
				await sound.pauseAsync();
			} else {
				await sound.playAsync();
			}
		} catch (error) {
			console.error("Error toggling playback:", error);
		}
	};

	/**
	 * Handle mode toggle (Audio/Text)
	 */
	const handleModeToggle = (mode: boolean) => {
		setShowAudio(mode);

		// If switching to text mode and audio is playing, pause it
		if (!mode && isPlaying) {
			togglePlayback();
		}
	};

	/**
	 * Mark affirmations as complete (for text mode)
	 */
	const handleTextComplete = () => {
		onComplete();
	};

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Typography level="title" style={mindsetStyles.cardTitle}>
					🎯 Affirmations
				</Typography>
				<View
					style={[
						mindsetStyles.statusBadge,
						completed ? mindsetStyles.statusCompleted : mindsetStyles.statusPending,
					]}
				>
					<Typography style={mindsetStyles.statusText}>{completed ? "✓ Done" : "To do"}</Typography>
				</View>
			</View>

			<Typography style={mindsetStyles.cardDescription}>
				Sam Ovens success affirmations for mindset programming and personal excellence
			</Typography>

			{/* Audio/Text Toggle Buttons */}
			<View
				style={{
					flexDirection: "row",
					marginBottom: 24,
					backgroundColor: "#303040",
					borderRadius: 8,
					padding: 4,
				}}
			>
				{[
					{ label: "Audio", value: true },
					{ label: "Text", value: false },
				].map((option) => (
					<TouchableOpacity
						key={option.label}
						onPress={() => handleModeToggle(option.value)}
						style={{
							flex: 1,
							paddingVertical: 12,
							paddingHorizontal: 16,
							borderRadius: 6,
							alignItems: "center",
							backgroundColor: showAudio === option.value ? "#007fff" : "transparent",
						}}
					>
						<Typography
							style={{
								color: "#fff",
								fontWeight: "600",
								fontFamily: "Lexend",
							}}
						>
							{option.label}
						</Typography>
					</TouchableOpacity>
				))}
			</View>

			{/* Audio Mode */}
			{showAudio ? (
				<View style={{ alignItems: "center" }}>
					{isLoading ? (
						<Typography style={{ color: "#aaa", marginBottom: 20 }}>Loading audio...</Typography>
					) : (
						<>
							<TouchableOpacity
								onPress={togglePlayback}
								style={[
									mindsetStyles.button,
									{ marginBottom: 20, backgroundColor: isPlaying ? "#ff6d00" : "#00a550" },
								]}
								disabled={!sound}
							>
								<Typography style={mindsetStyles.buttonText}>
									{isPlaying ? "⏸️ Pause" : "▶️ Play Affirmations"}
								</Typography>
							</TouchableOpacity>

							<Typography
								style={{
									color: "#aaa",
									fontSize: 14,
									textAlign: "center",
									fontFamily: "Lexend",
									fontWeight: "400",
								}}
							>
								Listen to the complete Sam Ovens affirmations with background music
							</Typography>
						</>
					)}
				</View>
			) : (
				/* Text Mode */
				<ScrollView showsVerticalScrollIndicator={false}>
					{/* Sam Ovens Affirmations */}
					<View style={{ marginBottom: 32 }}>
						<Typography
							style={{
								fontSize: 48,
								color: "#aaa",
								textAlign: "left",
								lineHeight: 48,
								marginBottom: 16,
							}}
						>
							"
						</Typography>

						<Typography
							style={{
								fontSize: 16,
								color: "#fff",
								lineHeight: 24,
								fontFamily: "Lexend",
								fontWeight: "400",
								marginBottom: 16,
							}}
						>
							{SAM_OVENS_AFFIRMATIONS}
						</Typography>

						<Typography
							style={{
								fontSize: 48,
								color: "#aaa",
								textAlign: "right",
								lineHeight: 48,
								marginBottom: 8,
							}}
						>
							"
						</Typography>

						<Typography
							style={{
								fontSize: 14,
								color: "#aaa",
								textAlign: "right",
								fontFamily: "Lexend",
								fontWeight: "400",
								marginBottom: 32,
							}}
						>
							{AFFIRMATIONS_ATTRIBUTION}
						</Typography>
					</View>

					{/* Personal Affirmations */}
					<View style={mindsetStyles.divider} />

					<View style={{ marginTop: 32, marginBottom: 32 }}>
						<Typography
							style={{
								fontSize: 18,
								color: "#fff",
								fontWeight: "600",
								fontFamily: "Lexend",
								marginBottom: 16,
							}}
						>
							Personal Affirmations
						</Typography>

						<Typography
							style={{
								fontSize: 16,
								color: "#fff",
								lineHeight: 24,
								fontFamily: "Lexend",
								fontWeight: "400",
								marginBottom: 24,
							}}
						>
							{PERSONAL_AFFIRMATIONS}
						</Typography>

						<Typography
							style={{
								fontSize: 14,
								color: "#aaa",
								textAlign: "right",
								fontFamily: "Lexend",
								fontWeight: "400",
								fontStyle: "italic",
							}}
						>
							{PERSONAL_SIGNATURE}
						</Typography>
					</View>

					{/* Mark Complete Button */}
					<TouchableOpacity
						onPress={handleTextComplete}
						style={[mindsetStyles.button, { backgroundColor: "#00a550" }]}
					>
						<Typography style={mindsetStyles.buttonText}>✓ Mark Complete</Typography>
					</TouchableOpacity>
				</ScrollView>
			)}
		</View>
	);
};

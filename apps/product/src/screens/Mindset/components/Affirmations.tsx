import { Text } from "@braingame/bgui";

// TODO: Install expo-av
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

	/**
	 * Load the affirmations audio file
	 */
	const loadAudio = useCallback(async () => {
		try {
			setIsLoading(true);
			const { sound: audioSound } = await Audio.Sound.createAsync();
			setSound(audioSound);

			// Set up playback status listener
			audioSound?.setOnPlaybackStatusUpdate?.((status: AVPlaybackStatus) => {
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
			setIsLoading(false);
		}
	}, [onComplete]);

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
			// @ts-expect-error - getStatusAsync not in stub AudioSound type
			const status = (await sound.getStatusAsync?.()) || { isLoaded: false };
			if (status.isLoaded) {
				if (status.isPlaying) {
					await sound.pauseAsync();
				} else {
					await sound.playAsync();
				}
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
				<Text variant="title" style={mindsetStyles.cardTitle}>
					🎯 Affirmations
				</Text>
				<View
					style={[
						mindsetStyles.statusBadge,
						completed ? mindsetStyles.statusCompleted : mindsetStyles.statusPending,
					]}
				>
					<Text style={mindsetStyles.statusText}>{completed ? "✓ Done" : "To do"}</Text>
				</View>
			</View>

			<Text style={mindsetStyles.cardDescription}>
				Sam Ovens success affirmations for mindset programming and personal excellence
			</Text>

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
						<Text
							style={{
								color: "#fff",
								fontWeight: "600",
								fontFamily: "LexendSemiBold",
							}}
						>
							{option.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Audio Mode */}
			{showAudio ? (
				<View style={{ alignItems: "center" }}>
					{isLoading ? (
						<Text style={{ color: "#aaa", marginBottom: 20 }}>Loading audio...</Text>
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
								<Text style={mindsetStyles.buttonText}>
									{isPlaying ? "⏸️ Pause" : "▶️ Play Affirmations"}
								</Text>
							</TouchableOpacity>

							<Text
								style={{
									color: "#aaa",
									fontSize: 14,
									textAlign: "center",
									fontFamily: "LexendRegular",
								}}
							>
								Listen to the complete Sam Ovens affirmations with background music
							</Text>
						</>
					)}
				</View>
			) : (
				/* Text Mode */
				<ScrollView showsVerticalScrollIndicator={false}>
					{/* Sam Ovens Affirmations */}
					<View style={{ marginBottom: 32 }}>
						<Text
							style={{
								fontSize: 48,
								color: "#aaa",
								textAlign: "left",
								lineHeight: 48,
								marginBottom: 16,
							}}
						>
							"
						</Text>

						<Text
							style={{
								fontSize: 16,
								color: "#fff",
								lineHeight: 24,
								fontFamily: "LexendRegular",
								marginBottom: 16,
							}}
						>
							{SAM_OVENS_AFFIRMATIONS}
						</Text>

						<Text
							style={{
								fontSize: 48,
								color: "#aaa",
								textAlign: "right",
								lineHeight: 48,
								marginBottom: 8,
							}}
						>
							"
						</Text>

						<Text
							style={{
								fontSize: 14,
								color: "#aaa",
								textAlign: "right",
								fontFamily: "LexendRegular",
								marginBottom: 32,
							}}
						>
							{AFFIRMATIONS_ATTRIBUTION}
						</Text>
					</View>

					{/* Personal Affirmations */}
					<View style={mindsetStyles.divider} />

					<View style={{ marginTop: 32, marginBottom: 32 }}>
						<Text
							style={{
								fontSize: 18,
								color: "#fff",
								fontWeight: "600",
								fontFamily: "LexendSemiBold",
								marginBottom: 16,
							}}
						>
							Personal Affirmations
						</Text>

						<Text
							style={{
								fontSize: 16,
								color: "#fff",
								lineHeight: 24,
								fontFamily: "LexendRegular",
								marginBottom: 24,
							}}
						>
							{PERSONAL_AFFIRMATIONS}
						</Text>

						<Text
							style={{
								fontSize: 14,
								color: "#aaa",
								textAlign: "right",
								fontFamily: "LexendRegular",
								fontStyle: "italic",
							}}
						>
							{PERSONAL_SIGNATURE}
						</Text>
					</View>

					{/* Mark Complete Button */}
					<TouchableOpacity
						onPress={handleTextComplete}
						style={[mindsetStyles.button, { backgroundColor: "#00a550" }]}
					>
						<Text style={mindsetStyles.buttonText}>✓ Mark Complete</Text>
					</TouchableOpacity>
				</ScrollView>
			)}
		</View>
	);
};

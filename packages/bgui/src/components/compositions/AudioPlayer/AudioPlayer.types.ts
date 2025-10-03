import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface AudioPlayerMetadata {
	title?: string;
	subtitle?: string;
	thumbnail?: ReactNode;
}

export interface AudioPlayerProps {
	source: string;
	progress?: number;
	duration?: number;
	buffered?: number;
	isPlaying?: boolean;
	onPlayPause?: () => void;
	onSeek?: (value: number) => void;
	onSkipForward?: () => void;
	onSkipBackward?: () => void;
	onRateChange?: (rate: number) => void;
	availableRates?: number[];
	playbackRate?: number;
	metadata?: AudioPlayerMetadata;
	disableControls?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}

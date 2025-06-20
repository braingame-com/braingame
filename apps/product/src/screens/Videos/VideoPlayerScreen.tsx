import React, { useState, useEffect } from 'react';
import { 
	View, 
	SafeAreaView, 
	ScrollView, 
	TouchableOpacity, 
	Alert,
	Share,
	Dimensions
} from 'react-native';
import { Text } from '@braingame/bgui';
import { useRoute, useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { youtubeService, type YouTubeVideo } from '../../services/YouTubeService';
import { videoPlayerStyles } from './videoPlayerStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoPlayerRouteParams {
	videoId: string;
	video?: YouTubeVideo;
}

/**
 * Video Player Screen
 * Full-screen YouTube video player with controls and metadata
 * Advanced media playback with responsive design
 * Ported from bg1 React to React Native with enhancements
 */
export const VideoPlayerScreen: React.FC = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { videoId, video: initialVideo } = route.params as VideoPlayerRouteParams;

	const [playing, setPlaying] = useState(false);
	const [video, setVideo] = useState<YouTubeVideo | null>(initialVideo || null);
	const [loading, setLoading] = useState(!initialVideo);
	const [fullscreen, setFullscreen] = useState(false);

	/**
	 * Load video details if not provided
	 */
	useEffect(() => {
		if (!video && videoId) {
			loadVideoDetails();
		}
	}, [videoId, video]);

	const loadVideoDetails = async () => {
		try {
			setLoading(true);
			// For now, create a minimal video object
			// In a real app, you'd fetch full details from YouTube API
			const videoDetails: YouTubeVideo = {
				id: videoId,
				title: 'Loading...',
				description: '',
				thumbnails: {
					default: { url: '', width: 120, height: 90 },
					medium: { url: '', width: 320, height: 180 },
					high: { url: '', width: 480, height: 360 },
				},
				duration: '0:00',
				publishedAt: new Date().toISOString(),
				channelTitle: 'BrainGame',
			};
			setVideo(videoDetails);
		} catch (error) {
			console.error('Error loading video details:', error);
			Alert.alert('Error', 'Failed to load video details');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Handle player state changes
	 */
	const onStateChange = (state: string) => {
		console.log('Player state changed:', state);
		if (state === 'ended') {
			setPlaying(false);
		}
	};

	/**
	 * Handle player ready
	 */
	const onReady = () => {
		console.log('Player ready for action');
	};

	/**
	 * Toggle play/pause
	 */
	const togglePlayback = () => {
		setPlaying(!playing);
	};

	/**
	 * Handle share video
	 */
	const handleShare = async () => {
		if (!video) return;

		try {
			const videoUrl = youtubeService.getVideoUrl(video.id);
			await Share.share({
				message: `Check out this video: ${video.title}\n${videoUrl}`,
				url: videoUrl,
				title: video.title,
			});
		} catch (error) {
			console.error('Error sharing video:', error);
			Alert.alert('Error', 'Failed to share video');
		}
	};

	/**
	 * Handle download (placeholder)
	 */
	const handleDownload = () => {
		Alert.alert('Download', 'Download feature coming soon!');
	};

	/**
	 * Handle back navigation
	 */
	const handleBack = () => {
		navigation.goBack();
	};

	/**
	 * Toggle fullscreen mode
	 */
	const toggleFullscreen = () => {
		setFullscreen(!fullscreen);
	};

	if (loading || !video) {
		return (
			<SafeAreaView style={videoPlayerStyles.container}>
				<View style={videoPlayerStyles.loadingContainer}>
					<Text style={videoPlayerStyles.loadingText}>Loading video...</Text>
				</View>
			</SafeAreaView>
		);
	}

	const playerHeight = fullscreen ? screenHeight : (screenWidth * 9) / 16;

	return (
		<SafeAreaView style={[
			videoPlayerStyles.container,
			fullscreen && videoPlayerStyles.fullscreenContainer
		]}>
			{/* Back Button (only in portrait) */}
			{!fullscreen && (
				<View style={videoPlayerStyles.header}>
					<TouchableOpacity onPress={handleBack} style={videoPlayerStyles.backButton}>
						<Text style={videoPlayerStyles.backButtonText}>←</Text>
					</TouchableOpacity>
					<Text style={videoPlayerStyles.headerTitle} numberOfLines={1}>
						{video.title}
					</Text>
				</View>
			)}

			{/* Video Player */}
			<View style={[
				videoPlayerStyles.playerContainer,
				{ height: playerHeight }
			]}>
				<YoutubePlayer
					height={playerHeight}
					width={screenWidth}
					play={playing}
					videoId={videoId}
					onChangeState={onStateChange}
					onReady={onReady}
					webViewStyle={{
						backgroundColor: '#000',
					}}
				/>

				{/* Player Controls Overlay */}
				<View style={videoPlayerStyles.controlsOverlay}>
					<TouchableOpacity
						onPress={togglePlayback}
						style={videoPlayerStyles.playButton}
					>
						<Text style={videoPlayerStyles.playButtonText}>
							{playing ? '⏸' : '▶'}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={toggleFullscreen}
						style={videoPlayerStyles.fullscreenButton}
					>
						<Text style={videoPlayerStyles.fullscreenButtonText}>
							{fullscreen ? '🗗' : '⛶'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Video Info (only in portrait) */}
			{!fullscreen && (
				<ScrollView style={videoPlayerStyles.infoContainer}>
					{/* Video Title */}
					<Text style={videoPlayerStyles.videoTitle}>
						{video.title}
					</Text>

					{/* Video Metadata */}
					<View style={videoPlayerStyles.metadataContainer}>
						<Text style={videoPlayerStyles.channelName}>
							{video.channelTitle}
						</Text>
						<Text style={videoPlayerStyles.separator}>•</Text>
						<Text style={videoPlayerStyles.duration}>
							{video.duration}
						</Text>
						<Text style={videoPlayerStyles.separator}>•</Text>
						<Text style={videoPlayerStyles.uploadTime}>
							{youtubeService.formatRelativeTime(video.publishedAt)}
						</Text>
					</View>

					{/* Action Buttons */}
					<View style={videoPlayerStyles.actionsContainer}>
						<TouchableOpacity
							onPress={handleShare}
							style={videoPlayerStyles.actionButton}
						>
							<Text style={videoPlayerStyles.actionIcon}>🔗</Text>
							<Text style={videoPlayerStyles.actionText}>Share</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleDownload}
							style={videoPlayerStyles.actionButton}
						>
							<Text style={videoPlayerStyles.actionIcon}>📥</Text>
							<Text style={videoPlayerStyles.actionText}>Download</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => Alert.alert('Save', 'Video saved to your library!')}
							style={videoPlayerStyles.actionButton}
						>
							<Text style={videoPlayerStyles.actionIcon}>💾</Text>
							<Text style={videoPlayerStyles.actionText}>Save</Text>
						</TouchableOpacity>
					</View>

					{/* Video Description */}
					{video.description && (
						<View style={videoPlayerStyles.descriptionContainer}>
							<Text style={videoPlayerStyles.descriptionTitle}>
								Description
							</Text>
							<Text style={videoPlayerStyles.descriptionText}>
								{video.description || 'No description available.'}
							</Text>
						</View>
					)}
				</ScrollView>
			)}
		</SafeAreaView>
	);
};
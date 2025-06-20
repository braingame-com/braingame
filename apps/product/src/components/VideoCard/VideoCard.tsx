import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Pressable, Alert, Share } from 'react-native';
import { Text } from '@braingame/bgui';
import { useNavigation } from '@react-navigation/native';
import type { YouTubeVideo } from '../../services/YouTubeService';
import { youtubeService } from '../../services/YouTubeService';
import { videoCardStyles } from './styles';

interface VideoCardProps {
	video: YouTubeVideo;
	onPress?: (video: YouTubeVideo) => void;
}

/**
 * Video Card Component
 * Displays YouTube video with thumbnail, title, duration, and actions
 * Advanced media card with responsive design
 * Ported from bg1 React to React Native with enhancements
 */
export const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
	const navigation = useNavigation();
	const [menuVisible, setMenuVisible] = useState(false);

	/**
	 * Handle video card press
	 */
	const handlePress = () => {
		if (onPress) {
			onPress(video);
		} else {
			// Navigate to video player screen
			(navigation as any).navigate('VideoPlayer', { videoId: video.id });
		}
	};

	/**
	 * Handle share video
	 */
	const handleShare = async () => {
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
		setMenuVisible(false);
	};

	/**
	 * Handle save video (placeholder)
	 */
	const handleSave = () => {
		Alert.alert('Save Video', 'Video saved to your library!');
		setMenuVisible(false);
	};

	/**
	 * Handle not interested
	 */
	const handleNotInterested = () => {
		Alert.alert('Not Interested', 'We won\'t recommend similar videos');
		setMenuVisible(false);
	};

	/**
	 * Toggle menu visibility
	 */
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const thumbnailUrl = youtubeService.getVideoThumbnail(video, 'high');
	const relativeTime = youtubeService.formatRelativeTime(video.publishedAt);

	return (
		<View style={videoCardStyles.container}>
			{/* Video Thumbnail */}
			<Pressable onPress={handlePress} style={videoCardStyles.thumbnailContainer}>
				<Image
					source={{ uri: thumbnailUrl }}
					style={videoCardStyles.thumbnail}
					resizeMode="cover"
				/>
				
				{/* Duration Badge */}
				<View style={videoCardStyles.durationBadge}>
					<Text style={videoCardStyles.durationText}>
						{video.duration}
					</Text>
				</View>

				{/* Play Button Overlay */}
				<View style={videoCardStyles.playOverlay}>
					<View style={videoCardStyles.playButton}>
						<Text style={videoCardStyles.playIcon}>▶</Text>
					</View>
				</View>
			</Pressable>

			{/* Video Info */}
			<View style={videoCardStyles.infoContainer}>
				<TouchableOpacity onPress={handlePress} style={videoCardStyles.titleContainer}>
					<Text 
						style={videoCardStyles.title}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{video.title}
					</Text>
				</TouchableOpacity>

				{/* Video Metadata */}
				<View style={videoCardStyles.metadataContainer}>
					<Text style={videoCardStyles.channelName}>
						{video.channelTitle}
					</Text>
					<Text style={videoCardStyles.separator}>•</Text>
					<Text style={videoCardStyles.uploadTime}>
						{relativeTime}
					</Text>
				</View>

				{/* Action Menu Button */}
				<TouchableOpacity
					onPress={toggleMenu}
					style={videoCardStyles.menuButton}
				>
					<Text style={videoCardStyles.menuIcon}>⋮</Text>
				</TouchableOpacity>
			</View>

			{/* Dropdown Menu */}
			{menuVisible && (
				<View style={videoCardStyles.dropdownMenu}>
					<TouchableOpacity
						onPress={handleSave}
						style={videoCardStyles.menuItem}
					>
						<Text style={videoCardStyles.menuItemIcon}>📥</Text>
						<Text style={videoCardStyles.menuItemText}>Save</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={handleShare}
						style={videoCardStyles.menuItem}
					>
						<Text style={videoCardStyles.menuItemIcon}>🔗</Text>
						<Text style={videoCardStyles.menuItemText}>Share</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={handleNotInterested}
						style={[videoCardStyles.menuItem, videoCardStyles.menuItemLast]}
					>
						<Text style={videoCardStyles.menuItemIcon}>🚫</Text>
						<Text style={videoCardStyles.menuItemText}>Not interested</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};
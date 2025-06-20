import React, { useState, useEffect, useCallback } from 'react';
import { 
	View, 
	FlatList, 
	RefreshControl, 
	SafeAreaView, 
	ActivityIndicator,
	Alert,
	TextInput,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import { Text } from '@braingame/bgui';
import { VideoCard } from '../../components/VideoCard';
import { youtubeService, type YouTubeVideo } from '../../services/YouTubeService';
import { videosScreenStyles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Videos Screen
 * Advanced YouTube video browsing with search, grid layout, and infinite scroll
 * Responsive design: 1 column mobile, 2-3 columns tablet/desktop
 * Ported from bg1 React to React Native with enhancements
 */
export const VideosScreen: React.FC = () => {
	const [videos, setVideos] = useState<YouTubeVideo[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchMode, setSearchMode] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Calculate number of columns based on screen width
	 */
	const getNumColumns = () => {
		if (screenWidth > 768) return 3; // Desktop/large tablet
		if (screenWidth > 480) return 2; // Small tablet
		return 1; // Mobile
	};

	const [numColumns, setNumColumns] = useState(getNumColumns());

	/**
	 * Load initial videos from playlist
	 */
	const loadVideos = useCallback(async () => {
		try {
			setError(null);
			const fetchedVideos = await youtubeService.fetchPlaylistVideos();
			setVideos(fetchedVideos);
		} catch (err) {
			console.error('Error loading videos:', err);
			setError('Failed to load videos. Please check your internet connection.');
			Alert.alert('Error', 'Failed to load videos. Please try again.');
		} finally {
			setLoading(false);
		}
	}, []);

	/**
	 * Search videos
	 */
	const searchVideos = useCallback(async (query: string) => {
		if (!query.trim()) {
			setSearchMode(false);
			loadVideos();
			return;
		}

		try {
			setLoading(true);
			setError(null);
			const searchResults = await youtubeService.searchVideos(query);
			setVideos(searchResults);
			setSearchMode(true);
		} catch (err) {
			console.error('Error searching videos:', err);
			setError('Failed to search videos. Please try again.');
			Alert.alert('Error', 'Failed to search videos. Please try again.');
		} finally {
			setLoading(false);
		}
	}, [loadVideos]);

	/**
	 * Handle refresh
	 */
	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		if (searchMode && searchQuery) {
			await searchVideos(searchQuery);
		} else {
			await loadVideos();
		}
		setRefreshing(false);
	}, [searchMode, searchQuery, searchVideos, loadVideos]);

	/**
	 * Handle search input
	 */
	const handleSearchSubmit = () => {
		searchVideos(searchQuery);
	};

	/**
	 * Clear search and return to playlist
	 */
	const clearSearch = () => {
		setSearchQuery('');
		setSearchMode(false);
		loadVideos();
	};

	/**
	 * Render video item for FlatList
	 */
	const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
		<View style={[
			videosScreenStyles.videoItem,
			{ width: numColumns === 1 ? '100%' : `${100 / numColumns - 2}%` }
		]}>
			<VideoCard video={item} />
		</View>
	);

	/**
	 * Render empty state
	 */
	const renderEmptyState = () => (
		<View style={videosScreenStyles.emptyState}>
			<Text style={videosScreenStyles.emptyStateTitle}>
				{searchMode ? 'No search results' : 'No videos found'}
			</Text>
			<Text style={videosScreenStyles.emptyStateText}>
				{searchMode 
					? `No videos found for "${searchQuery}". Try a different search term.`
					: 'Unable to load videos. Please check your internet connection.'
				}
			</Text>
			{searchMode && (
				<TouchableOpacity 
					onPress={clearSearch}
					style={videosScreenStyles.clearSearchButton}
				>
					<Text style={videosScreenStyles.clearSearchText}>
						Back to playlist
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);

	/**
	 * Render loading state
	 */
	const renderLoadingState = () => (
		<View style={videosScreenStyles.loadingState}>
			<ActivityIndicator size="large" color="#007fff" />
			<Text style={videosScreenStyles.loadingText}>
				{searchMode ? 'Searching videos...' : 'Loading videos...'}
			</Text>
		</View>
	);

	/**
	 * Handle screen orientation changes
	 */
	useEffect(() => {
		const handleOrientationChange = () => {
			const newNumColumns = getNumColumns();
			if (newNumColumns !== numColumns) {
				setNumColumns(newNumColumns);
			}
		};

		const subscription = Dimensions.addEventListener('change', handleOrientationChange);
		return () => subscription?.remove();
	}, [numColumns]);

	/**
	 * Load videos on component mount
	 */
	useEffect(() => {
		loadVideos();
	}, [loadVideos]);

	if (loading && videos.length === 0) {
		return (
			<SafeAreaView style={videosScreenStyles.container}>
				{renderLoadingState()}
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={videosScreenStyles.container}>
			{/* Header */}
			<View style={videosScreenStyles.header}>
				<Text style={videosScreenStyles.headerTitle}>
					🎥 Videos
				</Text>
				<Text style={videosScreenStyles.headerSubtitle}>
					{searchMode ? `Search results for "${searchQuery}"` : 'BrainGame video library'}
				</Text>
			</View>

			{/* Search Bar */}
			<View style={videosScreenStyles.searchContainer}>
				<View style={videosScreenStyles.searchInputContainer}>
					<TextInput
						style={videosScreenStyles.searchInput}
						placeholder="Search videos..."
						placeholderTextColor="#666"
						value={searchQuery}
						onChangeText={setSearchQuery}
						onSubmitEditing={handleSearchSubmit}
						returnKeyType="search"
					/>
					{searchQuery.length > 0 && (
						<TouchableOpacity
							onPress={() => setSearchQuery('')}
							style={videosScreenStyles.clearButton}
						>
							<Text style={videosScreenStyles.clearButtonText}>✕</Text>
						</TouchableOpacity>
					)}
				</View>
				<TouchableOpacity
					onPress={handleSearchSubmit}
					style={videosScreenStyles.searchButton}
				>
					<Text style={videosScreenStyles.searchButtonText}>🔍</Text>
				</TouchableOpacity>
			</View>

			{/* Results Count */}
			{videos.length > 0 && (
				<View style={videosScreenStyles.resultsContainer}>
					<Text style={videosScreenStyles.resultsText}>
						{videos.length} video{videos.length === 1 ? '' : 's'} found
					</Text>
					{searchMode && (
						<TouchableOpacity onPress={clearSearch}>
							<Text style={videosScreenStyles.backToPlaylistText}>
								← Back to playlist
							</Text>
						</TouchableOpacity>
					)}
				</View>
			)}

			{/* Videos Grid */}
			<FlatList
				data={videos}
				renderItem={renderVideoItem}
				keyExtractor={(item) => item.id}
				numColumns={numColumns}
				key={numColumns} // Force re-render on column change
				contentContainerStyle={videosScreenStyles.videosList}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						tintColor="#007fff"
						colors={['#007fff']}
					/>
				}
				ListEmptyComponent={renderEmptyState}
				columnWrapperStyle={numColumns > 1 ? videosScreenStyles.row : undefined}
			/>
		</SafeAreaView>
	);
};
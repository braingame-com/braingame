/**
 * YouTube Data API Service
 * Advanced video content management system
 * Ported from bg1 React to React Native with enhancements
 */

export interface YouTubeVideo {
	id: string;
	title: string;
	description: string;
	thumbnails: {
		default: { url: string; width: number; height: number };
		medium: { url: string; width: number; height: number };
		high: { url: string; width: number; height: number };
		standard?: { url: string; width: number; height: number };
	};
	duration: string;
	publishedAt: string;
	channelTitle: string;
}

export interface YouTubePlaylistResponse {
	items: Array<{
		contentDetails: {
			videoId: string;
		};
		snippet: {
			title: string;
			description: string;
			thumbnails: YouTubeVideo['thumbnails'];
			publishedAt: string;
			channelTitle: string;
		};
	}>;
	nextPageToken?: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
}

class YouTubeService {
	private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';
	private readonly apiKey = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyC_TgRe232Bx7xDQInCJfaNYnIHr9HvDJ8';
	
	// BrainGame YouTube channel playlist (from bg1)
	private readonly defaultPlaylistId = 'UUpulih4t4xgTrhh9vj4d7uw';

	/**
	 * Fetch videos from YouTube playlist
	 */
	async fetchPlaylistVideos(
		playlistId: string = this.defaultPlaylistId,
		maxResults: number = 50,
		pageToken?: string
	): Promise<YouTubeVideo[]> {
		try {
			const url = new URL(`${this.baseUrl}/playlistItems`);
			url.searchParams.append('part', 'snippet,contentDetails');
			url.searchParams.append('playlistId', playlistId);
			url.searchParams.append('maxResults', maxResults.toString());
			url.searchParams.append('key', this.apiKey);
			
			if (pageToken) {
				url.searchParams.append('pageToken', pageToken);
			}

			const response = await fetch(url.toString());
			
			if (!response.ok) {
				throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
			}

			const data: YouTubePlaylistResponse = await response.json();
			
			// Get video durations for each video (requires separate API call)
			const videoIds = data.items.map(item => item.contentDetails.videoId);
			const videosWithDuration = await this.fetchVideoDetails(videoIds);
			
			return data.items.map(item => {
				const videoDetail = videosWithDuration.find(v => v.id === item.contentDetails.videoId);
				
				return {
					id: item.contentDetails.videoId,
					title: item.snippet.title,
					description: item.snippet.description,
					thumbnails: item.snippet.thumbnails,
					duration: videoDetail?.duration || '0:00',
					publishedAt: item.snippet.publishedAt,
					channelTitle: item.snippet.channelTitle,
				};
			});
		} catch (error) {
			console.error('Error fetching YouTube playlist:', error);
			throw error;
		}
	}

	/**
	 * Fetch detailed video information including duration
	 */
	async fetchVideoDetails(videoIds: string[]): Promise<Array<{ id: string; duration: string }>> {
		try {
			const url = new URL(`${this.baseUrl}/videos`);
			url.searchParams.append('part', 'contentDetails');
			url.searchParams.append('id', videoIds.join(','));
			url.searchParams.append('key', this.apiKey);

			const response = await fetch(url.toString());
			
			if (!response.ok) {
				throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			
			return data.items.map((item: any) => ({
				id: item.id,
				duration: this.formatDuration(item.contentDetails.duration),
			}));
		} catch (error) {
			console.error('Error fetching video details:', error);
			return videoIds.map(id => ({ id, duration: '0:00' }));
		}
	}

	/**
	 * Search videos by query
	 */
	async searchVideos(
		query: string,
		maxResults: number = 25,
		pageToken?: string
	): Promise<YouTubeVideo[]> {
		try {
			const url = new URL(`${this.baseUrl}/search`);
			url.searchParams.append('part', 'snippet');
			url.searchParams.append('q', query);
			url.searchParams.append('type', 'video');
			url.searchParams.append('maxResults', maxResults.toString());
			url.searchParams.append('key', this.apiKey);
			
			if (pageToken) {
				url.searchParams.append('pageToken', pageToken);
			}

			const response = await fetch(url.toString());
			
			if (!response.ok) {
				throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			
			// Get video durations
			const videoIds = data.items.map((item: any) => item.id.videoId);
			const videosWithDuration = await this.fetchVideoDetails(videoIds);
			
			return data.items.map((item: any) => {
				const videoDetail = videosWithDuration.find(v => v.id === item.id.videoId);
				
				return {
					id: item.id.videoId,
					title: item.snippet.title,
					description: item.snippet.description,
					thumbnails: item.snippet.thumbnails,
					duration: videoDetail?.duration || '0:00',
					publishedAt: item.snippet.publishedAt,
					channelTitle: item.snippet.channelTitle,
				};
			});
		} catch (error) {
			console.error('Error searching YouTube videos:', error);
			throw error;
		}
	}

	/**
	 * Convert ISO 8601 duration to readable format
	 * e.g., "PT1M30S" -> "1:30"
	 */
	private formatDuration(isoDuration: string): string {
		const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
		if (!match) return '0:00';

		const hours = parseInt(match[1] || '0');
		const minutes = parseInt(match[2] || '0');
		const seconds = parseInt(match[3] || '0');

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		} else {
			return `${minutes}:${seconds.toString().padStart(2, '0')}`;
		}
	}

	/**
	 * Get video thumbnail URL with fallback
	 */
	getVideoThumbnail(video: YouTubeVideo, quality: 'default' | 'medium' | 'high' | 'standard' = 'high'): string {
		return video.thumbnails[quality]?.url || 
			   video.thumbnails.high?.url || 
			   video.thumbnails.medium?.url || 
			   video.thumbnails.default?.url ||
			   `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
	}

	/**
	 * Get video URL for sharing
	 */
	getVideoUrl(videoId: string): string {
		return `https://www.youtube.com/watch?v=${videoId}`;
	}

	/**
	 * Format relative time (e.g., "2 months ago")
	 */
	formatRelativeTime(publishedAt: string): string {
		const now = new Date();
		const published = new Date(publishedAt);
		const diffMs = now.getTime() - published.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		const diffMonths = Math.floor(diffDays / 30);
		const diffYears = Math.floor(diffDays / 365);

		if (diffDays < 1) return 'Today';
		if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
		if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
		return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
	}
}

export const youtubeService = new YouTubeService();
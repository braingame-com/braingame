/**
 * Analytics Service
 * Advanced data visualization and metrics tracking
 * Generates performance data for charts and dashboards
 * Ported from bg1 React to React Native with enhancements
 */

export interface DataPoint {
	value: number;
	date: Date;
}

export interface MetricCard {
	id: string;
	title: string;
	value: string | number;
	subtitle?: string;
	trend?: 'up' | 'down' | 'stable';
	trendValue?: string;
	color: string;
	icon: string;
}

export interface TaskMetrics {
	completed: number;
	total: number;
	categories: Array<{
		name: string;
		completed: number;
		total: number;
	}>;
}

export type TimeRange = '1W' | '1M' | '3M' | '1Y' | 'All';

class AnalyticsService {
	/**
	 * Generate sample performance data for charts
	 */
	generatePerformanceData(timeRange: TimeRange = '1M'): DataPoint[] {
		const now = new Date();
		const days = this.getTimeRangeDays(timeRange);
		const data: DataPoint[] = [];

		for (let i = days; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);
			
			// Generate realistic performance data with trends
			const baseValue = 75; // Base performance score
			const trend = Math.sin((days - i) / days * Math.PI * 2) * 10; // Cyclical trend
			const noise = (Math.random() - 0.5) * 8; // Random variation
			const value = Math.max(0, Math.min(100, baseValue + trend + noise));

			data.push({
				value: Math.round(value * 100) / 100,
				date,
			});
		}

		return data;
	}

	/**
	 * Generate mindset training data (from Week 2)
	 */
	generateMindsetData(timeRange: TimeRange = '1M'): DataPoint[] {
		const now = new Date();
		const days = this.getTimeRangeDays(timeRange);
		const data: DataPoint[] = [];

		for (let i = days; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);
			
			// Generate mindset completion percentage
			const baseCompletion = 60;
			const weeklyPattern = Math.sin((days - i) / 7 * Math.PI * 2) * 15;
			const growth = (days - i) / days * 20; // Gradual improvement
			const noise = (Math.random() - 0.5) * 5;
			const value = Math.max(0, Math.min(100, baseCompletion + weeklyPattern + growth + noise));

			data.push({
				value: Math.round(value * 100) / 100,
				date,
			});
		}

		return data;
	}

	/**
	 * Generate video engagement data
	 */
	generateVideoData(timeRange: TimeRange = '1M'): DataPoint[] {
		const now = new Date();
		const days = this.getTimeRangeDays(timeRange);
		const data: DataPoint[] = [];

		for (let i = days; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);
			
			// Generate video watch time (minutes per day)
			const baseTime = 45; // Average 45 minutes
			const weekendBoost = date.getDay() === 0 || date.getDay() === 6 ? 15 : 0;
			const randomVariation = (Math.random() - 0.5) * 20;
			const value = Math.max(0, baseTime + weekendBoost + randomVariation);

			data.push({
				value: Math.round(value * 100) / 100,
				date,
			});
		}

		return data;
	}

	/**
	 * Get dashboard metric cards
	 */
	getDashboardMetrics(): MetricCard[] {
		return [
			{
				id: 'mindset_score',
				title: 'Mindset Score',
				value: 87,
				subtitle: 'Daily Average',
				trend: 'up',
				trendValue: '+12%',
				color: '#00a550',
				icon: '🧠',
			},
			{
				id: 'video_watch_time',
				title: 'Video Time',
				value: '2.5h',
				subtitle: 'This Week',
				trend: 'up',
				trendValue: '+8%',
				color: '#007fff',
				icon: '📺',
			},
			{
				id: 'streak_count',
				title: 'Streak',
				value: 12,
				subtitle: 'Days',
				trend: 'stable',
				color: '#ff6b35',
				icon: '🔥',
			},
			{
				id: 'completion_rate',
				title: 'Completion',
				value: '94%',
				subtitle: 'This Month',
				trend: 'up',
				trendValue: '+5%',
				color: '#7712fa',
				icon: '✅',
			},
		];
	}

	/**
	 * Get task metrics breakdown
	 */
	getTaskMetrics(): TaskMetrics {
		return {
			completed: 47,
			total: 52,
			categories: [
				{ name: 'Mindset Training', completed: 15, total: 16 },
				{ name: 'Video Learning', completed: 12, total: 14 },
				{ name: 'Performance', completed: 10, total: 11 },
				{ name: 'Journal', completed: 10, total: 11 },
			],
		};
	}

	/**
	 * Filter data by time range
	 */
	filterDataByTimeRange(data: DataPoint[], timeRange: TimeRange): DataPoint[] {
		const now = new Date();
		const cutoffDate = new Date(now);
		
		switch (timeRange) {
			case '1W':
				cutoffDate.setDate(cutoffDate.getDate() - 7);
				break;
			case '1M':
				cutoffDate.setMonth(cutoffDate.getMonth() - 1);
				break;
			case '3M':
				cutoffDate.setMonth(cutoffDate.getMonth() - 3);
				break;
			case '1Y':
				cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
				break;
			case 'All':
				return data;
		}

		return data.filter(point => point.date >= cutoffDate);
	}

	/**
	 * Calculate trend percentage
	 */
	calculateTrend(data: DataPoint[]): { direction: 'up' | 'down' | 'stable'; percentage: number } {
		if (data.length < 2) return { direction: 'stable', percentage: 0 };

		const recentData = data.slice(-7); // Last 7 points
		const olderData = data.slice(-14, -7); // Previous 7 points

		const recentAvg = recentData.reduce((sum, point) => sum + point.value, 0) / recentData.length;
		const olderAvg = olderData.reduce((sum, point) => sum + point.value, 0) / olderData.length;

		const percentage = Math.abs(((recentAvg - olderAvg) / olderAvg) * 100);
		const direction = recentAvg > olderAvg ? 'up' : recentAvg < olderAvg ? 'down' : 'stable';

		return { direction, percentage: Math.round(percentage * 10) / 10 };
	}

	/**
	 * Format value for display
	 */
	formatValue(value: number, type: 'percentage' | 'time' | 'count' = 'count'): string {
		switch (type) {
			case 'percentage':
				return `${Math.round(value)}%`;
			case 'time':
				const hours = Math.floor(value / 60);
				const minutes = Math.round(value % 60);
				return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
			case 'count':
			default:
				return value.toLocaleString();
		}
	}

	/**
	 * Get days for time range
	 */
	private getTimeRangeDays(timeRange: TimeRange): number {
		switch (timeRange) {
			case '1W': return 7;
			case '1M': return 30;
			case '3M': return 90;
			case '1Y': return 365;
			case 'All': return 730; // 2 years of data
			default: return 30;
		}
	}

	/**
	 * Get chart color for theme
	 */
	getChartColor(theme: 'mindset' | 'video' | 'performance' = 'performance'): string {
		const colors = {
			mindset: '#00a550',
			video: '#007fff',
			performance: '#7712fa',
		};
		return colors[theme];
	}

	/**
	 * Get gradient colors for charts
	 */
	getGradientColors(theme: 'mindset' | 'video' | 'performance' = 'performance'): {
		top: string;
		bottom: string;
	} {
		const gradients = {
			mindset: { top: '#00a550', bottom: 'rgba(0, 165, 80, 0.1)' },
			video: { top: '#007fff', bottom: 'rgba(0, 127, 255, 0.1)' },
			performance: { top: '#7712fa', bottom: 'rgba(119, 18, 250, 0.1)' },
		};
		return gradients[theme];
	}
}

export const analyticsService = new AnalyticsService();
import React, { useState, useEffect } from 'react';
import { 
	View, 
	ScrollView, 
	SafeAreaView, 
	RefreshControl, 
	Dimensions,
	TouchableOpacity 
} from 'react-native';
import { Text } from '@braingame/bgui';
import { AnalyticsChart } from '../../components/AnalyticsChart';
import { MetricCard } from '../../components/MetricCard';
import { TimeRangeSelector } from '../../components/TimeRangeSelector';
import { 
	analyticsService, 
	type DataPoint, 
	type MetricCard as MetricCardType, 
	type TimeRange 
} from '../../services/AnalyticsService';
import { analyticsScreenStyles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Analytics Dashboard Screen
 * Advanced data visualization with interactive charts and metrics
 * Multi-card responsive layout with time range filtering
 * Ported from bg1 React to React Native with enhancements
 */
export const AnalyticsScreen: React.FC = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('1M');
	const [refreshing, setRefreshing] = useState(false);
	const [performanceData, setPerformanceData] = useState<DataPoint[]>([]);
	const [mindsetData, setMindsetData] = useState<DataPoint[]>([]);
	const [videoData, setVideoData] = useState<DataPoint[]>([]);
	const [metrics, setMetrics] = useState<MetricCardType[]>([]);
	const [selectedChart, setSelectedChart] = useState<'performance' | 'mindset' | 'video'>('performance');

	/**
	 * Load analytics data
	 */
	const loadAnalyticsData = async () => {
		try {
			// Generate sample data for different time ranges
			const performance = analyticsService.generatePerformanceData(selectedTimeRange);
			const mindset = analyticsService.generateMindsetData(selectedTimeRange);
			const video = analyticsService.generateVideoData(selectedTimeRange);
			const dashboardMetrics = analyticsService.getDashboardMetrics();

			setPerformanceData(performance);
			setMindsetData(mindset);
			setVideoData(video);
			setMetrics(dashboardMetrics);
		} catch (error) {
			console.error('Error loading analytics data:', error);
		}
	};

	/**
	 * Handle time range change
	 */
	const handleTimeRangeChange = (timeRange: TimeRange) => {
		setSelectedTimeRange(timeRange);
	};

	/**
	 * Handle refresh
	 */
	const handleRefresh = async () => {
		setRefreshing(true);
		await loadAnalyticsData();
		setRefreshing(false);
	};

	/**
	 * Handle metric card press
	 */
	const handleMetricCardPress = (metric: MetricCardType) => {
		// Navigate to detailed metric view
		console.log('Navigate to metric detail:', metric.id);
	};

	/**
	 * Handle chart type selection
	 */
	const handleChartTypePress = (chartType: 'performance' | 'mindset' | 'video') => {
		setSelectedChart(chartType);
	};

	/**
	 * Get current chart data
	 */
	const getCurrentChartData = (): DataPoint[] => {
		switch (selectedChart) {
			case 'mindset':
				return mindsetData;
			case 'video':
				return videoData;
			case 'performance':
			default:
				return performanceData;
		}
	};

	/**
	 * Get chart title
	 */
	const getChartTitle = (): string => {
		const titles = {
			performance: 'Performance Trends',
			mindset: 'Mindset Progress',
			video: 'Video Engagement',
		};
		return titles[selectedChart];
	};

	/**
	 * Calculate grid layout
	 */
	const isTablet = screenWidth > 768;
	const metricsPerRow = isTablet ? 4 : 2;

	/**
	 * Load data on component mount and time range change
	 */
	useEffect(() => {
		loadAnalyticsData();
	}, [selectedTimeRange]);

	return (
		<SafeAreaView style={analyticsScreenStyles.container}>
			<ScrollView
				style={analyticsScreenStyles.scrollView}
				contentContainerStyle={analyticsScreenStyles.scrollContent}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						tintColor="#007fff"
						colors={['#007fff']}
					/>
				}
			>
				{/* Header */}
				<View style={analyticsScreenStyles.header}>
					<Text style={analyticsScreenStyles.headerTitle}>
						📊 Analytics
					</Text>
					<Text style={analyticsScreenStyles.headerSubtitle}>
						Performance insights and progress tracking
					</Text>
				</View>

				{/* Time Range Selector */}
				<View style={analyticsScreenStyles.timeRangeContainer}>
					<TimeRangeSelector
						selectedRange={selectedTimeRange}
						onRangeChange={handleTimeRangeChange}
					/>
				</View>

				{/* Main Chart Section */}
				<View style={analyticsScreenStyles.chartSection}>
					{/* Chart Type Selector */}
					<View style={analyticsScreenStyles.chartTypeSelector}>
						{(['performance', 'mindset', 'video'] as const).map((chartType) => (
							<TouchableOpacity
								key={chartType}
								onPress={() => handleChartTypePress(chartType)}
								style={[
									analyticsScreenStyles.chartTypeButton,
									selectedChart === chartType && analyticsScreenStyles.selectedChartTypeButton,
								]}
							>
								<Text style={[
									analyticsScreenStyles.chartTypeButtonText,
									selectedChart === chartType && analyticsScreenStyles.selectedChartTypeButtonText,
								]}>
									{chartType.charAt(0).toUpperCase() + chartType.slice(1)}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Main Chart */}
					<AnalyticsChart
						data={getCurrentChartData()}
						title={getChartTitle()}
						theme={selectedChart}
						height={250}
						animated={true}
						enablePanGesture={true}
					/>
				</View>

				{/* Metrics Grid */}
				<View style={analyticsScreenStyles.metricsSection}>
					<Text style={analyticsScreenStyles.sectionTitle}>
						Key Metrics
					</Text>
					
					<View style={analyticsScreenStyles.metricsGrid}>
						{metrics.map((metric, index) => (
							<View
								key={metric.id}
								style={[
									analyticsScreenStyles.metricCardContainer,
									{
										width: `${100 / metricsPerRow - 2}%`,
										marginRight: (index + 1) % metricsPerRow === 0 ? 0 : '2%',
									}
								]}
							>
								<MetricCard
									metric={metric}
									onPress={handleMetricCardPress}
									size="medium"
								/>
							</View>
						))}
					</View>
				</View>

				{/* Secondary Charts */}
				<View style={analyticsScreenStyles.secondaryChartsSection}>
					<Text style={analyticsScreenStyles.sectionTitle}>
						Detailed Views
					</Text>
					
					{/* Mindset Progress Chart */}
					{selectedChart !== 'mindset' && (
						<View style={analyticsScreenStyles.secondaryChart}>
							<AnalyticsChart
								data={mindsetData}
								title="Mindset Progress"
								theme="mindset"
								height={180}
								animated={false}
								enablePanGesture={false}
							/>
						</View>
					)}

					{/* Video Engagement Chart */}
					{selectedChart !== 'video' && (
						<View style={analyticsScreenStyles.secondaryChart}>
							<AnalyticsChart
								data={videoData}
								title="Video Engagement"
								theme="video"
								height={180}
								animated={false}
								enablePanGesture={false}
							/>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
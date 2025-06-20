import { StyleSheet } from 'react-native';

export const analyticsScreenStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#101020',
	},

	scrollView: {
		flex: 1,
	},

	scrollContent: {
		paddingBottom: 40,
	},

	header: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#333',
	},

	headerTitle: {
		fontSize: 32,
		fontWeight: '700',
		fontFamily: 'LexendBold',
		color: '#fff',
		marginBottom: 4,
	},

	headerSubtitle: {
		fontSize: 16,
		color: '#aaa',
		fontFamily: 'LexendRegular',
	},

	timeRangeContainer: {
		paddingHorizontal: 20,
		paddingVertical: 20,
	},

	chartSection: {
		paddingHorizontal: 20,
		marginBottom: 32,
	},

	chartTypeSelector: {
		flexDirection: 'row',
		marginBottom: 20,
		backgroundColor: '#1a1a2e',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#333',
		overflow: 'hidden',
	},

	chartTypeButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#333',
	},

	selectedChartTypeButton: {
		backgroundColor: '#007fff',
	},

	chartTypeButtonText: {
		color: '#aaa',
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'LexendMedium',
	},

	selectedChartTypeButtonText: {
		color: '#fff',
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	metricsSection: {
		paddingHorizontal: 20,
		marginBottom: 32,
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		color: '#fff',
		marginBottom: 16,
	},

	metricsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},

	metricCardContainer: {
		marginBottom: 16,
	},

	secondaryChartsSection: {
		paddingHorizontal: 20,
		marginBottom: 32,
	},

	secondaryChart: {
		marginBottom: 20,
	},
});
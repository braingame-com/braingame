import { StyleSheet } from 'react-native';

export const analyticsChartStyles = StyleSheet.create({
	container: {
		backgroundColor: '#1a1a2e',
		borderRadius: 16,
		padding: 20,
		borderWidth: 1,
		borderColor: '#333',
	},

	title: {
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		color: '#fff',
		marginBottom: 16,
		textAlign: 'center',
	},

	selectedPointContainer: {
		position: 'absolute',
		top: 20,
		right: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: 8,
		padding: 8,
		zIndex: 10,
	},

	selectedValue: {
		fontSize: 16,
		fontWeight: '700',
		fontFamily: 'LexendBold',
		color: '#fff',
		textAlign: 'center',
	},

	selectedDate: {
		fontSize: 12,
		color: '#aaa',
		fontFamily: 'LexendRegular',
		textAlign: 'center',
		marginTop: 2,
	},

	chartContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},

	axisLabel: {
		fontSize: 12,
		color: '#aaa',
		fontFamily: 'LexendRegular',
		textAlign: 'center',
	},

	summaryContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: '#333',
	},

	summaryItem: {
		alignItems: 'center',
	},

	summaryLabel: {
		fontSize: 12,
		color: '#666',
		fontFamily: 'LexendRegular',
		marginBottom: 4,
	},

	summaryValue: {
		fontSize: 14,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		color: '#fff',
	},

	emptyState: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	emptyStateText: {
		fontSize: 16,
		color: '#666',
		fontFamily: 'LexendRegular',
	},
});
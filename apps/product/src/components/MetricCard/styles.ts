import { StyleSheet } from 'react-native';

export const metricCardStyles = StyleSheet.create({
	touchable: {
		borderRadius: 16,
	},

	container: {
		backgroundColor: '#1a1a2e',
		borderRadius: 16,
		padding: 20,
		borderWidth: 1,
		borderColor: '#333',
		borderLeftWidth: 4,
		position: 'relative',
		overflow: 'hidden',
	},

	// Size variants
	small: {
		padding: 16,
		minHeight: 120,
	},

	medium: {
		padding: 20,
		minHeight: 150,
	},

	large: {
		padding: 24,
		minHeight: 180,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 16,
	},

	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},

	icon: {
		fontSize: 20,
	},

	trendContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		gap: 4,
	},

	trendIndicator: {
		fontSize: 12,
		fontWeight: 'bold',
	},

	trendValue: {
		fontSize: 12,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	valueContainer: {
		marginBottom: 12,
	},

	value: {
		color: '#fff',
		fontWeight: '700',
		fontFamily: 'LexendBold',
		lineHeight: 1.2,
	},

	// Size-specific value styles
	smallValue: {
		fontSize: 24,
	},

	mediumValue: {
		fontSize: 32,
	},

	largeValue: {
		fontSize: 40,
	},

	textContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},

	title: {
		color: '#fff',
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		marginBottom: 4,
	},

	// Size-specific title styles
	smallTitle: {
		fontSize: 14,
	},

	mediumTitle: {
		fontSize: 16,
	},

	largeTitle: {
		fontSize: 18,
	},

	subtitle: {
		color: '#aaa',
		fontFamily: 'LexendRegular',
	},

	// Size-specific subtitle styles
	smallSubtitle: {
		fontSize: 12,
	},

	mediumSubtitle: {
		fontSize: 14,
	},

	largeSubtitle: {
		fontSize: 16,
	},

	colorAccent: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 3,
		opacity: 0.6,
	},
});
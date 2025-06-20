import { StyleSheet } from 'react-native';

export const advancedCarouselStyles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},

	carouselContainer: {
		position: 'relative',
		height: 300, // Default height
	},

	itemContainer: {
		borderRadius: 16,
		overflow: 'hidden',
		backgroundColor: '#1a1a2e',
		borderWidth: 1,
		borderColor: '#333',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},

	itemTitle: {
		position: 'absolute',
		bottom: 16,
		left: 16,
		right: 16,
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		textAlign: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 8,
	},

	indicatorsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		gap: 8,
	},

	indicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#666',
	},

	activeIndicator: {
		backgroundColor: '#007fff',
		width: 12,
		height: 12,
		borderRadius: 6,
	},

	leftArrow: {
		position: 'absolute',
		left: 16,
		top: '50%',
		transform: [{ translateY: -20 }],
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},

	rightArrow: {
		position: 'absolute',
		right: 16,
		top: '50%',
		transform: [{ translateY: -20 }],
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},

	arrowText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},
});
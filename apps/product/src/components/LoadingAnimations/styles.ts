import { StyleSheet } from 'react-native';

export const skeletonLoaderStyles = StyleSheet.create({
	container: {
		backgroundColor: '#1a1a2e',
		overflow: 'hidden',
		position: 'relative',
	},

	shimmer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		width: 100,
		transform: [{ skewX: '-20deg' }],
	},

	card: {
		backgroundColor: '#1a1a2e',
		borderRadius: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: '#333',
	},

	cardContent: {
		marginTop: 12,
	},
});

export const pulseAnimationStyles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},

	pulse: {
		position: 'absolute',
		top: 0,
		left: 0,
	},

	content: {
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
});

export const spinAnimationStyles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	defaultSpinner: {
		// Border properties set dynamically
	},

	waveContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
	},

	waveDot: {
		// Size and color set dynamically
	},

	loadingTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	loadingText: {
		fontSize: 16,
		fontFamily: 'LexendRegular',
	},

	dotsContainer: {
		flexDirection: 'row',
		marginLeft: 4,
	},

	loadingDot: {
		fontSize: 16,
		fontFamily: 'LexendRegular',
		width: 8,
		textAlign: 'center',
	},
});
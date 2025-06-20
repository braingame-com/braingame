import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// YouTube standard aspect ratio (16:9)
const THUMBNAIL_WIDTH = Math.min(screenWidth - 32, 360);
const THUMBNAIL_HEIGHT = (THUMBNAIL_WIDTH * 9) / 16;

export const videoCardStyles = StyleSheet.create({
	container: {
		backgroundColor: '#1a1a2e',
		borderRadius: 12,
		marginBottom: 20,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#333',
		position: 'relative',
	},

	thumbnailContainer: {
		position: 'relative',
		width: '100%',
		height: THUMBNAIL_HEIGHT,
	},

	thumbnail: {
		width: '100%',
		height: '100%',
		backgroundColor: '#333',
	},

	durationBadge: {
		position: 'absolute',
		bottom: 8,
		right: 8,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},

	durationText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	playOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		opacity: 0.8,
	},

	playButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	playIcon: {
		color: '#333',
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 4, // Center the triangle
	},

	infoContainer: {
		padding: 16,
		position: 'relative',
	},

	titleContainer: {
		marginBottom: 8,
		paddingRight: 32, // Space for menu button
	},

	title: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		lineHeight: 22,
	},

	metadataContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},

	channelName: {
		color: '#aaa',
		fontSize: 14,
		fontFamily: 'LexendRegular',
	},

	separator: {
		color: '#666',
		fontSize: 14,
		marginHorizontal: 8,
	},

	uploadTime: {
		color: '#aaa',
		fontSize: 14,
		fontFamily: 'LexendRegular',
	},

	menuButton: {
		position: 'absolute',
		top: 16,
		right: 16,
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},

	menuIcon: {
		color: '#aaa',
		fontSize: 16,
		fontWeight: 'bold',
		transform: [{ rotate: '90deg' }],
	},

	dropdownMenu: {
		position: 'absolute',
		top: 45,
		right: 16,
		backgroundColor: '#2a2a3e',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#444',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1000,
		minWidth: 150,
	},

	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#444',
	},

	menuItemLast: {
		borderBottomWidth: 0,
	},

	menuItemIcon: {
		fontSize: 16,
		marginRight: 12,
	},

	menuItemText: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'LexendRegular',
	},
});
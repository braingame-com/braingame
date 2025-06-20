import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const videoPlayerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#101020',
	},

	fullscreenContainer: {
		backgroundColor: '#000',
	},

	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	loadingText: {
		color: '#aaa',
		fontSize: 16,
		fontFamily: 'LexendRegular',
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#333',
	},

	backButton: {
		padding: 8,
		marginRight: 12,
	},

	backButtonText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},

	headerTitle: {
		flex: 1,
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	playerContainer: {
		position: 'relative',
		backgroundColor: '#000',
	},

	controlsOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},

	playButton: {
		position: 'absolute',
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.3)',
	},

	playButtonText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginLeft: 4, // Center the triangle
	},

	fullscreenButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		alignItems: 'center',
		justifyContent: 'center',
	},

	fullscreenButtonText: {
		color: '#fff',
		fontSize: 16,
	},

	infoContainer: {
		flex: 1,
		padding: 20,
	},

	videoTitle: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		lineHeight: 28,
		marginBottom: 12,
	},

	metadataContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		marginBottom: 20,
	},

	channelName: {
		color: '#007fff',
		fontSize: 16,
		fontWeight: '500',
		fontFamily: 'LexendMedium',
	},

	separator: {
		color: '#666',
		fontSize: 16,
		marginHorizontal: 8,
	},

	duration: {
		color: '#aaa',
		fontSize: 14,
		fontFamily: 'LexendRegular',
	},

	uploadTime: {
		color: '#aaa',
		fontSize: 14,
		fontFamily: 'LexendRegular',
	},

	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 24,
		paddingVertical: 16,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#333',
	},

	actionButton: {
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
	},

	actionIcon: {
		fontSize: 24,
		marginBottom: 4,
	},

	actionText: {
		color: '#aaa',
		fontSize: 12,
		fontFamily: 'LexendRegular',
		textAlign: 'center',
	},

	descriptionContainer: {
		marginBottom: 24,
	},

	descriptionTitle: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		marginBottom: 12,
	},

	descriptionText: {
		color: '#aaa',
		fontSize: 14,
		fontFamily: 'LexendRegular',
		lineHeight: 20,
	},
});
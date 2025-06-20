import { StyleSheet } from 'react-native';

export const animatedHeaderStyles = StyleSheet.create({
	container: {
		position: 'relative',
		zIndex: 10,
	},

	backgroundHeader: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 60,
		backgroundColor: '#101020',
		borderBottomWidth: 1,
		borderBottomColor: '#333',
		zIndex: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	backgroundContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
	},

	backButton: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},

	backButtonText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},

	backgroundTitle: {
		flex: 1,
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	contentHeader: {
		paddingHorizontal: 20,
		paddingVertical: 24,
		zIndex: 10,
	},

	titleContainer: {
		alignItems: 'center',
	},

	mainTitle: {
		fontSize: 32,
		fontWeight: '700',
		fontFamily: 'LexendBold',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 8,
	},

	subtitle: {
		fontSize: 16,
		color: '#aaa',
		fontFamily: 'LexendRegular',
		textAlign: 'center',
		lineHeight: 24,
	},

	pageTitleContainer: {
		paddingHorizontal: 20,
		paddingVertical: 16,
	},

	pageTitle: {
		fontSize: 28,
		fontWeight: '700',
		fontFamily: 'LexendBold',
		color: '#fff',
		textAlign: 'center',
	},

	subtitleContainer: {
		paddingHorizontal: 20,
		paddingVertical: 8,
	},

	animatedSubtitle: {
		fontSize: 16,
		color: '#aaa',
		fontFamily: 'LexendRegular',
		textAlign: 'center',
		lineHeight: 24,
	},
});
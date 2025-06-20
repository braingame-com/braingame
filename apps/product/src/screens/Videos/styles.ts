import { StyleSheet } from 'react-native';

export const videosScreenStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#101020',
	},

	header: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#333',
	},

	headerTitle: {
		fontSize: 28,
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

	searchContainer: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 16,
		gap: 12,
	},

	searchInputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1a1a2e',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#333',
		paddingHorizontal: 16,
	},

	searchInput: {
		flex: 1,
		color: '#fff',
		fontSize: 16,
		fontFamily: 'LexendRegular',
		paddingVertical: 12,
	},

	clearButton: {
		padding: 4,
		marginLeft: 8,
	},

	clearButtonText: {
		color: '#666',
		fontSize: 16,
	},

	searchButton: {
		backgroundColor: '#007fff',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 48,
	},

	searchButtonText: {
		fontSize: 18,
	},

	resultsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#333',
	},

	resultsText: {
		color: '#aaa',
		fontSize: 14,
		fontFamily: 'LexendRegular',
	},

	backToPlaylistText: {
		color: '#007fff',
		fontSize: 14,
		fontFamily: 'LexendMedium',
	},

	videosList: {
		padding: 20,
		paddingBottom: 40,
	},

	row: {
		justifyContent: 'space-between',
	},

	videoItem: {
		marginBottom: 16,
	},

	loadingState: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40,
	},

	loadingText: {
		color: '#aaa',
		fontSize: 16,
		fontFamily: 'LexendRegular',
		marginTop: 16,
		textAlign: 'center',
	},

	emptyState: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40,
	},

	emptyStateTitle: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		marginBottom: 8,
		textAlign: 'center',
	},

	emptyStateText: {
		color: '#aaa',
		fontSize: 16,
		fontFamily: 'LexendRegular',
		textAlign: 'center',
		lineHeight: 24,
		marginBottom: 24,
	},

	clearSearchButton: {
		backgroundColor: '#007fff',
		borderRadius: 8,
		paddingHorizontal: 20,
		paddingVertical: 12,
	},

	clearSearchText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},
});
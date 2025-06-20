import { StyleSheet } from 'react-native';

export const settingsScreenStyles = StyleSheet.create({
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

	section: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#333',
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		color: '#fff',
		marginBottom: 16,
	},

	settingItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		marginBottom: 8,
	},

	settingInfo: {
		flex: 1,
		marginRight: 16,
	},

	settingName: {
		fontSize: 16,
		fontWeight: '500',
		fontFamily: 'LexendMedium',
		color: '#fff',
		marginBottom: 4,
	},

	settingDescription: {
		fontSize: 14,
		color: '#aaa',
		fontFamily: 'LexendRegular',
		lineHeight: 20,
	},

	statusCard: {
		backgroundColor: '#1a1a2e',
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: '#333',
	},

	statusHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},

	statusText: {
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	statusDetails: {
		gap: 4,
	},

	statusDetailText: {
		fontSize: 14,
		color: '#666',
		fontFamily: 'LexendRegular',
	},

	errorCard: {
		backgroundColor: '#4d1a00',
		borderRadius: 8,
		padding: 12,
		marginTop: 12,
		borderLeftWidth: 4,
		borderLeftColor: '#ff6b35',
	},

	errorText: {
		fontSize: 14,
		color: '#ff6b35',
		fontFamily: 'LexendRegular',
		marginBottom: 8,
	},

	clearErrorButton: {
		alignSelf: 'flex-start',
		paddingVertical: 4,
		paddingHorizontal: 8,
		backgroundColor: '#ff6b35',
		borderRadius: 4,
	},

	clearErrorText: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	actionButton: {
		backgroundColor: '#007fff',
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 20,
		marginBottom: 12,
		alignItems: 'center',
	},

	actionButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	destructiveButton: {
		backgroundColor: '#ff6b35',
	},

	destructiveButtonText: {
		color: '#fff',
	},
});
import { StyleSheet } from 'react-native';

export const cloudStatusStyles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},

	statusIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: '#1a1a2e',
	},

	statusContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	statusIcon: {
		fontSize: 16,
	},

	statusText: {
		fontSize: 14,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},

	detailsContainer: {
		marginTop: 12,
		padding: 16,
		backgroundColor: '#1a1a2e',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#333',
	},

	detailRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},

	detailLabel: {
		fontSize: 14,
		color: '#aaa',
		fontFamily: 'LexendRegular',
	},

	detailValue: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '500',
		fontFamily: 'LexendMedium',
	},

	errorContainer: {
		marginTop: 12,
		padding: 12,
		backgroundColor: '#4d1a00',
		borderRadius: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#ff6b35',
	},

	errorTitle: {
		fontSize: 14,
		color: '#ff6b35',
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
		marginBottom: 4,
	},

	errorText: {
		fontSize: 12,
		color: '#ff6b35',
		fontFamily: 'LexendRegular',
		lineHeight: 18,
	},

	testButton: {
		marginTop: 12,
		backgroundColor: '#007fff',
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: 'center',
	},

	testButtonText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},
});
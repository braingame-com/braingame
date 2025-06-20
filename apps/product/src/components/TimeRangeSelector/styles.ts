import { StyleSheet } from 'react-native';

export const timeRangeSelectorStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#1a1a2e',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#333',
		overflow: 'hidden',
	},

	button: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#333',
		minHeight: 44,
	},

	firstButton: {
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
	},

	lastButton: {
		borderTopRightRadius: 12,
		borderBottomRightRadius: 12,
		borderRightWidth: 0,
	},

	selectedButton: {
		backgroundColor: '#007fff',
		borderRightColor: '#007fff',
	},

	buttonText: {
		color: '#aaa',
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'LexendMedium',
	},

	selectedButtonText: {
		color: '#fff',
		fontWeight: '600',
		fontFamily: 'LexendSemiBold',
	},
});
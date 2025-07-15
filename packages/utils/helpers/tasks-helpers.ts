import type { TextInput } from "react-native";
import { Platform } from "react-native";

export const handleSlashKeyPress = (e: KeyboardEvent, inputRef: React.RefObject<TextInput>) => {
	if (Platform.OS !== "web") return;

	if (e.key === "/") {
		e.preventDefault();

		// Validate input element availability before focusing
		if (!inputRef.current) {
			// Attempted to focus non-existent input element
			return;
		}

		try {
			inputRef.current.focus();
		} catch (_error) {
			// Error focusing input element - silently fail
		}
	}
};

export const getTaskInputWrapperColor = (
	inputError: boolean,
	isFocused: boolean,
	colors: { error: string; primary: string },
) => {
	if (inputError) {
		return colors.error;
	}

	if (isFocused) {
		return colors.primary;
	}

	return undefined;
};

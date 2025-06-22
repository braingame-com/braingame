import type { TextInput } from "react-native";
import { Platform } from "react-native";
import { Colors } from "../constants/Colors";

export const handleSlashKeyPress = (e: KeyboardEvent, inputRef: React.RefObject<TextInput>) => {
	if (Platform.OS !== "web") return;

	if (e.key === "/") {
		e.preventDefault();

		// Validate input element availability before focusing
		if (!inputRef.current) {
			console.warn("Attempted to focus non-existent input element");
			return;
		}

		try {
			inputRef.current.focus();
		} catch (error) {
			console.error("Error focusing input element:", error);
		}
	}
};

export const getTaskInputWrapperColor = (inputError: boolean, isFocused: boolean) => {
	if (inputError) {
		return Colors.universal.negative;
	}

	if (isFocused) {
		return Colors.universal.primary;
	}

	return undefined;
};

import type { TextInput } from "react-native";
import { Platform } from "react-native";
import { Colors } from "../constants/Colors";

export const handleSlashKeyPress = (e: KeyboardEvent, inputRef: React.RefObject<TextInput>) => {
	if (Platform.OS !== "web") return;

	if (e.key === "/") {
		e.preventDefault();
		inputRef.current?.focus();
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

import type { Dispatch, SetStateAction } from "react";
import type {
	NativeSyntheticEvent,
	TextInput,
	TextInputKeyPressEventData,
} from "react-native";

export const handleSlashKeyPress = (
	e: KeyboardEvent,
	inputRef: React.RefObject<TextInput>,
) => {
	if (e.key === "/") {
		e.preventDefault();
		inputRef.current?.focus();
	}
};

export const handleKeyPress = (
	e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	inputValue: string,
	setTaskList: Dispatch<SetStateAction<string[]>>,
	setInputValue: Dispatch<SetStateAction<string>>,
) => {
	if (e.nativeEvent.key === "Enter") {
		e.preventDefault();
		handleTaskInput(inputValue, setTaskList, setInputValue);
	}
};

export const handleTaskInput = (
	inputValue: string,
	setTaskList: Dispatch<SetStateAction<string[]>>,
	setInputValue: Dispatch<SetStateAction<string>>,
) => {
	if (!inputValue) return;

	setTaskList((prev) => [...prev, inputValue]);
	setInputValue("");
};

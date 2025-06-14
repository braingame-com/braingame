import { useState } from "react";

export const useTaskInput = (setTaskList: (update: (prev: string[]) => string[]) => void) => {
	const [inputValue, setInputValue] = useState("");
	const [inputError, setInputError] = useState(false);

	const handleTaskInput = () => {
		if (!inputValue) {
			setInputError(true);
		} else {
			setTaskList((prev) => [...prev, inputValue]);
			setInputValue("");
			setInputError(false);
		}
	};

	const handleKeyPress = (key: string) => {
		setInputError(false);

		if (key === "Enter") {
			handleTaskInput();
		}
	};

	return {
		inputValue,
		setInputValue,
		inputError,
		setInputError,
		handleKeyPress,
		handleTaskInput,
	};
};

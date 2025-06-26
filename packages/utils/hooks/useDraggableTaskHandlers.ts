import { Platform } from "react-native";

// Platform-specific imports and implementations
let useDraggableTaskHandlersImplementation: (initialTasks: string[]) => unknown;

if (Platform.OS === "web") {
	const WebHook = require("./useDraggableTaskHandlers.web");
	useDraggableTaskHandlersImplementation = WebHook.useDraggableTaskHandlers;
} else {
	const NativeHook = require("./useDraggableTaskHandlers.native");
	useDraggableTaskHandlersImplementation = NativeHook.useDraggableTaskHandlers;
}

export const useDraggableTaskHandlers = (initialTasks: string[]) => {
	return useDraggableTaskHandlersImplementation(initialTasks);
};

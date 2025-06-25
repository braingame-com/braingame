import { useState } from "react";
import { Platform } from "react-native";

// Web-safe version that doesn't use react-native-reanimated
export const useDraggableTaskHandlers = (initialTasks: string[]) => {
	const [taskOrder, setTaskOrder] = useState(initialTasks);
	const [targetIndex, setTargetIndex] = useState<number | null>(null);

	// On web, we return a simplified version without gesture handling
	if (Platform.OS === "web") {
		return {
			taskOrder,
			setTaskOrder,
			targetIndex,
			getGestureHandlers: () => ({
				onGestureEvent: () => {},
				onHandlerStateChange: () => {},
				translateY: { value: 0 },
				isDragging: { value: false },
			}),
		};
	}

	// For mobile, dynamically import the real implementation
	// This will be tree-shaken on web builds
	const mobileImplementation = require("./useDraggableTaskHandlers.native");
	return mobileImplementation.useDraggableTaskHandlers(initialTasks);
};

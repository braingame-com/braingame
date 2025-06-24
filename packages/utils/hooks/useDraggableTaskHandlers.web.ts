import { useState } from "react";

// Web-compatible implementation that avoids react-native-reanimated during SSR
export const useDraggableTaskHandlers = (initialTasks: string[]) => {
	const [taskOrder, setTaskOrder] = useState(initialTasks);
	const [targetIndex, setTargetIndex] = useState<number | null>(null);

	// Use simple objects instead of shared values for web compatibility
	const translateY = { value: 0 };
	const isDragging = { value: false };

	const swapTasks = (fromIndex: number, toIndex: number) => {
		if (toIndex < 0 || toIndex >= taskOrder.length) return;

		const newTasks = [...taskOrder];
		const [movedTask] = newTasks.splice(fromIndex, 1);
		newTasks.splice(toIndex, 0, movedTask);
		setTaskOrder(newTasks);
	};

	// Web implementation - provides mouse/touch handlers for drag functionality
	const getGestureHandlers = (_index: number) => {
		return {
			// For web, these would be replaced with mouse/touch event handlers
			onGestureEvent: () => {},
			onHandlerStateChange: () => {},
			translateY,
			isDragging,
		};
	};

	return {
		taskOrder,
		setTaskOrder,
		targetIndex,
		getGestureHandlers,
	};
};

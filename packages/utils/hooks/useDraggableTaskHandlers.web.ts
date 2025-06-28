import { useState } from "react";

export const useDraggableTaskHandlers = (initialTasks: string[]) => {
	const [taskOrder, setTaskOrder] = useState(initialTasks);
	const [targetIndex, _setTargetIndex] = useState<number | null>(null);

	// Web version doesn't support drag gestures yet
	const gestureHandler = {
		onGestureEvent: () => {},
		onHandlerStateChange: () => {},
	};

	const animatedStyle = {
		transform: [],
	};

	const updateTaskOrder = (newOrder: string[]) => {
		setTaskOrder(newOrder);
	};

	const resetPosition = () => {
		// No-op for web
	};

	return {
		taskOrder,
		targetIndex,
		gestureHandler,
		animatedStyle,
		updateTaskOrder,
		resetPosition,
		translateY: { value: 0 },
		isDragging: { value: false },
	};
};

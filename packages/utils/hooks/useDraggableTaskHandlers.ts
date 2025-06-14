import { useState } from "react";
import type {
	HandlerStateChangeEvent,
	PanGestureHandlerEventPayload,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withSpring } from "react-native-reanimated";
import type { DraggableTaskHandlersProps } from "../constants/types";

export const useDraggableTaskHandlers = (initialTasks: string[]) => {
	const [taskOrder, setTaskOrder] = useState(initialTasks);
	const [targetIndex, setTargetIndex] = useState<number | null>(null);
	const initialIndex = useSharedValue(0);

	const swapTasks = (fromIndex: number, toIndex: number) => {
		// Allow moving to the end, but prevent invalid indices
		if (toIndex < 0 || toIndex >= taskOrder.length) return;

		const updatedOrder = [...taskOrder];
		// Remove the dragged item
		const [movedItem] = updatedOrder.splice(fromIndex, 1);

		// Insert it at the correct position (toIndex)
		updatedOrder.splice(toIndex, 0, movedItem);

		setTaskOrder(updatedOrder);
	};

	// Gesture event for dragging
	const getGestureHandlers = (index: number) => {
		initialIndex.value = index;
		const translateY = useSharedValue(0);
		const isDragging = useSharedValue(false);

		const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
			translateY.value = event.nativeEvent.translationY;

			// Dynamically calculate the target index
			const newIndex = Math.min(
				Math.max(0, Math.round(initialIndex.value + translateY.value / 60)),
				taskOrder.length - 1,
			);
			runOnJS(setTargetIndex)(newIndex);
		};

		const onHandlerStateChange = ({
			nativeEvent,
		}: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
			if (nativeEvent.state === 5 /* END */) {
				isDragging.value = false;

				const finalIndex = Math.min(
					Math.max(0, Math.round(initialIndex.value + translateY.value / 60)),
					taskOrder.length - 1,
				);
				if (finalIndex !== initialIndex.value) {
					runOnJS(swapTasks)(initialIndex.value, finalIndex);
				}
				runOnJS(setTargetIndex)(null);
				translateY.value = withSpring(0);
			} else if (nativeEvent.state === 4 /* ACTIVE */) {
				isDragging.value = true;
			}
		};

		return { onGestureEvent, onHandlerStateChange, translateY, isDragging };
	};

	return {
		taskOrder,
		setTaskOrder,
		targetIndex,
		getGestureHandlers,
	};
};

import { Button } from "@/components/Button";
import { SlashIcon } from "@/components/Icon";
import { PageWrapper } from "@/components/PageWrapper";
import { Text } from "@/components/Text";
import { View } from "@/components/View";
import { Tokens } from "@/constants/Tokens";
import { styles } from "@/constants/styles";
import type { DraggableTaskItemProps } from "@/constants/types";
import { getTaskInputWrapperColor, handleSlashKeyPress } from "@/helpers/tasks-helpers";
import { useDraggableTaskHandlers } from "@/hooks/useDraggableTaskHandlers";
import { useTaskInput } from "@/hooks/useTaskInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { TextInput } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function Tasks() {
	const [taskList, setTaskList] = useState([
		"go to mums",
		"kill phil",
		"get liz",
		"go to winchester",
		"wait for all this to blow over",
	]);

	return (
		<PageWrapper>
			<View style={styles.pageWidth}>
				<TaskInput setTaskList={setTaskList} />
				<TasksList tasks={taskList} />
			</View>
		</PageWrapper>
	);
}

const TaskInput = ({ setTaskList }: { setTaskList: Dispatch<SetStateAction<string[]>> }) => {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<TextInput>(null);
	const color = useThemeColor("text");
	const colorSecondary = useThemeColor("textSecondary");
	const { inputValue, setInputValue, inputError, setInputError, handleKeyPress, handleTaskInput } =
		useTaskInput(setTaskList);

	// Slash key focus effect
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => handleSlashKeyPress(e, inputRef);

		document.addEventListener("keydown", onKeyDown);

		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<TaskInputWrapper inputError={inputError} isFocused={isFocused}>
			<View style={{ padding: Tokens.xs, borderRadius: Tokens.xs }} border>
				<SlashIcon color={colorSecondary} />
			</View>

			<TextInput
				ref={inputRef}
				placeholder="What's your task?"
				placeholderTextColor={colorSecondary}
				value={inputValue}
				onChangeText={(text) => setInputValue(text)}
				onKeyPress={(e) => handleKeyPress(e.nativeEvent.key)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => {
					setIsFocused(false);
					setInputError(false);
				}}
				style={{
					...styles.textInput,
					color,
					outline: "none",
					marginHorizontal: Tokens.m,
				}}
			/>

			<Button
				icon="plus"
				iconColor={colorSecondary}
				iconType="fas"
				onPress={() => handleTaskInput()}
				disabled={!inputValue}
			/>
		</TaskInputWrapper>
	);
};

const TaskInputWrapper = ({
	inputError,
	isFocused,
	children,
}: { inputError: boolean; isFocused: boolean; children: ReactNode }) => {
	const borderColor = getTaskInputWrapperColor(inputError, isFocused);

	return (
		<View style={{ ...styles.flexRow, borderColor }} rounded border>
			{children}
		</View>
	);
};

const TasksList = ({ tasks }: { tasks: string[] }) => {
	const { taskOrder, targetIndex, getGestureHandlers } = useDraggableTaskHandlers(tasks);

	return (
		<View style={{ paddingVertical: 0 }}>
			{taskOrder.map((task, index) => {
				const { onGestureEvent, onHandlerStateChange, translateY, isDragging } =
					getGestureHandlers(index);

				return (
					<DraggableTaskItem
						key={task}
						text={task}
						index={index}
						onGestureEvent={onGestureEvent}
						onHandlerStateChange={onHandlerStateChange}
						translateY={translateY}
						isDragging={isDragging}
						targetIndex={targetIndex}
						itemHeight={60}
					/>
				);
			})}
		</View>
	);
};

export const DraggableTaskItem = ({
	text,
	index,
	onGestureEvent,
	onHandlerStateChange,
	translateY,
	isDragging,
	targetIndex,
	itemHeight,
}: DraggableTaskItemProps) => {
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }, { rotate: isDragging.value ? "1deg" : "0deg" }],
		zIndex: isDragging.value ? 1 : 0,
		opacity: isDragging.value ? 0.9 : 1, // Slight transparency while dragging
		// position: isDragging.value ? "absolute" : "relative", // Lift it off the list
	}));

	// const shouldRenderOriginal = !isDragging.value;
	const shouldRenderOriginal = true;

	return (
		<>
			{/* Render the placeholder box */}
			{targetIndex === index && (
				<View
					style={{
						backgroundColor: "#303030",
						marginTop: Tokens.m,
						borderRadius: Tokens.s,
						opacity: 0.5,
					}}
				>
					<Text> </Text>
				</View>
			)}

			{/* Draggable Task */}
			{shouldRenderOriginal && (
				<PanGestureHandler
					onGestureEvent={onGestureEvent}
					onHandlerStateChange={onHandlerStateChange}
				>
					<Animated.View style={animatedStyle}>
						<TaskItem text={text} />
					</Animated.View>
				</PanGestureHandler>
			)}
		</>
	);
};

const TaskItem = ({ text }: { text: string }) => {
	return (
		<View
			type="mini-card"
			style={{
				...styles.flexRow,
				marginTop: Tokens.m,
			}}
			border
			hoverable
			grabbable
		>
			<Text>{text}</Text>
		</View>
	);
};

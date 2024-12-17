import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { styles } from "@/constants/styles";
import { Tokens } from "@/constants/Tokens";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
	type Dispatch,
	Key,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { TextInput } from "react-native";
import { PageWrapper } from "@/components/PageWrapper";
import {
	handleKeyPress,
	handleSlashKeyPress,
	handleTaskInput,
} from "@/helpers/tasks-helpers";

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

const TaskInput = ({
	setTaskList,
}: { setTaskList: Dispatch<SetStateAction<string[]>> }) => {
	const [inputValue, setInputValue] = useState("");
	const color = useThemeColor("text");
	const colorSecondary = useThemeColor("textSecondary");
	const inputRef = useRef<TextInput>(null);

	// Slash key focus effect
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => handleSlashKeyPress(e, inputRef);

		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	return (
		<View style={{ ...styles.flexRow, gap: Tokens.m }} rounded border>
			<View
				style={{ padding: Tokens.xs, borderRadius: Tokens.xs }}
				rounded
				border
			>
				<Text
					style={{
						width: Tokens.m,
						height: Tokens.m,
						...styles.center,
						color: colorSecondary,
					}}
				>
					/
				</Text>
			</View>
			<TextInput
				ref={inputRef}
				placeholder="What's your task?"
				placeholderTextColor={colorSecondary}
				value={inputValue}
				onChangeText={(text) => setInputValue(text)}
				onKeyPress={(e) =>
					handleKeyPress(e, inputValue, setTaskList, setInputValue)
				}
				style={{
					...styles.textInput,
					color,
					outline: "none",
				}}
			/>
			<Button
				icon="plus"
				iconType="fas"
				onPress={() => handleTaskInput(inputValue, setTaskList, setInputValue)}
			/>
		</View>
	);
};

const TasksList = ({ tasks }: { tasks: string[] }) => (
	<View style={{ gap: Tokens.m }}>
		{tasks.map((t: string, i) => (
			<TaskItem text={t} key={`${i}: ${t}`} />
		))}
	</View>
);

const TaskItem = ({ text }: { text: string }) => (
	<View type="mini-card" style={styles.flexRow}>
		<Text>{text}</Text>
	</View>
);

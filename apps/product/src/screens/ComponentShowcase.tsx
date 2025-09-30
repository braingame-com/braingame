import {
	Accordion,
	Alert,
	Badge,
	Button,
	Card,
	Checkbox,
	Chip,
	Divider,
	Icon,
	Radio,
	RadioGroup,
	type RadioGroupChangeEvent,
	Slider,
	Spinner,
	Switch,
	Text,
	Textarea,
	TextInput,
	View,
} from "@braingame/bgui";
import { useState } from "react";
import {
	type NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	type TextInputChangeEventData,
} from "react-native";

type TextChangeEvent = NativeSyntheticEvent<TextInputChangeEventData>;

const createTextChangeHandler = (setter: (value: string) => void) => (event: TextChangeEvent) => {
	setter(event.nativeEvent.text ?? "");
};

const extractRadioValue = (event: RadioGroupChangeEvent) => {
	const target = "target" in event ? event.target : undefined;
	const next =
		typeof target === "object" && target !== null
			? (target as { value?: unknown }).value
			: undefined;
	if (typeof next === "number") return String(next);
	if (typeof next === "string") return next;
	return undefined;
};

/**
 * Component Showcase Screen
 * Demonstrates the UI primitives available in the bgui package
 */
export function ComponentShowcase() {
	const [textValue, setTextValue] = useState("");
	const [multilineValue, setMultilineValue] = useState("");
	const [checkboxValue, setCheckboxValue] = useState(false);
	const [switchValue, setSwitchValue] = useState(false);
	const [sliderValue, setSliderValue] = useState(50);
	const [radioValue, setRadioValue] = useState("option1");
	const [selectedChips, setSelectedChips] = useState<string[]>([]);

	const toggleChip = (label: string) => {
		setSelectedChips((prev) =>
			prev.includes(label) ? prev.filter((value) => value !== label) : [...prev, label],
		);
	};

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			{/* Typography Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Typography</Text>
				<Divider style={styles.divider} />
				<Text level="h1">Display Title</Text>
				<Text level="title-lg">Title</Text>
				<Text level="title-sm">Heading</Text>
				<Text level="body-lg">Body text - The quick brown fox jumps over the lazy dog</Text>
				<Text level="body-md" style={styles.boldText}>
					Bold text - Emphasized content
				</Text>
				<Text level="body-sm" color="neutral">
					Secondary text - Less important information
				</Text>
				<Text level="body-sm">Small text - Fine print</Text>
				<Text level="body-xs" style={styles.thinText}>
					Small thin text - Smallest size
				</Text>
				<Text level="body-md" component="code" style={styles.monoText}>
					Monospace text - Code snippets
				</Text>
			</Card>

			{/* Buttons Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Buttons</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Button onClick={() => {}} variant="solid" color="primary">
						Primary
					</Button>
					<Button onClick={() => {}} variant="outlined" color="neutral">
						Secondary
					</Button>
					<Button onClick={() => {}} variant="plain" color="primary">
						Ghost
					</Button>
					<Button onClick={() => {}} variant="solid" color="danger">
						Danger
					</Button>
				</View>

				<View style={styles.row}>
					<Button onClick={() => {}} size="sm">
						Small
					</Button>
					<Button onClick={() => {}} size="md">
						Medium
					</Button>
					<Button onClick={() => {}} size="lg">
						Large
					</Button>
				</View>

				<View style={styles.row}>
					<Button onClick={() => {}} startDecorator={<Icon name="home" size={20} />}>
						With Icon
					</Button>
					<Button onClick={() => {}} endDecorator={<Icon name="arrow_forward" size={20} />}>
						Icon Right
					</Button>
					<Button
						onClick={() => {}}
						variant="plain"
						color="neutral"
						startDecorator={<Icon name="settings" size={20} />}
						aria-label="Open settings"
					/>
				</View>

				<View style={styles.row}>
					<Button onClick={() => {}} loading>
						Loading
					</Button>
					<Button onClick={() => {}} disabled>
						Disabled
					</Button>
					<Button onClick={() => {}} fullWidth>
						Full Width
					</Button>
				</View>
			</Card>

			{/* Chips Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Chips</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Chip>Default</Chip>
					<Chip color="primary">Primary</Chip>
					<Chip color="success">Success</Chip>
					<Chip color="warning">Warning</Chip>
					<Chip color="danger">Danger</Chip>
				</View>

				<View style={styles.row}>
					<Chip variant="outlined">Outlined</Chip>
					<Chip color="primary" startDecorator={<Icon name="bookmark" size={18} />}>
						With Icon
					</Chip>
					<Chip onDismiss={() => {}}>Removable</Chip>
				</View>

				<View style={styles.row}>
					{["React", "React Native", "TypeScript"].map((label) => {
						const isSelected = selectedChips.includes(label);
						return (
							<Chip
								key={label}
								color="primary"
								variant={isSelected ? "solid" : "soft"}
								onClick={() => toggleChip(label)}
							>
								{label}
							</Chip>
						);
					})}
				</View>
			</Card>

			{/* Text Input Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Text Inputs</Text>
				<Divider style={styles.divider} />

				<TextInput
					value={textValue}
					onChange={createTextChangeHandler(setTextValue)}
					placeholder="Standard input"
					style={styles.input}
				/>

				<TextInput
					value={textValue}
					onChange={createTextChangeHandler(setTextValue)}
					placeholder="With left icon"
					startDecorator={<Icon name="mail" size={20} />}
					style={styles.input}
				/>

				<TextInput
					value={textValue}
					onChange={createTextChangeHandler(setTextValue)}
					placeholder="With right icon"
					endDecorator={<Icon name="check" size={20} />}
					style={styles.input}
				/>

				<TextInput
					value={textValue}
					onChange={createTextChangeHandler(setTextValue)}
					placeholder="Error state"
					error
					style={styles.input}
				/>

				<Textarea
					value={multilineValue}
					onChange={createTextChangeHandler(setMultilineValue)}
					placeholder="Multiline text area - Type multiple lines here..."
					minRows={4}
					style={styles.input}
				/>
			</Card>

			{/* Icons Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Icons</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Icon name="home" size={20} />
					<Icon name="person" size={28} />
					<Icon name="settings" size={36} />
					<Icon name="favorite" size={40} />
				</View>

				<View style={styles.row}>
					<Icon name="star" size={28} color="#f59e0b" />
					<Icon name="check_circle" size={28} color="#16a34a" />
					<Icon name="warning" size={28} color="#facc15" />
					<Icon name="cancel" size={28} color="#dc2626" />
				</View>
			</Card>

			{/* Badges Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Badges</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Badge badgeContent={5}>
						<View style={styles.badgeTarget}>
							<Icon name="mail" size={22} />
						</View>
					</Badge>
					<Badge badgeContent={99} color="primary">
						<View style={styles.badgeTarget}>
							<Icon name="notifications" size={22} />
						</View>
					</Badge>
					<Badge badgeContent={999} color="danger" max={99}>
						<View style={styles.badgeTarget}>
							<Icon name="favorite" size={22} />
						</View>
					</Badge>
					<Badge badgeContent="NEW" color="success">
						<View style={styles.badgeTarget}>
							<Text level="body-sm">Updates</Text>
						</View>
					</Badge>
					<Badge dot color="warning">
						<View style={styles.badgeTarget}>
							<Icon name="chat" size={22} />
						</View>
					</Badge>
				</View>
			</Card>

			{/* Form Controls Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Form Controls</Text>
				<Divider style={styles.divider} />

				<View style={styles.formRow}>
					<Checkbox
						checked={checkboxValue}
						onChange={() => setCheckboxValue((prev) => !prev)}
						label="Checkbox option"
					/>
				</View>

				<View style={styles.formRow}>
					<Switch checked={switchValue} onValueChange={setSwitchValue}>
						Toggle switch
					</Switch>
				</View>

				<View style={styles.formRow}>
					<Text level="title-sm">Slider: {sliderValue}%</Text>
					<Slider
						value={sliderValue}
						onValueChange={(value) => setSliderValue(Math.round(value))}
						minimumValue={0}
						maximumValue={100}
					/>
				</View>

				<View style={styles.formRow}>
					<RadioGroup
						value={radioValue}
						onChange={(event) => {
							const next = extractRadioValue(event);
							if (next) setRadioValue(next);
						}}
					>
						<Radio value="option1" label="Option 1" />
						<Radio value="option2" label="Option 2" />
						<Radio value="option3" label="Option 3" />
					</RadioGroup>
				</View>
			</Card>

			{/* Feedback Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Feedback</Text>
				<Divider style={styles.divider} />

				<Alert
					status="info"
					variant="soft"
					title="Information"
					description="This is an informational alert message."
					style={styles.alert}
				/>

				<Alert
					status="success"
					variant="soft"
					title="Success"
					description="Operation completed successfully!"
					style={styles.alert}
				/>

				<Alert
					status="warning"
					variant="soft"
					title="Warning"
					description="Please review before proceeding."
					style={styles.alert}
				/>

				<Alert
					status="error"
					variant="soft"
					title="Error"
					description="Something went wrong. Please try again."
					style={styles.alert}
				/>

				<View style={styles.row}>
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
					<Spinner color="primary" />
				</View>
			</Card>

			{/* Accordion Section */}
			<Card style={styles.section}>
				<Text level="title-lg">Accordion</Text>
				<Divider style={styles.divider} />

				<Accordion>
					<Accordion.Item value="section1" title="Section 1">
						<Text level="body-md">Content for the first section of the accordion.</Text>
					</Accordion.Item>
					<Accordion.Item value="section2" title="Section 2">
						<Text level="body-md">Content for the second section goes here.</Text>
					</Accordion.Item>
					<Accordion.Item value="section3" title="Section 3">
						<Text level="body-md">And here's the content for the third section.</Text>
					</Accordion.Item>
				</Accordion>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	content: {
		padding: 16,
		paddingBottom: 32,
	},
	section: {
		marginBottom: 16,
		padding: 16,
	},
	divider: {
		marginVertical: 12,
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginVertical: 8,
		alignItems: "center",
	},
	formRow: {
		marginVertical: 12,
		gap: 8,
	},
	input: {
		marginVertical: 8,
	},
	alert: {
		marginVertical: 4,
	},
	boldText: {
		fontWeight: "600",
	},
	thinText: {
		fontWeight: "300",
	},
	monoText: {
		fontFamily: "Menlo, Courier, monospace",
	},
	badgeTarget: {
		minWidth: 40,
		minHeight: 40,
		borderRadius: 12,
		backgroundColor: "#eef2ff",
		alignItems: "center",
		justifyContent: "center",
	},
});

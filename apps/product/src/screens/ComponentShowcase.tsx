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
	RadioGroup,
	Slider,
	Spinner,
	Switch,
	Text,
	TextInput,
	View,
} from "@braingame/bgui";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

/**
 * Component Showcase Screen
 * Demonstrates all the UI primitives available in the bgui package
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
			prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
		);
	};

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			{/* Typography Section */}
			<Card style={styles.section}>
				<Text variant="title">Typography</Text>
				<Divider style={styles.divider} />
				<Text variant="displayTitle">Display Title</Text>
				<Text variant="title">Title</Text>
				<Text variant="heading">Heading</Text>
				<Text variant="subtitle">Subtitle</Text>
				<Text variant="body">Body text - The quick brown fox jumps over the lazy dog</Text>
				<Text variant="bold">Bold text - Emphasized content</Text>
				<Text variant="secondaryText">Secondary text - Less important information</Text>
				<Text variant="small">Small text - Fine print</Text>
				<Text variant="smallThin">Small thin text - Smallest size</Text>
				<Text variant="body" mono>
					Monospace text - Code snippets
				</Text>
			</Card>

			{/* Buttons Section */}
			<Card style={styles.section}>
				<Text variant="title">Buttons</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Button onClick={() => {}} variant="solid">
						Primary
					</Button>
					<Button onClick={() => {}} variant="outlined">
						Secondary
					</Button>
					<Button onClick={() => {}} variant="plain">
						Ghost
					</Button>
					<Button onClick={() => {}} variant="danger">
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
					<Button onClick={() => {}} icon="home">
						With Icon
					</Button>
					<Button onClick={() => {}} icon="arrow_forward" iconPosition="right">
						Icon Right
					</Button>
					<Button onClick={() => {}} variant="icon" icon="settings" />
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
				<Text variant="title">Chips</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Chip label="Default" />
					<Chip label="Primary" color="primary" />
					<Chip label="Success" color="success" />
					<Chip label="Warning" color="warning" />
					<Chip label="Danger" color="danger" />
				</View>

				<View style={styles.row}>
					<Chip label="Outlined" variant="outlined" />
					<Chip label="With Icon" icon="label" color="primary" />
					<Chip label="Removable" onRemove={() => {}} />
				</View>

				<View style={styles.row}>
					<Chip
						label="React"
						onClick={() => toggleChip("React")}
						selected={selectedChips.includes("React")}
						color="primary"
					/>
					<Chip
						label="React Native"
						onClick={() => toggleChip("React Native")}
						selected={selectedChips.includes("React Native")}
						color="primary"
					/>
					<Chip
						label="TypeScript"
						onClick={() => toggleChip("TypeScript")}
						selected={selectedChips.includes("TypeScript")}
						color="primary"
					/>
				</View>
			</Card>

			{/* Text Input Section */}
			<Card style={styles.section}>
				<Text variant="title">Text Inputs</Text>
				<Divider style={styles.divider} />

				<TextInput
					value={textValue}
					onValueChange={setTextValue}
					placeholder="Standard input"
					style={styles.input}
				/>

				<TextInput
					value={textValue}
					onValueChange={setTextValue}
					placeholder="With left icon"
					leftIcon="mail"
					style={styles.input}
				/>

				<TextInput
					value={textValue}
					onValueChange={setTextValue}
					placeholder="With right icon"
					rightIcon="check"
					style={styles.input}
				/>

				<TextInput
					value={textValue}
					onValueChange={setTextValue}
					placeholder="Error state"
					variant="error"
					style={styles.input}
				/>

				<TextInput
					value={multilineValue}
					onValueChange={setMultilineValue}
					placeholder="Multiline text area - Type multiple lines here..."
					multiline
					numberOfLines={4}
					style={[styles.input, styles.textarea]}
				/>
			</Card>

			{/* Icons Section */}
			<Card style={styles.section}>
				<Text variant="title">Icons</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Icon name="home" size="sm" />
					<Icon name="person" size="md" />
					<Icon name="settings" size="lg" />
					<Icon name="favorite" size={32} />
				</View>

				<View style={styles.row}>
					<Icon name="star" color="primary" />
					<Icon name="check_circle" color="success" />
					<Icon name="warning" color="warning" />
					<Icon name="cancel" color="danger" />
				</View>
			</Card>

			{/* Badges Section */}
			<Card style={styles.section}>
				<Text variant="title">Badges</Text>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Badge count={5} />
					<Badge count={99} color="primary" />
					<Badge count={999} color="danger" />
					<Badge text="NEW" color="success" />
					<Badge dot color="warning" />
				</View>
			</Card>

			{/* Form Controls Section */}
			<Card style={styles.section}>
				<Text variant="title">Form Controls</Text>
				<Divider style={styles.divider} />

				<View style={styles.formRow}>
					<Checkbox
						checked={checkboxValue}
						onCheckedChange={setCheckboxValue}
						label="Checkbox option"
					/>
				</View>

				<View style={styles.formRow}>
					<Switch value={switchValue} onValueChange={setSwitchValue} label="Toggle switch" />
				</View>

				<View style={styles.formRow}>
					<Text variant="subtitle">Slider: {sliderValue}%</Text>
					<Slider
						value={sliderValue}
						onValueChange={(value) => setSliderValue(typeof value === "number" ? value : value[0])}
						min={0}
						max={100}
					/>
				</View>

				<View style={styles.formRow}>
					<RadioGroup value={radioValue} onValueChange={setRadioValue}>
						<RadioGroup.Item value="option1" label="Option 1" />
						<RadioGroup.Item value="option2" label="Option 2" />
						<RadioGroup.Item value="option3" label="Option 3" />
					</RadioGroup>
				</View>
			</Card>

			{/* Feedback Section */}
			<Card style={styles.section}>
				<Text variant="title">Feedback</Text>
				<Divider style={styles.divider} />

				<Alert
					type="info"
					title="Information"
					message="This is an informational alert message."
					style={styles.alert}
				/>

				<Alert
					type="success"
					title="Success"
					message="Operation completed successfully!"
					style={styles.alert}
				/>

				<Alert
					type="warning"
					title="Warning"
					message="Please review before proceeding."
					style={styles.alert}
				/>

				<Alert
					type="error"
					title="Error"
					message="Something went wrong. Please try again."
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
				<Text variant="title">Accordion</Text>
				<Divider style={styles.divider} />

				<Accordion>
					<Accordion.Item value="section1" title="Section 1">
						<Text>Content for the first section of the accordion.</Text>
					</Accordion.Item>
					<Accordion.Item value="section2" title="Section 2">
						<Text>Content for the second section goes here.</Text>
					</Accordion.Item>
					<Accordion.Item value="section3" title="Section 3">
						<Text>And here's the content for the third section.</Text>
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
	},
	input: {
		marginVertical: 8,
	},
	textarea: {
		minHeight: 100,
		textAlignVertical: "top",
	},
	alert: {
		marginVertical: 4,
	},
});

import {
	Alert,
	Badge,
	Button,
	Card,
	Checkbox,
	Chip,
	Divider,
	Input,
	Radio,
	RadioGroup,
	Switch,
	Typography,
} from "@braingame/bgui";
import { View } from "react-native";
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
	// const [sliderValue, setSliderValue] = useState(50);
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
				<Typography level="h3">Typography</Typography>
				<Divider style={styles.divider} />
				<Typography level="h1">Display Title</Typography>
				<Typography level="h2">Title</Typography>
				<Typography level="h3">Heading</Typography>
				<Typography level="h4">Subtitle</Typography>
				<Typography level="body-md">Body text - The quick brown fox jumps over the lazy dog</Typography>
				<Typography level="body-md" style={{ fontWeight: 'bold' }}>Bold text - Emphasized content</Typography>
				<Typography level="body-sm" style={{ opacity: 0.7 }}>Secondary text - Less important information</Typography>
				<Typography level="body-sm">Small text - Fine print</Typography>
				<Typography level="body-xs">Small thin text - Smallest size</Typography>
				<Typography level="body-md" style={{ fontFamily: 'monospace' }}>
					Monospace text - Code snippets
				</Typography>
			</Card>

			{/* Buttons Section */}
			<Card style={styles.section}>
				<Typography level="h3">Buttons</Typography>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Button onClick={() => {}} color="primary" variant="solid">
						Primary
					</Button>
					<Button onClick={() => {}} color="neutral" variant="solid">
						Secondary
					</Button>
					<Button onClick={() => {}} variant="plain">
						Ghost
					</Button>
					<Button onClick={() => {}} color="danger" variant="solid">
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
					<Button onClick={() => {}} startDecorator="🏠">
						With Icon
					</Button>
					<Button onClick={() => {}} endDecorator="→">
						Icon Right
					</Button>
					<Button onClick={() => {}} variant="plain" size="sm">⚙️</Button>
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
				<Typography level="h3">Chips</Typography>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Chip children="Default" />
					<Chip children="Primary" color="primary" />
					<Chip children="Success" color="success" />
					<Chip children="Warning" color="warning" />
					<Chip children="Danger" color="danger" />
				</View>

				<View style={styles.row}>
					<Chip children="Outlined" variant="outlined" />
					<Chip children="With Icon" startDecorator="🏷️" color="primary" />
					<Chip children="Removable" endDecorator="×" onClick={() => {}} />
				</View>

				<View style={styles.row}>
					<Chip
						children="React"
						onClick={() => toggleChip("React")}
						variant={selectedChips.includes("React") ? "solid" : "soft"}
						color="primary"
					/>
					<Chip
						children="React Native"
						onClick={() => toggleChip("React Native")}
						variant={selectedChips.includes("React Native") ? "solid" : "soft"}
						color="primary"
					/>
					<Chip
						children="TypeScript"
						onClick={() => toggleChip("TypeScript")}
						variant={selectedChips.includes("TypeScript") ? "solid" : "soft"}
						color="primary"
					/>
				</View>
			</Card>

			{/* Typography Input Section */}
			<Card style={styles.section}>
				<Typography level="h3">Typography Inputs</Typography>
				<Divider style={styles.divider} />

				<Input
					value={textValue}
					onChange={(e) => setTextValue(e.target.value)}
					placeholder="Standard input"
					style={styles.input}
				/>

				<Input
					value={textValue}
					onChange={(e) => setTextValue(e.target.value)}
					placeholder="With left icon"
					startDecorator="📧"
					style={styles.input}
				/>

				<Input
					value={textValue}
					onChange={(e) => setTextValue(e.target.value)}
					placeholder="With right icon"
					endDecorator="✓"
					style={styles.input}
				/>

				<Input
					value={textValue}
					onChange={(e) => setTextValue(e.target.value)}
					placeholder="Error state"
					error
					style={styles.input}
				/>

				<Input
					value={multilineValue}
					onChange={(e) => setMultilineValue(e.target.value)}
					placeholder="Multiline text area - Type multiple lines here..."
					// multiline not supported in Input component
					style={[styles.input, styles.textarea]}
				/>
			</Card>

			{/* Icons Section - Component not available in bgui */}
			{/* <Card style={styles.section}>
				<Typography level="h3">Icons</Typography>
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
			</Card> */}

			{/* Badges Section */}
			<Card style={styles.section}>
				<Typography level="h3">Badges</Typography>
				<Divider style={styles.divider} />

				<View style={styles.row}>
					<Badge>5</Badge>
					<Badge color="primary">99</Badge>
					<Badge color="danger">999+</Badge>
					<Badge color="success">NEW</Badge>
					<Badge dot color="warning" />
				</View>
			</Card>

			{/* Form Controls Section */}
			<Card style={styles.section}>
				<Typography level="h3">Form Controls</Typography>
				<Divider style={styles.divider} />

				<View style={styles.formRow}>
					<Checkbox
						checked={checkboxValue}
						onChange={(e) => setCheckboxValue(e.target.checked)}
						label="Checkbox option"
					/>
				</View>

				<View style={styles.formRow}>
					<Switch checked={switchValue} onChange={(e) => setSwitchValue(e.target.checked)} endDecorator="Toggle switch" />
				</View>

				{/* Slider component not available in bgui */}
				{/* <View style={styles.formRow}>
					<Typography level="h4">Slider: {sliderValue}%</Typography>
					<Slider
						value={sliderValue}
						onValueChange={(value) => setSliderValue(typeof value === "number" ? value : value[0])}
						min={0}
						max={100}
					/>
				</View> */}

				<View style={styles.formRow}>
					<RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
						<Radio value="option1" label="Option 1" />
						<Radio value="option2" label="Option 2" />
						<Radio value="option3" label="Option 3" />
					</RadioGroup>
				</View>
			</Card>

			{/* Feedback Section */}
			<Card style={styles.section}>
				<Typography level="h3">Feedback</Typography>
				<Divider style={styles.divider} />

				<Alert
					color="primary"
					style={styles.alert}
				>
					<Typography level="h4">Information</Typography>
					This is an informational alert message.
				</Alert>

				<Alert
					color="success"
					style={styles.alert}
				>
					<Typography level="h4">Success</Typography>
					Operation completed successfully!
				</Alert>

				<Alert
					color="warning"
					style={styles.alert}
				>
					<Typography level="h4">Warning</Typography>
					Please review before proceeding.
				</Alert>

				<Alert
					color="danger"
					style={styles.alert}
				>
					<Typography level="h4">Error</Typography>
					Something went wrong. Please try again.
				</Alert>

				{/* Spinner component not available in bgui */}
				{/* <View style={styles.row}>
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
					<Spinner color="primary" />
				</View> */}
			</Card>

			{/* Accordion Section - Component not available in bgui */}
			{/* <Card style={styles.section}>
				<Typography level="h3">Accordion</Typography>
				<Divider style={styles.divider} />

				<Accordion>
					<Accordion.Item value="section1" title="Section 1">
						<Typography>Content for the first section of the accordion.</Typography>
					</Accordion.Item>
					<Accordion.Item value="section2" title="Section 2">
						<Typography>Content for the second section goes here.</Typography>
					</Accordion.Item>
					<Accordion.Item value="section3" title="Section 3">
						<Typography>And here's the content for the third section.</Typography>
					</Accordion.Item>
				</Accordion>
			</Card> */}
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

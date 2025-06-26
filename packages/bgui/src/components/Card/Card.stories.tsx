import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../Text/Text";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["basic", "interactive"],
		},
		padding: {
			control: "select",
			options: ["none", "small", "medium", "large"],
		},
		elevation: {
			control: "number",
			min: 0,
			max: 10,
		},
		onPress: {
			action: "pressed",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <Text>This is a default card</Text>,
		style: { width: 300 },
	},
};

export const Interactive: Story = {
	args: {
		variant: "interactive",
		children: <Text>This is an interactive card</Text>,
		style: { width: 300 },
	},
};

export const WithElevation: Story = {
	args: {
		elevation: 5,
		children: <Text>Card with elevation</Text>,
		style: { width: 300 },
	},
};

export const Basic: Story = {
	args: {
		variant: "basic",
		children: <Text>Basic card variant</Text>,
		style: { width: 300 },
	},
};

export const Pressable: Story = {
	args: {
		variant: "interactive",
		children: <Text>Click me!</Text>,
		style: { width: 300 },
	},
};

export const WithPressHandler: Story = {
	args: {
		variant: "interactive",
		onPress: () => console.log("Card pressed"),
		children: <Text>Card with press handler</Text>,
		style: { width: 300 },
	},
};

export const PaddingSizes: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			<Card padding="none" style={{ width: 300 }}>
				<Text>No padding</Text>
			</Card>
			<Card padding="small" style={{ width: 300 }}>
				<Text>Small padding</Text>
			</Card>
			<Card padding="medium" style={{ width: 300 }}>
				<Text>Medium padding (default)</Text>
			</Card>
			<Card padding="large" style={{ width: 300 }}>
				<Text>Large padding</Text>
			</Card>
		</div>
	),
};

export const ComplexContent: Story = {
	args: {
		elevation: 3,
		style: { width: 350 },
		children: (
			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<Text variant="title">Card Title</Text>
				<Text variant="subtitle" style={{ opacity: 0.7 }}>
					Card subtitle
				</Text>
				<Text>
					This is a card with more complex content including multiple text elements and proper
					spacing.
				</Text>
			</div>
		),
	},
};

export const InteractiveCards: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16 }}>
			<Card
				variant="interactive"
				elevation={2}
				onPress={() => console.log("Card 1 pressed")}
				style={{ width: 200 }}
			>
				<Text variant="title">Action Card</Text>
				<Text>Tap to perform action</Text>
			</Card>
			<Card
				variant="interactive"
				elevation={0}
				onPress={() => console.log("Card 2 pressed")}
				style={{ width: 200 }}
			>
				<Text variant="title">Settings</Text>
				<Text>Configure options</Text>
			</Card>
		</div>
	),
};

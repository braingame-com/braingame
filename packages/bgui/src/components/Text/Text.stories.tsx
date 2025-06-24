import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
	title: "Components/Text",
	component: Text,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"h1",
				"h2",
				"h3",
				"body",
				"caption",
				"displayTitle",
				"title",
				"heading",
				"subtitle",
				"bold",
				"text",
				"secondaryText",
				"small",
				"smallThin",
			],
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "danger", "neutral", "success", "warning"],
		},
		align: {
			control: "select",
			options: ["left", "center", "right"],
		},
		numberOfLines: {
			control: "number",
		},
		mono: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "This is default text",
	},
};

export const Title: Story = {
	args: {
		variant: "title",
		children: "This is a title",
	},
};

export const Subtitle: Story = {
	args: {
		variant: "subtitle",
		children: "This is a subtitle",
	},
};

export const Caption: Story = {
	args: {
		variant: "caption",
		children: "This is caption text",
	},
};

export const Body: Story = {
	args: {
		variant: "body",
		children: "Body Text",
	},
};

export const CustomColor: Story = {
	args: {
		children: "Custom colored text",
		color: "#FF6B6B",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Text variant="displayTitle">Display Title</Text>
			<Text variant="title">Title Text</Text>
			<Text variant="heading">Heading Text</Text>
			<Text variant="subtitle">Subtitle Text</Text>
			<Text variant="body">Body Text</Text>
			<Text variant="caption">Caption Text</Text>
			<Text variant="small">Small Text</Text>
			<Text variant="smallThin">Small Thin Text</Text>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Text color="primary">Primary Color</Text>
			<Text color="secondary">Secondary Color</Text>
			<Text color="danger">Danger Color</Text>
			<Text color="neutral">Neutral Color</Text>
			<Text color="success">Success Color</Text>
			<Text color="warning">Warning Color</Text>
		</div>
	),
};

export const Alignment: Story = {
	render: () => (
		<div style={{ width: 300 }}>
			<Text align="left">Left aligned text</Text>
			<Text align="center">Center aligned text</Text>
			<Text align="right">Right aligned text</Text>
			<Text align="left">
				Left aligned text that spans multiple lines to demonstrate left alignment which is the
				default
			</Text>
		</div>
	),
};

export const Truncation: Story = {
	args: {
		numberOfLines: 2,
		children:
			"This is a very long text that will be truncated after two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
};

export const Monospace: Story = {
	args: {
		mono: true,
		children: "This text uses monospace font",
	},
};

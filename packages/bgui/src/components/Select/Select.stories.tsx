import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Option, Select } from "./Select";

const meta = {
	title: "Components/Select",
	component: Select,
	parameters: {
		docs: {
			description: {
				component:
					"A Select component that works across web and native platforms with dropdown functionality.",
			},
		},
	},
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
		},
		variant: {
			control: "select",
			options: ["solid", "soft", "outlined", "plain"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Select placeholder="Choose an option">
			<Option value="option1">Option 1</Option>
			<Option value="option2">Option 2</Option>
			<Option value="option3">Option 3</Option>
		</Select>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Select variant="solid" placeholder="Solid">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select variant="soft" placeholder="Soft">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select variant="outlined" placeholder="Outlined">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select variant="plain" placeholder="Plain">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Select size="sm" placeholder="Small">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select size="md" placeholder="Medium">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select size="lg" placeholder="Large">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Select color="primary" placeholder="Primary">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select color="neutral" placeholder="Neutral">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select color="danger" placeholder="Danger">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select color="success" placeholder="Success">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
			<Select color="warning" placeholder="Warning">
				<Option value="1">Option 1</Option>
				<Option value="2">Option 2</Option>
			</Select>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<Select disabled placeholder="Disabled Select">
			<Option value="1">Option 1</Option>
			<Option value="2">Option 2</Option>
		</Select>
	),
};

export const MultipleSelection: Story = {
	render: () => (
		<Select multiple placeholder="Select multiple options">
			<Option value="apple">Apple</Option>
			<Option value="banana">Banana</Option>
			<Option value="orange">Orange</Option>
			<Option value="grape">Grape</Option>
		</Select>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Select startDecorator={<span>🔍</span>} placeholder="With start decorator">
				<Option value="search1">Search Option 1</Option>
				<Option value="search2">Search Option 2</Option>
			</Select>
			<Select endDecorator={<span>⚙️</span>} placeholder="With end decorator">
				<Option value="setting1">Setting 1</Option>
				<Option value="setting2">Setting 2</Option>
			</Select>
		</div>
	),
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = React.useState<string | null>(null);

		return (
			<div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
				<Select
					value={value}
					onChange={(_, newValue) => setValue(newValue)}
					placeholder="Controlled select"
				>
					<Option value="red">Red</Option>
					<Option value="green">Green</Option>
					<Option value="blue">Blue</Option>
				</Select>
				<p>Selected value: {value || "None"}</p>
			</div>
		);
	},
};

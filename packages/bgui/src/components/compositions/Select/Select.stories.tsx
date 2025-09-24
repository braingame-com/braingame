import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack } from "../../primitives/Stack";
import { Option, Select } from "./Select";
import type { SelectValue } from "./Select.types";

const meta: Meta<typeof Select> = {
	title: "Compositions/Select",
	component: Select,
	parameters: {
		docs: {
			description: {
				component:
					"Cross-platform select menu with keyboard navigation, overlay listbox, and multi-select support.",
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
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
	{ value: "option1", label: "Option 1" },
	{ value: "option2", label: "Option 2" },
	{ value: "option3", label: "Option 3" },
];

export const Default: Story = {
	render: (args) => (
		<Select {...args} placeholder="Choose an option">
			{basicOptions.map((option) => (
				<Option key={option.value} value={option.value}>
					{option.label}
				</Option>
			))}
		</Select>
	),
};

export const Variants: Story = {
	render: () => (
		<Stack direction="row" spacing="md">
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
		</Stack>
	),
};

export const Sizes: Story = {
	render: () => (
		<Stack direction="row" spacing="md" alignItems="center">
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
		</Stack>
	),
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState<SelectValue>(null);

		return (
			<Select value={value} onValueChange={setValue} placeholder="Controlled select">
				<Option value="red">Red</Option>
				<Option value="green">Green</Option>
				<Option value="blue">Blue</Option>
			</Select>
		);
	},
};

export const MultipleSelection: Story = {
	render: () => {
		const [value, setValue] = useState<SelectValue>([]);

		return (
			<Select multiple value={value} onValueChange={setValue} placeholder="Pick fruits">
				<Option value="apple">Apple</Option>
				<Option value="banana">Banana</Option>
				<Option value="orange">Orange</Option>
				<Option value="grape">Grape</Option>
			</Select>
		);
	},
};

export const WithDecorators: Story = {
	render: () => (
		<Select startDecorator="🔍" endDecorator="⌄" placeholder="Search">
			<Option value="docs">Documentation</Option>
			<Option value="community">Community</Option>
			<Option value="tutorials">Tutorials</Option>
		</Select>
	),
};

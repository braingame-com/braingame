import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: "boolean",
		},
		indeterminate: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
		error: {
			control: "boolean",
		},
		errorMessage: {
			control: "text",
		},
		helperText: {
			control: "text",
		},
		onValueChange: {
			action: "changed",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// TODO: Add default props
	},
};

// TODO: Add more story variations

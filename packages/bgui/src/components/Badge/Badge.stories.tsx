import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["notification", "status", "count"],
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "danger", "neutral", "success", "warning"],
		},
		count: {
			control: "number",
		},
		text: {
			control: "text",
		},
		dot: {
			control: "boolean",
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

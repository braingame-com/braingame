import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
	title: "Components/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// TODO: Add default props
	},
};

// TODO: Add more story variations

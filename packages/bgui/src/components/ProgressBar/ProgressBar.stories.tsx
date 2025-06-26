import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
	title: "Components/ProgressBar",
	component: ProgressBar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "color",
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

import type { Meta, StoryObj } from "@storybook/react";
import { View } from "./View";

const meta: Meta<typeof View> = {
	title: "Components/View",
	component: View,
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

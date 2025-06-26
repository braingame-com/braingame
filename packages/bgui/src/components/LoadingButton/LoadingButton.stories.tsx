import type { Meta, StoryObj } from "@storybook/react";
import { LoadingButton } from "./LoadingButton";

const meta: Meta<typeof LoadingButton> = {
	title: "Components/LoadingButton",
	component: LoadingButton,
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

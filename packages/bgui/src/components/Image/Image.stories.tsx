import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
	title: "Components/Image",
	component: Image,
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

import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
	title: "Components/Menu",
	component: Menu,
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

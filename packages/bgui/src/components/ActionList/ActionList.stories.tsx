import type { Meta, StoryObj } from "@storybook/react";
import { ActionList } from "./ActionList";

const meta: Meta<typeof ActionList> = {
	title: "Components/ActionList",
	component: ActionList,
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

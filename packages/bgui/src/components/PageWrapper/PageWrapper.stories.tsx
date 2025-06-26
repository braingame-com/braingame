import type { Meta, StoryObj } from "@storybook/react";
import { PageWrapper } from "./PageWrapper";

const meta: Meta<typeof PageWrapper> = {
	title: "Components/PageWrapper",
	component: PageWrapper,
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

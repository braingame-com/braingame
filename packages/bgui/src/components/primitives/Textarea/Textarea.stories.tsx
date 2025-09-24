import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack } from "../Stack";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
	title: "Primitives/Textarea",
	component: Textarea,
	parameters: {
		docs: {
			description: {
				component: "Cross-platform multiline text input with decorator and variant support.",
			},
		},
	},
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
		},
		variant: {
			control: "select",
			options: ["solid", "soft", "outlined", "plain"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Share your thoughts",
	},
};

export const Variants: Story = {
	render: () => (
		<Stack spacing="md">
			<Textarea variant="solid" placeholder="Solid textarea" />
			<Textarea variant="soft" placeholder="Soft textarea" />
			<Textarea variant="outlined" placeholder="Outlined textarea" />
			<Textarea variant="plain" placeholder="Plain textarea" />
		</Stack>
	),
};

export const Sizes: Story = {
	render: () => (
		<Stack spacing="md">
			<Textarea size="sm" placeholder="Small" />
			<Textarea size="md" placeholder="Medium" />
			<Textarea size="lg" placeholder="Large" />
		</Stack>
	),
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState("This story is controlled.");

		return <Textarea value={value} onValueChange={setValue} fullWidth placeholder="Controlled" />;
	},
};

export const WithDecorators: Story = {
	render: () => (
		<Textarea
			startDecorator="📝"
			endDecorator={<span style={{ opacity: 0.6 }}>0/500</span>}
			placeholder="Describe your experience"
			fullWidth
		/>
	),
};

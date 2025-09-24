import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
	title: "Primitives/Radio",
	component: Radio,
	parameters: {
		docs: {
			description: {
				component: "Universal radio primitive that pairs with RadioGroup for managed state.",
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
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Radio",
		value: "radio",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Radio variant="solid" label="Solid" value="solid" />
			<Radio variant="soft" label="Soft" value="soft" />
			<Radio variant="outlined" label="Outlined" value="outlined" />
			<Radio variant="plain" label="Plain" value="plain" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Radio size="sm" label="Small" value="small" />
			<Radio size="md" label="Medium" value="medium" />
			<Radio size="lg" label="Large" value="large" />
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Radio color="primary" label="Primary" value="primary" />
			<Radio color="neutral" label="Neutral" value="neutral" />
			<Radio color="danger" label="Danger" value="danger" />
			<Radio color="success" label="Success" value="success" />
			<Radio color="warning" label="Warning" value="warning" />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: "Disabled",
		value: "disabled",
		disabled: true,
	},
};

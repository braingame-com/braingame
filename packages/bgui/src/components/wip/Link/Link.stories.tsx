// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta = {
	title: "Components/Link",
	component: Link,
	parameters: {
		docs: {
			description: {
				component: "A Link component that works across web and native platforms.",
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
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Link",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Link variant="solid">Solid</Link>
			<Link variant="soft">Soft</Link>
			<Link variant="outlined">Outlined</Link>
			<Link variant="plain">Plain</Link>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Link size="sm">Small</Link>
			<Link size="md">Medium</Link>
			<Link size="lg">Large</Link>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Link color="primary">Primary</Link>
			<Link color="neutral">Neutral</Link>
			<Link color="danger">Danger</Link>
			<Link color="success">Success</Link>
			<Link color="warning">Warning</Link>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Link",
		disabled: true,
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta = {
	title: "Components/Grid",
	component: Grid,
	parameters: {
		docs: {
			description: {
				component: "A Grid component that works across web and native platforms.",
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
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Grid",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Grid variant="solid">Solid</Grid>
			<Grid variant="soft">Soft</Grid>
			<Grid variant="outlined">Outlined</Grid>
			<Grid variant="plain">Plain</Grid>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Grid size="sm">Small</Grid>
			<Grid size="md">Medium</Grid>
			<Grid size="lg">Large</Grid>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Grid color="primary">Primary</Grid>
			<Grid color="neutral">Neutral</Grid>
			<Grid color="danger">Danger</Grid>
			<Grid color="success">Success</Grid>
			<Grid color="warning">Warning</Grid>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Grid",
		disabled: true,
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from ".";

const meta = {
	title: "Components/Divider",
	component: Divider,
	parameters: {
		docs: {
			description: {
				component: "A visual separator that supports horizontal and vertical orientations.",
			},
		},
	},
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			defaultValue: "horizontal",
		},
		inset: {
			control: "select",
			options: ["none", "context", "sm", "md", "lg"],
			defaultValue: "none",
		},
		variant: {
			control: "select",
			options: ["default", "subtle", "emphasized"],
			defaultValue: "default",
		},
	},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ padding: 20 }}>
			<div>Content above</div>
			<Divider />
			<div>Content below</div>
		</div>
	),
};

export const WithText: Story = {
	render: () => (
		<div style={{ padding: 20 }}>
			<div>Sign in with email</div>
			<Divider>OR</Divider>
			<div>Sign in with Google</div>
		</div>
	),
};

export const Vertical: Story = {
	render: () => (
		<div style={{ display: "flex", height: 100, alignItems: "center", padding: 20, gap: 16 }}>
			<div>Left content</div>
			<Divider orientation="vertical" />
			<div>Right content</div>
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ padding: 20, display: "grid", gap: 16 }}>
			<Divider variant="default">Default</Divider>
			<Divider variant="subtle">Subtle</Divider>
			<Divider variant="emphasized">Emphasized</Divider>
		</div>
	),
};

export const WithInset: Story = {
	render: () => (
		<div style={{ padding: 20 }}>
			<div>Full width divider:</div>
			<Divider />
			<div>Inset divider using context spacing:</div>
			<Divider inset="context" />
			<div>Inset divider with explicit spacing token:</div>
			<Divider inset="lg" />
		</div>
	),
};

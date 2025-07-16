import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { Divider } from "./Divider";

const meta = {
	title: "Components/Divider",
	component: Divider,
	parameters: {
		docs: {
			description: {
				component: "A visual separator that divides content horizontally or vertically.",
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
			options: ["none", "context"],
			defaultValue: "none",
		},
		thickness: {
			control: "number",
			defaultValue: 1,
		},
		color: {
			control: "text",
			defaultValue: "outline",
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
		<div style={{ display: "flex", height: 100, alignItems: "center", padding: 20 }}>
			<div>Left content</div>
			<Divider orientation="vertical" />
			<div>Right content</div>
		</div>
	),
};

export const CustomThickness: Story = {
	render: () => (
		<div style={{ padding: 20 }}>
			<Divider thickness={1} />
			<br />
			<Divider thickness={2} />
			<br />
			<Divider thickness={4} />
		</div>
	),
};

export const CustomColors: Story = {
	render: () => (
		<div style={{ padding: 20 }}>
			<Divider color="primary" />
			<br />
			<Divider color="error" />
			<br />
			<Divider color="#00ff00" />
		</div>
	),
};

export const WithInset: Story = {
	render: () => (
		<div style={{ "--divider-inset": "20px", padding: 20 } as React.CSSProperties}>
			<div>Full width divider:</div>
			<Divider />
			<div>Inset divider:</div>
			<Divider inset="context" />
		</div>
	),
};

export const InList: Story = {
	render: () => (
		<div style={{ maxWidth: 400, margin: "0 auto" }}>
			<div style={{ padding: "16px 24px" }}>Item 1</div>
			<Divider />
			<div style={{ padding: "16px 24px" }}>Item 2</div>
			<Divider />
			<div style={{ padding: "16px 24px" }}>Item 3</div>
		</div>
	),
};

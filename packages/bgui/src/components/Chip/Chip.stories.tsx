import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta = {
	title: "Components/Chip",
	component: Chip,
	parameters: {
		docs: {
			description: {
				component:
					"Chips represent complex entities in small blocks, such as a contact. They can be clickable and include decorators.",
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
		onClick: {
			action: "clicked",
		},
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Chip",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Chip variant="solid">Solid</Chip>
			<Chip variant="soft">Soft</Chip>
			<Chip variant="outlined">Outlined</Chip>
			<Chip variant="plain">Plain</Chip>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Chip size="sm">Small</Chip>
			<Chip size="md">Medium</Chip>
			<Chip size="lg">Large</Chip>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Chip color="primary">Primary</Chip>
			<Chip color="neutral">Neutral</Chip>
			<Chip color="danger">Danger</Chip>
			<Chip color="success">Success</Chip>
			<Chip color="warning">Warning</Chip>
		</div>
	),
};

export const Clickable: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Chip onClick={() => alert("Clicked!")}>Click me</Chip>
			<Chip color="primary" onClick={() => alert("Primary clicked!")}>
				Primary action
			</Chip>
			<Chip color="danger" onClick={() => alert("Danger clicked!")}>
				Delete
			</Chip>
		</div>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Chip startDecorator="👤">User</Chip>
			<Chip endDecorator="✖" onClick={() => alert("Remove")}>
				Removable
			</Chip>
			<Chip startDecorator="📧" endDecorator="(5)">
				Email
			</Chip>
			<Chip startDecorator="⭐" color="warning" variant="soft">
				Featured
			</Chip>
		</div>
	),
};

export const ChipGroup: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
			<Chip variant="soft" color="primary">
				React
			</Chip>
			<Chip variant="soft" color="primary">
				TypeScript
			</Chip>
			<Chip variant="soft" color="primary">
				JavaScript
			</Chip>
			<Chip variant="soft" color="primary">
				Node.js
			</Chip>
			<Chip variant="soft" color="primary">
				CSS
			</Chip>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Chip",
		disabled: true,
	},
};

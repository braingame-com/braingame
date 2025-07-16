import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		docs: {
			description: {
				component:
					"A Badge component that works across web and native platforms for labeling or providing status information.",
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
		dot: {
			control: "boolean",
		},
		invisible: {
			control: "boolean",
		},
		max: {
			control: "number",
		},
		badgeContent: {
			control: "text",
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
			<Badge badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Messages
				</div>
			</Badge>
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
			<Badge variant="solid" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Solid
				</div>
			</Badge>
			<Badge variant="soft" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Soft
				</div>
			</Badge>
			<Badge variant="outlined" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Outlined
				</div>
			</Badge>
			<Badge variant="plain" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Plain
				</div>
			</Badge>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
			<Badge size="sm" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Small
				</div>
			</Badge>
			<Badge size="md" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Medium
				</div>
			</Badge>
			<Badge size="lg" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Large
				</div>
			</Badge>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
			<Badge color="primary" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Primary
				</div>
			</Badge>
			<Badge color="neutral" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Neutral
				</div>
			</Badge>
			<Badge color="danger" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Danger
				</div>
			</Badge>
			<Badge color="success" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Success
				</div>
			</Badge>
			<Badge color="warning" badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Warning
				</div>
			</Badge>
		</div>
	),
};

export const DotBadge: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
			<Badge dot>
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Notifications
				</div>
			</Badge>
			<Badge dot color="danger">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Alerts
				</div>
			</Badge>
		</div>
	),
};

export const MaxValue: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
			<Badge badgeContent={99}>
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					99 Messages
				</div>
			</Badge>
			<Badge badgeContent={100} max={99}>
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					100+ Messages
				</div>
			</Badge>
		</div>
	),
};

export const Invisible: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
			<Badge badgeContent="4">
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Visible
				</div>
			</Badge>
			<Badge badgeContent="4" invisible>
				<div style={{ padding: "8px 12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
					Invisible
				</div>
			</Badge>
		</div>
	),
};

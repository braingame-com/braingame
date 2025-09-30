import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	parameters: {
		docs: {
			description: {
				component:
					"Avatars represent people or entities and fall back to initials or custom content when an image is unavailable.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["plain", "outlined", "soft", "solid"],
			defaultValue: "soft",
		},
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
			defaultValue: "neutral",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			defaultValue: "md",
		},
		src: {
			control: "text",
		},
		alt: {
			control: "text",
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "JD",
		alt: "Jordan Doe",
	},
};

export const WithImage: Story = {
	args: {
		src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		alt: "User profile",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Avatar variant="plain">P</Avatar>
			<Avatar variant="outlined">O</Avatar>
			<Avatar variant="soft">S</Avatar>
			<Avatar variant="solid">S</Avatar>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Avatar color="primary">P</Avatar>
			<Avatar color="neutral">N</Avatar>
			<Avatar color="danger">D</Avatar>
			<Avatar color="success">S</Avatar>
			<Avatar color="warning">W</Avatar>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Avatar size="sm">S</Avatar>
			<Avatar size="md">M</Avatar>
			<Avatar size="lg">L</Avatar>
		</div>
	),
};

export const WithFallback: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Avatar aria-label="Luna Lovegood" />
			<Avatar src="https://example.com/missing.jpg" alt="Bertie Bott">
				BB
			</Avatar>
			<Avatar>🌟</Avatar>
		</div>
	),
};

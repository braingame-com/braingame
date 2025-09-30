import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../primitives/Icon";
import { IconButton } from "./IconButton";

const meta = {
	title: "Components/IconButton",
	component: IconButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"IconButton wraps the Button primitive to present compact icon-only actions while preserving accessible labelling.",
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
			options: ["plain", "outlined", "soft", "solid"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		loading: {
			control: "boolean",
		},
		fullWidth: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		iconName: "search",
		"aria-label": "Search",
	},
};

export const WithCustomIcon: Story = {
	args: {
		children: <Icon name="favorite" accessibilityLabel="Favorite" />,
		"aria-label": "Favorite",
		color: "danger",
		variant: "soft",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16 }}>
			<IconButton iconName="search" variant="plain" aria-label="Plain" />
			<IconButton iconName="search" variant="outlined" aria-label="Outlined" />
			<IconButton iconName="search" variant="soft" aria-label="Soft" />
			<IconButton iconName="search" variant="solid" aria-label="Solid" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton iconName="menu" size="sm" aria-label="Small menu" />
			<IconButton iconName="menu" size="md" aria-label="Medium menu" />
			<IconButton iconName="menu" size="lg" aria-label="Large menu" />
		</div>
	),
};

export const LoadingStates: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton iconName="download" loading aria-label="Downloading" />
			<IconButton iconName="upload" loading loadingPosition="end" aria-label="Uploading" />
			<IconButton iconName="delete" variant="solid" loading aria-label="Deleting" />
		</div>
	),
};

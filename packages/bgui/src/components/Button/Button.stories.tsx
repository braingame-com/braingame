import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "ghost", "danger", "icon"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
		fullWidth: {
			control: "boolean",
		},
		icon: {
			control: "text",
		},
		iconPosition: {
			control: "select",
			options: ["left", "right"],
		},
		onPress: {
			action: "pressed",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary Button",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost Button",
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		children: "Delete",
	},
};

export const IconButton: Story = {
	args: {
		variant: "icon",
		icon: "close",
		"aria-label": "Close",
	},
};

export const WithIcon: Story = {
	args: {
		variant: "primary",
		icon: "plus",
		children: "Add Item",
	},
};

export const WithIconRight: Story = {
	args: {
		variant: "primary",
		icon: "arrow-right",
		iconPosition: "right",
		children: "Continue",
	},
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Button size="sm" onPress={() => console.log("Small clicked")}>
				Small
			</Button>
			<Button size="md" onPress={() => console.log("Medium clicked")}>
				Medium
			</Button>
			<Button size="lg" onPress={() => console.log("Large clicked")}>
				Large
			</Button>
		</div>
	),
};

export const Loading: Story = {
	args: {
		loading: true,
		children: "Loading...",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled Button",
	},
};

export const FullWidth: Story = {
	args: {
		fullWidth: true,
		children: "Full Width Button",
	},
	parameters: {
		layout: "padded",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 16, width: 200 }}>
			<Button variant="primary" onPress={() => console.log("Primary clicked")}>
				Primary
			</Button>
			<Button variant="secondary" onPress={() => console.log("Secondary clicked")}>
				Secondary
			</Button>
			<Button variant="ghost" onPress={() => console.log("Ghost clicked")}>
				Ghost
			</Button>
			<Button variant="danger" onPress={() => console.log("Danger clicked")}>
				Danger
			</Button>
			<Button variant="primary" disabled onPress={() => console.log("Disabled clicked")}>
				Disabled
			</Button>
			<Button variant="primary" loading onPress={() => console.log("Loading clicked")}>
				Loading
			</Button>
			<Button variant="primary" icon="star" onPress={() => console.log("Icon clicked")}>
				With Icon
			</Button>
		</div>
	),
};

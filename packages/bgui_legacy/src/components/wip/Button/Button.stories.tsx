import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * Buttons are used to trigger actions. They're the primary way users interact with your app.
 *
 * ## Best Practices
 *
 * - Use descriptive, action-oriented labels (e.g., "Save Changes" not "Submit")
 * - Only one primary button per screen/section
 * - Provide loading states for async actions
 * - Always include aria-label for icon-only buttons
 */
const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"The Button component is the primary way for users to trigger actions in your app.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			description: "The visual style of the button",
			table: {
				defaultValue: { summary: "primary" },
			},
		},
		size: {
			control: "select",
			description: "The size of the button",
			table: {
				defaultValue: { summary: "md" },
			},
		},
		loading: {
			control: "boolean",
			description: "Shows a loading spinner instead of button content",
		},
		disabled: {
			control: "boolean",
			description: "Prevents interaction with the button",
		},
		fullWidth: {
			control: "boolean",
			description: "Makes the button expand to fill its container",
		},
		icon: {
			control: "text",
			description: "Name of the icon to display",
		},
		iconPosition: {
			control: "radio",
			options: ["left", "right"],
			description: "Position of the icon relative to text",
			table: {
				defaultValue: { summary: "left" },
			},
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default button appearance. Use for primary actions like "Save" or "Submit".
 */
export const Default: Story = {
	args: {
		children: "Click me",
		onPress: () => console.log("Button pressed"),
	},
};

/**
 * Different visual variants for various use cases.
 */
export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Button onPress={() => {}}>Primary</Button>
			<Button variant="secondary" onPress={() => {}}>
				Secondary
			</Button>
			<Button variant="ghost" onPress={() => {}}>
				Ghost
			</Button>
			<Button variant="danger" onPress={() => {}}>
				Danger
			</Button>
		</div>
	),
};

/**
 * Available button sizes. Choose based on importance and available space.
 */
export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Button size="sm" onPress={() => {}}>
				Small
			</Button>
			<Button size="md" onPress={() => {}}>
				Medium
			</Button>
			<Button size="lg" onPress={() => {}}>
				Large
			</Button>
		</div>
	),
};

/**
 * Buttons can include icons to improve clarity and visual hierarchy.
 */
export const WithIcons: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Button icon="settings" onPress={() => {}}>
				Settings
			</Button>
			<Button icon="arrow-right" iconPosition="right" onPress={() => {}}>
				Next Step
			</Button>
			<Button variant="danger" icon="trash" onPress={() => {}}>
				Delete
			</Button>
		</div>
	),
};

/**
 * Icon-only buttons for toolbars and compact UIs. Always include aria-label!
 */
export const IconOnly: Story = {
	args: {
		variant: "icon",
		icon: "settings",
		"aria-label": "Open settings",
		onPress: () => console.log("Settings opened"),
	},
};

/**
 * Different button states that affect interaction and appearance.
 */
export const States: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Button onPress={() => {}}>Normal</Button>
			<Button loading onPress={() => {}}>
				Loading
			</Button>
			<Button disabled onPress={() => {}}>
				Disabled
			</Button>
			<Button loading disabled onPress={() => {}}>
				Loading + Disabled
			</Button>
		</div>
	),
};

/**
 * Full width buttons expand to fill their container. Useful for mobile layouts.
 */
export const FullWidth: Story = {
	args: {
		children: "Full Width Button",
		fullWidth: true,
		onPress: () => {},
	},
	decorators: [
		(Story) => (
			<div style={{ width: 300 }}>
				<Story />
			</div>
		),
	],
};

/**
 * Real-world usage examples showing buttons in context.
 */
export const UsageExamples: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
			{/* Form Actions */}
			<div>
				<h3>Form Actions</h3>
				<div style={{ display: "flex", gap: 8 }}>
					<Button variant="ghost" onPress={() => {}}>
						Cancel
					</Button>
					<Button onPress={() => {}}>Save Changes</Button>
				</div>
			</div>

			{/* Confirmation Dialog */}
			<div>
				<h3>Confirmation Dialog</h3>
				<div style={{ display: "flex", gap: 8 }}>
					<Button variant="secondary" onPress={() => {}}>
						Cancel
					</Button>
					<Button variant="danger" icon="trash" onPress={() => {}}>
						Delete Account
					</Button>
				</div>
			</div>

			{/* Loading State */}
			<div>
				<h3>Async Action</h3>
				<Button loading icon="upload" onPress={() => {}}>
					Uploading...
				</Button>
			</div>
		</div>
	),
};

/**
 * Interactive playground to experiment with all button props.
 */
export const Playground: Story = {
	args: {
		children: "Playground Button",
		variant: "primary",
		size: "md",
		icon: "star",
		iconPosition: "left",
		fullWidth: false,
		disabled: false,
		loading: false,
		onPress: () => alert("Button pressed!"),
	},
};

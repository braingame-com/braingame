import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Button } from "./Button";

/**
 * Material 3 Button Component
 *
 * The Button component implements all 5 Material Design 3 button variants,
 * each serving different emphasis levels in the UI hierarchy.
 *
 * ## Variants
 *
 * - **Filled**: High emphasis, primary actions (Submit, Save)
 * - **Outlined**: Medium emphasis, secondary actions (Cancel, Learn More)
 * - **Text**: Low emphasis, tertiary actions (Skip, Dismiss)
 * - **Elevated**: Filled button with shadow for prominence
 * - **Tonal**: Filled with secondary color for alternative actions
 *
 * ## Features
 *
 * - Full M3 compliance with proper elevation and motion
 * - Ripple effects on Android, scale animation on iOS
 * - Accessibility support with proper touch targets
 * - Loading and disabled states
 * - Icon support with flexible positioning
 */
const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		docs: {
			description: {
				component:
					"Material Design 3 compliant button with 5 variants for different emphasis levels.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["filled", "outlined", "text", "elevated", "tonal"],
			description: "Visual style variant",
			table: {
				defaultValue: { summary: "filled" },
			},
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"],
			description: "Button size",
			table: {
				defaultValue: { summary: "medium" },
			},
		},
		label: {
			control: "text",
			description: "Button label text",
		},
		icon: {
			control: "select",
			options: [undefined, "add", "edit", "delete", "save", "share", "favorite"],
			description: "Optional icon",
		},
		iconPosition: {
			control: "radio",
			options: ["start", "end"],
			description: "Icon position relative to label",
			table: {
				defaultValue: { summary: "start" },
			},
		},
		fullWidth: {
			control: "boolean",
			description: "Whether button fills container width",
			table: {
				defaultValue: { summary: false },
			},
		},
		disabled: {
			control: "boolean",
			description: "Disabled state",
			table: {
				defaultValue: { summary: false },
			},
		},
		loading: {
			control: "boolean",
			description: "Loading state",
			table: {
				defaultValue: { summary: false },
			},
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default filled button for primary actions
 */
export const Default: Story = {
	args: {
		label: "Click me",
		onPress: () => console.log("Button pressed"),
	},
};

/**
 * All button variants demonstrating the emphasis hierarchy
 */
export const AllVariants: Story = {
	render: () => (
		<View style={{ gap: 16, padding: 16 }}>
			<Button variant="filled" label="Filled Button" onPress={() => {}} />
			<Button variant="outlined" label="Outlined Button" onPress={() => {}} />
			<Button variant="text" label="Text Button" onPress={() => {}} />
			<Button variant="elevated" label="Elevated Button" onPress={() => {}} />
			<Button variant="tonal" label="Tonal Button" onPress={() => {}} />
		</View>
	),
};

/**
 * Buttons with icons showing different positions
 */
export const WithIcons: Story = {
	render: () => (
		<View style={{ gap: 16, padding: 16 }}>
			<Button variant="filled" icon="add" label="Add Item" onPress={() => {}} />
			<Button
				variant="outlined"
				icon="edit"
				iconPosition="end"
				label="Edit Profile"
				onPress={() => {}}
			/>
			<Button variant="tonal" icon="share" label="Share" onPress={() => {}} />
		</View>
	),
};

/**
 * Different button sizes
 */
export const Sizes: Story = {
	render: () => (
		<View style={{ gap: 16, padding: 16, alignItems: "flex-start" }}>
			<Button size="small" label="Small Button" onPress={() => {}} />
			<Button size="medium" label="Medium Button" onPress={() => {}} />
			<Button size="large" label="Large Button" onPress={() => {}} />
		</View>
	),
};

/**
 * Button states including disabled and loading
 */
export const States: Story = {
	render: () => (
		<View style={{ gap: 16, padding: 16 }}>
			<Button label="Normal" onPress={() => {}} />
			<Button label="Disabled" disabled onPress={() => {}} />
			<Button label="Loading" loading onPress={() => {}} />
			<Button variant="outlined" label="Disabled Outlined" disabled onPress={() => {}} />
		</View>
	),
};

/**
 * Full width buttons for forms
 */
export const FullWidth: Story = {
	render: () => (
		<View style={{ gap: 16, padding: 16 }}>
			<Button variant="filled" label="Submit Form" fullWidth onPress={() => {}} />
			<Button variant="outlined" label="Cancel" fullWidth onPress={() => {}} />
		</View>
	),
};

/**
 * Common button patterns in real applications
 */
export const CommonPatterns: Story = {
	render: () => (
		<View style={{ gap: 24, padding: 16 }}>
			{/* Dialog actions */}
			<View>
				<Text style={{ marginBottom: 8, fontWeight: "600" }}>Dialog Actions</Text>
				<View style={{ flexDirection: "row", gap: 8, justifyContent: "flex-end" }}>
					<Button variant="text" label="Cancel" onPress={() => {}} />
					<Button variant="filled" label="Save" onPress={() => {}} />
				</View>
			</View>

			{/* Form actions */}
			<View>
				<Text style={{ marginBottom: 8, fontWeight: "600" }}>Form Actions</Text>
				<View style={{ gap: 8 }}>
					<Button variant="filled" label="Submit" fullWidth onPress={() => {}} />
					<Button variant="outlined" label="Reset" fullWidth onPress={() => {}} />
				</View>
			</View>

			{/* Card actions */}
			<View>
				<Text style={{ marginBottom: 8, fontWeight: "600" }}>Card Actions</Text>
				<View style={{ flexDirection: "row", gap: 8 }}>
					<Button variant="tonal" icon="favorite" label="Like" size="small" onPress={() => {}} />
					<Button variant="tonal" icon="share" label="Share" size="small" onPress={() => {}} />
				</View>
			</View>
		</View>
	),
};

// Import Text for the examples
const Text = ({ children, style }: any) => (
	<View style={style}>
		<Text>{children}</Text>
	</View>
);

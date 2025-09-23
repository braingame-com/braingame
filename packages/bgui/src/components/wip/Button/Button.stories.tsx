// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "./Button";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		docs: {
			description: {
				component:
					"Buttons trigger actions or events when activated. They communicate calls to action to the user and allow them to interact with pages.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "soft", "outlined", "plain"],
			defaultValue: "solid",
		},
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
			defaultValue: "primary",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			defaultValue: "md",
		},
		disabled: {
			control: "boolean",
			defaultValue: false,
		},
		loading: {
			control: "boolean",
			defaultValue: false,
		},
		fullWidth: {
			control: "boolean",
			defaultValue: false,
		},
		loadingPosition: {
			control: "select",
			options: ["start", "center", "end"],
			defaultValue: "center",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
			<Button variant="solid">Solid</Button>
			<Button variant="soft">Soft</Button>
			<Button variant="outlined">Outlined</Button>
			<Button variant="plain">Plain</Button>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
			<Button color="primary">Primary</Button>
			<Button color="neutral">Neutral</Button>
			<Button color="danger">Danger</Button>
			<Button color="success">Success</Button>
			<Button color="warning">Warning</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
			<Button startDecorator="🚀">Launch</Button>
			<Button endDecorator="→">Next</Button>
			<Button startDecorator="←" endDecorator="→">
				Previous & Next
			</Button>
		</div>
	),
};

export const Loading: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
			<Button loading>Loading</Button>
			<Button loading loadingPosition="start">
				Loading Start
			</Button>
			<Button loading loadingPosition="end">
				Loading End
			</Button>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
			<Button disabled>Disabled</Button>
			<Button disabled variant="soft">
				Disabled Soft
			</Button>
			<Button disabled variant="outlined">
				Disabled Outlined
			</Button>
		</div>
	),
};

export const FullWidth: Story = {
	render: () => (
		<div style={{ maxWidth: 400 }}>
			<Button fullWidth>Full Width Button</Button>
			<div style={{ marginTop: 10 }}>
				<Button fullWidth variant="outlined">
					Full Width Outlined
				</Button>
			</div>
		</div>
	),
};

export const AllVariantsAndColors: Story = {
	render: () => {
		const variants = ["solid", "soft", "outlined", "plain"] as const;
		const colors = ["primary", "neutral", "danger", "success", "warning"] as const;

		return (
			<div>
				{variants.map((variant) => (
					<div key={variant} style={{ marginBottom: 20 }}>
						<h3 style={{ marginBottom: 10 }}>
							{variant.charAt(0).toUpperCase() + variant.slice(1)}
						</h3>
						<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
							{colors.map((color) => (
								<Button key={`${variant}-${color}`} variant={variant} color={color}>
									{color}
								</Button>
							))}
						</div>
					</div>
				))}
			</div>
		);
	},
};

export const Interactive: Story = {
	render: () => {
		const [count, setCount] = React.useState(0);

		return (
			<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
				<Button onClick={() => setCount(count - 1)} color="danger">
					-
				</Button>
				<span style={{ minWidth: 50, textAlign: "center" }}>{count}</span>
				<Button onClick={() => setCount(count + 1)} color="success">
					+
				</Button>
				<Button onClick={() => setCount(0)} variant="soft" color="neutral">
					Reset
				</Button>
			</div>
		);
	},
};

export const WithCustomStyles: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10 }}>
			<Button
				style={{
					background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
					border: 0,
					borderRadius: 3,
					boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
					color: "white",
				}}
			>
				Gradient Button
			</Button>
			<Button
				style={{
					borderRadius: 999,
					paddingLeft: 24,
					paddingRight: 24,
				}}
			>
				Pill Button
			</Button>
		</div>
	),
};

export const AccessibilityExample: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
			<Button aria-label="Save document">Save</Button>
			<Button aria-pressed={true} variant="soft">
				Toggle (On)
			</Button>
			<Button aria-pressed={false} variant="outlined">
				Toggle (Off)
			</Button>
		</div>
	),
};

export const FormExample: Story = {
	render: () => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				alert("Form submitted!");
			}}
			style={{ display: "flex", gap: 10 }}
		>
			<Button type="submit" color="success">
				Submit
			</Button>
			<Button type="reset" variant="soft" color="neutral">
				Reset
			</Button>
			<Button type="button" variant="outlined" color="danger">
				Cancel
			</Button>
		</form>
	),
};

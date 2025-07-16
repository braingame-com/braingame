import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Container } from "./Container";

const meta = {
	title: "Components/Container",
	component: Container,
	parameters: {
		docs: {
			description: {
				component:
					"Container centers your content horizontally with responsive max-width constraints.",
			},
		},
	},
	argTypes: {
		maxWidth: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl", false],
			defaultValue: "lg",
			description: "Determine the max-width of the container",
		},
		disableGutters: {
			control: "boolean",
			defaultValue: false,
			description: "If true, the left and right padding is removed",
		},
		fixed: {
			control: "boolean",
			defaultValue: false,
			description: "Set max-width to match min-width of current breakpoint",
		},
	},
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
	<div
		style={{
			backgroundColor: "rgba(0, 123, 255, 0.1)",
			padding: "20px",
			borderRadius: "8px",
			textAlign: "center",
		}}
	>
		<h2>Container Content</h2>
		<p>
			This content is wrapped in a Container component that provides responsive max-width and
			centering.
		</p>
	</div>
);

export const Default: Story = {
	render: () => (
		<Container>
			<DemoContent />
		</Container>
	),
};

export const MaxWidthSizes: Story = {
	render: () => (
		<div>
			<h3>Extra Small (xs: 444px)</h3>
			<Container maxWidth="xs">
				<DemoContent />
			</Container>

			<h3>Small (sm: 600px)</h3>
			<Container maxWidth="sm">
				<DemoContent />
			</Container>

			<h3>Medium (md: 900px)</h3>
			<Container maxWidth="md">
				<DemoContent />
			</Container>

			<h3>Large (lg: 1200px) - Default</h3>
			<Container maxWidth="lg">
				<DemoContent />
			</Container>

			<h3>Extra Large (xl: 1536px)</h3>
			<Container maxWidth="xl">
				<DemoContent />
			</Container>
		</div>
	),
};

export const NoMaxWidth: Story = {
	render: () => (
		<Container maxWidth={false}>
			<DemoContent />
		</Container>
	),
	parameters: {
		docs: {
			description: {
				story: "When maxWidth is false, the container has no width constraints.",
			},
		},
	},
};

export const DisabledGutters: Story = {
	render: () => (
		<div>
			<h3>With Gutters (Default)</h3>
			<div style={{ backgroundColor: "#f0f0f0" }}>
				<Container>
					<DemoContent />
				</Container>
			</div>

			<h3>Without Gutters</h3>
			<div style={{ backgroundColor: "#f0f0f0", marginTop: "20px" }}>
				<Container disableGutters>
					<DemoContent />
				</Container>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "The disableGutters prop removes horizontal padding.",
			},
		},
	},
};

export const FixedMode: Story = {
	render: () => (
		<div>
			<h3>Fluid Mode (Default)</h3>
			<Container maxWidth="md">
				<DemoContent />
			</Container>

			<h3>Fixed Mode</h3>
			<Container maxWidth="md" fixed>
				<DemoContent />
			</Container>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "Fixed mode sets the max-width to match the min-width of the current breakpoint.",
			},
		},
	},
};

export const NestedContainers: Story = {
	render: () => (
		<Container maxWidth="lg">
			<div style={{ backgroundColor: "#e0e0e0", padding: "20px" }}>
				<h2>Outer Container (lg)</h2>
				<Container maxWidth="md">
					<div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
						<h3>Nested Container (md)</h3>
						<p>Containers can be nested to create more complex layouts.</p>
					</div>
				</Container>
			</div>
		</Container>
	),
};

export const WithCustomStyles: Story = {
	render: () => (
		<Container
			maxWidth="md"
			style={{
				backgroundColor: "#f5f5f5",
				padding: "40px 0",
				borderRadius: "12px",
			}}
		>
			<DemoContent />
		</Container>
	),
	parameters: {
		docs: {
			description: {
				story: "Custom styles can be applied via the style prop.",
			},
		},
	},
};

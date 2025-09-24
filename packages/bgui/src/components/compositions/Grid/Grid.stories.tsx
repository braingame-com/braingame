import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { Grid } from ".";

const meta = {
	title: "Components/Grid",
	component: Grid,
	parameters: {
		docs: {
			description: {
				component:
					"A responsive flex-based grid that adapts to theme breakpoints and spacing tokens.",
			},
		},
	},
	argTypes: {
		spacing: {
			control: "select",
			options: ["none", "xs", "sm", "md", "lg", "xl"],
		},
		direction: {
			control: "select",
			options: ["row", "row-reverse", "column", "column-reverse"],
		},
	},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			background: "var(--storybook-grid-item-bg, #f4f4f5)",
			borderRadius: 8,
			padding: 16,
			textAlign: "center",
		}}
	>
		{children}
	</div>
);

const demoCards = Array.from({ length: 6 }, (_, index) => ({
	id: `card-${index + 1}`,
	label: `Card ${index + 1}`,
}));

export const Basic: Story = {
	render: () => (
		<Grid container spacing="md">
			<Grid item xs={12} sm={6} md={4}>
				<Item>Item 1</Item>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Item>Item 2</Item>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Item>Item 3</Item>
			</Grid>
		</Grid>
	),
};

export const ResponsiveColumns: Story = {
	render: () => (
		<Grid container spacing={{ xs: "sm", md: "lg" }}>
			{demoCards.map((card) => (
				<Grid key={card.id} item xs={12} sm={6} lg={4}>
					<Item>{card.label}</Item>
				</Grid>
			))}
		</Grid>
	),
};

export const NestedGrids: Story = {
	render: () => (
		<Grid container spacing="md">
			<Grid item xs={12} md={8}>
				<Item>Primary content</Item>
			</Grid>
			<Grid item xs={12} md={4}>
				<Grid container spacing="sm">
					<Grid item xs={12}>
						<Item>Secondary A</Item>
					</Grid>
					<Grid item xs={12}>
						<Item>Secondary B</Item>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	),
};

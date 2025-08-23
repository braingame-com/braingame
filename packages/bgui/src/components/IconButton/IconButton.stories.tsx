import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

// Example icon components for demonstration
const SearchIcon = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-label="Search">
		<title>Search</title>
		<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
	</svg>
);

const AddIcon = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-label="Add">
		<title>Add</title>
		<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
	</svg>
);

const DeleteIcon = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-label="Delete">
		<title>Delete</title>
		<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
	</svg>
);

const HeartIcon = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-label="Heart">
		<title>Heart</title>
		<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
	</svg>
);

const SettingsIcon = () => (
	<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-label="Settings">
		<title>Settings</title>
		<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
	</svg>
);

const meta = {
	title: "Components/IconButton",
	component: IconButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"IconButton allows users to take actions with a single tap. It's typically used for secondary actions or in space-constrained layouts.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: { type: "select" },
			options: ["primary", "neutral", "danger", "success", "warning"],
		},
		variant: {
			control: { type: "select" },
			options: ["plain", "outlined", "soft", "solid"],
		},
		size: {
			control: { type: "select" },
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
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <SearchIcon />,
		"aria-label": "Search",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton variant="plain" aria-label="Plain search">
				<SearchIcon />
			</IconButton>
			<IconButton variant="outlined" aria-label="Outlined search">
				<SearchIcon />
			</IconButton>
			<IconButton variant="soft" aria-label="Soft search">
				<SearchIcon />
			</IconButton>
			<IconButton variant="solid" aria-label="Solid search">
				<SearchIcon />
			</IconButton>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton color="primary" variant="solid" aria-label="Primary add">
				<AddIcon />
			</IconButton>
			<IconButton color="neutral" variant="solid" aria-label="Neutral settings">
				<SettingsIcon />
			</IconButton>
			<IconButton color="danger" variant="solid" aria-label="Danger delete">
				<DeleteIcon />
			</IconButton>
			<IconButton color="success" variant="solid" aria-label="Success heart">
				<HeartIcon />
			</IconButton>
			<IconButton color="warning" variant="solid" aria-label="Warning settings">
				<SettingsIcon />
			</IconButton>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton size="sm" variant="outlined" aria-label="Small search">
				<SearchIcon />
			</IconButton>
			<IconButton size="md" variant="outlined" aria-label="Medium search">
				<SearchIcon />
			</IconButton>
			<IconButton size="lg" variant="outlined" aria-label="Large search">
				<SearchIcon />
			</IconButton>
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton aria-label="Normal search">
				<SearchIcon />
			</IconButton>
			<IconButton disabled aria-label="Disabled search">
				<SearchIcon />
			</IconButton>
			<IconButton loading aria-label="Loading search">
				<SearchIcon />
			</IconButton>
		</div>
	),
};

export const AsLink: Story = {
	args: {
		href: "https://example.com",
		children: <SearchIcon />,
		"aria-label": "Search link",
		variant: "outlined",
	},
};

export const ColoredVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			{(["plain", "outlined", "soft", "solid"] as const).map((variant) => (
				<div key={variant} style={{ display: "flex", gap: 16, alignItems: "center" }}>
					<span style={{ width: 80, fontSize: 14 }}>{variant}:</span>
					{(["primary", "neutral", "danger", "success", "warning"] as const).map((color) => (
						<IconButton
							key={color}
							variant={variant}
							color={color}
							aria-label={`${variant} ${color}`}
						>
							<AddIcon />
						</IconButton>
					))}
				</div>
			))}
		</div>
	),
};

export const LoadingStates: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton loading size="sm" variant="soft" aria-label="Loading small">
				<SearchIcon />
			</IconButton>
			<IconButton loading size="md" variant="soft" aria-label="Loading medium">
				<SearchIcon />
			</IconButton>
			<IconButton loading size="lg" variant="soft" aria-label="Loading large">
				<SearchIcon />
			</IconButton>
		</div>
	),
};

export const WithCustomLoadingIndicator: Story = {
	args: {
		loading: true,
		loadingIndicator: <span style={{ fontSize: 12 }}>...</span>,
		children: <SearchIcon />,
		"aria-label": "Custom loading",
		variant: "outlined",
	},
};

export const AccessibilityExample: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton aria-label="Delete item" aria-describedby="delete-description" color="danger">
				<DeleteIcon />
			</IconButton>
			<span id="delete-description" style={{ fontSize: 14 }}>
				This will permanently delete the item
			</span>
		</div>
	),
};

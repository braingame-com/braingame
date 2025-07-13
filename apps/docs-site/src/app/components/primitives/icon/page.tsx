"use client";

import { Button, Icon } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const iconProps = [
	{
		name: "name",
		type: "string",
		required: true,
		description:
			"Material icon name. Use Material Icons Rounded for consistent design. See https://fonts.google.com/icons for available icons.",
	},
	{
		name: "size",
		type: "number | 'small' | 'medium' | 'large'",
		required: false,
		default: "24",
		description:
			"Icon size. Can be a number for exact pixel size, or predefined sizes: small (16), medium (24), large (32).",
	},
	{
		name: "color",
		type: "string",
		required: false,
		description:
			"Icon color. Accepts any valid color value (hex, rgb, named colors, or theme colors).",
	},
	{
		name: "style",
		type: "StyleProp<TextStyle>",
		required: false,
		description: "Custom styles to apply to the icon.",
	},
];

// Common icon categories with examples
const iconCategories = {
	navigation: [
		{ name: "arrow_back", label: "Back" },
		{ name: "arrow_forward", label: "Forward" },
		{ name: "menu", label: "Menu" },
		{ name: "close", label: "Close" },
		{ name: "home", label: "Home" },
		{ name: "search", label: "Search" },
	],
	actions: [
		{ name: "add", label: "Add" },
		{ name: "edit", label: "Edit" },
		{ name: "delete", label: "Delete" },
		{ name: "save", label: "Save" },
		{ name: "share", label: "Share" },
		{ name: "download", label: "Download" },
	],
	media: [
		{ name: "play_arrow", label: "Play" },
		{ name: "pause", label: "Pause" },
		{ name: "stop", label: "Stop" },
		{ name: "skip_next", label: "Next" },
		{ name: "skip_previous", label: "Previous" },
		{ name: "volume_up", label: "Volume" },
	],
	communication: [
		{ name: "email", label: "Email" },
		{ name: "chat", label: "Chat" },
		{ name: "phone", label: "Phone" },
		{ name: "notifications", label: "Notifications" },
		{ name: "send", label: "Send" },
		{ name: "inbox", label: "Inbox" },
	],
	status: [
		{ name: "check_circle", label: "Success" },
		{ name: "error", label: "Error" },
		{ name: "warning", label: "Warning" },
		{ name: "info", label: "Info" },
		{ name: "help", label: "Help" },
		{ name: "schedule", label: "Pending" },
	],
	ui: [
		{ name: "settings", label: "Settings" },
		{ name: "person", label: "User" },
		{ name: "favorite", label: "Favorite" },
		{ name: "star", label: "Star" },
		{ name: "visibility", label: "Visible" },
		{ name: "visibility_off", label: "Hidden" },
	],
};

export default function IconDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Icon</h1>
			<p className="text-subtitle text-secondary mb-8">
				Icons communicate meaning at a glance, and should be used consistently throughout your
				application. Brain Game uses Material Icons Rounded for a friendly, modern appearance.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Icon Gallery</h2>
				<p className="text-body mb-4">
					Explore commonly used icons organized by category. All icons use Material Icons Rounded
					for consistency.
				</p>

				{Object.entries(iconCategories).map(([category, icons]) => (
					<LiveExample
						key={category}
						title={category.charAt(0).toUpperCase() + category.slice(1)}
						code={`<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
  ${icons.map((icon) => `<Icon name="${icon.name}" size="lg" />`).join("\n  ")}
</div>`}
					>
						<div
							className="grid"
							style={{
								gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
								gap: "var(--space-4)",
							}}
						>
							{icons.map((icon) => (
								<button
									key={icon.name}
									type="button"
									className="card"
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "var(--space-2)",
										padding: "var(--space-4)",
										cursor: "pointer",
										transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
										border: "none",
										background: "var(--color-surface)",
										width: "100%",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "translateY(-2px)";
										e.currentTarget.style.boxShadow = "var(--shadow-md)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "";
										e.currentTarget.style.boxShadow = "";
									}}
								>
									<Icon name={icon.name} size="lg" color="var(--color-on-surface)" />
									<span className="text-small" style={{ fontFamily: "var(--font-mono)" }}>
										{icon.name}
									</span>
									<span className="text-small text-secondary">{icon.label}</span>
								</button>
							))}
						</div>
					</LiveExample>
				))}
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Sizes"
					code={`<Icon name="favorite" size="sm" />
<Icon name="favorite" size="md" />
<Icon name="favorite" size="lg" />
<Icon name="favorite" size={48} />`}
				>
					<div className="flex flex--gap-3" style={{ alignItems: "center" }}>
						<Icon name="favorite" size="sm" color="var(--color-tertiary)" />
						<Icon name="favorite" size="md" color="var(--color-tertiary)" />
						<Icon name="favorite" size="lg" color="var(--color-tertiary)" />
						<Icon name="favorite" size={48} color="var(--color-tertiary)" />
					</div>
				</LiveExample>

				<LiveExample
					title="Colors"
					code={`<Icon name="circle" color="var(--color-primary)" />
<Icon name="circle" color="var(--color-secondary)" />
<Icon name="circle" color="var(--color-tertiary)" />
<Icon name="circle" color="var(--color-success)" />
<Icon name="circle" color="var(--color-warning)" />
<Icon name="circle" color="var(--color-error)" />`}
				>
					<div className="flex flex--gap-3">
						<Icon name="circle" size="lg" color="var(--color-primary)" />
						<Icon name="circle" size="lg" color="var(--color-secondary)" />
						<Icon name="circle" size="lg" color="var(--color-tertiary)" />
						<Icon name="circle" size="lg" color="var(--color-success)" />
						<Icon name="circle" size="lg" color="var(--color-warning)" />
						<Icon name="circle" size="lg" color="var(--color-error)" />
					</div>
				</LiveExample>

				<LiveExample
					title="With Button"
					code={`import { Button, Icon } from '@braingame/bgui';

<Button onPress={() => {}} icon="add">
  Add Item
</Button>

<Button onPress={() => {}} variant="icon" aria-label="Settings">
  <Icon name="settings" />
</Button>`}
				>
					<div className="flex flex--gap-3">
						<Button onPress={() => {}} icon="add">
							Add Item
						</Button>
						<Button onPress={() => {}} icon="delete" variant="danger">
							Delete
						</Button>
						<Button onPress={() => {}} variant="icon" aria-label="Settings">
							<Icon name="settings" />
						</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Interactive States"
					code={`<View style={{ opacity: disabled ? 0.38 : 1 }}>
  <Icon name="edit" color="var(--color-on-surface)" />
</View>

<Pressable onPress={() => {}}>
  {({ pressed }) => (
    <Icon 
      name="favorite" 
      color={pressed ? "var(--color-error)" : "var(--color-outline)"} 
    />
  )}
</Pressable>`}
				>
					<div className="flex flex--gap-4">
						<div style={{ opacity: 0.38 }}>
							<Icon name="edit" size="lg" color="var(--color-on-surface)" />
							<span className="text-small text-secondary">Disabled</span>
						</div>
						<button
							type="button"
							style={{
								cursor: "pointer",
								border: "none",
								background: "none",
								padding: 0,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "var(--space-1)",
							}}
							onMouseDown={(e) => {
								const svg = e.currentTarget.querySelector("svg");
								if (svg) svg.style.color = "var(--color-error)";
							}}
							onMouseUp={(e) => {
								const svg = e.currentTarget.querySelector("svg");
								if (svg) svg.style.color = "var(--color-outline)";
							}}
						>
							<Icon name="favorite" size="lg" color="var(--color-outline)" />
							<span className="text-small text-secondary">Press me</span>
						</button>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Icon } from '@braingame/bgui';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Icon name="home" size="lg" color="#3b73f5" />
      <Text>Welcome Home</Text>
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Consistent sizing:</strong> Use predefined sizes (small, medium, large) for
						consistency across your app.
					</li>
					<li className="mb-2">
						<strong>Semantic colors:</strong> Use theme colors rather than hard-coded values to
						support light/dark modes.
					</li>
					<li className="mb-2">
						<strong>Meaningful icons:</strong> Choose icons that clearly communicate their purpose.
						When in doubt, pair with text labels.
					</li>
					<li className="mb-2">
						<strong>Touch targets:</strong> For interactive icons, ensure the touch target is at
						least 44x44 pixels by adding padding.
					</li>
					<li className="mb-2">
						<strong>Loading states:</strong> Consider replacing action icons with spinners during
						async operations.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">
					Icons are decorative by default and hidden from screen readers. For interactive icons:
				</p>
				<ul>
					<li>Always provide an aria-label for icon-only buttons</li>
					<li>Use descriptive labels that explain the action, not the icon</li>
					<li>Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large icons)</li>
					<li>Provide text alternatives when icons convey important information</li>
				</ul>
			</section>

			<PropsTable props={iconProps} />
		</div>
	);
}

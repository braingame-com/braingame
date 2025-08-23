"use client";

import { Button } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const buttonProps = [
	{
		name: "children",
		type: "ReactNode",
		required: false,
		description: "The content to display inside the button. Can be text, icons, or any React node.",
	},
	{
		name: "onPress",
		type: "() => void",
		required: true,
		description:
			"Callback function triggered when the button is pressed. Required for all buttons to ensure accessibility.",
	},
	{
		name: "variant",
		type: '"primary" | "secondary" | "ghost" | "danger" | "icon"',
		required: false,
		default: '"primary"',
		description:
			"Visual style variant of the button. Primary for main actions, secondary for less emphasis, ghost for minimal styling, danger for destructive actions, icon for icon-only buttons.",
	},
	{
		name: "size",
		type: '"small" | "medium" | "large"',
		required: false,
		default: '"medium"',
		description: "Size variant affecting padding and font size.",
	},
	{
		name: "icon",
		type: "string",
		required: false,
		description: "Name of the Material icon to display in the button.",
	},
	{
		name: "iconPosition",
		type: '"left" | "right"',
		required: false,
		default: '"left"',
		description: "Position of the icon relative to the button text.",
	},
	{
		name: "fullWidth",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the button should expand to fill its container width.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the button is disabled and cannot be interacted with.",
	},
	{
		name: "loading",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the button is in a loading state. Shows a spinner instead of content.",
	},
	{
		name: "aria-label",
		type: "string",
		required: false,
		description:
			"Accessible label for the button. Required when button has no text content or only an icon.",
	},
];

export default function ButtonDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Button</h1>
			<p className="text-subtitle text-secondary mb-8">
				Buttons trigger actions throughout your application. They're used for everything from
				submitting forms to navigating between screens.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Variants"
					code={`<Button onClick={() => alert('Primary')} variant="solid">
  Primary Button
</Button>
<Button onClick={() => alert('Secondary')} variant="outlined">
  Secondary Button
</Button>
<Button onClick={() => alert('Ghost')} variant="plain">
  Ghost Button
</Button>
<Button onClick={() => alert('Danger')} variant="danger">
  Danger Button
</Button>`}
				>
					<div className="flex flex--gap-3 flex--wrap">
						<Button onClick={() => alert("Primary")} variant="solid">
							Primary Button
						</Button>
						<Button onClick={() => alert("Secondary")} variant="outlined">
							Secondary Button
						</Button>
						<Button onClick={() => alert("Ghost")} variant="plain">
							Ghost Button
						</Button>
						<Button onClick={() => alert("Danger")} variant="danger">
							Danger Button
						</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<Button onClick={() => {}} size="sm">Small</Button>
<Button onClick={() => {}} size="md">Medium</Button>
<Button onClick={() => {}} size="lg">Large</Button>`}
				>
					<div className="flex flex--gap-3 flex--wrap" style={{ alignItems: "center" }}>
						<Button onClick={() => {}} size="sm">
							Small
						</Button>
						<Button onClick={() => {}} size="md">
							Medium
						</Button>
						<Button onClick={() => {}} size="lg">
							Large
						</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="With Icons"
					code={`<Button onClick={() => {}} icon="home">
  Home
</Button>
<Button onClick={() => {}} icon="arrow_forward" iconPosition="right">
  Continue
</Button>
<Button onClick={() => {}} variant="icon" icon="settings" aria-label="Settings" />`}
				>
					<div className="flex flex--gap-3 flex--wrap">
						<Button onClick={() => {}} icon="home">
							Home
						</Button>
						<Button onClick={() => {}} icon="arrow_forward" iconPosition="right">
							Continue
						</Button>
						<Button onClick={() => {}} variant="icon" icon="settings" aria-label="Settings" />
					</div>
				</LiveExample>

				<LiveExample
					title="States"
					code={`<Button onClick={() => {}} loading>
  Loading
</Button>
<Button onClick={() => {}} disabled>
  Disabled
</Button>
<Button onClick={() => {}} fullWidth>
  Full Width Button
</Button>`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="flex flex--gap-3">
							<Button onClick={() => {}} loading>
								Loading
							</Button>
							<Button onClick={() => {}} disabled>
								Disabled
							</Button>
						</div>
						<Button onClick={() => {}} fullWidth>
							Full Width Button
						</Button>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Button } from '@braingame/bgui';

function MyComponent() {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <Button 
      onClick={handlePress}
      variant="solid"
      icon="send"
    >
      Send Message
    </Button>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear labels:</strong> Use descriptive, action-oriented text that clearly
						indicates what will happen when pressed.
					</li>
					<li className="mb-2">
						<strong>Primary actions:</strong> Reserve the primary variant for the most important
						action on a screen. Typically, there should be only one primary button visible at a
						time.
					</li>
					<li className="mb-2">
						<strong>Icon usage:</strong> Icons should reinforce the button's action, not replace
						clear text labels (except for commonly understood actions like close or settings).
					</li>
					<li className="mb-2">
						<strong>Loading states:</strong> Always show loading state when the button triggers an
						async action to provide user feedback.
					</li>
					<li className="mb-2">
						<strong>Accessibility:</strong> Always provide an aria-label for icon-only buttons.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">The Button component is built with accessibility in mind:</p>
				<ul>
					<li>Uses native button semantics with proper ARIA roles</li>
					<li>Supports keyboard navigation (Tab, Enter, Space)</li>
					<li>Provides focus indicators for keyboard users</li>
					<li>Disabled buttons are properly announced to screen readers</li>
					<li>Loading state is communicated through ARIA attributes</li>
				</ul>
			</section>

			<PropsTable props={buttonProps} />
		</div>
	);
}

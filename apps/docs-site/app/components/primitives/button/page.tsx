"use client";

import { Button } from "@braingame/bgui";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const buttonProps = [
	{
		name: "children",
		type: "ReactNode",
		required: false,
		description: "The content of the button.",
	},
	{
		name: "color",
		type: '"primary" | "neutral" | "danger" | "success" | "warning"',
		required: false,
		default: '"primary"',
		description: "The color of the component.",
	},
	{
		name: "variant",
		type: '"solid" | "soft" | "outlined" | "plain"',
		required: false,
		default: '"solid"',
		description: "The variant of the component.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		required: false,
		default: '"md"',
		description: "The size of the component.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "If true, the component is disabled.",
	},
	{
		name: "fullWidth",
		type: "boolean",
		required: false,
		default: "false",
		description: "If true, the button will take up the full width of its container.",
	},
	{
		name: "loading",
		type: "boolean",
		required: false,
		default: "false",
		description: "If true, the button is in a loading state.",
	},
	{
		name: "onClick",
		type: "() => void",
		required: false,
		description: "Callback fired when the button is clicked.",
	},
	{
		name: "startDecorator",
		type: "ReactNode",
		required: false,
		description: "Element placed before the children.",
	},
	{
		name: "endDecorator",
		type: "ReactNode",
		required: false,
		description: "Element placed after the children.",
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
					code={`<Button onClick={() => alert('Solid')} variant="solid">
  Solid Button
</Button>
<Button onClick={() => alert('Outlined')} variant="outlined">
  Outlined Button
</Button>
<Button onClick={() => alert('Soft')} variant="soft">
  Soft Button
</Button>
<Button onClick={() => alert('Plain')} variant="plain">
  Plain Button
</Button>`}
				>
					<div className="flex flex--gap-3 flex--wrap">
						<Button onClick={() => alert("Solid")} variant="solid">
							Solid Button
						</Button>
						<Button onClick={() => alert("Outlined")} variant="outlined">
							Outlined Button
						</Button>
						<Button onClick={() => alert("Soft")} variant="soft">
							Soft Button
						</Button>
						<Button onClick={() => alert("Plain")} variant="plain">
							Plain Button
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
					title="With Decorators"
					code={`<Button onClick={() => {}} startDecorator="🏠">
  Home
</Button>
<Button onClick={() => {}} endDecorator="→">
  Continue
</Button>
<Button onClick={() => {}} variant="plain" size="sm">
  ⚙️
</Button>`}
				>
					<div className="flex flex--gap-3 flex--wrap">
						<Button onClick={() => {}} startDecorator="🏠">
							Home
						</Button>
						<Button onClick={() => {}} endDecorator="→">
							Continue
						</Button>
						<Button onClick={() => {}} variant="plain" size="sm">
							⚙️
						</Button>
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
      onPress={handlePress}
      variant="primary"
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

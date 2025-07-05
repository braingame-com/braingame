"use client";

import { MaterialIcon } from "../components/MaterialIcon";

export default function HomePage() {
	return (
		<div>
			<h1 className="text-display mb-4">Brain Game UI</h1>
			<p className="text-subtitle text-secondary mb-8">
				Enterprise-grade React Native component library for building accessible, cross-platform
				applications.
			</p>

			<div className="grid grid--cols-3 mb-8">
				<div className="card">
					<h3 className="text-heading mb-3">
						<MaterialIcon
							name="palette"
							size="small"
							color="var(--color-tertiary)"
							style={{ marginRight: 8 }}
						/>
						Beautiful by Default
					</h3>
					<p className="text-body text-secondary">
						Thoughtfully designed components that look great out of the box, with support for light
						and dark themes.
					</p>
				</div>

				<div className="card">
					<h3 className="text-heading mb-3">
						<MaterialIcon
							name="accessibility_new"
							size="small"
							color="var(--color-success)"
							style={{ marginRight: 8 }}
						/>
						Accessible
					</h3>
					<p className="text-body text-secondary">
						Built with accessibility in mind. All components follow WCAG 2.1 guidelines and support
						screen readers.
					</p>
				</div>

				<div className="card">
					<h3 className="text-heading mb-3">
						<MaterialIcon
							name="devices"
							size="small"
							color="var(--color-info)"
							style={{ marginRight: 8 }}
						/>
						Cross-Platform
					</h3>
					<p className="text-body text-secondary">
						Write once, run everywhere. Components work seamlessly on iOS, Android, and Web
						platforms.
					</p>
				</div>
			</div>

			<section className="mb-8">
				<h2 className="text-title mb-4">Quick Start</h2>
				<div className="code-block">
					<div className="code-block__header">
						<span>Terminal</span>
						<button type="button" className="code-block__copy">
							Copy
						</button>
					</div>
					<pre>
						<code>{"npm install @braingame/bgui"}</code>
					</pre>
				</div>

				<p className="text-body mb-4">
					Import and use components in your React Native application:
				</p>

				<div className="code-block">
					<div className="code-block__header">
						<span>JavaScript</span>
						<button type="button" className="code-block__copy">
							Copy
						</button>
					</div>
					<pre>
						<code>{`import { Button, Text, Card } from '@braingame/bgui';

export function MyComponent() {
  return (
    <Card>
      <Text variant="heading">Welcome!</Text>
      <Button onPress={() => alert('Hello!')}>
        Get Started
      </Button>
    </Card>
  );
}`}</code>
					</pre>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Design Principles</h2>
				<ul>
					<li>
						<strong>Consistency</strong> - Components follow a unified design language
					</li>
					<li>
						<strong>Flexibility</strong> - Highly customizable with sensible defaults
					</li>
					<li>
						<strong>Performance</strong> - Optimized for 60fps animations and interactions
					</li>
					<li>
						<strong>Developer Experience</strong> - TypeScript support with excellent IDE
						integration
					</li>
				</ul>
			</section>

			<section>
				<h2 className="text-title mb-4">Component Categories</h2>
				<div className="grid grid--cols-2">
					<div>
						<h4 className="font-semibold mb-2">Primitives</h4>
						<p className="text-small text-secondary mb-4">
							Essential building blocks like Button, Text, Icon, Badge, and Chip
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">Inputs</h4>
						<p className="text-small text-secondary mb-4">
							Form controls including TextInput, Checkbox, Switch, and Select
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">Layout</h4>
						<p className="text-small text-secondary mb-4">
							Structural components like View, Card, Divider, and Tabs
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">Feedback</h4>
						<p className="text-small text-secondary mb-4">
							User feedback components including Alert, Toast, and Spinner
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

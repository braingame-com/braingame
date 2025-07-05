"use client";

import { Text } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const textProps = [
	{
		name: "children",
		type: "ReactNode",
		required: true,
		description: "The text content to display.",
	},
	{
		name: "variant",
		type: '"displayTitle" | "title" | "heading" | "subtitle" | "body" | "bold" | "text" | "secondaryText" | "small" | "smallThin" | "caption" | "h1" | "h2" | "h3"',
		required: false,
		default: '"body"',
		description:
			"Typography variant that controls size, weight, and line height. Semantic variants like displayTitle and heading are preferred over h1/h2/h3.",
	},
	{
		name: "color",
		type: '"primary" | "secondary" | "danger" | "neutral" | "success" | "warning"',
		required: false,
		description: "Semantic color for the text.",
	},
	{
		name: "align",
		type: '"left" | "center" | "right"',
		required: false,
		default: '"left"',
		description: "Text alignment within its container.",
	},
	{
		name: "numberOfLines",
		type: "number",
		required: false,
		description: "Truncate text after this many lines with ellipsis.",
	},
	{
		name: "mono",
		type: "boolean",
		required: false,
		default: "false",
		description: "Use monospace font (Roboto Mono) for technical content.",
	},
	{
		name: "style",
		type: "StyleProp<TextStyle>",
		required: false,
		description: "Custom styles to apply to the text.",
	},
];

export default function TextDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Text</h1>
			<p className="text-subtitle text-secondary mb-8">
				The Text component provides a consistent typography system across your application, with
				semantic variants optimized for readability using the Lexend font family.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Typography Scale"
					code={`<Text variant="displayTitle">Display Title</Text>
<Text variant="title">Title</Text>
<Text variant="heading">Heading</Text>
<Text variant="subtitle">Subtitle</Text>
<Text variant="body">Body text - The quick brown fox jumps over the lazy dog</Text>
<Text variant="bold">Bold text for emphasis</Text>
<Text variant="secondaryText">Secondary text with less emphasis</Text>
<Text variant="small">Small text for captions</Text>
<Text variant="smallThin">Smallest thin text</Text>`}
				>
					<div className="flex flex--column flex--gap-2">
						<Text variant="displayTitle">Display Title</Text>
						<Text variant="title">Title</Text>
						<Text variant="heading">Heading</Text>
						<Text variant="subtitle">Subtitle</Text>
						<Text variant="body">Body text - The quick brown fox jumps over the lazy dog</Text>
						<Text variant="bold">Bold text for emphasis</Text>
						<Text variant="secondaryText">Secondary text with less emphasis</Text>
						<Text variant="small">Small text for captions</Text>
						<Text variant="smallThin">Smallest thin text</Text>
					</div>
				</LiveExample>

				<LiveExample
					title="Colors"
					code={`<Text color="primary">Primary color text</Text>
<Text color="secondary">Secondary color text</Text>
<Text color="success">Success color text</Text>
<Text color="warning">Warning color text</Text>
<Text color="danger">Danger color text</Text>
<Text color="neutral">Neutral color text</Text>`}
				>
					<div className="flex flex--column flex--gap-2">
						<Text color="primary">Primary color text</Text>
						<Text color="secondary">Secondary color text</Text>
						<Text color="success">Success color text</Text>
						<Text color="warning">Warning color text</Text>
						<Text color="danger">Danger color text</Text>
						<Text color="neutral">Neutral color text</Text>
					</div>
				</LiveExample>

				<LiveExample
					title="Alignment"
					code={`<Text align="left">Left aligned text (default)</Text>
<Text align="center">Center aligned text</Text>
<Text align="right">Right aligned text</Text>`}
				>
					<div className="flex flex--column flex--gap-2" style={{ width: "100%" }}>
						<Text align="left">Left aligned text (default)</Text>
						<Text align="center">Center aligned text</Text>
						<Text align="right">Right aligned text</Text>
					</div>
				</LiveExample>

				<LiveExample
					title="Special Features"
					code={`<Text numberOfLines={2}>
  This is a very long text that will be truncated after two lines. 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
  eiusmod tempor incididunt ut labore et dolore magna aliqua.
</Text>

<Text mono>const code = "Monospace text for code";</Text>`}
				>
					<div className="flex flex--column flex--gap-3">
						<div style={{ maxWidth: "400px" }}>
							<Text numberOfLines={2}>
								This is a very long text that will be truncated after two lines. Lorem ipsum dolor
								sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua.
							</Text>
						</div>
						<Text mono>const code = "Monospace text for code";</Text>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Text } from '@braingame/bgui';

function MyComponent() {
  return (
    <View>
      <Text variant="heading">Welcome Back!</Text>
      <Text variant="secondaryText">
        Here's what's new since your last visit.
      </Text>
      <Text variant="body" numberOfLines={3}>
        {longArticleContent}
      </Text>
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Typography System</h2>
				<p className="text-body mb-4">
					Brain Game uses a carefully crafted typography system based on the Lexend font family,
					which is specifically designed to improve reading proficiency.
				</p>

				<h3 className="text-heading mb-3">Font Stack</h3>
				<ul className="mb-4">
					<li>
						<strong>Lexend:</strong> Primary font for all text content
					</li>
					<li>
						<strong>Roboto Mono:</strong> Monospace font for code and technical content
					</li>
					<li>
						<strong>Noto & Noto Mono:</strong> Fallback fonts for international characters
					</li>
				</ul>

				<h3 className="text-heading mb-3">Semantic Variants</h3>
				<p className="text-body mb-4">
					We recommend using semantic variant names (displayTitle, heading, body) rather than legacy
					HTML-based names (h1, h2, h3) for better clarity and consistency.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Hierarchy:</strong> Establish clear visual hierarchy by using appropriate
						variants. Don't skip levels (e.g., going from title directly to body).
					</li>
					<li className="mb-2">
						<strong>Line length:</strong> For optimal readability, body text should be 45-75
						characters per line. Use containers to limit width on larger screens.
					</li>
					<li className="mb-2">
						<strong>Color contrast:</strong> Ensure sufficient contrast between text and background
						colors. The default colors meet WCAG AA standards.
					</li>
					<li className="mb-2">
						<strong>Truncation:</strong> Use numberOfLines sparingly. Always provide a way for users
						to see the full content when text is truncated.
					</li>
				</ul>
			</section>

			<PropsTable props={textProps} />
		</div>
	);
}

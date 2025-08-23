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
		name: "level",
		type: '"h1" | "h2" | "h3" | "h4" | "title-lg" | "title-md" | "title-sm" | "body-lg" | "body-md" | "body-sm" | "body-xs" | "inherit"',
		required: false,
		default: '"body-md"',
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
					code={`<Text level="h1">Heading 1</Text>
<Text level="h2">Heading 2</Text>
<Text level="h3">Heading 3</Text>
<Text level="title-lg">Large Title</Text>
<Text level="body-lg">Large body text - The quick brown fox jumps over the lazy dog</Text>
<Text level="body-md">Medium body text</Text>
<Text level="body-sm">Small body text</Text>
<Text level="body-xs">Extra small text for captions</Text>
<Text level="body-md" style={{ fontWeight: 'bold' }}>Bold text for emphasis</Text>`}
				>
					<div className="flex flex--column flex--gap-2">
						<Text level="h1">Heading 1</Text>
						<Text level="h2">Heading 2</Text>
						<Text level="h3">Heading 3</Text>
						<Text level="title-lg">Large Title</Text>
						<Text level="body-lg">
							Large body text - The quick brown fox jumps over the lazy dog
						</Text>
						<Text level="body-md">Medium body text</Text>
						<Text level="body-sm">Small body text</Text>
						<Text level="body-xs">Extra small text for captions</Text>
						<Text level="body-md" style={{ fontWeight: "bold" }}>
							Bold text for emphasis
						</Text>
					</div>
				</LiveExample>

				<LiveExample
					title="Colors"
					code={`<Text color="primary">Primary color text</Text>
<Text color="neutral">Neutral color text</Text>
<Text color="success">Success color text</Text>
<Text color="warning">Warning color text</Text>
<Text color="danger">Danger color text</Text>`}
				>
					<div className="flex flex--column flex--gap-2">
						<Text color="primary">Primary color text</Text>
						<Text color="neutral">Neutral color text</Text>
						<Text color="success">Success color text</Text>
						<Text color="warning">Warning color text</Text>
						<Text color="danger">Danger color text</Text>
					</div>
				</LiveExample>

				<LiveExample
					title="Alignment"
					code={`<Text style={{ textAlign: 'left' }}>Left aligned text (default)</Text>
<Text style={{ textAlign: 'center' }}>Center aligned text</Text>
<Text style={{ textAlign: 'right' }}>Right aligned text</Text>`}
				>
					<div className="flex flex--column flex--gap-2" style={{ width: "100%" }}>
						<Text style={{ textAlign: "left" }}>Left aligned text (default)</Text>
						<Text style={{ textAlign: "center" }}>Center aligned text</Text>
						<Text style={{ textAlign: "right" }}>Right aligned text</Text>
					</div>
				</LiveExample>

				<LiveExample
					title="Special Features"
					code={`<Text style={{ 
  overflow: 'hidden', 
  textOverflow: 'ellipsis', 
  display: '-webkit-box', 
  WebkitLineClamp: 2, 
  WebkitBoxOrient: 'vertical' 
}}>
  This is a very long text that will be truncated after two lines. 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Text>

<Text style={{ fontFamily: 'monospace' }}>const code = "Monospace text for code";</Text>`}
				>
					<div className="flex flex--column flex--gap-3">
						<div style={{ maxWidth: "400px" }}>
							<Text
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
								}}
							>
								This is a very long text that will be truncated after two lines. Lorem ipsum dolor
								sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua.
							</Text>
						</div>
						<Text style={{ fontFamily: "monospace" }}>const code = "Monospace text for code";</Text>
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
      <Text level="h3">Welcome Back!</Text>
      <Text level="body-sm" color="neutral">
        Here's what's new since your last visit.
      </Text>
      <Text level="body-md" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
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

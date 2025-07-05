"use client";

import { CodeBlock } from "../../../components/CodeBlock";
import { MaterialIcon } from "../../../components/MaterialIcon";

const colorGroups = [
	{
		title: "Primary Colors",
		description: "Main brand colors used for primary actions and key UI elements",
		colors: [
			{ name: "primary", label: "Primary", textColor: "on-primary" },
			{ name: "on-primary", label: "On Primary", bg: "primary" },
			{ name: "primary-container", label: "Primary Container", textColor: "on-primary-container" },
			{ name: "on-primary-container", label: "On Primary Container", bg: "primary-container" },
		],
	},
	{
		title: "Secondary Colors",
		description: "Supporting colors for secondary actions and accents",
		colors: [
			{ name: "secondary", label: "Secondary", textColor: "on-secondary" },
			{ name: "on-secondary", label: "On Secondary", bg: "secondary" },
			{
				name: "secondary-container",
				label: "Secondary Container",
				textColor: "on-secondary-container",
			},
			{
				name: "on-secondary-container",
				label: "On Secondary Container",
				bg: "secondary-container",
			},
		],
	},
	{
		title: "Tertiary Colors",
		description: "Additional accent colors for special emphasis",
		colors: [
			{ name: "tertiary", label: "Tertiary", textColor: "on-tertiary" },
			{ name: "on-tertiary", label: "On Tertiary", bg: "tertiary" },
			{
				name: "tertiary-container",
				label: "Tertiary Container",
				textColor: "on-tertiary-container",
			},
			{ name: "on-tertiary-container", label: "On Tertiary Container", bg: "tertiary-container" },
		],
	},
	{
		title: "Semantic Colors",
		description: "Colors with specific meanings for system states and feedback",
		colors: [
			{ name: "error", label: "Error", textColor: "on-error" },
			{ name: "on-error", label: "On Error", bg: "error" },
			{ name: "error-container", label: "Error Container", textColor: "on-error-container" },
			{ name: "on-error-container", label: "On Error Container", bg: "error-container" },
			{ name: "success", label: "Success", textColor: "on-success" },
			{ name: "on-success", label: "On Success", bg: "success" },
			{ name: "success-container", label: "Success Container", textColor: "on-success-container" },
			{ name: "on-success-container", label: "On Success Container", bg: "success-container" },
			{ name: "warning", label: "Warning", textColor: "on-warning" },
			{ name: "on-warning", label: "On Warning", bg: "warning" },
			{ name: "warning-container", label: "Warning Container", textColor: "on-warning-container" },
			{ name: "on-warning-container", label: "On Warning Container", bg: "warning-container" },
			{ name: "info", label: "Info", textColor: "on-info" },
			{ name: "on-info", label: "On Info", bg: "info" },
			{ name: "info-container", label: "Info Container", textColor: "on-info-container" },
			{ name: "on-info-container", label: "On Info Container", bg: "info-container" },
		],
	},
	{
		title: "Surface Colors",
		description: "Background colors for different elevation levels",
		colors: [
			{ name: "surface", label: "Surface", textColor: "on-surface" },
			{ name: "on-surface", label: "On Surface", bg: "surface" },
			{ name: "surface-variant", label: "Surface Variant", textColor: "on-surface-variant" },
			{ name: "on-surface-variant", label: "On Surface Variant", bg: "surface-variant" },
			{ name: "surface-container-lowest", label: "Container Lowest", textColor: "on-surface" },
			{ name: "surface-container-low", label: "Container Low", textColor: "on-surface" },
			{ name: "surface-container", label: "Container", textColor: "on-surface" },
			{ name: "surface-container-high", label: "Container High", textColor: "on-surface" },
			{ name: "surface-container-highest", label: "Container Highest", textColor: "on-surface" },
			{ name: "surface-inverse", label: "Surface Inverse", textColor: "on-surface-inverse" },
			{ name: "on-surface-inverse", label: "On Surface Inverse", bg: "surface-inverse" },
		],
	},
	{
		title: "Outline & Background",
		description: "Borders, dividers, and page backgrounds",
		colors: [
			{ name: "outline", label: "Outline", showBorder: true },
			{ name: "outline-variant", label: "Outline Variant", showBorder: true },
			{ name: "background", label: "Background", textColor: "on-background" },
			{ name: "on-background", label: "On Background", bg: "background" },
		],
	},
];

export default function ColorsPage() {
	return (
		<div>
			<h1 className="text-display mb-4">Color System</h1>
			<p className="text-subtitle text-secondary mb-8">
				BGUI uses Material Design 3 color system with semantic naming that adapts to light and dark
				themes. All colors are carefully chosen to meet WCAG accessibility standards.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Color Principles</h2>
				<div className="grid grid--cols-1 md:grid--cols-3 gap-4 mb-8">
					<div className="principle-card">
						<MaterialIcon name="palette" size="large" color="var(--color-primary)" />
						<h3 className="text-heading mt-3 mb-2">Semantic Naming</h3>
						<p className="text-body text-secondary">
							Colors are named by their purpose, not their appearance. This ensures consistency
							across themes.
						</p>
					</div>
					<div className="principle-card">
						<MaterialIcon name="visibility" size="large" color="var(--color-primary)" />
						<h3 className="text-heading mt-3 mb-2">Accessibility First</h3>
						<p className="text-body text-secondary">
							All color combinations meet WCAG AA standards with proper contrast ratios.
						</p>
					</div>
					<div className="principle-card">
						<MaterialIcon name="brightness_4" size="large" color="var(--color-primary)" />
						<h3 className="text-heading mt-3 mb-2">Theme Adaptive</h3>
						<p className="text-body text-secondary">
							Colors automatically adjust for light and dark themes while maintaining visual
							hierarchy.
						</p>
					</div>
				</div>
			</section>

			{colorGroups.map((group) => (
				<section key={group.title} className="mb-8">
					<h2 className="text-title mb-2">{group.title}</h2>
					<p className="text-body text-secondary mb-4">{group.description}</p>
					<div className="color-grid">
						{group.colors.map((color) => (
							<div key={color.name} className="color-card">
								<div
									className={`color-swatch ${color.showBorder ? "color-swatch--bordered" : ""}`}
									style={{
										backgroundColor: color.bg
											? `var(--color-${color.bg})`
											: `var(--color-${color.name})`,
										color: color.textColor ? `var(--color-${color.textColor})` : undefined,
										borderColor: color.showBorder ? `var(--color-${color.name})` : undefined,
									}}
								>
									<span className="color-label">{color.label}</span>
								</div>
								<div className="color-info">
									<code className="color-var">--color-{color.name}</code>
								</div>
							</div>
						))}
					</div>
				</section>
			))}

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage Guidelines</h2>

				<h3 className="text-heading mb-3">Color Roles</h3>
				<div className="guidelines-grid mb-6">
					<div className="guideline">
						<div className="guideline-colors">
							<div className="color-circle" style={{ backgroundColor: "var(--color-primary)" }} />
							<MaterialIcon name="arrow_forward" size="small" />
							<div
								className="color-circle"
								style={{ backgroundColor: "var(--color-on-primary)" }}
							/>
						</div>
						<h4 className="text-body font-medium mb-1">Primary Actions</h4>
						<p className="text-caption text-secondary">
							Use primary colors for main CTAs, FABs, and key interactive elements.
						</p>
					</div>

					<div className="guideline">
						<div className="guideline-colors">
							<div className="color-circle" style={{ backgroundColor: "var(--color-secondary)" }} />
							<MaterialIcon name="arrow_forward" size="small" />
							<div
								className="color-circle"
								style={{ backgroundColor: "var(--color-on-secondary)" }}
							/>
						</div>
						<h4 className="text-body font-medium mb-1">Secondary Actions</h4>
						<p className="text-caption text-secondary">
							Use secondary colors for supporting actions and less prominent elements.
						</p>
					</div>

					<div className="guideline">
						<div className="guideline-colors">
							<div className="color-circle" style={{ backgroundColor: "var(--color-error)" }} />
							<MaterialIcon name="arrow_forward" size="small" />
							<div className="color-circle" style={{ backgroundColor: "var(--color-on-error)" }} />
						</div>
						<h4 className="text-body font-medium mb-1">Error States</h4>
						<p className="text-caption text-secondary">
							Use error colors for validation messages, destructive actions, and alerts.
						</p>
					</div>

					<div className="guideline">
						<div className="guideline-colors">
							<div className="color-circle" style={{ backgroundColor: "var(--color-surface)" }} />
							<MaterialIcon name="arrow_forward" size="small" />
							<div
								className="color-circle"
								style={{ backgroundColor: "var(--color-on-surface)" }}
							/>
						</div>
						<h4 className="text-body font-medium mb-1">Content Areas</h4>
						<p className="text-caption text-secondary">
							Use surface colors for cards, sheets, and content containers.
						</p>
					</div>
				</div>

				<h3 className="text-heading mb-3">Container Colors</h3>
				<p className="text-body mb-4">
					Container colors provide lower emphasis alternatives for each color role:
				</p>
				<div className="container-example">
					<div className="container-item" style={{ backgroundColor: "var(--color-primary)" }}>
						<span style={{ color: "var(--color-on-primary)" }}>High Emphasis</span>
					</div>
					<MaterialIcon name="arrow_forward" />
					<div
						className="container-item"
						style={{ backgroundColor: "var(--color-primary-container)" }}
					>
						<span style={{ color: "var(--color-on-primary-container)" }}>Low Emphasis</span>
					</div>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Implementation</h2>

				<h3 className="text-heading mb-3">Using Colors in Code</h3>
				<CodeBlock
					code={`// React Native with BGUI theme
import { useTheme } from '@braingame/bgui';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
    }}>
      <Text style={{ color: theme.colors.onSurface }}>
        Content
      </Text>
    </View>
  );
}

// Using semantic color props
<Button color="primary">Primary Action</Button>
<Alert type="error">Error Message</Alert>
<Badge variant="success">Complete</Badge>

// Direct style usage
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surfaceContainer,
  },
  text: {
    color: theme.colors.onSurfaceVariant,
  },
  border: {
    borderColor: theme.colors.outlineVariant,
  },
});`}
				/>

				<h3 className="text-heading mb-3 mt-6">CSS Custom Properties</h3>
				<CodeBlock
					code={`/* Available in web environments */
.my-component {
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  border: 1px solid var(--color-outline);
}

.primary-button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.error-message {
  background-color: var(--color-error-container);
  color: var(--color-on-error-container);
}

/* Elevation with surface containers */
.card-elevated {
  background-color: var(--color-surface-container-high);
}

.sheet {
  background-color: var(--color-surface-container);
}`}
					language="css"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">
					All color combinations in BGUI meet WCAG accessibility standards:
				</p>
				<ul>
					<li className="mb-2">
						<strong>AA Compliance:</strong> All text has at least 4.5:1 contrast ratio
					</li>
					<li className="mb-2">
						<strong>Large Text:</strong> 3:1 contrast ratio for text 18pt and larger
					</li>
					<li className="mb-2">
						<strong>Interactive Elements:</strong> 3:1 contrast ratio against adjacent colors
					</li>
					<li className="mb-2">
						<strong>Color Independence:</strong> Information is never conveyed by color alone
					</li>
				</ul>

				<div className="contrast-examples">
					<div className="contrast-example">
						<div
							className="contrast-demo"
							style={{
								backgroundColor: "var(--color-primary)",
								color: "var(--color-on-primary)",
							}}
						>
							<MaterialIcon name="check_circle" />
							<span>Good Contrast</span>
						</div>
						<span className="text-caption">Primary / On Primary</span>
					</div>
					<div className="contrast-example">
						<div
							className="contrast-demo"
							style={{
								backgroundColor: "var(--color-error-container)",
								color: "var(--color-on-error-container)",
							}}
						>
							<MaterialIcon name="check_circle" />
							<span>Good Contrast</span>
						</div>
						<span className="text-caption">Error Container / On Error Container</span>
					</div>
				</div>
			</section>

			<style jsx>{`
				.grid {
					display: grid;
				}

				.grid--cols-1 {
					grid-template-columns: repeat(1, 1fr);
				}

				@media (min-width: 768px) {
					.md\\:grid--cols-3 {
						grid-template-columns: repeat(3, 1fr);
					}
				}

				.gap-4 {
					gap: var(--space-4);
				}

				.principle-card {
					padding: var(--space-6);
					background-color: var(--color-surface-container);
					border-radius: var(--radius-lg);
					text-align: center;
				}

				.color-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
					gap: var(--space-4);
					margin-bottom: var(--space-6);
				}

				.color-card {
					border-radius: var(--radius-lg);
					overflow: hidden;
					border: 1px solid var(--color-outline-variant);
				}

				.color-swatch {
					height: 80px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: var(--font-medium);
				}

				.color-swatch--bordered {
					border: 3px solid;
				}

				.color-label {
					text-align: center;
					padding: 0 var(--space-3);
				}

				.color-info {
					padding: var(--space-3);
					background-color: var(--color-surface);
				}

				.color-var {
					font-family: var(--font-mono);
					font-size: var(--text-xs);
					color: var(--color-on-surface-variant);
				}

				.guidelines-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
					gap: var(--space-4);
				}

				.guideline {
					padding: var(--space-4);
					background-color: var(--color-surface-container);
					border-radius: var(--radius-md);
				}

				.guideline-colors {
					display: flex;
					align-items: center;
					gap: var(--space-2);
					margin-bottom: var(--space-3);
				}

				.color-circle {
					width: 24px;
					height: 24px;
					border-radius: 50%;
					border: 1px solid var(--color-outline-variant);
				}

				.container-example {
					display: flex;
					align-items: center;
					gap: var(--space-4);
					padding: var(--space-4);
					background-color: var(--color-surface-container-low);
					border-radius: var(--radius-lg);
				}

				.container-item {
					flex: 1;
					padding: var(--space-4);
					border-radius: var(--radius-md);
					text-align: center;
					font-weight: var(--font-medium);
				}

				.contrast-examples {
					display: flex;
					gap: var(--space-4);
					margin-top: var(--space-4);
				}

				.contrast-example {
					text-align: center;
				}

				.contrast-demo {
					display: flex;
					align-items: center;
					gap: var(--space-2);
					padding: var(--space-3) var(--space-4);
					border-radius: var(--radius-md);
					margin-bottom: var(--space-2);
					font-weight: var(--font-medium);
				}
			`}</style>
		</div>
	);
}

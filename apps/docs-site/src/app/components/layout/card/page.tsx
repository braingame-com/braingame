"use client";

import { Badge, Button, Card, Icon } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const cardProps = [
	{
		name: "children",
		type: "React.ReactNode",
		required: true,
		description: "Content to be displayed inside the card.",
	},
	{
		name: "variant",
		type: '"basic" | "interactive"',
		required: false,
		default: '"basic"',
		description: "Behavior variant of the card.",
	},
	{
		name: "padding",
		type: '"none" | "small" | "medium" | "large"',
		required: false,
		default: '"medium"',
		description: "Padding size inside the card.",
	},
	{
		name: "elevation",
		type: "number",
		required: false,
		default: "0",
		description: "Shadow elevation level for the card.",
	},
	{
		name: "onPress",
		type: "() => void",
		required: false,
		description: "Callback when the card is pressed. Automatically sets interactive to true.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the card container.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
];

export default function CardDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Card</h1>
			<p className="text-subtitle text-secondary mb-8">
				Cards are surfaces that display content and actions on a single topic. They should be easy
				to scan for relevant and actionable information.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Cards"
					code={`<Card>
  <Text variant="heading">Card Title</Text>
  <Text variant="body" color="secondary">
    This is a basic card with some content. Cards are great for grouping related information.
  </Text>
</Card>

<Card variant="interactive">
  <Text variant="heading">Filled Card</Text>
  <Text variant="body" color="secondary">
    This card uses the interactive variant for a subtle background.
  </Text>
</Card>

<Card variant="basic">
  <Text variant="heading">Outlined Card</Text>
  <Text variant="body" color="secondary">
    This card uses the outlined variant with a border.
  </Text>
</Card>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Card>
							<h3 className="text-heading mb-2">Card Title</h3>
							<p className="text-body text-secondary">
								This is a basic card with some content. Cards are great for grouping related
								information.
							</p>
						</Card>

						<Card variant="interactive">
							<h3 className="text-heading mb-2">Filled Card</h3>
							<p className="text-body text-secondary">
								This card uses the interactive variant for a subtle background.
							</p>
						</Card>

						<Card variant="basic">
							<h3 className="text-heading mb-2">Outlined Card</h3>
							<p className="text-body text-secondary">
								This card uses the outlined variant with a border.
							</p>
						</Card>
					</div>
				</LiveExample>

				<LiveExample
					title="Interactive Cards"
					code={`<Card variant="interactive" onPress={() => alert('Card pressed!')}>
  <Text variant="heading">Interactive Card</Text>
  <Text variant="body" color="secondary">
    This card responds to hover and press interactions. Try clicking it!
  </Text>
</Card>

<Card variant="interactive">
  <Text variant="heading">Selected Card</Text>
  <Text variant="body" color="secondary">
    This card is in a selected state with visual indication.
  </Text>
</Card>

<Card variant="interactive">
  <Text variant="heading">Disabled Card</Text>
  <Text variant="body" color="secondary">
    This interactive card is disabled and won't respond to interactions.
  </Text>
</Card>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Card variant="interactive" onPress={() => alert("Card pressed!")}>
							<h3 className="text-heading mb-2">Interactive Card</h3>
							<p className="text-body text-secondary">
								This card responds to hover and press interactions. Try clicking it!
							</p>
						</Card>

						<Card variant="interactive">
							<h3 className="text-heading mb-2">Selected Card</h3>
							<p className="text-body text-secondary">
								This card is in a selected state with visual indication.
							</p>
						</Card>

						<Card variant="basic" style={{ opacity: 0.5 }}>
							<h3 className="text-heading mb-2">Disabled Card</h3>
							<p className="text-body text-secondary">
								This interactive card is disabled and won't respond to interactions.
							</p>
						</Card>
					</div>
				</LiveExample>

				<LiveExample
					title="Padding Variants"
					code={`<Card padding="none">
  <Image source={{ uri: 'https://picsum.photos/400/200' }} style={{ height: 200 }} />
  <View style={{ padding: 16 }}>
    <Text variant="heading">No Padding Card</Text>
    <Text variant="body" color="secondary">
      Use padding="none" for cards with images or custom layouts.
    </Text>
  </View>
</Card>

<Card padding="sm">
  <Text variant="body">Small padding</Text>
</Card>

<Card padding="md">
  <Text variant="body">Medium padding (default)</Text>
</Card>

<Card padding="lg">
  <Text variant="body">Large padding</Text>
</Card>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Card padding="none">
							<div
								style={{
									height: 120,
									background:
										"linear-gradient(45deg, var(--color-primary), var(--color-secondary))",
								}}
							/>
							<div style={{ padding: "var(--space-4)" }}>
								<h3 className="text-heading mb-2">No Padding Card</h3>
								<p className="text-body text-secondary">
									Use padding="none" for cards with images or custom layouts.
								</p>
							</div>
						</Card>

						<Card padding="small">
							<p className="text-body">Small padding</p>
						</Card>

						<Card padding="medium">
							<p className="text-body">Medium padding (default)</p>
						</Card>

						<Card padding="large">
							<p className="text-body">Large padding</p>
						</Card>
					</div>
				</LiveExample>

				<LiveExample
					title="Complex Card Layouts"
					code={`<Card>
  <View style={styles.cardHeader}>
    <Avatar source={{ uri: 'https://i.pravatar.cc/150' }} size="md" />
    <View style={styles.headerText}>
      <Text variant="subtitle">John Doe</Text>
      <Text variant="caption" color="secondary">Software Engineer</Text>
    </View>
    <Badge text="PRO" variant="status" size="small" />
  </View>
  
  <Text variant="body" style={styles.cardContent}>
    Building amazing apps with React Native and loving every minute of it! 🚀
  </Text>
  
  <View style={styles.cardActions}>
    <Button variant="ghost" icon="thumb_up" size="sm">
      Like
    </Button>
    <Button variant="ghost" icon="comment" size="sm">
      Comment
    </Button>
    <Button variant="ghost" icon="share" size="sm">
      Share
    </Button>
  </View>
</Card>

<Card variant="basic">
  <View style={styles.statsCard}>
    <View style={styles.stat}>
      <Icon name="trending_up" color="success" size="lg" />
      <Text variant="heading">24.5%</Text>
      <Text variant="caption" color="secondary">Growth</Text>
    </View>
    <Divider orientation="vertical" />
    <View style={styles.stat}>
      <Icon name="people" color="info" size="lg" />
      <Text variant="heading">1.2K</Text>
      <Text variant="caption" color="secondary">Users</Text>
    </View>
    <Divider orientation="vertical" />
    <View style={styles.stat}>
      <Icon name="star" color="warning" size="lg" />
      <Text variant="heading">4.8</Text>
      <Text variant="caption" color="secondary">Rating</Text>
    </View>
  </View>
</Card>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Card>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "var(--space-3)",
									marginBottom: "var(--space-4)",
								}}
							>
								<div
									style={{
										width: 48,
										height: 48,
										borderRadius: "50%",
										background: "var(--color-primary)",
									}}
								/>
								<div style={{ flex: 1 }}>
									<h4 className="text-subtitle">John Doe</h4>
									<p className="text-caption text-secondary">Software Engineer</p>
								</div>
								<Badge text="PRO" variant="status" />
							</div>

							<p className="text-body mb-4">
								Building amazing apps with React Native and loving every minute of it!
							</p>

							<div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
								<Button variant="ghost" icon="thumb_up" size="sm" onPress={() => {}}>
									Like
								</Button>
								<Button variant="ghost" icon="comment" size="sm" onPress={() => {}}>
									Comment
								</Button>
								<Button variant="ghost" icon="share" size="sm" onPress={() => {}}>
									Share
								</Button>
							</div>
						</Card>

						<Card variant="basic">
							<div
								style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
							>
								<div style={{ textAlign: "center", padding: "var(--space-3)" }}>
									<Icon name="trending_up" color="var(--color-success)" size="lg" />
									<h3 className="text-heading">24.5%</h3>
									<p className="text-caption text-secondary">Growth</p>
								</div>
								<div style={{ width: 1, height: 60, backgroundColor: "var(--color-outline)" }} />
								<div style={{ textAlign: "center", padding: "var(--space-3)" }}>
									<Icon name="people" color="var(--color-info)" size="lg" />
									<h3 className="text-heading">1.2K</h3>
									<p className="text-caption text-secondary">Users</p>
								</div>
								<div style={{ width: 1, height: 60, backgroundColor: "var(--color-outline)" }} />
								<div style={{ textAlign: "center", padding: "var(--space-3)" }}>
									<Icon name="star" color="var(--color-warning)" size="lg" />
									<h3 className="text-heading">4.8</h3>
									<p className="text-caption text-secondary">Rating</p>
								</div>
							</div>
						</Card>
					</div>
				</LiveExample>

				<LiveExample
					title="Card Lists"
					code={`const items = [
  { id: 1, title: 'First Item', description: 'Description for the first item' },
  { id: 2, title: 'Second Item', description: 'Description for the second item' },
  { id: 3, title: 'Third Item', description: 'Description for the third item' },
];

return (
  <View style={styles.cardList}>
    {items.map((item) => (
      <Card
        key={item.id}
        interactive
        onPress={() => console.log('Selected:', item.id)}
        style={styles.listCard}
      >
        <View style={styles.listCardContent}>
          <View style={styles.listCardText}>
            <Text variant="subtitle">{item.title}</Text>
            <Text variant="body" color="secondary">
              {item.description}
            </Text>
          </View>
          <Icon name="chevron_right" color="secondary" />
        </View>
      </Card>
    ))}
  </View>
);`}
				>
					<div className="flex flex--column flex--gap-3">
						{[
							{ id: 1, title: "First Item", description: "Description for the first item" },
							{ id: 2, title: "Second Item", description: "Description for the second item" },
							{ id: 3, title: "Third Item", description: "Description for the third item" },
						].map((item) => (
							<Card
								key={item.id}
								variant="interactive"
								onPress={() => console.log("Selected:", item.id)}
							>
								<div
									style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
								>
									<div>
										<h4 className="text-subtitle">{item.title}</h4>
										<p className="text-body text-secondary">{item.description}</p>
									</div>
									<Icon name="chevron_right" color="var(--color-on-surface-variant)" />
								</div>
							</Card>
						))}
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Card } from '@braingame/bgui';

function ProductCard({ product, onPress }) {
  return (
    <Card
      interactive
      onPress={onPress}
      style={styles.productCard}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text variant="subtitle" numberOfLines={2}>
          {product.name}
        </Text>
        <Text variant="caption" color="secondary">
          {product.category}
        </Text>
        <View style={styles.priceRow}>
          <Text variant="heading" color="primary">
            \${product.price}
          </Text>
          {product.originalPrice && (
            <Text
              variant="caption"
              color="secondary"
              style={styles.originalPrice}
            >
              \${product.originalPrice}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: 200,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
});`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear hierarchy:</strong> Use consistent spacing and typography to establish
						visual hierarchy within cards.
					</li>
					<li className="mb-2">
						<strong>Appropriate elevation:</strong> Choose the right variant based on the card's
						importance and context.
					</li>
					<li className="mb-2">
						<strong>Consistent sizing:</strong> Keep cards in a collection the same size for better
						visual rhythm.
					</li>
					<li className="mb-2">
						<strong>Scannable content:</strong> Front-load important information and keep content
						concise.
					</li>
					<li className="mb-2">
						<strong>Interactive feedback:</strong> Provide clear hover and press states for
						clickable cards.
					</li>
					<li className="mb-2">
						<strong>Logical grouping:</strong> Group related actions and information within the same
						card.
					</li>
					<li className="mb-2">
						<strong>Responsive design:</strong> Ensure cards adapt well to different screen sizes.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Media Card</h3>
				<CodeBlock
					code={`<Card padding="none">
  <Image
    source={{ uri: 'https://example.com/image.jpg' }}
    style={{ height: 200 }}
  />
  <View style={{ padding: 16 }}>
    <Badge text="NEW" variant="primary" size="sm" style={{ marginBottom: 8 }} />
    <Text variant="heading">Card Title</Text>
    <Text variant="body" color="secondary" numberOfLines={2}>
      Card description that might be quite long...
    </Text>
    <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
      <Button variant="primary" size="sm" style={{ flex: 1 }}>
        View Details
      </Button>
      <Button variant="ghost" icon="bookmark" size="sm" />
    </View>
  </View>
</Card>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Dashboard Card</h3>
				<CodeBlock
					code={`<Card variant="interactive">
  <View style={styles.dashboardHeader}>
    <Text variant="subtitle">Total Revenue</Text>
    <Icon name="more_vert" color="secondary" />
  </View>
  <Text variant="display" color="primary" style={{ marginVertical: 16 }}>
    $12,543
  </Text>
  <View style={styles.dashboardFooter}>
    <Icon name="trending_up" color="success" size="sm" />
    <Text variant="caption" color="success">
      +12.5% from last month
    </Text>
  </View>
</Card>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Settings Card</h3>
				<CodeBlock
					code={`<Card variant="basic">
  <View style={styles.settingItem}>
    <Icon name="notifications" color="primary" />
    <View style={styles.settingText}>
      <Text variant="subtitle">Notifications</Text>
      <Text variant="caption" color="secondary">
        Manage your notification preferences
      </Text>
    </View>
    <Switch value={enabled} onValueChange={setEnabled} />
  </View>
</Card>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Cards should be accessible to all users:</p>
				<ul>
					<li>Interactive cards have proper touch targets (minimum 44x44 pixels)</li>
					<li>Use semantic HTML elements or appropriate ARIA roles</li>
					<li>Ensure sufficient color contrast for all text within cards</li>
					<li>Provide focus indicators for keyboard navigation</li>
					<li>Include alternative text for images within cards</li>
					<li>Group related content with appropriate ARIA labels</li>
					<li>Announce state changes for interactive cards</li>
				</ul>
			</section>

			<PropsTable props={cardProps} />
		</div>
	);
}

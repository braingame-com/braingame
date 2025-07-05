"use client";

import { Button, Card, View } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const viewProps = [
	{
		name: "children",
		type: "React.ReactNode",
		required: false,
		description: "Content to be displayed inside the view.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the view. Supports all React Native View styles.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
	{
		name: "accessible",
		type: "boolean",
		required: false,
		description: "When true, indicates that the view is an accessibility element.",
	},
	{
		name: "accessibilityLabel",
		type: "string",
		required: false,
		description: "Overrides the text that's read by the screen reader.",
	},
	{
		name: "accessibilityRole",
		type: "AccessibilityRole",
		required: false,
		description: "Communicates the purpose of a component to assistive technology.",
	},
	{
		name: "onLayout",
		type: "(event: LayoutChangeEvent) => void",
		required: false,
		description: "Invoked on mount and on layout changes.",
	},
	{
		name: "pointerEvents",
		type: '"box-none" | "none" | "box-only" | "auto"',
		required: false,
		description: "Controls whether the View can be the target of touch events.",
	},
];

export default function ViewDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">View</h1>
			<p className="text-subtitle text-secondary mb-8">
				View is the most fundamental component for building UI. It's a container that supports
				layout with flexbox, style, touch handling, and accessibility controls. View maps directly
				to native views on each platform.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Layout"
					code={`<View style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
  <Text>This is a basic View container</Text>
</View>

<View style={{ 
  flexDirection: 'row', 
  justifyContent: 'space-between',
  padding: 16 
}}>
  <Text>Left</Text>
  <Text>Center</Text>
  <Text>Right</Text>
</View>`}
				>
					<View style={{ padding: 20, backgroundColor: "var(--color-surface-container)" }}>
						<span className="text-body">This is a basic View container</span>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							padding: 16,
							marginTop: 16,
							backgroundColor: "var(--color-surface-container)",
						}}
					>
						<span className="text-body">Left</span>
						<span className="text-body">Center</span>
						<span className="text-body">Right</span>
					</View>
				</LiveExample>

				<LiveExample
					title="Flexbox Layouts"
					code={`// Row layout with gap
<View style={{ flexDirection: 'row', gap: 12 }}>
  <View style={styles.box} />
  <View style={styles.box} />
  <View style={styles.box} />
</View>

// Column layout with flex
<View style={{ height: 200 }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'green' }} />
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
</View>

// Center content
<View style={{
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#eee'
}}>
  <Text>Centered</Text>
</View>`}
				>
					<div className="flex flex--column flex--gap-4">
						<View style={{ flexDirection: "row", gap: 12 }}>
							<View style={{ width: 50, height: 50, backgroundColor: "var(--color-primary)" }} />
							<View style={{ width: 50, height: 50, backgroundColor: "var(--color-secondary)" }} />
							<View style={{ width: 50, height: 50, backgroundColor: "var(--color-tertiary)" }} />
						</View>

						<View style={{ height: 120, display: "flex" }}>
							<View style={{ flex: 1, backgroundColor: "var(--color-error-container)" }} />
							<View style={{ flex: 2, backgroundColor: "var(--color-success-container)" }} />
							<View style={{ flex: 1, backgroundColor: "var(--color-info-container)" }} />
						</View>

						<View
							style={{
								height: 100,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "var(--color-surface-container)",
							}}
						>
							<span className="text-body">Centered</span>
						</View>
					</div>
				</LiveExample>

				<LiveExample
					title="Nested Views"
					code={`<View style={styles.container}>
  <View style={styles.header}>
    <Text variant="heading">Header</Text>
  </View>
  
  <View style={styles.content}>
    <View style={styles.sidebar}>
      <Text>Sidebar</Text>
    </View>
    
    <View style={styles.main}>
      <Text>Main Content</Text>
    </View>
  </View>
  
  <View style={styles.footer}>
    <Text>Footer</Text>
  </View>
</View>`}
				>
					<View style={{ border: "1px solid var(--color-outline)", borderRadius: 8 }}>
						<View style={{ padding: 16, backgroundColor: "var(--color-primary-container)" }}>
							<h3 className="text-heading">Header</h3>
						</View>

						<View style={{ display: "flex", flexDirection: "row", minHeight: 150 }}>
							<View
								style={{
									flex: "0 0 150px",
									padding: 16,
									backgroundColor: "var(--color-surface-container)",
								}}
							>
								<span className="text-body">Sidebar</span>
							</View>

							<View style={{ flex: 1, padding: 16 }}>
								<span className="text-body">Main Content</span>
							</View>
						</View>

						<View
							style={{
								padding: 16,
								backgroundColor: "var(--color-secondary-container)",
								borderBottomLeftRadius: 8,
								borderBottomRightRadius: 8,
							}}
						>
							<span className="text-body">Footer</span>
						</View>
					</View>
				</LiveExample>

				<LiveExample
					title="Responsive Grid"
					code={`<View style={styles.grid}>
  {items.map((item) => (
    <View key={item.id} style={styles.gridItem}>
      <Card>
        <Text>{item.title}</Text>
      </Card>
    </View>
  ))}
</View>

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    // Responsive widths
    width: '100%', // mobile
    // width: '48%', // tablet
    // width: '31%', // desktop
  },
});`}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 16,
						}}
					>
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<View
								key={item}
								style={{
									width: "calc(33.333% - 11px)",
									minWidth: 150,
								}}
							>
								<Card>
									<span className="text-body">Item {item}</span>
								</Card>
							</View>
						))}
					</View>
				</LiveExample>

				<LiveExample
					title="Accessibility"
					code={`<View
  accessible={true}
  accessibilityRole="navigation"
  accessibilityLabel="Main navigation"
>
  <Button onPress={() => {}}>Home</Button>
  <Button onPress={() => {}}>Profile</Button>
  <Button onPress={() => {}}>Settings</Button>
</View>

<View
  accessible={true}
  accessibilityRole="article"
  accessibilityLabel="Featured article"
>
  <Text variant="heading">Article Title</Text>
  <Text>Article content...</Text>
</View>`}
				>
					<div className="flex flex--column flex--gap-4">
						<View
							accessible={true}
							accessibilityRole="navigation"
							accessibilityLabel="Main navigation"
							style={{
								display: "flex",
								flexDirection: "row",
								gap: 8,
								padding: 16,
								backgroundColor: "var(--color-surface-container)",
								borderRadius: 8,
							}}
						>
							<Button onPress={() => {}}>Home</Button>
							<Button onPress={() => {}}>Profile</Button>
							<Button onPress={() => {}}>Settings</Button>
						</View>

						<View
							accessible={true}
							accessibilityRole="article"
							accessibilityLabel="Featured article"
							style={{
								padding: 16,
								backgroundColor: "var(--color-surface-container)",
								borderRadius: 8,
							}}
						>
							<h3 className="text-heading mb-2">Article Title</h3>
							<p className="text-body">Article content...</p>
						</View>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { View } from '@braingame/bgui';

function ProfileCard({ user }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text variant="heading">{user.name}</Text>
          <Text variant="caption" color="secondary">
            {user.email}
          </Text>
        </View>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text variant="title">{user.posts}</Text>
          <Text variant="caption">Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="title">{user.followers}</Text>
          <Text variant="caption">Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="title">{user.following}</Text>
          <Text variant="caption">Following</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button onPress={handleFollow} style={{ flex: 1 }}>
          Follow
        </Button>
        <Button variant="ghost" onPress={handleMessage} style={{ flex: 1 }}>
          Message
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Layout Patterns</h2>

				<h3 className="text-heading mb-3">Safe Area Layout</h3>
				<CodeBlock
					code={`import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SafeScreen({ children }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Keyboard Avoiding Layout</h3>
				<CodeBlock
					code={`<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <View style={styles.container}>
    <ScrollView>
      {/* Content that might be covered by keyboard */}
    </ScrollView>
    <View style={styles.footer}>
      <TextInput />
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  </View>
</KeyboardAvoidingView>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Responsive Layout</h3>
				<CodeBlock
					code={`import { useWindowDimensions } from 'react-native';

function ResponsiveGrid({ children }) {
  const { width } = useWindowDimensions();
  
  const getColumns = () => {
    if (width < 400) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };
  
  const columns = getColumns();
  const itemWidth = \`\${100 / columns}%\`;
  
  return (
    <View style={styles.grid}>
      {React.Children.map(children, (child, index) => (
        <View key={index} style={{ width: itemWidth, padding: 8 }}>
          {child}
        </View>
      ))}
    </View>
  );
}`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Semantic structure:</strong> Use Views to create logical groupings of related
						content, not just for styling.
					</li>
					<li className="mb-2">
						<strong>Flexbox first:</strong> Leverage flexbox properties for layouts instead of
						absolute positioning when possible.
					</li>
					<li className="mb-2">
						<strong>Performance:</strong> Avoid deeply nested Views. Flatten your component
						hierarchy where possible.
					</li>
					<li className="mb-2">
						<strong>Accessibility:</strong> Use accessibility props to make your UI understandable
						to screen readers.
					</li>
					<li className="mb-2">
						<strong>Platform differences:</strong> Test layouts on both iOS and Android as they may
						render differently.
					</li>
					<li className="mb-2">
						<strong>Responsive design:</strong> Use percentage widths and flexbox to create layouts
						that work across screen sizes.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Issues</h2>
				<ul>
					<li className="mb-2">
						<strong>Missing flex:</strong> Parent Views need flex: 1 for children to use flex
						properties effectively.
					</li>
					<li className="mb-2">
						<strong>Text outside View:</strong> Text strings must be wrapped in Text components, not
						placed directly in Views.
					</li>
					<li className="mb-2">
						<strong>Percentage heights:</strong> Percentage heights only work if the parent has a
						defined height.
					</li>
					<li className="mb-2">
						<strong>Shadow differences:</strong> iOS uses shadow* props while Android uses
						elevation.
					</li>
				</ul>
			</section>

			<PropsTable props={viewProps} />
		</div>
	);
}

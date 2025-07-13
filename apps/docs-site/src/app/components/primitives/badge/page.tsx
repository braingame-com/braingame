"use client";

import { Badge, Icon } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const badgeProps = [
	{
		name: "text",
		type: "string | number",
		required: true,
		description: "The text or number to display in the badge.",
	},
	{
		name: "variant",
		type: '"notification" | "status" | "count"',
		required: false,
		default: '"notification"',
		description:
			"Visual style variant of the badge. Each variant has specific colors for different contexts.",
	},
	{
		name: "size",
		type: '"small" | "medium"',
		required: false,
		default: '"medium"',
		description: "Size of the badge. Small for compact UI elements, medium for standard usage.",
	},
	{
		name: "dot",
		type: "boolean",
		required: false,
		default: "false",
		description:
			"Display as a simple dot indicator instead of showing text. Useful for notification indicators.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the badge container.",
	},
];

export default function BadgeDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Badge</h1>
			<p className="text-subtitle text-secondary mb-8">
				Badges are small status indicators for UI elements. They can display numeric values, text
				labels, or simple dot indicators to convey information like counts, statuses, or
				notifications.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Variants"
					code={`<Badge text="5" variant="notification" />
<Badge text="Active" variant="status" />
<Badge text="99+" variant="count" />`}
				>
					<div className="flex flex--gap-3 flex--wrap">
						<Badge text="5" variant="notification" />
						<Badge text="Active" variant="status" />
						<Badge text="99+" variant="count" />
					</div>
				</LiveExample>

				<LiveExample
					title="Numeric Badges"
					code={`<Badge text={5} variant="notification" />
<Badge text={42} variant="count" />
<Badge text="99+" variant="count" />
<Badge text="0" variant="notification" />
<Badge text={0} variant="notification" /> {/* Hidden by default */}`}
				>
					<div className="flex flex--gap-3 flex--wrap" style={{ alignItems: "center" }}>
						<Badge text="5" variant="notification" />
						<Badge text="42" variant="count" />
						<Badge text="99+" variant="count" />
						<Badge text="0" variant="notification" />
						<span className="text-small text-secondary">(Zero hidden by default)</span>
					</div>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<Badge text="Small" variant="notification" />
<Badge text="Medium" variant="notification" />
<Badge text={8} variant="count" />
<Badge text={8} variant="count" />`}
				>
					<div className="flex flex--gap-3 flex--wrap" style={{ alignItems: "center" }}>
						<Badge text="Small" variant="notification" />
						<Badge text="Medium" variant="notification" />
						<div style={{ width: 20 }} />
						<Badge text="8" variant="count" />
						<Badge text="8" variant="count" />
					</div>
				</LiveExample>

				<LiveExample
					title="Dot Indicators"
					code={`<Badge dot variant="notification" />
<Badge dot variant="status" />
<Badge dot variant="notification" />
<Badge dot variant="status" />
<Badge dot size="small" variant="notification" />`}
				>
					<div className="flex flex--gap-4 flex--wrap" style={{ alignItems: "center" }}>
						<div className="flex flex--gap-2" style={{ alignItems: "center" }}>
							<Badge dot variant="notification" />
							<span className="text-small">Online</span>
						</div>
						<div className="flex flex--gap-2" style={{ alignItems: "center" }}>
							<Badge dot variant="status" />
							<span className="text-small">Available</span>
						</div>
						<div className="flex flex--gap-2" style={{ alignItems: "center" }}>
							<Badge dot variant="notification" />
							<span className="text-small">Away</span>
						</div>
						<div className="flex flex--gap-2" style={{ alignItems: "center" }}>
							<Badge dot variant="status" />
							<span className="text-small">Busy</span>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="With Icons"
					code={`import { View } from 'react-native';
import { Badge, Icon } from '@braingame/bgui';

<View style={{ position: 'relative', display: 'inline-block' }}>
  <Icon name="notifications" size="lg" />
  <Badge 
    text={3} 
    variant="notification" 
    size="small"
    style={{ 
      position: 'absolute', 
      top: -4, 
      right: -4 
    }} 
  />
</View>

<View style={{ position: 'relative', display: 'inline-block' }}>
  <Icon name="email" size="lg" />
  <Badge 
    dot 
    variant="status" 
    style={{ 
      position: 'absolute', 
      top: 0, 
      right: 0 
    }} 
  />
</View>`}
				>
					<div className="flex flex--gap-6">
						<div style={{ position: "relative", display: "inline-block" }}>
							<Icon name="notifications" size="lg" color="var(--color-on-surface)" />
							<Badge
								text="3"
								variant="notification"
								style={{
									position: "absolute",
									top: -4,
									right: -4,
								}}
							/>
						</div>
						<div style={{ position: "relative", display: "inline-block" }}>
							<Icon name="email" size="lg" color="var(--color-on-surface)" />
							<Badge
								dot
								variant="status"
								style={{
									position: "absolute",
									top: 0,
									right: 0,
								}}
							/>
						</div>
						<div style={{ position: "relative", display: "inline-block" }}>
							<Icon name="shopping_cart" size="lg" color="var(--color-on-surface)" />
							<Badge
								text="12"
								variant="count"
								style={{
									position: "absolute",
									top: -4,
									right: -4,
								}}
							/>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Status Labels"
					code={`<Badge text="NEW" variant="status" />
<Badge text="BETA" variant="status" />
<Badge text="PRO" variant="status" />
<Badge text="SALE" variant="notification" />
<Badge text="COMING SOON" variant="status" />`}
				>
					<div className="flex flex--gap-3 flex--wrap">
						<Badge text="NEW" variant="status" />
						<Badge text="BETA" variant="status" />
						<Badge text="PRO" variant="status" />
						<Badge text="SALE" variant="notification" />
						<Badge text="COMING SOON" variant="status" />
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Badge } from '@braingame/bgui';

function NotificationIcon() {
  const unreadCount = 5;
  
  return (
    <View style={styles.container}>
      <Icon name="notifications" size="lg" />
      {unreadCount > 0 && (
        <Badge 
          text={unreadCount} 
          variant="notification"
          size="small"
          style={styles.badge}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Navigation Badges</h3>
				<CodeBlock
					code={`// Tab bar with badge
<Tab.Navigator>
  <Tab.Screen 
    name="Messages"
    options={{
      tabBarIcon: ({ color }) => (
        <View>
          <Icon name="email" color={color} />
          <Badge text={unreadMessages} variant="notification" size="small" />
        </View>
      ),
    }}
  />
</Tab.Navigator>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">List Items</h3>
				<CodeBlock
					code={`// List item with status badge
<ListItem>
  <ListItem.Content>
    <ListItem.Title>System Update</ListItem.Title>
    <ListItem.Subtitle>Version 2.0 available</ListItem.Subtitle>
  </ListItem.Content>
  <Badge text="NEW" variant="status" />
</ListItem>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Keep it concise:</strong> Badges should contain minimal text. For numbers,
						consider using the max prop to cap display at 99+.
					</li>
					<li className="mb-2">
						<strong>Use semantic variants:</strong> Choose variants that match the semantic meaning
						(danger for errors, success for completed items, etc.).
					</li>
					<li className="mb-2">
						<strong>Position carefully:</strong> When overlaying badges on icons, ensure they don't
						obscure important parts of the icon.
					</li>
					<li className="mb-2">
						<strong>Consider accessibility:</strong> Badges convey important information, so ensure
						the context is clear for screen reader users.
					</li>
					<li className="mb-2">
						<strong>Animation:</strong> Consider adding subtle enter/exit animations for badges that
						appear and disappear frequently.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">
					Badges are typically supplementary UI elements. To ensure accessibility:
				</p>
				<ul>
					<li>Include badge information in accessible labels for parent components</li>
					<li>Use aria-label to provide context (e.g., "3 unread messages" not just "3")</li>
					<li>Ensure sufficient color contrast between badge and background</li>
					<li>Don't rely solely on color to convey meaning</li>
					<li>For dynamic badges, consider using aria-live regions to announce changes</li>
				</ul>
			</section>

			<PropsTable props={badgeProps} />
		</div>
	);
}

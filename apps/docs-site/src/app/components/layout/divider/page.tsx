"use client";

import { Button, Divider } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const dividerProps = [
	{
		name: "orientation",
		type: '"horizontal" | "vertical"',
		required: false,
		default: '"horizontal"',
		description: "Orientation of the divider.",
	},
	{
		name: "variant",
		type: '"solid" | "dashed"',
		required: false,
		default: '"solid"',
		description: "Visual style of the divider line.",
	},
	{
		name: "thickness",
		type: "number",
		required: false,
		default: "1",
		description: "Thickness of the divider line in pixels.",
	},
	{
		name: "color",
		type: "string",
		required: false,
		default: "var(--color-outline-variant)",
		description: "Color of the divider line. Accepts any valid CSS color.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the divider container.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
];

export default function DividerDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Divider</h1>
			<p className="text-subtitle text-secondary mb-8">
				Dividers are thin lines that group content in lists and layouts. They separate content into
				clear sections and create visual hierarchy.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Dividers"
					code={`<View>
  <Text>Content above divider</Text>
  <Divider />
  <Text>Content below divider</Text>
</View>

<View>
  <Text>Section 1</Text>
  <Divider variant="dashed" />
  <Text>Section 2</Text>
  <Divider variant="dashed" />
  <Text>Section 3</Text>
</View>`}
				>
					<div>
						<p className="text-body">Content above divider</p>
						<Divider />
						<p className="text-body">Content below divider</p>
					</div>

					<div className="mt-6">
						<p className="text-body">Section 1</p>
						<Divider variant="dashed" />
						<p className="text-body">Section 2</p>
						<Divider variant="dashed" />
						<p className="text-body">Section 3</p>
					</div>
				</LiveExample>

				<LiveExample
					title="Custom Styling"
					code={`<Divider color="var(--color-primary)" thickness={2} />

<Divider color="var(--color-secondary)" thickness={3} variant="dashed" />`}
				>
					<div>
						<Divider color="var(--color-primary)" thickness={2} />

						<div className="mt-6">
							<Divider color="var(--color-secondary)" thickness={3} variant="dashed" />
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Vertical Dividers"
					code={`<View style={{ flexDirection: 'row', alignItems: 'center', height: 100 }}>
  <Text>Left</Text>
  <Divider orientation="vertical" />
  <Text>Center</Text>
  <Divider orientation="vertical" variant="dashed" />
  <Text>Right</Text>
</View>`}
				>
					<div style={{ display: "flex", alignItems: "center", height: 60, gap: "var(--space-4)" }}>
						<span className="text-body">Left</span>
						<Divider orientation="vertical" />
						<span className="text-body">Center</span>
						<Divider orientation="vertical" variant="dashed" />
						<span className="text-body">Right</span>
					</div>
				</LiveExample>

				<LiveExample
					title="Login Form Example"
					code={`<View style={styles.loginForm}>
  <TextInput
    label="Email"
    placeholder="Enter your email"
    keyboardType="email-address"
  />
  <TextInput
    label="Password"
    placeholder="Enter your password"
    secureTextEntry
  />
  <Button onClick={handleLogin} style={{ marginTop: 16 }}>
    Sign In
  </Button>
  
  <Divider label="OR" spacing="lg" />
  
  <Button variant="outlined" icon="google">
    Continue with Google
  </Button>
  <Button variant="outlined" icon="apple">
    Continue with Apple
  </Button>
</View>`}
				>
					<div className="flex flex--column flex--gap-4">
						<div>
							<input
								type="email"
								placeholder="Enter your email"
								className="textinput__input"
								style={{ marginBottom: "var(--space-3)" }}
							/>
							<input
								type="password"
								placeholder="Enter your password"
								className="textinput__input"
								style={{ marginBottom: "var(--space-4)" }}
							/>
							<Button onClick={() => {}}>Sign In</Button>
						</div>

						<div className="flex flex--align-center flex--gap-3">
							<Divider />
							<span className="text-body text-secondary">OR</span>
							<Divider />
						</div>

						<div className="flex flex--column flex--gap-3">
							<Button variant="outlined" onClick={() => {}}>
								Continue with Google
							</Button>
							<Button variant="outlined" onClick={() => {}}>
								Continue with Apple
							</Button>
						</div>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Divider } from '@braingame/bgui';

function SettingsList() {
  return (
    <View style={styles.container}>
      <SettingsSection title="Account">
        <SettingsItem icon="person" label="Profile" onClick={openProfile} />
        <Divider inset={56} spacing="none" />
        <SettingsItem icon="email" label="Email" onClick={openEmail} />
        <Divider inset={56} spacing="none" />
        <SettingsItem icon="key" label="Password" onClick={openPassword} />
      </SettingsSection>
      
      <Divider spacing="lg" thickness={8} color="var(--color-surface)" />
      
      <SettingsSection title="Preferences">
        <SettingsItem icon="palette" label="Theme" onClick={openTheme} />
        <Divider inset={56} spacing="none" />
        <SettingsItem icon="language" label="Language" onClick={openLanguage} />
        <Divider inset={56} spacing="none" />
        <SettingsItem icon="notifications" label="Notifications" onClick={openNotifications} />
      </SettingsSection>
      
      <Divider label="More Options" labelPosition="start" spacing="lg" />
      
      <SettingsSection>
        <SettingsItem icon="help" label="Help & Support" onClick={openHelp} />
        <Divider inset={56} spacing="none" />
        <SettingsItem icon="info" label="About" onClick={openAbout} />
      </SettingsSection>
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Purposeful use:</strong> Use dividers to create clear visual separation between
						distinct sections of content.
					</li>
					<li className="mb-2">
						<strong>Consistency:</strong> Use the same divider style throughout similar contexts in
						your app.
					</li>
					<li className="mb-2">
						<strong>Subtle styling:</strong> Dividers should be noticeable but not prominent. They
						support content hierarchy, not dominate it.
					</li>
					<li className="mb-2">
						<strong>Appropriate spacing:</strong> Choose spacing that matches your overall layout
						rhythm.
					</li>
					<li className="mb-2">
						<strong>Inset alignment:</strong> Use inset dividers to align with content, especially
						in lists with icons or avatars.
					</li>
					<li className="mb-2">
						<strong>Labeled dividers:</strong> Use labels sparingly for section headers or logical
						operators (like "OR").
					</li>
					<li className="mb-2">
						<strong>Avoid overuse:</strong> Too many dividers can make an interface feel cluttered
						and busy.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">List Separator</h3>
				<CodeBlock
					code={`<FlatList
  data={items}
  renderItem={({ item }) => <ListItem {...item} />}
  ItemSeparatorComponent={() => <Divider inset spacing="none" />}
/>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Section Break</h3>
				<CodeBlock
					code={`<ScrollView>
  <Section title="Recent">
    {recentItems.map(item => <Item key={item.id} {...item} />)}
  </Section>
  
  <Divider 
    spacing="lg" 
    thickness={8} 
    color="var(--color-surface-container)" 
  />
  
  <Section title="All Items">
    {allItems.map(item => <Item key={item.id} {...item} />)}
  </Section>
</ScrollView>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Toolbar Separator</h3>
				<CodeBlock
					code={`<View style={styles.toolbar}>
  <IconButton icon="format_bold" onClick={toggleBold} />
  <IconButton icon="format_italic" onClick={toggleItalic} />
  <IconButton icon="format_underlined" onClick={toggleUnderline} />
  
  <Divider orientation="vertical" spacing="sm" />
  
  <IconButton icon="format_align_left" onClick={alignLeft} />
  <IconButton icon="format_align_center" onClick={alignCenter} />
  <IconButton icon="format_align_right" onClick={alignRight} />
</View>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Timeline Divider</h3>
				<CodeBlock
					code={`<View style={styles.timeline}>
  <TimelineItem time="2:00 PM" title="Meeting started" />
  <Divider 
    orientation="vertical" 
    style={{ marginLeft: 20, height: 40 }}
    variant="dashed"
  />
  <TimelineItem time="2:30 PM" title="Break" />
  <Divider 
    orientation="vertical" 
    style={{ marginLeft: 20, height: 40 }}
    variant="dashed"
  />
  <TimelineItem time="3:00 PM" title="Meeting ended" />
</View>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Dividers are primarily decorative elements:</p>
				<ul>
					<li>Dividers are hidden from screen readers by default (role="separator")</li>
					<li>Labeled dividers have their text announced appropriately</li>
					<li>Ensure sufficient color contrast when using custom colors</li>
					<li>Don't rely solely on dividers to convey information structure</li>
					<li>Consider using semantic HTML elements (hr, section) where appropriate</li>
				</ul>
			</section>

			<PropsTable props={dividerProps} />
		</div>
	);
}

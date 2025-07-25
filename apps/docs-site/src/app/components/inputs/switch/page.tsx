"use client";

import { useState } from "react";
import { Switch } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const switchProps = [
	{
		name: "checked",
		type: "boolean",
		required: true,
		description: "The on/off state of the switch.",
	},
	{
		name: "onValueChange",
		type: "(value: boolean) => void",
		required: true,
		description: "Callback function called when the switch state changes.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the switch is disabled. Prevents interaction and reduces opacity.",
	},
	{
		name: "variant",
		type: '"standard" | "compact"',
		required: false,
		default: '"standard"',
		description: "Size variant of the switch.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the switch container.",
	},
];

export default function SwitchDocs() {
	const [enabled1, setEnabled1] = useState(false);
	const [enabled2, setEnabled2] = useState(true);
	const [settings, setSettings] = useState({
		notifications: true,
		darkMode: false,
		autoSave: true,
		analytics: false,
	});

	return (
		<div>
			<h1 className="text-display mb-4">Switch</h1>
			<p className="text-subtitle text-secondary mb-8">
				Switches toggle the state of a single setting on or off. They are the preferred way to
				adjust settings on mobile platforms.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Switch"
					code={`const [enabled, setEnabled] = useState(false);

return (
  <Switch
    checked={enabled}
    onValueChange={setEnabled}
  />
);`}
				>
					<div className="flex flex--gap-2 flex--align-center">
						<Switch checked={enabled1} onValueChange={setEnabled1} />
						<span className="text-body">Enable notifications</span>
					</div>
				</LiveExample>

				<LiveExample
					title="States"
					code={`<Switch checked={false} onValueChange={() => {}} />
<Switch checked={true} onValueChange={() => {}} />
<Switch checked={false} onValueChange={() => {}} disabled />
<Switch checked={true} onValueChange={() => {}} disabled />`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="flex flex--gap-2 flex--align-center">
							<Switch checked={false} onValueChange={() => {}} />
							<span className="text-body">Off</span>
						</div>
						<div className="flex flex--gap-2 flex--align-center">
							<Switch checked={true} onValueChange={() => {}} />
							<span className="text-body">On</span>
						</div>
						<div className="flex flex--gap-2 flex--align-center">
							<Switch checked={false} onValueChange={() => {}} disabled />
							<span className="text-body text-secondary">Disabled Off</span>
						</div>
						<div className="flex flex--gap-2 flex--align-center">
							<Switch checked={true} onValueChange={() => {}} disabled />
							<span className="text-body text-secondary">Disabled On</span>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Basic Usage"
					code={`<Switch checked={enabled} onValueChange={setEnabled} />
<Switch checked={enabled} onValueChange={setEnabled} />
<Switch checked={enabled} onValueChange={setEnabled} />`}
				>
					<div className="flex flex--column flex--gap-3">
						<Switch checked={enabled2} onValueChange={setEnabled2} />
						<Switch checked={enabled2} onValueChange={setEnabled2} />
						<Switch checked={enabled2} onValueChange={setEnabled2} />
					</div>
				</LiveExample>

				<LiveExample
					title="Checked State"
					code={`<Switch checked={true} onValueChange={() => {}} />
<Switch checked={true} onValueChange={() => {}} />
<Switch checked={true} onValueChange={() => {}} />
<Switch checked={true} onValueChange={() => {}} />
<Switch checked={true} onValueChange={() => {}} />`}
				>
					<div className="flex flex--column flex--gap-3">
						<Switch checked={true} onValueChange={() => {}} />
						<Switch checked={true} onValueChange={() => {}} />
						<Switch checked={true} onValueChange={() => {}} />
						<Switch checked={true} onValueChange={() => {}} />
						<Switch checked={true} onValueChange={() => {}} />
					</div>
				</LiveExample>

				<LiveExample
					title="Size Variants"
					code={`<Switch 
  checked={enabled} 
  onValueChange={setEnabled}
  variant="standard"
/>

<Switch 
  checked={enabled} 
  onValueChange={setEnabled}
  variant="compact"
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Switch
							checked={settings.darkMode}
							onValueChange={(value: boolean) => setSettings({ ...settings, darkMode: value })}
							variant="standard"
						/>
						<Switch
							checked={settings.notifications}
							onValueChange={(value: boolean) => setSettings({ ...settings, notifications: value })}
							variant="compact"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Settings List"
					code={`const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoSave: true,
  analytics: false,
});

return (
  <View style={styles.settingsList}>
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text variant="body">Push Notifications</Text>
        <Text variant="caption" color="secondary">
          Receive alerts for important updates
        </Text>
      </View>
      <Switch
        checked={settings.notifications}
        onValueChange={(value: boolean) => 
          setSettings({ ...settings, notifications: value })
        }
      />
    </View>

    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text variant="body">Dark Mode</Text>
        <Text variant="caption" color="secondary">
          Reduce eye strain in low light
        </Text>
      </View>
      <Switch
        checked={settings.darkMode}
        onValueChange={(value: boolean) => 
          setSettings({ ...settings, darkMode: value })
        }
      />
    </View>

    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text variant="body">Auto-save</Text>
        <Text variant="caption" color="secondary">
          Automatically save your changes
        </Text>
      </View>
      <Switch
        checked={settings.autoSave}
        onValueChange={(value: boolean) => 
          setSettings({ ...settings, autoSave: value })
        }
      />
    </View>

    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text variant="body">Analytics</Text>
        <Text variant="caption" color="secondary">
          Help us improve by sharing usage data
        </Text>
      </View>
      <Switch
        checked={settings.analytics}
        onValueChange={(value: boolean) => 
          setSettings({ ...settings, analytics: value })
        }
      />
    </View>
  </View>
);`}
				>
					<div className="settings-list">
						<div className="setting-row">
							<div className="setting-info">
								<h4 className="text-body">Push Notifications</h4>
								<p className="text-caption text-secondary">Receive alerts for important updates</p>
							</div>
							<Switch
								checked={settings.notifications}
								onValueChange={(value: boolean) => setSettings({ ...settings, notifications: value })}
							/>
						</div>

						<div className="setting-row">
							<div className="setting-info">
								<h4 className="text-body">Dark Mode</h4>
								<p className="text-caption text-secondary">Reduce eye strain in low light</p>
							</div>
							<Switch
								checked={settings.darkMode}
								onValueChange={(value: boolean) => setSettings({ ...settings, darkMode: value })}
							/>
						</div>

						<div className="setting-row">
							<div className="setting-info">
								<h4 className="text-body">Auto-save</h4>
								<p className="text-caption text-secondary">Automatically save your changes</p>
							</div>
							<Switch
								checked={settings.autoSave}
								onValueChange={(value: boolean) => setSettings({ ...settings, autoSave: value })}
							/>
						</div>

						<div className="setting-row">
							<div className="setting-info">
								<h4 className="text-body">Analytics</h4>
								<p className="text-caption text-secondary">Help us improve by sharing usage data</p>
							</div>
							<Switch
								checked={settings.analytics}
								onValueChange={(value: boolean) => setSettings({ ...settings, analytics: value })}
							/>
						</div>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Switch } from '@braingame/bgui';
import { useState } from 'react';

function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    location: false,
    camera: false,
    microphone: false,
    contacts: false,
  });

  const updatePrivacy = (key: string, value: boolean) => {
    setPrivacy({ ...privacy, [key]: value });
    // Save to backend or local storage
  };

  return (
    <View style={styles.container}>
      <Text variant="heading">Privacy Settings</Text>
      
      <Switch
        checked={privacy.location}
        onValueChange={(value: boolean) => updatePrivacy('location', value)}
      />
      
      <Switch
        checked={privacy.camera}
        onValueChange={(value: boolean) => updatePrivacy('camera', value)}
      />
      
      <Switch
        checked={privacy.microphone}
        onValueChange={(value: boolean) => updatePrivacy('microphone', value)}
      />
      
      <Switch
        checked={privacy.contacts}
        onValueChange={(value: boolean) => updatePrivacy('contacts', value)}
      />
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Switch vs Checkbox</h2>
				<p className="text-body mb-4">Choose the right component for your use case:</p>

				<div className="grid grid--cols-2 mb-4">
					<div>
						<h3 className="text-heading mb-2">Use Switch when:</h3>
						<ul>
							<li>The setting takes effect immediately</li>
							<li>You're toggling between two states (on/off)</li>
							<li>The user is enabling/disabling a feature</li>
							<li>Following mobile platform conventions</li>
						</ul>
					</div>
					<div>
						<h3 className="text-heading mb-2">Use Checkbox when:</h3>
						<ul>
							<li>Changes require form submission</li>
							<li>Selecting multiple options from a list</li>
							<li>Agreeing to terms or conditions</li>
							<li>Following web platform conventions</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Immediate effect:</strong> Switch changes should take effect immediately without
						requiring a save button.
					</li>
					<li className="mb-2">
						<strong>Clear labels:</strong> Use action-oriented labels that describe what happens
						when the switch is on.
					</li>
					<li className="mb-2">
						<strong>Default states:</strong> Choose safe defaults. Features that cost money or use
						data should default to off.
					</li>
					<li className="mb-2">
						<strong>Visual feedback:</strong> Provide smooth animations and color changes to
						indicate state changes.
					</li>
					<li className="mb-2">
						<strong>Grouping:</strong> Group related switches together under clear section headings.
					</li>
					<li className="mb-2">
						<strong>Descriptions:</strong> Add helper text for switches that control complex or
						important features.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Feature Flags</h3>
				<CodeBlock
					code={`// Beta features section
<View style={styles.section}>
  <Text variant="heading">Beta Features</Text>
  <Text variant="caption" color="secondary" style={styles.sectionDescription}>
    Try new features before they're released
  </Text>
  
  {betaFeatures.map(feature => (
    <View key={feature.id} style={styles.featureRow}>
      <View style={styles.featureInfo}>
        <Text variant="body">{feature.name}</Text>
        <Text variant="caption" color="secondary">
          {feature.description}
        </Text>
      </View>
      <Switch
        checked={feature.enabled}
        onValueChange={(value: boolean) => toggleFeature(feature.id, value)}
        color="secondary"
      />
    </View>
  ))}
</View>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Notification Preferences</h3>
				<CodeBlock
					code={`// Granular notification controls
const notificationTypes = [
  { id: 'messages', label: 'Messages', icon: 'email' },
  { id: 'mentions', label: 'Mentions', icon: 'alternate_email' },
  { id: 'updates', label: 'Updates', icon: 'update' },
  { id: 'reminders', label: 'Reminders', icon: 'alarm' },
];

return (
  <View>
    <Switch
      checked={masterNotifications}
      onValueChange={setMasterNotifications}
    />
    
    {masterNotifications && (
      <View style={styles.subSettings}>
        {notificationTypes.map(type => (
          <Switch
            key={type.id}
            checked={notifications[type.id]}
            onValueChange={(value: boolean) => 
              updateNotification(type.id, value)
            }
          />
        ))}
      </View>
    )}
  </View>
);`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Switches must be accessible to all users:</p>
				<ul>
					<li>The switch and label are properly associated for screen readers</li>
					<li>Keyboard navigation is fully supported (Tab to focus, Space to toggle)</li>
					<li>Focus states are clearly visible</li>
					<li>State changes are announced to screen readers</li>
					<li>Touch targets meet minimum size requirements (44x44 pixels)</li>
					<li>Color is not the only indicator of state (position also changes)</li>
					<li>Haptic feedback on mobile platforms when available</li>
				</ul>
			</section>

			<PropsTable props={switchProps} />

			<style jsx>{`
				.settings-list {
					display: flex;
					flex-direction: column;
					gap: var(--space-4);
				}
				
				.setting-row {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: var(--space-4);
					background-color: var(--color-surface);
					border-radius: var(--radius-lg);
					border: 1px solid var(--color-border);
				}
				
				.setting-info {
					flex: 1;
					margin-right: var(--space-4);
				}
				
				.setting-info h4 {
					margin: 0 0 var(--space-1) 0;
				}
				
				.setting-info p {
					margin: 0;
				}
			`}</style>
		</div>
	);
}

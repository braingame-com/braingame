"use client";

import { useState } from "react";
import { Checkbox } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const checkboxProps = [
	{
		name: "value",
		type: "boolean",
		required: true,
		description: "The checked state of the checkbox.",
	},
	{
		name: "onValueChange",
		type: "(value: boolean) => void",
		required: true,
		description: "Callback function called when the checkbox state changes.",
	},
	{
		name: "label",
		type: "string",
		required: false,
		description: "Text label displayed next to the checkbox.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the checkbox is disabled. Prevents interaction and reduces opacity.",
	},
	{
		name: "error",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the checkbox is in an error state. Changes the visual appearance.",
	},
	{
		name: "indeterminate",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the checkbox is in an indeterminate state (partially checked).",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		required: false,
		default: '"md"',
		description: "Size of the checkbox.",
	},
	{
		name: "color",
		type: '"primary" | "secondary" | "success" | "warning" | "error"',
		required: false,
		default: '"primary"',
		description: "Color scheme of the checkbox when checked.",
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
		description: "Custom styles to apply to the checkbox container.",
	},
];

export default function CheckboxDocs() {
	const [checked1, setChecked1] = useState(false);
	const [checked2, setChecked2] = useState(true);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [notifications, setNotifications] = useState({
		email: true,
		sms: false,
		push: true,
	});
	const [selectedOptions, setSelectedOptions] = useState<string[]>(["option1"]);

	return (
		<div>
			<h1 className="text-display mb-4">Checkbox</h1>
			<p className="text-subtitle text-secondary mb-8">
				Checkboxes allow users to select one or more items from a set. They can also be used to turn
				an option on or off.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Checkbox"
					code={`const [checked, setChecked] = useState(false);

return (
  <Checkbox
    checked={checked}
    onValueChange={setChecked}
    children="I agree to the terms and conditions"
  />
);`}
				>
					<Checkbox checked={checked1} onValueChange={setChecked1}>
						I agree to the terms and conditions
					</Checkbox>
				</LiveExample>

				<LiveExample
					title="States"
					code={`<Checkbox checked={false} onValueChange={() => {}}>Unchecked</Checkbox>
<Checkbox checked={true} onValueChange={() => {}}>Checked</Checkbox>
<Checkbox checked={false} onValueChange={() => {}} disabled>Disabled</Checkbox>
<Checkbox checked={true} onValueChange={() => {}} children="Disabled Checked" disabled />
<Checkbox checked={false} onValueChange={() => {}} error>Error</Checkbox>
<Checkbox checked={false} onValueChange={() => {}} children="Indeterminate" indeterminate />`}
				>
					<div className="flex flex--column flex--gap-3">
						<Checkbox checked={false} onValueChange={() => {}}>
							Unchecked
						</Checkbox>
						<Checkbox checked={true} onValueChange={() => {}}>
							Checked
						</Checkbox>
						<Checkbox checked={false} onValueChange={() => {}} disabled>
							Disabled
						</Checkbox>
						<Checkbox checked={true} onValueChange={() => {}} disabled>
							Disabled Checked
						</Checkbox>
						<Checkbox checked={false} onValueChange={() => {}} error>
							Error
						</Checkbox>
						<Checkbox checked={false} onValueChange={() => {}} indeterminate>
							Indeterminate
						</Checkbox>
					</div>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<Checkbox checked={checked} onValueChange={setChecked} children="Small" size="sm" />
<Checkbox checked={checked} onValueChange={setChecked} children="Medium" size="md" />
<Checkbox checked={checked} onValueChange={setChecked} children="Large" size="lg" />`}
				>
					<div className="flex flex--column flex--gap-3">
						<Checkbox checked={checked2} onValueChange={setChecked2} size="sm">
							Small
						</Checkbox>
						<Checkbox checked={checked2} onValueChange={setChecked2} size="md">
							Medium
						</Checkbox>
						<Checkbox checked={checked2} onValueChange={setChecked2} size="lg">
							Large
						</Checkbox>
					</div>
				</LiveExample>

				<LiveExample
					title="Colors"
					code={`<Checkbox checked={true} onValueChange={() => {}} color="primary">Primary</Checkbox>
<Checkbox checked={true} onValueChange={() => {}} children="Secondary" color="secondary" />
<Checkbox checked={true} onValueChange={() => {}} color="success">Success</Checkbox>
<Checkbox checked={true} onValueChange={() => {}} color="warning">Warning</Checkbox>
<Checkbox checked={true} onValueChange={() => {}} color="error">Error</Checkbox>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Checkbox checked={true} onValueChange={() => {}} color="primary">
							Primary
						</Checkbox>
						<Checkbox checked={true} onValueChange={() => {}} color="secondary">
							Secondary
						</Checkbox>
						<Checkbox checked={true} onValueChange={() => {}} color="success">
							Success
						</Checkbox>
						<Checkbox checked={true} onValueChange={() => {}} color="warning">
							Warning
						</Checkbox>
						<Checkbox checked={true} onValueChange={() => {}} color="error">
							Error
						</Checkbox>
					</div>
				</LiveExample>

				<LiveExample
					title="Checkbox Group"
					code={`const [notifications, setNotifications] = useState({
  email: true,
  sms: false,
  push: true,
});

return (
  <View>
    <Text variant="heading" style={{ marginBottom: 12 }}>
      Notification Preferences
    </Text>
    <Checkbox
      checked={notifications.email}
      onValueChange={(value) => 
        setNotifications({ ...notifications, email: value })
      }
      children="Email notifications"
    />
    <Checkbox
      checked={notifications.sms}
      onValueChange={(value) => 
        setNotifications({ ...notifications, sms: value })
      }
      children="SMS notifications"
    />
    <Checkbox
      checked={notifications.push}
      onValueChange={(value) => 
        setNotifications({ ...notifications, push: value })
      }
      children="Push notifications"
    />
  </View>
);`}
				>
					<div>
						<h4 className="text-heading mb-3">Notification Preferences</h4>
						<div className="flex flex--column flex--gap-3">
							<Checkbox
								checked={notifications.email}
								onValueChange={(value) => setNotifications({ ...notifications, email: value })}
							>
								Email notifications
							</Checkbox>
							<Checkbox
								checked={notifications.sms}
								onValueChange={(value) => setNotifications({ ...notifications, sms: value })}
							>
								SMS notifications
							</Checkbox>
							<Checkbox
								checked={notifications.push}
								onValueChange={(value) => setNotifications({ ...notifications, push: value })}
							>
								Push notifications
							</Checkbox>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Multiple Selection"
					code={`const [selectedOptions, setSelectedOptions] = useState(['option1']);
const options = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
];

const toggleOption = (optionId: string) => {
  setSelectedOptions(prev => 
    prev.includes(optionId) 
      ? prev.filter(id => id !== optionId)
      : [...prev, optionId]
  );
};

return (
  <View>
    {options.map(option => (
      <Checkbox
        key={option.id}
        checked={selectedOptions.includes(option.id)}
        onValueChange={() => toggleOption(option.id)}
        children={option.label}
      />
    ))}
  </View>
);`}
				>
					<div className="flex flex--column flex--gap-3">
						{[
							{ id: "option1", label: "Option 1" },
							{ id: "option2", label: "Option 2" },
							{ id: "option3", label: "Option 3" },
						].map((option) => (
							<Checkbox
								key={option.id}
								checked={selectedOptions.includes(option.id)}
								onValueChange={() => {
									setSelectedOptions((prev) =>
										prev.includes(option.id)
											? prev.filter((id) => id !== option.id)
											: [...prev, option.id],
									);
								}}
							>
								{option.label}
							</Checkbox>
						))}
					</div>
				</LiveExample>

				<LiveExample
					title="Form Integration"
					code={`const [acceptTerms, setAcceptTerms] = useState(false);
const [hasError, setHasError] = useState(false);

const handleSubmit = () => {
  if (!acceptTerms) {
    setHasError(true);
    return;
  }
  // Process form submission
};

return (
  <View>
    <Checkbox
      checked={acceptTerms}
      onValueChange={(value) => {
        setAcceptTerms(value);
        setHasError(false);
      }}
      children="I accept the terms and conditions"
      error={hasError}
    />
    {hasError && (
      <Text variant="caption" color="error" style={{ marginTop: 4 }}>
        You must accept the terms to continue
      </Text>
    )}
    <Button 
      onPress={handleSubmit} 
      style={{ marginTop: 16 }}
    >
      Submit
    </Button>
  </View>
);`}
				>
					<div>
						<Checkbox
							checked={acceptTerms}
							onValueChange={(value) => {
								setAcceptTerms(value);
							}}
							error={!acceptTerms}
						>
							I accept the terms and conditions
						</Checkbox>
						{!acceptTerms && (
							<p className="text-caption" style={{ color: "var(--color-error)", marginTop: 4 }}>
								You must accept the terms to continue
							</p>
						)}
						<button
							type="button"
							className="button button--primary"
							style={{ marginTop: 16 }}
							onClick={() => {
								if (!acceptTerms) {
									alert("Please accept the terms!");
								} else {
									alert("Form submitted!");
								}
							}}
						>
							Submit
						</button>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Checkbox } from '@braingame/bgui';
import { useState } from 'react';

function SettingsScreen() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
  });

  return (
    <View style={styles.container}>
      <Text variant="heading">Preferences</Text>
      
      <Checkbox
        checked={settings.darkMode}
        onValueChange={(value) => 
          setSettings({ ...settings, darkMode: value })
        }
        children="Dark mode"
      />
      
      <Checkbox
        checked={settings.notifications}
        onValueChange={(value) => 
          setSettings({ ...settings, notifications: value })
        }
        children="Enable notifications"
      />
      
      <Checkbox
        checked={settings.autoSave}
        onValueChange={(value) => 
          setSettings({ ...settings, autoSave: value })
        }
        children="Auto-save changes"
      />
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear labels:</strong> Use descriptive labels that clearly indicate what the
						checkbox controls.
					</li>
					<li className="mb-2">
						<strong>Touch targets:</strong> Ensure the entire row (checkbox + label) is tappable,
						not just the checkbox itself.
					</li>
					<li className="mb-2">
						<strong>Default states:</strong> Consider which options should be checked by default
						based on user expectations.
					</li>
					<li className="mb-2">
						<strong>Grouping:</strong> Group related checkboxes together with clear headings.
					</li>
					<li className="mb-2">
						<strong>Validation:</strong> Show error states clearly when required checkboxes are not
						selected.
					</li>
					<li className="mb-2">
						<strong>Indeterminate state:</strong> Use for parent checkboxes when some but not all
						child options are selected.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Select All Pattern</h3>
				<CodeBlock
					code={`const [items, setItems] = useState([
  { id: 1, name: 'Item 1', selected: false },
  { id: 2, name: 'Item 2', selected: false },
  { id: 3, name: 'Item 3', selected: false },
]);

const allSelected = items.every(item => item.selected);
const someSelected = items.some(item => item.selected);

const handleSelectAll = (value: boolean) => {
  setItems(items.map(item => ({ ...item, selected: value })));
};

const handleItemToggle = (id: number) => {
  setItems(items.map(item => 
    item.id === id ? { ...item, selected: !item.selected } : item
  ));
};

return (
  <View>
    <Checkbox
      checked={allSelected}
      onValueChange={handleSelectAll}
      children="Select all"
      indeterminate={someSelected && !allSelected}
    />
    <Divider />
    {items.map(item => (
      <Checkbox
        key={item.id}
        checked={item.selected}
        onValueChange={() => handleItemToggle(item.id)}
        children={item.name}
      />
    ))}
  </View>
);`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Settings Toggle</h3>
				<CodeBlock
					code={`<View style={styles.settingRow}>
  <View style={styles.settingInfo}>
    <Text variant="body">Marketing emails</Text>
    <Text variant="caption" color="secondary">
      Receive updates about new features and promotions
    </Text>
  </View>
  <Checkbox
    checked={marketingEnabled}
    onValueChange={setMarketingEnabled}
  />
</View>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Checkboxes must be accessible to all users:</p>
				<ul>
					<li>The checkbox and label are properly associated for screen readers</li>
					<li>Keyboard navigation is fully supported (Tab to focus, Space to toggle)</li>
					<li>Focus states are clearly visible</li>
					<li>Error states are announced to screen readers</li>
					<li>Touch targets meet minimum size requirements (44x44 pixels)</li>
					<li>Color is not the only indicator of state (checkmark icon for checked state)</li>
				</ul>
			</section>

			<PropsTable props={checkboxProps} />
		</div>
	);
}

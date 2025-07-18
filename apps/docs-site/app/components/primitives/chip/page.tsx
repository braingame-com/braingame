"use client";

import { useState } from "react";
import { Chip } from "@braingame/bgui";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const chipProps = [
	{
		name: "label",
		type: "string",
		required: true,
		description: "The text to display in the chip.",
	},
	{
		name: "onPress",
		type: "() => void",
		required: false,
		description: "Callback when the chip is pressed. If provided, the chip becomes interactive.",
	},
	{
		name: "onRemove",
		type: "() => void",
		required: false,
		description: "Callback when the remove button is pressed. Shows a close icon when provided.",
	},
	{
		name: "selected",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the chip is in a selected state. Changes the visual appearance.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the chip is disabled. Prevents interaction and reduces opacity.",
	},
	{
		name: "variant",
		type: '"filled" | "outlined"',
		required: false,
		default: '"filled"',
		description: "Visual style variant of the chip. Each variant has specific colors.",
	},
	{
		name: "size",
		type: '"sm" | "md"',
		required: false,
		default: '"md"',
		description: "Size of the chip affecting padding and font size.",
	},
	{
		name: "icon",
		type: "string",
		required: false,
		description: "Name of the Material icon to display at the start of the chip.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the chip container.",
	},
];

export default function ChipDocs() {
	const [selectedFilters, setSelectedFilters] = useState<string[]>(["React"]);
	const [tags, setTags] = useState(["Design", "Development", "Testing", "Documentation"]);

	const toggleFilter = (filter: string) => {
		setSelectedFilters((prev) =>
			prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
		);
	};

	const removeTag = (tag: string) => {
		setTags((prev) => prev.filter((t) => t !== tag));
	};

	return (
		<div>
			<h1 className="text-display mb-4">Chip</h1>
			<p className="text-subtitle text-secondary mb-8">
				Chips are compact elements that represent an input, attribute, or action. They allow users
				to enter information, make selections, filter content, or trigger actions.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Chips"
					code={`<Chip label="Default Chip" />
<Chip label="Clickable Chip" onPress={() => alert('Clicked!')} />
<Chip label="Selected Chip" selected />
<Chip label="Disabled Chip" disabled />`}
				>
					<div className="flex flex--gap-2 flex--wrap">
						<Chip label="Default Chip" />
						<Chip label="Clickable Chip" onPress={() => alert("Clicked!")} />
						<Chip label="Selected Chip" selected />
						<Chip label="Disabled Chip" disabled />
					</div>
				</LiveExample>

				<LiveExample
					title="Variants"
					code={`<Chip label="Filled" variant="filled" />
<Chip label="Outlined" variant="outlined" />`}
				>
					<div className="flex flex--gap-2 flex--wrap">
						<Chip label="Filled" variant="filled" />
						<Chip label="Outlined" variant="outlined" />
					</div>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<Chip label="Small" size="sm" />
<Chip label="Medium" size="md" />`}
				>
					<div className="flex flex--gap-2 flex--wrap" style={{ alignItems: "center" }}>
						<Chip label="Small" size="sm" />
						<Chip label="Medium" size="md" />
					</div>
				</LiveExample>

				<LiveExample
					title="With Icons"
					code={`<Chip label="Filter" icon="filter_list" />
<Chip label="Location" icon="location_on" variant="outlined" />
<Chip label="Time" icon="schedule" variant="outlined" />
<Chip label="Favorite" icon="favorite" variant="filled" />`}
				>
					<div className="flex flex--gap-2 flex--wrap">
						<Chip label="Filter" icon="filter_list" />
						<Chip label="Location" icon="location_on" variant="outlined" />
						<Chip label="Time" icon="schedule" variant="outlined" />
						<Chip label="Favorite" icon="favorite" variant="filled" />
					</div>
				</LiveExample>

				<LiveExample
					title="Removable Chips"
					code={`const [tags, setTags] = useState(['Design', 'Development', 'Testing']);

return (
  <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
    {tags.map(tag => (
      <Chip
        key={tag}
        label={tag}
        onRemove={() => setTags(tags.filter(t => t !== tag))}
        variant="outlined"
      />
    ))}
  </View>
);`}
				>
					<div className="flex flex--gap-2 flex--wrap">
						{tags.map((tag) => (
							<Chip key={tag} label={tag} onRemove={() => removeTag(tag)} variant="outlined" />
						))}
						{tags.length === 0 && (
							<span className="text-small text-secondary">All tags removed!</span>
						)}
					</div>
				</LiveExample>

				<LiveExample
					title="Filter Chips"
					code={`const [selectedFilters, setSelectedFilters] = useState(['React']);
const filters = ['React', 'Vue', 'Angular', 'Svelte'];

return (
  <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
    {filters.map(filter => (
      <Chip
        key={filter}
        label={filter}
        selected={selectedFilters.includes(filter)}
        onPress={() => toggleFilter(filter)}
        icon="check"
      />
    ))}
  </View>
);`}
				>
					<div className="flex flex--gap-2 flex--wrap">
						{["React", "Vue", "Angular", "Svelte"].map((filter) => (
							<Chip
								key={filter}
								label={filter}
								selected={selectedFilters.includes(filter)}
								onPress={() => toggleFilter(filter)}
								icon={selectedFilters.includes(filter) ? "check" : undefined}
							/>
						))}
					</div>
				</LiveExample>

				<LiveExample
					title="Input Chips"
					code={`<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Chip label="john@example.com" icon="email" onRemove={() => {}} />
  <Chip label="+1 (555) 123-4567" icon="phone" onRemove={() => {}} />
  <Chip label="New York" icon="location_on" onRemove={() => {}} />
</View>`}
				>
					<div className="flex flex--gap-2 flex--wrap">
						<Chip label="john@example.com" icon="email" onRemove={() => {}} variant="filled" />
						<Chip label="+1 (555) 123-4567" icon="phone" onRemove={() => {}} variant="filled" />
						<Chip label="New York" icon="location_on" onRemove={() => {}} variant="filled" />
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Chip } from '@braingame/bgui';
import { useState } from 'react';

function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim() && !tags.includes(input)) {
      setTags([...tags, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={addTag}
        placeholder="Add tag..."
      />
      <View style={styles.tagContainer}>
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onRemove={() => removeTag(tag)}
            variant="outlined"
            size="sm"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
});`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Filter Bar</h3>
				<CodeBlock
					code={`// Category filters with counts
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <View style={styles.filterBar}>
    <Chip label="All" selected onPress={() => {}} />
    <Chip label="Active (12)" onPress={() => {}} />
    <Chip label="Completed (8)" onPress={() => {}} />
    <Chip label="Archived (3)" onPress={() => {}} />
  </View>
</ScrollView>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Search Suggestions</h3>
				<CodeBlock
					code={`// Recent searches
<View>
  <Text variant="caption">Recent searches</Text>
  <View style={styles.chipGroup}>
    <Chip 
      label="React Native" 
      icon="history" 
      size="sm"
      onPress={() => search('React Native')}
    />
    <Chip 
      label="Component Library" 
      icon="history" 
      size="sm"
      onPress={() => search('Component Library')}
    />
  </View>
</View>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear labels:</strong> Use concise, descriptive labels that clearly indicate the
						chip's purpose or value.
					</li>
					<li className="mb-2">
						<strong>Consistent behavior:</strong> If some chips in a group are removable, all should
						be removable for consistency.
					</li>
					<li className="mb-2">
						<strong>Visual feedback:</strong> Always provide hover/pressed states for interactive
						chips to indicate they're clickable.
					</li>
					<li className="mb-2">
						<strong>Group related chips:</strong> Use consistent variants and sizes for chips that
						belong to the same logical group.
					</li>
					<li className="mb-2">
						<strong>Limit chip length:</strong> For long text, consider truncating with ellipsis or
						using a tooltip to show full content.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Chips should be accessible to all users:</p>
				<ul>
					<li>Interactive chips have proper touch targets (minimum 44x44 pixels)</li>
					<li>Remove buttons include accessible labels describing what will be removed</li>
					<li>Selected state is conveyed through more than just color</li>
					<li>Groups of chips should be labeled with their purpose</li>
					<li>Keyboard navigation is supported for web platforms</li>
				</ul>
			</section>

			<PropsTable props={chipProps} />
		</div>
	);
}

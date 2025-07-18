"use client";

import { useState } from "react";
import { Select } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const selectProps = [
	{
		name: "value",
		type: "string | string[]",
		required: true,
		description: "The selected value(s). String for single select, array for multi-select.",
	},
	{
		name: "onValueChange",
		type: "(value: string | string[]) => void",
		required: true,
		description: "Callback function called when the selection changes.",
	},
	{
		name: "children",
		type: "React.ReactNode",
		required: true,
		description: "SelectItem components to display as options.",
	},
	{
		name: "placeholder",
		type: "string",
		required: false,
		default: '"Select..."',
		description: "Placeholder text shown when no value is selected.",
	},
	{
		name: "helperText",
		type: "string",
		required: false,
		description: "Helper text displayed below the select.",
	},
	{
		name: "error",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the select is in an error state.",
	},
	{
		name: "errorMessage",
		type: "string",
		required: false,
		description: "Error message displayed when error is true.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the select is disabled.",
	},
	{
		name: "multiple",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether multiple values can be selected.",
	},
	{
		name: "searchable",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the select includes a search input.",
	},
	{
		name: "clearable",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the selection can be cleared.",
	},
	{
		name: "variant",
		type: '"outlined" | "filled"',
		required: false,
		default: '"outlined"',
		description: "Visual style variant of the select.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		required: false,
		default: '"md"',
		description: "Size of the select.",
	},
	{
		name: "maxHeight",
		type: "number",
		required: false,
		default: "300",
		description: "Maximum height of the dropdown in pixels.",
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
		description: "Custom styles to apply to the select container.",
	},
];

const countries = [
	{ label: "United States", value: "us" },
	{ label: "Canada", value: "ca" },
	{ label: "Mexico", value: "mx" },
	{ label: "United Kingdom", value: "uk" },
	{ label: "Germany", value: "de" },
	{ label: "France", value: "fr" },
	{ label: "Spain", value: "es" },
	{ label: "Italy", value: "it" },
	{ label: "Japan", value: "jp" },
	{ label: "China", value: "cn" },
	{ label: "Australia", value: "au" },
	{ label: "Brazil", value: "br" },
];

const languages = [
	{ label: "JavaScript", value: "js" },
	{ label: "TypeScript", value: "ts" },
	{ label: "Python", value: "py" },
	{ label: "Java", value: "java" },
	{ label: "C++", value: "cpp" },
	{ label: "Go", value: "go" },
	{ label: "Rust", value: "rust" },
	{ label: "Swift", value: "swift" },
];

const priorities = [
	{ label: "🔴 Critical", value: "critical" },
	{ label: "🟠 High", value: "high" },
	{ label: "🟡 Medium", value: "medium" },
	{ label: "🟢 Low", value: "low" },
];

export default function SelectDocs() {
	const [country, setCountry] = useState("");
	const [language, setLanguage] = useState("js");
	const [skills, setSkills] = useState<string[]>([]);
	const [priority, setPriority] = useState("medium");

	return (
		<div>
			<h1 className="text-display mb-4">Select</h1>
			<p className="text-subtitle text-secondary mb-8">
				Select components allow users to choose from a list of options. They're ideal for forms
				where users need to pick from predefined choices.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Select"
					code={`const [country, setCountry] = useState("");

const countries = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  // ... more countries
];

return (
  <Select
    value={country}
    onValueChange={(value: any) => setCountry(value as string)}
    placeholder="Choose a country"
  >
    {countries.map((c) => (
      <Select.Item key={c.value} value={c.value}>
        {c.label}
      </Select.Item>
    ))}
  </Select>
);`}
				>
					<Select
						value={country}
						onValueChange={(value: any) => setCountry(value as string)}
						placeholder="Choose a country"
					>
						{countries.slice(0, 5).map((c) => (
							<Select.Item key={c.value} value={c.value}>
								{c.label}
							</Select.Item>
						))}
					</Select>
				</LiveExample>

				<LiveExample
					title="Variants"
					code={`<Select
  value={value}
  onValueChange={(value: any) => setValue(value as string)}
  variant="dropdown"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>

<Select
  value={value}
  onValueChange={(value: any) => setValue(value as string)}
  variant="filled"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Select
							value={language}
							onValueChange={(value: any) => setLanguage(value as string)}
							variant="dropdown"
						>
							{languages.slice(0, 5).map((lang) => (
								<Select.Item key={lang.value} value={lang.value}>
									{lang.label}
								</Select.Item>
							))}
						</Select>
						<Select
							value={language}
							onValueChange={(value: any) => setLanguage(value as string)}
							variant="modal"
						>
							{languages.slice(0, 5).map((lang) => (
								<Select.Item key={lang.value} value={lang.value}>
									{lang.label}
								</Select.Item>
							))}
						</Select>
					</div>
				</LiveExample>

				<LiveExample
					title="States"
					code={`<Select
  value=""
  onValueChange={() => {}}
  placeholder="Normal state"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>

<Select
  value="disabled"
  onValueChange={() => {}}
  disabled
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>

<Select
  value=""
  onValueChange={() => {}}
  error
  errorMessage="Please select an option"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>

<Select
  value="value"
  onValueChange={() => {}}
  helperText="Choose your preferred option"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Select value="" onValueChange={() => {}} placeholder="Normal state">
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
						<Select value="high" onValueChange={() => {}} disabled>
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
						<Select value="" onValueChange={() => {}} error errorMessage="Please select an option">
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
						<Select
							value="medium"
							onValueChange={() => {}}
							helperText="Choose your preferred option"
						>
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
					</div>
				</LiveExample>

				<LiveExample
					title="Multiple Selection"
					code={`const [skills, setSkills] = useState<string[]>([]);

const programmingLanguages = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Swift", value: "swift" },
];

return (
  <Select
    value={skills}
    onValueChange={(value: any) => setSkills(value as string[])}
    placeholder="Select your skills"
    multiple
    clearable
  >
    {programmingLanguages.map((lang) => (
      <Select.Item key={lang.value} value={lang.value}>
        {lang.label}
      </Select.Item>
    ))}
  </Select>
  />
);`}
				>
					<Select
						value={skills}
						onValueChange={(value: any) => setSkills(value as string[])}
						placeholder="Select your skills"
						multiple
					>
						{languages.map((lang) => (
							<Select.Item key={lang.value} value={lang.value}>
								{lang.label}
							</Select.Item>
						))}
					</Select>
				</LiveExample>

				<LiveExample
					title="Searchable Select"
					code={`<Select
  value={country}
  onValueChange={(value: any) => setCountry(value as string)}
  placeholder="Search and select a country"
  searchable
  clearable
>
  {countries.map((c) => (
    <Select.Item key={c.value} value={c.value}>
      {c.label}
    </Select.Item>
  ))}
</Select>
/>`}
				>
					<Select
						value={country}
						onValueChange={(value: any) => setCountry(value as string)}
						placeholder="Search and select a country"
						searchable
					>
						{countries.map((c) => (
							<Select.Item key={c.value} value={c.value}>
								{c.label}
							</Select.Item>
						))}
					</Select>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<Select
  value={value}
  onValueChange={(value: any) => setValue(value as string)}
  size="sm"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>

<Select
  value={value}
  onValueChange={(value: any) => setValue(value as string)}
  size="md"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>

<Select
  value={value}
  onValueChange={(value: any) => setValue(value as string)}
  size="lg"
>
  {options.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.label}
    </Select.Item>
  ))}
</Select>
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<Select value={priority} onValueChange={(value: any) => setPriority(value as string)}>
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
						<Select value={priority} onValueChange={(value: any) => setPriority(value as string)}>
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
						<Select value={priority} onValueChange={(value: any) => setPriority(value as string)}>
							{priorities.map((p) => (
								<Select.Item key={p.value} value={p.value}>
									{p.label}
								</Select.Item>
							))}
						</Select>
					</div>
				</LiveExample>

				<LiveExample
					title="Grouped Options"
					code={`const groupedOptions = [
  {
    label: "North America",
    options: [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
      { label: "Mexico", value: "mx" },
    ],
  },
  {
    label: "Europe",
    options: [
      { label: "United Kingdom", value: "uk" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
    ],
  },
  {
    label: "Asia",
    options: [
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" },
      { label: "India", value: "in" },
    ],
  },
];

return (
  <Select
    value={country}
    onValueChange={(value: any) => setCountry(value as string)}
    placeholder="Select a country"
    searchable
  >
    {groupedOptions.map((group) => (
      <Select.Group key={group.label} label={group.label}>
        {group.options.map((opt) => (
          <Select.Item key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Item>
        ))}
      </Select.Group>
    ))}
  </Select>
  />
);`}
				>
					<Select
						value={country}
						onValueChange={(value: any) => setCountry(value as string)}
						placeholder="Select a country"
						searchable
					>
						{/* North America */}
						<Select.Item value="us">United States</Select.Item>
						<Select.Item value="ca">Canada</Select.Item>
						<Select.Item value="mx">Mexico</Select.Item>
						{/* Europe */}
						<Select.Item value="uk">United Kingdom</Select.Item>
						<Select.Item value="de">Germany</Select.Item>
						<Select.Item value="fr">France</Select.Item>
					</Select>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Select } from '@braingame/bgui';
import { useState } from 'react';

function UserProfileForm() {
  const [formData, setFormData] = useState({
    country: '',
    timezone: '',
    language: 'en',
    interests: [],
  });

  const timezones = [
    { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
    { label: 'Mountain Time (MT)', value: 'America/Denver' },
    { label: 'Central Time (CT)', value: 'America/Chicago' },
    { label: 'Eastern Time (ET)', value: 'America/New_York' },
    // ... more timezones
  ];

  const interests = [
    { label: 'Technology', value: 'tech' },
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Art', value: 'art' },
    { label: 'Travel', value: 'travel' },
    { label: 'Food', value: 'food' },
  ];

  return (
    <View style={styles.form}>
      <Select
        value={formData.country}
        onValueChange={(value: any) => 
          setFormData({ ...formData, country: value })
        }
        placeholder="Select your country"
      >
        {countries.map((c) => (
          <Select.Item key={c.value} value={c.value}>
            {c.label}
          </Select.Item>
        ))}
      </Select>
        searchable
        error={!formData.country}
        errorMessage="Country is required"
      />

      <Select
        value={formData.timezone}
        onValueChange={(value: any) => 
          setFormData({ ...formData, timezone: value })
        }
        placeholder="Select your timezone"
      >
        {timezones.map((tz) => (
          <Select.Item key={tz.value} value={tz.value}>
            {tz.label}
          </Select.Item>
        ))}
      </Select>
        helperText="Used for scheduling and notifications"
      />

      <Select
        value={formData.interests}
        onValueChange={(value: any) => 
          setFormData({ ...formData, interests: value })
        }
        placeholder="Select your interests"
      >
        {interests.map((interest) => (
          <Select.Item key={interest.value} value={interest.value}>
            {interest.label}
          </Select.Item>
        ))}
      </Select>
        multiple
        clearable
        helperText="Select up to 5 interests"
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
						<strong>Clear options:</strong> Use descriptive labels that are easy to scan and
						understand.
					</li>
					<li className="mb-2">
						<strong>Logical ordering:</strong> Sort options alphabetically or by relevance/frequency
						of use.
					</li>
					<li className="mb-2">
						<strong>Appropriate defaults:</strong> Pre-select sensible defaults when possible.
					</li>
					<li className="mb-2">
						<strong>Search for long lists:</strong> Enable search when you have more than 10-15
						options.
					</li>
					<li className="mb-2">
						<strong>Group related options:</strong> Use option groups to organize large sets of
						related choices.
					</li>
					<li className="mb-2">
						<strong>Multi-select indication:</strong> Clearly indicate when multiple selections are
						allowed.
					</li>
					<li className="mb-2">
						<strong>Loading states:</strong> Show loading indicators when options are fetched
						asynchronously.
					</li>
					<li className="mb-2">
						<strong>Keyboard support:</strong> Ensure full keyboard navigation and type-ahead
						selection.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Cascading Selects</h3>
				<CodeBlock
					code={`const [country, setCountry] = useState('');
const [state, setState] = useState('');
const [city, setCity] = useState('');

// States update based on country selection
const states = country ? getStatesByCountry(country) : [];
const cities = state ? getCitiesByState(state) : [];

return (
  <>
    <Select
      value={country}
      onValueChange={(value: any) => {
        setCountry(value);
        setState(''); // Reset dependent fields
        setCity('');
      }}
    >
      {countries.map((c) => (
        <Select.Item key={c.value} value={c.value}>
          {c.label}
        </Select.Item>
      ))}
    </Select>
    />
    
    <Select
      value={state}
      onValueChange={(value: any) => {
        setState(value);
        setCity(''); // Reset dependent field
      }}
      disabled={!country}
    >
      {states.map((state) => (
        <Select.Item key={state.value} value={state.value}>
          {state.label}
        </Select.Item>
      ))}
    </Select>
      placeholder={country ? "Select state" : "Select country first"}
    />
    
    <Select
      value={city}
      onValueChange={setCity}
      disabled={!state}
    >
      {cities.map((city) => (
        <Select.Item key={city.value} value={city.value}>
          {city.label}
        </Select.Item>
      ))}
    </Select>
      placeholder={state ? "Select city" : "Select state first"}
    />
  </>
);`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Async Options Loading</h3>
				<CodeBlock
					code={`const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.searchUsers(searchTerm);
      setUsers(response.data.map(user => ({
        label: user.name,
        value: user.id,
        avatar: user.avatar,
      })));
    } finally {
      setLoading(false);
    }
  };

  const debounceTimer = setTimeout(loadUsers, 300);
  return () => clearTimeout(debounceTimer);
}, [searchTerm]);

return (
  <Select
    value={selectedUser}
    onValueChange={setSelectedUser}
    placeholder="Search for a user..."
  >
    {users.map((user) => (
      <Select.Item key={user.value} value={user.value}>
        {user.label}
      </Select.Item>
    ))}
  </Select>
    searchable
    onSearchChange={setSearchTerm}
    loading={loading}
    renderOption={(option) => (
      <View style={styles.userOption}>
        <Avatar source={{ uri: option.avatar }} size="sm" />
        <Text>{option.label}</Text>
      </View>
    )}
  />
);`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Select components must be accessible to all users:</p>
				<ul>
					<li>Proper ARIA labels and roles for screen readers</li>
					<li>Full keyboard navigation (arrow keys, Enter, Escape)</li>
					<li>Type-ahead functionality for quick selection</li>
					<li>Clear focus indicators</li>
					<li>Announced changes for screen reader users</li>
					<li>Support for browser autofill where appropriate</li>
					<li>High contrast mode support</li>
					<li>Touch-friendly tap targets on mobile</li>
				</ul>
			</section>

			<PropsTable props={selectProps} />
		</div>
	);
}

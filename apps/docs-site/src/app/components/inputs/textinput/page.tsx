"use client";

import { useState } from "react";
import { TextInput } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const textInputProps = [
	{
		name: "value",
		type: "string",
		required: true,
		description: "The input value.",
	},
	{
		name: "onChangeText",
		type: "(text: string) => void",
		required: true,
		description: "Callback function called when the text changes.",
	},
	{
		name: "placeholder",
		type: "string",
		required: false,
		description: "Placeholder text shown when the input is empty.",
	},
	{
		name: "label",
		type: "string",
		required: false,
		description: "Label displayed above the input.",
	},
	{
		name: "helperText",
		type: "string",
		required: false,
		description: "Helper text displayed below the input.",
	},
	{
		name: "error",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the input is in an error state.",
	},
	{
		name: "errorText",
		type: "string",
		required: false,
		description: "Error message displayed when error is true.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the input is disabled.",
	},
	{
		name: "multiline",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the input supports multiple lines (textarea).",
	},
	{
		name: "numberOfLines",
		type: "number",
		required: false,
		default: "1",
		description: "Number of lines for multiline input.",
	},
	{
		name: "maxLength",
		type: "number",
		required: false,
		description: "Maximum number of characters allowed.",
	},
	{
		name: "secureTextEntry",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether to mask the input (for passwords).",
	},
	{
		name: "keyboardType",
		type: '"default" | "numeric" | "email-address" | "phone-pad" | "url"',
		required: false,
		default: '"default"',
		description: "Keyboard type to display on mobile devices.",
	},
	{
		name: "autoCapitalize",
		type: '"none" | "sentences" | "words" | "characters"',
		required: false,
		default: '"sentences"',
		description: "Auto-capitalization behavior.",
	},
	{
		name: "autoComplete",
		type: "string",
		required: false,
		description: "Auto-complete hint for the browser/OS.",
	},
	{
		name: "autoFocus",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether to focus the input on mount.",
	},
	{
		name: "leftIcon",
		type: "string",
		required: false,
		description: "Material icon name to display on the left.",
	},
	{
		name: "rightIcon",
		type: "string",
		required: false,
		description: "Material icon name to display on the right.",
	},
	{
		name: "onRightIconPress",
		type: "() => void",
		required: false,
		description: "Callback when right icon is pressed (makes it interactive).",
	},
	{
		name: "variant",
		type: '"outlined" | "filled"',
		required: false,
		default: '"outlined"',
		description: "Visual style variant of the input.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		required: false,
		default: '"md"',
		description: "Size of the input.",
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
		description: "Custom styles to apply to the input container.",
	},
];

export default function TextInputDocs() {
	const [text1, setText1] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [phone, setPhone] = useState("");
	const [bio, setBio] = useState("");
	const [search, setSearch] = useState("");
	const [emailError, setEmailError] = useState("");

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			setEmailError("Email is required");
		} else if (!emailRegex.test(email)) {
			setEmailError("Please enter a valid email");
		} else {
			setEmailError("");
		}
	};

	return (
		<div>
			<h1 className="text-display mb-4">TextInput</h1>
			<p className="text-subtitle text-secondary mb-8">
				Text inputs allow users to enter and edit text. They are used in forms, search fields, and
				anywhere users need to input textual information.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Input"
					code={`const [text, setText] = useState("");

return (
  <TextInput
    value={text}
    onChangeText={setText}
    placeholder="Enter your name"
    label="Name"
  />
);`}
				>
					<TextInput
						value={text1}
						onChangeText={setText1}
						placeholder="Enter your name"
						label="Name"
					/>
				</LiveExample>

				<LiveExample
					title="Variants"
					code={`<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Outlined input"
  label="Outlined"
  variant="outlined"
/>

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Filled input"
  label="Filled"
  variant="filled"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={text1}
							onChangeText={setText1}
							placeholder="Outlined input"
							label="Outlined"
							variant="outlined"
						/>
						<TextInput
							value={text1}
							onChangeText={setText1}
							placeholder="Filled input"
							label="Filled"
							variant="filled"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="States"
					code={`<TextInput
  value=""
  onChangeText={() => {}}
  placeholder="Normal state"
  label="Normal"
/>

<TextInput
  value="Disabled input"
  onChangeText={() => {}}
  label="Disabled"
  disabled
/>

<TextInput
  value="Error state"
  onChangeText={() => {}}
  label="Error"
  error
  errorText="This field is required"
/>

<TextInput
  value="With helper text"
  onChangeText={() => {}}
  label="Helper"
  helperText="This is helper text"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput value="" onChangeText={() => {}} placeholder="Normal state" label="Normal" />
						<TextInput value="Disabled input" onChangeText={() => {}} label="Disabled" disabled />
						<TextInput
							value="Error state"
							onChangeText={() => {}}
							label="Error"
							error
							errorText="This field is required"
						/>
						<TextInput
							value="With helper text"
							onChangeText={() => {}}
							label="Helper"
							helperText="This is helper text"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="With Icons"
					code={`<TextInput
  value={search}
  onChangeText={setSearch}
  placeholder="Search..."
  leftIcon="search"
  rightIcon={search ? "close" : undefined}
  onRightIconPress={search ? () => setSearch("") : undefined}
/>

<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  label="Email"
  leftIcon="email"
  keyboardType="email-address"
/>

<TextInput
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  label="Password"
  leftIcon="lock"
  rightIcon={showPassword ? "visibility_off" : "visibility"}
  onRightIconPress={() => setShowPassword(!showPassword)}
  secureTextEntry={!showPassword}
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={search}
							onChangeText={setSearch}
							placeholder="Search..."
							leftIcon="search"
							rightIcon={search ? "close" : undefined}
							onRightIconPress={search ? () => setSearch("") : undefined}
						/>
						<TextInput
							value={email}
							onChangeText={setEmail}
							placeholder="Enter email"
							label="Email"
							leftIcon="email"
							keyboardType="email-address"
						/>
						<TextInput
							value={password}
							onChangeText={setPassword}
							placeholder="Enter password"
							label="Password"
							leftIcon="lock"
							rightIcon={showPassword ? "visibility_off" : "visibility"}
							onRightIconPress={() => setShowPassword(!showPassword)}
							secureTextEntry={!showPassword}
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Small input"
  label="Small"
  size="sm"
/>

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Medium input"
  label="Medium"
  size="md"
/>

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Large input"
  label="Large"
  size="lg"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={text1}
							onChangeText={setText1}
							placeholder="Small input"
							label="Small"
							size="sm"
						/>
						<TextInput
							value={text1}
							onChangeText={setText1}
							placeholder="Medium input"
							label="Medium"
							size="md"
						/>
						<TextInput
							value={text1}
							onChangeText={setText1}
							placeholder="Large input"
							label="Large"
							size="lg"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Input Types"
					code={`<TextInput
  value={phone}
  onChangeText={setPhone}
  placeholder="(555) 123-4567"
  label="Phone"
  keyboardType="phone-pad"
  leftIcon="phone"
/>

<TextInput
  value={website}
  onChangeText={setWebsite}
  placeholder="https://example.com"
  label="Website"
  keyboardType="url"
  leftIcon="language"
/>

<TextInput
  value={amount}
  onChangeText={setAmount}
  placeholder="0.00"
  label="Amount"
  keyboardType="numeric"
  leftIcon="attach_money"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={phone}
							onChangeText={setPhone}
							placeholder="(555) 123-4567"
							label="Phone"
							keyboardType="phone-pad"
							leftIcon="phone"
						/>
						<TextInput
							value=""
							onChangeText={() => {}}
							placeholder="https://example.com"
							label="Website"
							keyboardType="url"
							leftIcon="language"
						/>
						<TextInput
							value=""
							onChangeText={() => {}}
							placeholder="0.00"
							label="Amount"
							keyboardType="numeric"
							leftIcon="attach_money"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Multiline Input"
					code={`<TextInput
  value={bio}
  onChangeText={setBio}
  placeholder="Tell us about yourself..."
  label="Bio"
  multiline
  numberOfLines={4}
  maxLength={200}
  helperText={\`\${bio.length}/200 characters\`}
/>`}
				>
					<TextInput
						value={bio}
						onChangeText={setBio}
						placeholder="Tell us about yourself..."
						label="Bio"
						multiline
						numberOfLines={4}
						maxLength={200}
						helperText={`${bio.length}/200 characters`}
					/>
				</LiveExample>

				<LiveExample
					title="Form Validation"
					code={`const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");

const validateEmail = (email: string) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!email) {
    setEmailError("Email is required");
  } else if (!emailRegex.test(email)) {
    setEmailError("Please enter a valid email");
  } else {
    setEmailError("");
  }
};

return (
  <TextInput
    value={email}
    onChangeText={(text) => {
      setEmail(text);
      validateEmail(text);
    }}
    placeholder="Enter email"
    label="Email"
    keyboardType="email-address"
    autoComplete="email"
    error={!!emailError}
    errorText={emailError}
    leftIcon="email"
  />
);`}
				>
					<TextInput
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							validateEmail(text);
						}}
						placeholder="Enter email"
						label="Email"
						keyboardType="email-address"
						autoComplete="email"
						error={!!emailError}
						errorText={emailError}
						leftIcon="email"
					/>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { TextInput } from '@braingame/bgui';
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Process login
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="heading" style={styles.title}>
        Login
      </Text>
      
      <TextInput
        value={formData.email}
        onChangeText={(text) => 
          setFormData({ ...formData, email: text })
        }
        placeholder="Enter your email"
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        error={!!errors.email}
        errorText={errors.email}
        leftIcon="email"
      />
      
      <TextInput
        value={formData.password}
        onChangeText={(text) => 
          setFormData({ ...formData, password: text })
        }
        placeholder="Enter your password"
        label="Password"
        secureTextEntry
        autoComplete="password"
        error={!!errors.password}
        errorText={errors.password}
        leftIcon="lock"
      />
      
      <Button
        onPress={handleSubmit}
        style={styles.button}
      >
        Sign In
      </Button>
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear labels:</strong> Always use descriptive labels that clearly indicate what
						information is expected.
					</li>
					<li className="mb-2">
						<strong>Helpful placeholders:</strong> Use placeholders to show format examples, not as
						labels.
					</li>
					<li className="mb-2">
						<strong>Input types:</strong> Use appropriate keyboard types to improve mobile input
						experience.
					</li>
					<li className="mb-2">
						<strong>Validation feedback:</strong> Provide immediate, clear error messages when
						validation fails.
					</li>
					<li className="mb-2">
						<strong>Helper text:</strong> Use helper text for additional context or requirements
						(e.g., password strength).
					</li>
					<li className="mb-2">
						<strong>Auto-complete:</strong> Enable appropriate auto-complete attributes for better
						UX and accessibility.
					</li>
					<li className="mb-2">
						<strong>Character limits:</strong> Show character count for inputs with maxLength.
					</li>
					<li className="mb-2">
						<strong>Icon usage:</strong> Use icons to reinforce input purpose and improve
						scannability.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Search Input</h3>
				<CodeBlock
					code={`<TextInput
  value={searchQuery}
  onChangeText={handleSearch}
  placeholder="Search products..."
  leftIcon="search"
  rightIcon={searchQuery ? "close" : undefined}
  onRightIconPress={() => {
    setSearchQuery("");
    clearResults();
  }}
  autoFocus
/>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Password Input with Visibility Toggle</h3>
				<CodeBlock
					code={`const [showPassword, setShowPassword] = useState(false);

<TextInput
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  label="Password"
  secureTextEntry={!showPassword}
  rightIcon={showPassword ? "visibility_off" : "visibility"}
  onRightIconPress={() => setShowPassword(!showPassword)}
  helperText="Must be at least 8 characters"
/>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Credit Card Input</h3>
				<CodeBlock
					code={`const formatCardNumber = (text: string) => {
  // Remove non-digits and format as XXXX XXXX XXXX XXXX
  const cleaned = text.replace(/\D/g, '');
  const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  return formatted.substring(0, 19); // 16 digits + 3 spaces
};

<TextInput
  value={cardNumber}
  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
  placeholder="1234 5678 9012 3456"
  label="Card Number"
  keyboardType="numeric"
  maxLength={19}
  leftIcon="credit_card"
/>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Text inputs must be accessible to all users:</p>
				<ul>
					<li>Labels are properly associated with inputs for screen readers</li>
					<li>Error messages are announced when they appear</li>
					<li>Helper text provides additional context without being required</li>
					<li>Placeholder text has sufficient contrast</li>
					<li>Touch targets meet minimum size requirements</li>
					<li>Keyboard navigation is fully supported</li>
					<li>Auto-complete attributes help password managers and assistive technology</li>
				</ul>
			</section>

			<PropsTable props={textInputProps} />
		</div>
	);
}

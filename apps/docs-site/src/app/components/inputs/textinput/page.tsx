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
		name: "onChange",
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
		name: "variant",
		type: '"standard" | "flat" | "error"',
		required: false,
		default: '"standard"',
		description: "Visual style variant of the input.",
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
	const [showPassword, _setShowPassword] = useState(false);
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
    onValueChange={setText}
    placeholder="Enter your name"
    label="Name"
  />
);`}
				>
					<TextInput value={text1} onChange={setText1} placeholder="Enter your name" />
				</LiveExample>

				<LiveExample
					title="Variants"
					code={`<TextInput
  value={text}
  onValueChange={setText}
  placeholder="Standard input"
  variant="standard"
/>

<TextInput
  value={text}
  onValueChange={setText}
  placeholder="Flat input"
  variant="flat"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={text1}
							onValueChange={setText1}
							placeholder="Standard input"
							variant="standard"
						/>
						<TextInput
							value={text1}
							onValueChange={setText1}
							placeholder="Flat input"
							variant="flat"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="States"
					code={`<TextInput
  value=""
  onValueChange={() => {}}
  placeholder="Normal state"
/>


<TextInput
  value="Error state"
  onValueChange={() => {}}
  variant="error"
  placeholder="This field is required"
/>

<TextInput
  value="With helper text"
  onValueChange={() => {}}
  placeholder="This is helper text"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput value="" onChange={() => {}} placeholder="Normal state" />
						<TextInput
							value="Error state"
							onValueChange={() => {}}
							variant="error"
							placeholder="This field is required"
						/>
						<TextInput
							value="With helper text"
							onValueChange={() => {}}
							placeholder="This is helper text"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="With Icons"
					code={`<TextInput
  value={search}
  onValueChange={setSearch}
  placeholder="Search..."
  leftIcon="search"
  rightIcon={search ? "close" : undefined}
/>

<TextInput
  value={email}
  onValueChange={setEmail}
  placeholder="Enter email"
  leftIcon="email"
  keyboardType="email-address"
/>

<TextInput
  value={password}
  onValueChange={setPassword}
  placeholder="Enter password"
  leftIcon="lock"
  rightIcon={showPassword ? "visibility_off" : "visibility"}
  secureTextEntry={!showPassword}
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={search}
							onValueChange={setSearch}
							placeholder="Search..."
							leftIcon="search"
							rightIcon={search ? "close" : undefined}
						/>
						<TextInput
							value={email}
							onValueChange={setEmail}
							placeholder="Enter email"
							leftIcon="email"
							keyboardType="email-address"
						/>
						<TextInput
							value={password}
							onValueChange={setPassword}
							placeholder="Enter password"
							leftIcon="lock"
							rightIcon={showPassword ? "visibility_off" : "visibility"}
							secureTextEntry={!showPassword}
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Basic Input"
					code={`<TextInput
  value={text}
  onValueChange={setText}
  placeholder="Standard input example"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={text1}
							onValueChange={setText1}
							placeholder="Standard input example"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Input Types"
					code={`<TextInput
  value={phone}
  onValueChange={setPhone}
  placeholder="(555) 123-4567"
  keyboardType="phone-pad"
  leftIcon="phone"
/>

<TextInput
  value={website}
  onValueChange={setWebsite}
  placeholder="https://example.com"
  keyboardType="url"
  leftIcon="language"
/>

<TextInput
  value={amount}
  onValueChange={setAmount}
  placeholder="0.00"
  keyboardType="numeric"
  leftIcon="attach_money"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<TextInput
							value={phone}
							onValueChange={setPhone}
							placeholder="(555) 123-4567"
							keyboardType="phone-pad"
							leftIcon="phone"
						/>
						<TextInput
							value=""
							onValueChange={() => {}}
							placeholder="https://example.com"
							keyboardType="url"
							leftIcon="language"
						/>
						<TextInput
							value=""
							onValueChange={() => {}}
							placeholder="0.00"
							keyboardType="numeric"
							leftIcon="attach_money"
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Multiline Input"
					code={`<TextInput
  value={bio}
  onValueChange={setBio}
  placeholder="Tell us about yourself..."
  multiline
  numberOfLines={4}
  maxLength={200}
  placeholder={\`\${bio.length}/200 characters\`}
/>`}
				>
					<TextInput
						value={bio}
						onValueChange={setBio}
						placeholder="Tell us about yourself..."
						multiline
						numberOfLines={4}
						maxLength={200}
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
    onValueChange={(text) => {
      setEmail(text);
      validateEmail(text);
    }}
    placeholder="Enter email"
    keyboardType="email-address"
    autoComplete="email"
    error={!!emailError}
    errorMessage={emailError}
    leftIcon="email"
  />
);`}
				>
					<TextInput
						value={email}
						onValueChange={(text: string) => {
							setEmail(text);
							validateEmail(text);
						}}
						placeholder={emailError || "Enter your email"}
						keyboardType="email-address"
						autoComplete="email"
						variant={emailError ? "error" : "standard"}
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
        onValueChange={(text) => 
          setFormData({ ...formData, email: text })
        }
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        variant={errors.email ? "error" : "standard"}
        placeholder={errors.email || "Enter email"}
        leftIcon="email"
      />
      
      <TextInput
        value={formData.password}
        onValueChange={(text) => 
          setFormData({ ...formData, password: text })
        }
        placeholder="Enter your password"
        secureTextEntry
        autoComplete="password"
        variant={errors.password ? "error" : "standard"}
        placeholder={errors.password || "Enter password"}
        leftIcon="lock"
      />
      
      <Button
        onClick={handleSubmit}
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
  onValueChange={handleSearch}
  placeholder="Search products..."
  leftIcon="search"
  rightIcon={searchQuery ? "close" : undefined}
  autoFocus
/>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Password Input with Visibility Toggle</h3>
				<CodeBlock
					code={`const [showPassword, setShowPassword] = useState(false);

<TextInput
  value={password}
  onValueChange={setPassword}
  placeholder="Enter password"
  secureTextEntry={!showPassword}
  rightIcon={showPassword ? "visibility_off" : "visibility"}
  placeholder="Must be at least 8 characters"
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
  onValueChange={(text) => setCardNumber(formatCardNumber(text))}
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

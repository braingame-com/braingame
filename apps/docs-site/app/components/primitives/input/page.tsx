"use client";

import {
	Input as BguiInput,
	DocsExample,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";
import { useState } from "react";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const inputProps: PropsTableRow[] = [
	{
		name: "type",
		type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"',
		defaultValue: '"text"',
		description: "Input mode.",
	},
	{
		name: "variant",
		type: '"outlined" | "solid" | "soft" | "plain"',
		defaultValue: '"outlined"',
		description: "Visual treatment.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		defaultValue: '"md"',
		description: "Height and spacing preset.",
	},
	{
		name: "startDecorator",
		type: "React.ReactNode",
		description: "Leading adornment (icon, hint).",
	},
	{
		name: "endDecorator",
		type: "React.ReactNode",
		description: "Trailing adornment.",
	},
];

const statesExample = `<Stack spacing="md">
  <Input
    placeholder="Email"
    type="email"
    value={email}
    onChange={(event) => setEmail(event.nativeEvent.text)}
  />
  <Input
    placeholder="Password"
    type="password"
    value={password}
    onChange={(event) => setPassword(event.nativeEvent.text)}
  />
  <Input placeholder="Disabled" disabled />
</Stack>`;

const decoratorsExample = `<BguiInput
  placeholder="Search"
  startDecorator="🔍"
  endDecorator="⌘K"
/>`;

const usageSnippet = `import { Input } from "@braingame/bgui";

function EmailField() {
  const [value, setValue] = useState("");

  return (
    <Input
      type="email"
      placeholder="you@braingame.dev"
      value={value}
      onChange={(event) => setValue(event.nativeEvent.text)}
    />
  );
}`;

export default function InputDocs() {
	const theme = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setEmail(event.nativeEvent.text);
	};

	const handlePasswordChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setPassword(event.nativeEvent.text);
	};

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Input</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					The Input primitive handles single-line text capture across desktop and mobile. Decorators
					let you add icons without custom containers.
				</Typography>
			</Stack>

			<DocsExample title="States" code={statesExample}>
				<Stack spacing="md">
					<BguiInput placeholder="Email" type="email" value={email} onChange={handleEmailChange} />
					<BguiInput
						placeholder="Password"
						type="password"
						value={password}
						onChange={handlePasswordChange}
					/>
					<BguiInput placeholder="Disabled" disabled />
				</Stack>
			</DocsExample>

			<DocsExample title="Decorators" code={decoratorsExample}>
				<BguiInput placeholder="Search" startDecorator="🔍" endDecorator="⌘K" />
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={inputProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Inputs support controlled patterns via the{" "}
					<Typography component="span" level="body-md">
						value
					</Typography>
					prop or can manage their own state via{" "}
					<Typography component="span" level="body-md">
						defaultValue
					</Typography>
					.
				</Typography>
			</DocsExample>
		</Stack>
	);
}

// @ts-nocheck
"use client";

import { Input, Stack, Typography } from "../../../../src/components/BGUIDemo";
import { useState } from "react";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const inputProps = [
	{ name: "type", type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"', description: "Input mode." },
	{ name: "variant", type: '"outlined" | "solid" | "soft" | "plain"', description: "Visual treatment." },
	{ name: "size", type: '"sm" | "md" | "lg"', description: "Height and spacing preset." },
	{ name: "startDecorator", type: "React.ReactNode", description: "Leading adornment (icon, text, etc.)." },
	{ name: "endDecorator", type: "React.ReactNode", description: "Trailing adornment." },
];

export default function InputDocs() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div>
			<Typography level="h1" className="text-display mb-4">
				Input
			</Typography>
			<Typography className="text-body text-secondary mb-6">
				The Input primitive handles single-line text capture across desktop and mobile. Decorators let you
				add icons without custom containers.
			</Typography>

			<LiveExample
				title="States"
				code={`<Stack spacing="md">
  <Input placeholder="Email" type="email" value={email} onValueChange={setEmail} />
  <Input placeholder="Password" type="password" value={password} onValueChange={setPassword} />
</Stack>`}
			>
				<Stack spacing="md">
					<Input placeholder="Email" type="email" value={email} onValueChange={setEmail} />
					<Input placeholder="Password" type="password" value={password} onValueChange={setPassword} />
				</Stack>
			</LiveExample>

			<LiveExample
				title="Decorators"
				code={`<Input
  placeholder="Search"
  startDecorator="🔍"
  endDecorator="⌘K"
/>`}
			>
				<Input placeholder="Search" startDecorator="🔍" endDecorator="⌘K" />
			</LiveExample>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					API
				</Typography>
				<PropsTable props={inputProps} />
			</section>

			<section className="mt-10">
				<Typography level="h2" className="text-title mb-4">
					Usage
				</Typography>
				<CodeBlock
					language="tsx"
					code={`import { Input } from "@braingame/bgui";

function EmailField() {
  const [value, setValue] = useState("");
  return (
    <Input
      type="email"
      placeholder="you@braingame.dev"
      value={value}
      onValueChange={setValue}
    />
  );
}`}
				/>
			</section>
		</div>
	);
}

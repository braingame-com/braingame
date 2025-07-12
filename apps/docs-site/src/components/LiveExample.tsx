"use client";

import { useState } from "react";

interface LiveExampleProps {
	code: string;
	language?: string;
	children: React.ReactNode;
	title?: string;
}

export function LiveExample({ code, language = "tsx", children, title }: LiveExampleProps) {
	const [showCode, setShowCode] = useState(false);

	const copyCode = () => {
		navigator.clipboard.writeText(code);
		// Could add a toast notification here
	};

	return (
		<div className="example">
			{title && <h3 className="text-subtitle p-4 mb-0">{title}</h3>}

			<div className="example__preview">{children}</div>

			<div className="example__code">
				<div
					className="flex flex--between p-3"
					style={{ borderBottom: "1px solid var(--color-border)" }}
				>
					<div className="flex flex--gap-2">
						<button
							type="button"
							className="button button--ghost"
							onClick={() => setShowCode(!showCode)}
							style={{ padding: "var(--space-1) var(--space-3)", fontSize: "var(--text-sm)" }}
						>
							{showCode ? "Hide" : "Show"} Code
						</button>
						<button
							type="button"
							className="button button--ghost"
							onClick={copyCode}
							style={{ padding: "var(--space-1) var(--space-3)", fontSize: "var(--text-sm)" }}
						>
							Copy
						</button>
					</div>
				</div>

				{showCode && (
					<div className="code-block m-0">
						<pre style={{ margin: 0, borderRadius: 0 }}>
							<code className={`language-${language}`}>{code}</code>
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}

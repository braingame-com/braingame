"use client";

import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

interface CodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
}

let highlighterPromise: Promise<Highlighter> | null = null;

async function getShikiHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ["github-dark", "github-light"],
			langs: ["tsx", "jsx", "typescript", "javascript", "css", "json", "bash", "yaml"],
		});
	}
	return highlighterPromise;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
	const [html, setHtml] = useState<string>("");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		async function highlight() {
			try {
				const highlighter = await getShikiHighlighter();
				const lightHtml = highlighter.codeToHtml(code, {
					lang: language,
					theme: "github-light",
				});
				const darkHtml = highlighter.codeToHtml(code, {
					lang: language,
					theme: "github-dark",
				});

				// Wrap in containers for theme switching
				const wrappedHtml = `
					<div class="shiki-light">${lightHtml}</div>
					<div class="shiki-dark">${darkHtml}</div>
				`;
				setHtml(wrappedHtml);
			} catch (error) {
				console.error("Failed to highlight code:", error);
				// Fallback to plain text
				setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
			}
		}
		highlight();
	}, [code, language]);

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

	return (
		<div className="code-block">
			<div className="code-block__header">
				<span className="code-block__filename" style={{ fontFamily: "var(--font-mono)" }}>
					{filename || language}
				</span>
				<button
					type="button"
					className="code-block__copy"
					onClick={copyCode}
					aria-label="Copy code"
				>
					{copied ? "Copied!" : "Copy"}
				</button>
			</div>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki sanitizes the HTML output */}
			<div className="code-block__content" dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}

function escapeHtml(text: string): string {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

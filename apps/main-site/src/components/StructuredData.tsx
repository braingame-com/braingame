import Script from "next/script";
import { useId } from "react";

interface StructuredDataProps {
	data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
	const id = useId();

	// JSON-LD is safe when properly stringified
	return (
		<Script
			id={`structured-data-${id}`}
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this pattern for structured data
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data),
			}}
			strategy="afterInteractive"
		/>
	);
}

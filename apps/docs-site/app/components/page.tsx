import Link from "next/link";

const components = [
	"Button",
	"Text",
	"View",
	"Icon",
	"Link",
	"PageWrapper",
	"TextInput",
	"ErrorBoundary",
];

export default function ComponentsIndexPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
				<div className="space-y-4 text-center">
					<h1 className="text-4xl font-bold">BGUI Components</h1>
					<p className="text-gray-400">Documentation pages for each UI component.</p>
				</div>
				<ul className="space-y-2">
					{components.map((name) => (
						<li key={name}>
							<Link href={`/docs/components/${name}`} className="text-cyan-400 hover:underline">
								{name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

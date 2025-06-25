import Link from "next/link";

interface ComponentGridProps {
	components: string[];
}

export default function ComponentGrid({ components }: ComponentGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{components.map((name) => (
				<Link
					key={name}
					href={`/components/${name}`}
					className="p-6 border border-gray-700 rounded-lg hover:bg-gray-900 hover:border-cyan-600 transition-all duration-200 group"
				>
					<h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
						{name}
					</h3>
					<p className="text-sm text-gray-400 mt-2">View {name} component documentation</p>
				</Link>
			))}
		</div>
	);
}

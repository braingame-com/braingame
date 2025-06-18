export default function ButtonDocs() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-bold">Button</h1>
					<p className="text-gray-400">Props for the Button component.</p>
				</div>
				<table className="w-full text-left border border-gray-700">
					<thead>
						<tr className="bg-gray-900">
							<th className="p-2 border border-gray-700">Prop</th>
							<th className="p-2 border border-gray-700">Type</th>
							<th className="p-2 border border-gray-700">Required</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-2 border border-gray-700">text</td>
							<td className="p-2 border border-gray-700">string</td>
							<td className="p-2 border border-gray-700">No</td>
						</tr>
						<tr>
							<td className="p-2 border border-gray-700">icon</td>
							<td className="p-2 border border-gray-700">string</td>
							<td className="p-2 border border-gray-700">No</td>
						</tr>
						<tr>
							<td className="p-2 border border-gray-700">iconColor</td>
							<td className="p-2 border border-gray-700">string</td>
							<td className="p-2 border border-gray-700">No</td>
						</tr>
						<tr>
							<td className="p-2 border border-gray-700">iconType</td>
							<td className="p-2 border border-gray-700">string</td>
							<td className="p-2 border border-gray-700">No</td>
						</tr>
						<tr>
							<td className="p-2 border border-gray-700">onPress</td>
							<td className="p-2 border border-gray-700">() =&gt; void</td>
							<td className="p-2 border border-gray-700">Yes</td>
						</tr>
						<tr>
							<td className="p-2 border border-gray-700">disabled</td>
							<td className="p-2 border border-gray-700">boolean</td>
							<td className="p-2 border border-gray-700">No</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

interface PropDefinition {
	name: string;
	type: string;
	required?: boolean;
	default?: string;
	description: string;
}

interface PropsTableProps {
	props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
	return (
		<div className="mt-6">
			<h3 className="text-heading mb-4">Props</h3>
			<table className="props-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Required</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{props.map((prop) => (
						<tr key={prop.name}>
							<td>
								<code className="props-table__name">{prop.name}</code>
							</td>
							<td>
								<code className="props-table__type">{prop.type}</code>
							</td>
							<td>
								{prop.required ? (
									<span className="props-table__required">Yes</span>
								) : (
									<span className="text-muted">No</span>
								)}
							</td>
							<td>
								{prop.default ? (
									<code className="props-table__default">{prop.default}</code>
								) : (
									<span className="text-muted">-</span>
								)}
							</td>
							<td>{prop.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

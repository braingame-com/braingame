import Link from "next/link";

export default function DocsPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16">
				<div className="text-center space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold text-white">Documentation</h1>
						<p className="text-lg text-gray-400">Brain Game Platform Documentation</p>
					</div>

					<div className="bg-gray-900 border border-gray-700 rounded-lg p-8 space-y-4">
						<h2 className="text-2xl font-semibold text-cyan-400">Coming Soon</h2>
						<p className="text-gray-300">
							Our comprehensive documentation is currently being written.
							<br />
							In the meantime, check out our source code on GitHub.
						</p>
					</div>

					<div className="space-y-4">
						<p className="text-gray-400">For now, you can explore:</p>
						<div className="flex gap-4 justify-center">
							<a
								href="https://github.com/braingame-com/braingame"
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium border border-gray-600"
							>
								View on GitHub
							</a>
							<Link
								href="/"
								className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 font-medium"
							>
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

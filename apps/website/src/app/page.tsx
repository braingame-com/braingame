"use client";

export default function HomePage() {
	return (
		<>
			<style jsx>{`
				@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
				
				body {
					font-family: 'Inter', sans-serif;
					background-color: black;
					overflow: hidden;
				}

				.svg-container {
					width: 100px;
					height: 100px;
					animation: fadeIn 2s ease-out, float 6s ease-in-out infinite;
				}
				
				        .svg-container svg {
          width: 100%;
          height: 100%;
          animation: pulseGlow 25s ease-in-out infinite;
        }

				@keyframes moodLamp {
					0% { background: radial-gradient(circle at center, rgba(13, 37, 63, 0.1) 0%, #0a0a0a 100%); }
					25% { background: radial-gradient(circle at center, rgba(41, 12, 59, 0.1) 0%, #0a0a0a 100%); }
					50% { background: radial-gradient(circle at center, rgba(11, 56, 58, 0.1) 0%, #0a0a0a 100%); }
					75% { background: radial-gradient(circle at center, rgba(58, 54, 11, 0.1) 0%, #0a0a0a 100%); }
					100% { background: radial-gradient(circle at center, rgba(13, 37, 63, 0.1) 0%, #0a0a0a 100%); }
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
						filter: blur(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
						filter: blur(0);
					}
				}
				
				@keyframes float {
					0% { transform: translateY(0px); }
					50% { transform: translateY(-15px); }
					100% { transform: translateY(0px); }
				}
				
				        @keyframes pulseGlow {
          0% { filter: drop-shadow(0 0 8px rgba(63, 131, 248, 0.8)) drop-shadow(0 0 15px rgba(63, 131, 248, 0.4)); }
          25% { filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 15px rgba(168, 85, 247, 0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(34, 197, 204, 0.8)) drop-shadow(0 0 15px rgba(34, 197, 204, 0.4)); }
          75% { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 15px rgba(251, 191, 36, 0.4)); }
          100% { filter: drop-shadow(0 0 8px rgba(63, 131, 248, 0.8)) drop-shadow(0 0 15px rgba(63, 131, 248, 0.4)); }
        }

				.mood-lamp-bg {
					background-size: 400% 400%;
					animation: moodLamp 25s ease-in-out infinite;
				}
			`}</style>

			<div className="min-h-screen bg-black text-white flex items-center justify-center mood-lamp-bg">
				<main className="text-center flex flex-col items-center gap-12">
					{/* Floating, Glowing SVG Logo */}
					<div className="svg-container">
						<svg viewBox="0 0 24 24" fill="white" role="graphics-symbol">
							<path d="m20.88,7.56l1.56-.78,1.56-.78v-2.88c0-.57-.15-1.1-.42-1.56-.27-.47-.67-.87-1.14-1.14C21.98.15,21.45,0,20.88,0H3.12C2.55,0,2.02.15,1.56.42c-.47.27-.87.67-1.14,1.14-.27.46-.42.99-.42,1.56v17.76c0,.57.15,1.1.42,1.56.27.47.67.87,1.14,1.14.46.27.99.42,1.56.42h17.76c.57,0,1.1-.15,1.56-.42.47-.27.87-.67,1.14-1.14.27-.46.42-.99.42-1.56v-10.44h-8.88l-3.12,1.56,3.12,1.56h5.76v5.76c0,.19-.03.38-.1.55l-2.2-1.1-.58-.29-12.95-6.48,12.95-6.48.58-.29,2.2-1.1c.06.17.1.35.1.55v2.88Zm-5.05,13.32H4.68c-.86,0-1.56-.7-1.56-1.56v-4.79l12.71,6.35ZM3.12,9.47v-4.79c0-.86.7-1.56,1.56-1.56h11.14L3.12,9.47Z" />
						</svg>
					</div>

					{/* Content */}
					<div className="space-y-6">
						<div className="space-y-4">
							<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
								Brain Game
							</h1>

							<p className="text-lg text-gray-400">
								A new era of personal development technology is coming soon.
							</p>

							<p className="text-gray-500 leading-relaxed max-w-lg">
								We&apos;re building something extraordinary. Our platform will revolutionize how you
								approach personal growth through innovative technology.
							</p>
						</div>

						<div className="flex gap-4 justify-center pt-4">
							<a
								href="/docs"
								className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300 font-medium hover:shadow-lg hover:shadow-cyan-500/25"
							>
								View Docs
							</a>
							<a
								href="https://github.com/braingame-com/braingame"
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 font-medium"
							>
								GitHub
							</a>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

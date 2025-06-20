"use client";

import styles from "./page.module.css";

export default function HomePage() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{/* Floating, Glowing SVG Logo */}
				<div className={styles.svgContainer}>
					<svg viewBox="0 0 24 24" fill="white" role="graphics-symbol">
						<path d="m20.88,7.56l1.56-.78,1.56-.78v-2.88c0-.57-.15-1.1-.42-1.56-.27-.47-.67-.87-1.14-1.14C21.98.15,21.45,0,20.88,0H3.12C2.55,0,2.02.15,1.56.42c-.47.27-.87.67-1.14,1.14-.27.46-.42.99-.42,1.56v17.76c0,.57.15,1.1.42,1.56.27.47.67.87,1.14,1.14.46.27.99.42,1.56.42h17.76c.57,0,1.1-.15,1.56-.42.47-.27.87-.67,1.14-1.14.27-.46.42-.99.42-1.56v-10.44h-8.88l-3.12,1.56,3.12,1.56h5.76v5.76c0,.19-.03.38-.1.55l-2.2-1.1-.58-.29-12.95-6.48,12.95-6.48.58-.29,2.2-1.1c.06.17.1.35.1.55v2.88Zm-5.05,13.32H4.68c-.86,0-1.56-.7-1.56-1.56v-4.79l12.71,6.35ZM3.12,9.47v-4.79c0-.86.7-1.56,1.56-1.56h11.14L3.12,9.47Z" />
					</svg>
				</div>

				{/* Content */}
				<div className={styles.content}>
					<div className={styles.textSection}>
						<h1 className={styles.title}>Brain Game</h1>

						<p className={styles.subtitle}>
							A new era of personal development technology is coming soon.
						</p>

						<p className={styles.description}>
							We&apos;re building something extraordinary. Our platform will revolutionize how you
							approach personal growth through innovative technology.
						</p>
					</div>

					<div className={styles.buttonContainer}>
						<a href="/docs" className={styles.primaryButton}>
							View Docs
						</a>
						<a
							href="https://github.com/braingame-com/braingame"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.secondaryButton}
						>
							GitHub
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
